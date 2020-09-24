import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import React from "react";

const baseButtonStyle = {
  position: 'absolute',
  top: '50%',
  borderRadius: 100,
  padding: 0,
  background: 'white',
  color: 'black',
  border: 'none',

};
const leftButtonStyle = {
  ...baseButtonStyle,
  left: 0,
  transform: 'translate(-150%, -50%)',
};
const rightButtonStyle = {
  ...baseButtonStyle,
  right: 0,
  transform: 'translate(150%, -50%)',
};

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
        { icon }
      </Button>
  );
}

ArrowButton.propTypes = {
  onClick: PropTypes.func,
  left: PropTypes.bool,
  right: PropTypes.bool
};