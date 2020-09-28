import { useEffect } from "react";

export const useStatusFilter= (array, status, assignToArray) => {
  useEffect( () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    status = status.toLowerCase();
    if ( status === 'all' ) {
      return assignToArray( [ ...array ] );
    }
    const filtered = array.filter( e => e.status.toLowerCase() === status );
    assignToArray( [ ...filtered ] );
  }, [ array, status ] );
}