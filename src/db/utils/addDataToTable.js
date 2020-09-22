import { generateIdFor } from "./generateIdFor";

export async function addDataToTable( data, table ) {
  const { idWithPrefix, idInt } = await generateIdFor( table );
  try {
    await table.setItem(
        idWithPrefix,
        {
          ...data,
          id: idInt,
        } );
    return { id: idInt };
  } catch (e) {
    console.log( e )
    return false;
  }
}