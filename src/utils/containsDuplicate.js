export const containsDuplicate = ( array, key, contains ) => {
  return array.some( e => e[key] === contains );
}