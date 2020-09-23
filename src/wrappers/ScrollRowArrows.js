import React from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import Button from "react-bootstrap/Button";


export const ScrollRowArrows = ( { onLeftClick, onRightClick, children, refProp } ) => {


  return (
      <div className={ 'my-3' } style={ { position: 'relative' } }>
        <Button onClick={ () => onLeftClick() } style={ {
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translate(-150%, -50%)',
          borderRadius: 100,
          padding: 0
        } }>
          <ArrowLeftCircle size={ 42 }/>
        </Button>
        <div ref={ refProp } style={ {
          overflowX: 'scroll',
          display: 'flex',
          justifyContent: 'flex-start',
          position: 'relative',
          wrap: 'wrap',
          scrollBehavior: 'smooth',
        } }>
          { children }
        </div>
        <Button onClick={ () => onRightClick() } style={ {
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translate(150%, -50%)',
          padding: 0,
          borderRadius: 100
        } }>
          <ArrowRightCircle size={ 42 }/>
        </Button>
      </div>
  );
};