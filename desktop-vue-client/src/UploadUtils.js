
const context = {
  profileFile: null,
  interviewFile: null,
  introFile: null
};

/**
 * Builds a file-uploading drop target with some sensible defaults.
 * @param dropZoneElement the element that should act as the drop target. This is expected to be a resolved DOM Node, not a string ID.
 * @param handleFileCallback a function to invoke once a File has been dropped. Use this to note the file.
 * @param dragOverCallback a function to invoke once a File has been dragged over a dropZone.
 * @param dragLeaveHandler a function to invoke once a File is no longer being dragged over a dropZone
 */
function buildFileUploadingDropZone(dropZoneElement, dragOverCallback, dragLeaveCallback, handleFileCallback) {

  function dragOverHandler(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    dragOverCallback(dropZoneElement, ev)
  }

  function dragLeaveHandler(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    dragLeaveCallback(dropZoneElement, ev)
  }

  function dropHandler(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    Array
      .from(ev.dataTransfer.items)
      .filter(fileItem => fileItem.kind === 'file')
      .forEach(fileItem => handleFileCallback(dropZoneElement, fileItem.getAsFile()))
  }

  dropZoneElement.addEventListener('drop', dropHandler)
  dropZoneElement.addEventListener('dragover', dragOverHandler)
  dropZoneElement.addEventListener('dragleave', dragLeaveHandler)
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function uploadFileDataToServer() {
  const formData = new FormData()
  const uid = uuidv4()
  formData.append('intro', context.introFile)
  formData.append('profile', context.profileFile)
  formData.append('interview', context.interviewFile)
  console.log(formData)
  fetch('http://localhost:8080/podcasts/' + uid, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      console.log(response)
    })
  console.log('finished upload...')
}

window.addEventListener('load', () => {

  function colorizeDropZoneOnDragOver(dz) {
    dz.classList.add('drop-zone-drag')
  }

  function restoreDropZoneOnDragLeave(dz) {
    if (dz.classList.contains('drop-zone-drag'))
      dz.classList.remove('drop-zone-drag')
  }

  buildFileUploadingDropZone(document.getElementById('profileDZ'), colorizeDropZoneOnDragOver,
    restoreDropZoneOnDragLeave,
    (dz, file) => {
      context.profileFile = file
      console.log('profileFile!', context.profileFile)
    })
  buildFileUploadingDropZone(document.getElementById('introDZ'), colorizeDropZoneOnDragOver,
    restoreDropZoneOnDragLeave, (dz, file) => {
      context.introFile = file
      console.log('introFile!', context.introFile)
    })
  buildFileUploadingDropZone(document.getElementById('interviewDZ'), colorizeDropZoneOnDragOver,
    restoreDropZoneOnDragLeave, (dz, file) => {
      context.interviewFile = file
      console.log('interviewFile!', context.interviewFile)
    })
  document.querySelector('[type=submit]').addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    uploadFileDataToServer()
  })
})
