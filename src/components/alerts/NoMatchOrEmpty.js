import React from 'react';
import { Search } from "react-feather";

const NoMatchOrEmpty = () => {
  return <div className={ "m-auto" } style={ { textAlign: "center" } }>
    <h4 className={ "mx-auto" }>No match found..<Search/></h4>
    <h3 className={ "mx-auto" }>Click the + to add a new!</h3>
  </div>;
};

export default NoMatchOrEmpty;