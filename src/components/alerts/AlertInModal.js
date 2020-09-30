import Alert from "react-bootstrap/Alert";
import React from "react";
import * as PropTypes from "prop-types";

export const AlertInModal = props => {
  return <Alert
      className={ "mr-auto py-1 px-2" }
      show={ props.alertData.show }
      variant={ "success" }>
    { props.alertData.successText }
  </Alert>;
}

AlertInModal.propTypes = {
  alertData: PropTypes.shape( {
    successText: PropTypes.string,
    show: PropTypes.bool,
    id: PropTypes.any
  } )
};