import React from "react";
import Projects from '../fakeData/Projects.json';

export default () => {
  return (
      <div>
        <h4>Projects:</h4>
        <ul>
          {
            Projects.map( project => {
              return (
                  <li key={ project.id }>{ project.name }</li>
              );
            } )
          }
        </ul>
      </div>
  );
}