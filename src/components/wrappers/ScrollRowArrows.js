import React from "react";
import { Folder, Search } from "react-feather";
import { CardLink } from "../Cards/CardLink";
import PropTypes from 'prop-types';
import './removeScrollBar.css';
import { ArrowButton } from "../buttons/ArrowButton";

const containerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowX: 'scroll',
  scrollBehavior: 'smooth',
  minHeight: '15rem',
};

export const ScrollRowArrows = ( { onLeftClick, onRightClick, data, rowRef, cardRef } ) => {
  return (
      <div style={ { position: 'relative' } }>
        <ArrowButton left size={ 42 } onClick={ () => onLeftClick() }/>
        <div ref={ rowRef } style={ containerStyle }>
          { !data && <h3 className={ 'm-auto' }>Click the + to create a project!</h3> }
          { data && data.length === 0 && <h4 className={ 'm-auto' }>No match found..<Search/></h4> }
          { data &&
          data.map( p => (
              <CardLink
                  key={ p.id }
                  refProp={ cardRef }
                  to={ `/projects/${ p.id }` }
                  title={ p.name || p.firstName }
                  text={ p.description ? p.description.slice( 0, 20 ) + '...' : ' ' ||  p.position }
                  icon={ <Folder/> }
              />
          ) )
          }

        </div>
        <ArrowButton right size={ 42 } onClick={ () => onRightClick() }/>
      </div>
  );
};

ScrollRowArrows.propTypes = {
  onLeftClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  rowRef: PropTypes.object.isRequired,
  cardRef: PropTypes.object.isRequired
};