import { getTotalWidth } from "./getTotalWidth";

export const scrollElementWidth = ( toRight = true, times, element, row ) => {
  if ( element && row ) {
    const totalWidth = getTotalWidth( element );

    return toRight
        ? row.current.scrollLeft += totalWidth * times
        : row.current.scrollLeft -= totalWidth * times;

  }
}