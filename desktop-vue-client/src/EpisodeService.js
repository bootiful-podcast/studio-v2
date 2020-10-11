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
        <introduction src="intro.mp3"/>
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
    doc.getElementsByTagName('photo').item(0).setAttribute('src', photoJpg)
    doc.getElementsByTagName('description').item(0).textContent = description
    doc.getElementsByTagName('interview').item(0).setAttribute('src', interviewFileName)
    doc.getElementsByTagName('introduction').item(0).setAttribute('src', interviewFileName)
    return serializer.serializeToString(doc);
  }

  async buildZipFile(uid, title, description, intro, interview, photo) {

    // todo we need to generate a manifest, i think?
    // todo go check the protocol/spec for the archive from the javafx code...

    const mapOfFileNamesToFiles = {
      'interview.mp3': interview,
      'introduction.mp3': intro,
      'profile.jpg': photo
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

  async createEpisode(title, description, intro, interview, photo) {
    const uid = this.uuidV4()
    const zipFile = await this.buildZipFile(uid, title, description, intro, interview, photo)
    const formData = new FormData()
    formData.append('file', zipFile)
    const response = await fetch(this.rootUrl + 'test-upload/' + uid, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSupplier().token
      }
    })
    console.info(response, 'finished upload...')
  }


  uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
