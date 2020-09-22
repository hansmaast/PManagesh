import { Alert } from "react-bootstrap";
import React from "react";

export const AlertWithLink = ( { show = false, text, variant, linkTo, linkText } ) => {

  if ( !show ) {
    return null;
  }

  return (
      <Alert variant={ variant }>
        { text }
        <Alert.Link href={ linkTo }>
          { ' ' } { linkText }
        </Alert.Link>!
      </Alert>
  );
}