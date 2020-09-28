import React from "react";

export const useSearchArray = (arrayToFilter, fromKey, searchTerm, assignTo) => {
  React.useEffect( () => {
    const results = arrayToFilter.filter( p =>
        p[fromKey].toLowerCase().includes( searchTerm.toLowerCase() )
    );
    assignTo( results );
  }, [ searchTerm ] );
}