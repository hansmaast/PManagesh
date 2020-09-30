import { Form } from "react-bootstrap";
import * as PropTypes from "prop-types";
import React from "react";

export function StatusFilter( props ) {
  return <Form.Control {...props} style={ { maxWidth: 200, marginLeft: 40 } } as="select" defaultValue="Status...">
    <option value={ "all" }> Choose status</option>
    <option value={ "done" }>Done</option>
    <option value={ "in progress" }>In progress</option>
    <option value={ "not started" }>Not started</option>
    <option value={ "all" }>All</option>
  </Form.Control>;
}

StatusFilter.propTypes = { onChange: PropTypes.func };