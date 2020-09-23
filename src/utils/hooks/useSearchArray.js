import React from "react";

export const useSearchArray = (fromKey, searchTerm, arrayToFilter, assignTo) => {
  React.useEffect( () => {
    const results = arrayToFilter.filter( p =>
        p[fromKey].toLowerCase().includes( searchTerm.toLowerCase() )
    );
    assignTo( results );
    console.log( searchTerm );
  }, [ searchTerm ] );
}