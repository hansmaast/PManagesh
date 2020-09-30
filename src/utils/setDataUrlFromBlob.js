import * as blobUtil from "blob-util";

export const setDataUrlFromBlob = async (imageBlob, setToObject) => {
  if ( imageBlob ) {
    let dataUrlFromBlob;
    if ( imageBlob.type.includes( 'svg' ) || imageBlob.type.includes('jpeg') || imageBlob.type.includes('jpg') ) {
      console.log( 'blob type: ', imageBlob.type )
      dataUrlFromBlob = await blobUtil.blobToBinaryString( imageBlob );

    } else {
      dataUrlFromBlob = await blobUtil.blobToDataURL( imageBlob );
    }
    setToObject( dataUrlFromBlob );
  }
}