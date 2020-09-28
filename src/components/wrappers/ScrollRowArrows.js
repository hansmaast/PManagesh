import React, { useRef } from "react";
import { Search } from "react-feather";
import PropTypes from 'prop-types';
import '../../style/removeScrollBar.css';
import { ArrowButton } from "../buttons/ArrowButton";
import EmployeeCard from "../cards/EmployeeCard";
import { scrollElementWidth } from "../../utils/scrollElementWidth";


const containerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowX: 'scroll',
  scrollBehavior: 'smooth',
  minHeight: '15rem',
};

export const ScrollRowArrows = ( { data } ) => {

  const cardRef = useRef( null );
  const rowRef = useRef( null );

  return (
      <div style={ { position: 'relative' } }>
        <ArrowButton left size={ 42 } onClick={ () => scrollElementWidth( false, 3, cardRef, rowRef )  }/>
        <div ref={ rowRef } style={ containerStyle }>
          { !data && <h3 className={ 'm-auto' }>Click the + to create a project!</h3> }
          { data && data.length === 0 && <h4 className={ 'm-auto' }>No match found..<Search/></h4> }
          { data &&
            data.map( p => <EmployeeCard key={p.id} refProp={cardRef} employee={ p }/> )
          }
        </div>
        <ArrowButton right size={ 42 } onClick={ () => scrollElementWidth( true, 3, cardRef, rowRef )  }/>
      </div>
  );
};

ScrollRowArrows.propTypes = {
  data: PropTypes.array.isRequired,
};