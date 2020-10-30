import JSZip from "jszip";

/**
 * used to handle the work of creating new episodes
 */
export default class EpisodeService {

  constructor(rootUrl, tokenSupplier) {
    this.tokenSupplier = tokenSupplier
    this.rootUrl = rootUrl
  }

  async readUploadedFileAsText(inputFile) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = () => {
        fr.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.readAsArrayBuffer(inputFile);
    });
  }

  buildManifestXml(uid, title, description, introductionFileName, interviewFileName, photoJpg) {
    const parser = new DOMParser();
    const xmlString =
      `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <podcast title="this is the title" uid="9c88cd9c-d071-4a0e-bd6a-b6b96b3cc53b">
        <interview src="interview.mp3"/>
        <introduction src="introduction.mp3"/>
        <photo src="photo.jpg"/>
        <description>
        <![CDATA[this is the description. _Now is the time_ for all things.]]>
        </description>
        </podcast>
      `.trim()
    const serializer = new XMLSerializer()
    const doc = parser.parseFromString(xmlString, 'application/xml')
    doc.getElementsByTagName('podcast').item(0).setAttribute('title', title)
    doc.getElementsByTagName('podcast').item(0).setAttribute('uid', uid)
    // doc.getElementsByTagName('photo').item(0).setAttribute('src', photoJpg)
    doc.getElementsByTagName('description').item(0).textContent = description
    // doc.getElementsByTagName('interview').item(0).setAttribute('src', interviewFileName)
    // doc.getElementsByTagName('introduction').item(0).setAttribute('src', interviewFileName)
    const newXmlManifestDescription = serializer.serializeToString(doc);
    console.log(newXmlManifestDescription)
    return newXmlManifestDescription
  }

  async buildZipFile(uid, title, description, intro, interview, photo) {

    // todo we need to generate a manifest, i think?
    // todo go check the protocol/spec for the archive from the javafx code...

    // todo what happens if the file i upload is not named photo.jpg?
    // i saw some weirdness here

    const mapOfFileNamesToFiles = {
      'interview.mp3': interview,
      'introduction.mp3': intro,
      'photo.jpg': photo
    }
    const zip = new JSZip();
    for (let fileKey in mapOfFileNamesToFiles) {
      let uploadedFile = mapOfFileNamesToFiles[fileKey];
      if (uploadedFile != null) {
        console.debug(`The user provided  ${fileKey} so were uploading that one.`)
        const data = await this.readUploadedFileAsText(uploadedFile);
        zip.file(fileKey, data, {base64: true})
      }
    }

    const xml = this.buildManifestXml(uid, title, description, intro.name, interview.name, photo.name)
    zip.file('manifest.xml', xml)

    return await zip.generateAsync({type: 'blob'})

  }

  async __pollStatusEndpoint(uid, uri, cb) {
    console.log('__doPollStatusEndpoint: ', uid, ',', uri, ',', cb)
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSupplier().token
      }
    })

    const json = await response.json()

    const audioUrlJsonAttribute = 'audio-url'
    const photoUrlJsonAttribute = 'photo-url'
    const statusJsonAttribute = 'status'
    const ps = new ProductionState()

    if (statusJsonAttribute in json) {

      ps.status = json[statusJsonAttribute]

      if (audioUrlJsonAttribute in json) {
        ps.mediaUrl = json[audioUrlJsonAttribute]
      }

      if (photoUrlJsonAttribute in json) {
        ps.photoUrl = json[photoUrlJsonAttribute]
        ps.finished = true
      }

    }

    cb(ps)

    const shouldPollingContinue = !(ps.finished)
    console.log('shouldPollingContinue: ', shouldPollingContinue)
    return shouldPollingContinue
  }

  //
  sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async createEpisode(title, description, intro, interview, photo, publicationCallback) {
    const token = this.tokenSupplier().token
    console.log('the publicationCallback is ', publicationCallback)

    const ps = new ProductionState()
    ps.status = 'uploading'
    publicationCallback( ps )

    const uid = this.uuidV4()
    const zipFile = await this.buildZipFile(uid, title, description, intro, interview, photo)
    const formData = new FormData()
    formData.append('file', zipFile)
    const response = await fetch(this.rootUrl + 'podcasts/' + uid, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    console.info(response, 'finished upload...', response.statusText, ':', response.status)
    if (response.status >= 200 && response.status < 300) {
      console.log('we got a response!')
      const json = await response.json()
      const locationStatusJsonAttribute = 'status-url'
      if (locationStatusJsonAttribute in json) {
        const uriPath = this.rootUrl.endsWith('/') && json[locationStatusJsonAttribute].startsWith('/') ?
          json[locationStatusJsonAttribute].substr(1) :
          json[locationStatusJsonAttribute]
        const uri = this.rootUrl + uriPath
        console.log('going to poll', uri, 'for UID ', uid)
        while (await this.__pollStatusEndpoint(uid, uri, publicationCallback)) {
          await this.sleep(10000)
        }
      }
    } //
    else {
      console.log(`the response from POST'ing the podcast was ${response.status} with text ${response.statusText}`)
      throw new Error('could not get the podcast status!')
    }
  }

  uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

export class ProductionState {
  constructor() {
    this.status = null
    this.photoUrl = null
    this.mediaUrl = null
    this.finished = false
  }
}
