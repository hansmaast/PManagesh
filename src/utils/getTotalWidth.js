function getMarginAsInt( marginString ) {
  const margin = parseInt( marginString.slice( 0, ( marginString.length - 2 ) ) );
  return Number.isNaN( margin ) ? null : margin;
}

export function getTotalWidth( element ) {
  try {
    const width = element.current.clientWidth;
    const marginLeft = getMarginAsInt( element.current.style.marginLeft );
    const marginRight = getMarginAsInt( element.current.style.marginRight );
    return marginLeft + width + marginRight;
  } catch (e) {
    console.error( e )
  }
}