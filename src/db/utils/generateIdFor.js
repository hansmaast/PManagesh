import { getPrefixFor } from "./getPrefixFor";

export const generateIdFor = async table => {
  const PREFIX = getPrefixFor( table );
  const idInt = ( await table.length() ) + 1;
  const idWithPrefix = PREFIX + idInt;
  return { idWithPrefix: idWithPrefix, prefix: PREFIX, idInt: idInt };
}