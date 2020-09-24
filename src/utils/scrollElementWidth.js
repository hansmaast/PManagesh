import { getTotalWidth } from "./getTotalWidth";

export const scrollElementWidth = ( toRight = true, times, element, row ) => {
  const totalWidth = getTotalWidth( element );
  console.log( 'scrolling row -> ', row );
  console.log( 'total width -> ', totalWidth );

  toRight
      ? row.current.scrollLeft += totalWidth * times
      : row.current.scrollLeft -= totalWidth * times;
}