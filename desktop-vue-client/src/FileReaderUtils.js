/**
 *
 * This function adapts an HTML5 FileReader into a promise. The only thing is that there are several interesting methods on the FileReader,
 * so the second param is a callback function that the client must provide that takes a FileReader and is supposed to dereference a function on the FileReader
 * to be invoked with the file to be read. That is, this function sets up everything and expects a callback for the last mile.
 *
 *
 * @param inputFile
 * @param producerOfFunctionOnFileReaderThatWeAreSupposedToInvoke
 * @returns {Promise<unknown>}
 */
export default function readFileReaderData(inputFile, producerOfFunctionOnFileReaderThatWeAreSupposedToInvoke) {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.onerror = () => {
      fr.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    fr.onload = () => {
      resolve(fr.result);
    };
    const func = producerOfFunctionOnFileReaderThatWeAreSupposedToInvoke(fr)
    func.apply(fr, [inputFile])
  });
}
