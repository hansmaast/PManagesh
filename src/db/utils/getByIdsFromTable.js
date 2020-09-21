import { getPrefixFor } from "./getPrefixFor";

export async function getByIdsFromTable( ids, table ) {
  const PREFIX = getPrefixFor( table );
  let matchingObjects = [];
  for ( const id of ids ) {
    const object = await table.getItem( PREFIX + id );
    if ( object ) {
      matchingObjects.push( object );
    } else {
      console.error( 'object with id: ' + id + ' not found.' );
    }
  }
  return matchingObjects;
}