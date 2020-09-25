import Button from "react-bootstrap/Button";
import { PlusCircle } from "react-feather";
import PropTypes from "prop-types";
import React from "react";
import { ScaleOnHover } from "../effects/ScaleOnHover";
import { plusButton } from "../../style/buttons";

export const PlussButton = ( { onClick } ) => {
  return (
      <Button className={ 'p-0 ml-auto my-auto' } onClick={ onClick } style={ plusButton }>
        <ScaleOnHover scaleTo={ 1.1 } ms={ 200 }>
          <PlusCircle fontWeight={ 'light' } size={ 35 }/>
        </ScaleOnHover>
      </Button>
  );
}

PlussButton.propTypes = { onClick: PropTypes.func };