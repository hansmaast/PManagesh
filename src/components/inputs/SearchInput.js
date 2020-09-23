import FormControl from "react-bootstrap/FormControl";
import { Search } from "react-feather";
import Form from "react-bootstrap/Form";
import React from "react";
import PropTypes from "prop-types";

export const SearchInput = ( { value, onChange } ) => {
  return (
      <Form className={ 'ml-3' } inline>
        <FormControl value={ value } onChange={ e => onChange( e ) } type="text" placeholder="Search"
                     className="mr-sm-2"/>
        <Search/>
      </Form>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};



