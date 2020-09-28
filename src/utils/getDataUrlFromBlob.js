import * as blobUtil from "blob-util";

export  const getDataUrlFromBlob = async ( blob ) => {
  let dataURL = await blobUtil.blobToDataURL( blob );
  console.log( 'dataUrl: ', dataURL )
  return dataURL;
}