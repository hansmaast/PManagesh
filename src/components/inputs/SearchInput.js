import FormControl from "react-bootstrap/FormControl";
import { Search } from "react-feather";
import Form from "react-bootstrap/Form";
import React from "react";
import PropTypes from "prop-types";

export const SearchInput = ( { value, onChange, ...props } ) => {
  return (
      <div style={{width: '100%', maxWidth: 170, display: 'flex', alignItems: 'center'}} {...props}>
        <FormControl value={ value } onChange={ e => onChange( e ) } type="text" placeholder="Search"
                     className="mr-2"/>
        <Search size={'2rem'}/>
      </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};



