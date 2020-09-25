import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import React from "react";
import { leftButtonStyle, rightButtonStyle } from "../../style/buttons";
import { ScaleOnHover } from "../effects/ScaleOnHover";

export function ArrowButton( props ) {

  let buttonStyle = rightButtonStyle;
  let icon;
  if ( props.left ) {
    buttonStyle = leftButtonStyle;
    icon = <ArrowLeftCircle size={ props.size }/>
  }
  if ( props.right ) {
    buttonStyle = rightButtonStyle;
    icon = <ArrowRightCircle size={ props.size }/>
  }

  return (
      <Button onClick={ props.onClick } style={ buttonStyle }>
        <ScaleOnHover scaleTo={ 1.1 }>
          { icon }
        </ScaleOnHover>
      </Button>
  );
}

ArrowButton.propTypes = {
  onClick: PropTypes.func,
  left: PropTypes.bool,
  right: PropTypes.bool
};