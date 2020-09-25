import { getTotalWidth } from "./getTotalWidth";

export const scrollElementWidth = ( toRight = true, times, element, row ) => {
  console.log( 'element ->',element)
  console.log( 'row ->', row)
  if ( element && row ) {
    const totalWidth = getTotalWidth( element );

    return toRight
        ? row.current.scrollLeft += totalWidth * times
        : row.current.scrollLeft -= totalWidth * times;

  }
}