function getMarginAsInt( marginString ) {
  const margin = parseInt( marginString.slice( 0, ( marginString.length - 2 ) ) );
  return Number.isNaN( margin ) ? null : margin;
}

export function getTotalWidth( element ) {
  console.log( 'e -> ', element );
  const width = element.current.clientWidth;
  const marginLeft = getMarginAsInt( element.current.style.marginLeft );
  const marginRight = getMarginAsInt( element.current.style.marginRight );
  console.log( 'width -> ', width );
  console.log( 'element -> ', element );
  console.log( 'left margin -> ', typeof marginLeft, marginLeft );
  console.log( 'right margin -> ', typeof marginRight, marginRight );
  return marginLeft + width + marginRight;
}