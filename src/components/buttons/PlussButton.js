import Button from "react-bootstrap/Button";
import { PlusCircle } from "react-feather";
import PropTypes from "prop-types";
import React from "react";

export const PlussButton = ( { onClick } ) => {
  return (
      <Button className={ 'p-0 ml-auto my-auto' } onClick={ onClick } style={ {
        borderRadius: 100,
        height: 'fit-content',
        background: 'white',
        color: 'black',
        border: 'none',
      } }>
        <PlusCircle fontWeight={'light'} size={ 35 }/>
      </Button>
  );
}

PlussButton.propTypes = { onClick: PropTypes.func };