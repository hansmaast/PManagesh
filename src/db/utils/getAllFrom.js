export const getAllFrom = async table => {
  let fromDb = []

  try {
    await table.iterate( ( value ) => {
      fromDb.push( value );
    } )
  } catch (e) {
    console.log( e )
  }

  return fromDb;
}