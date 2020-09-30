import React from "react";

export const useSearchArray = (arrayToFilter, fromKey, searchTerm, assign) => {
  React.useEffect( () => {
    const results = arrayToFilter.filter( p =>
        p[fromKey].toLowerCase().includes( searchTerm.toLowerCase() )
    );
    assign( results );
  }, [ searchTerm ] );
}