import React, { useEffect, useState } from "react";
import { getProjects } from "../db/actions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CreateProjectModal } from "../components/modals/CreateProjectModal";

export default () => {

  const [ projects, setProjects ] = useState( [] );
  const [showModal, setShowModal] = React.useState(false);

  useEffect( () => {
    const fetchProjects = async () => {
      const projectsFromDb = await getProjects();
      setProjects( [ ...projects, ...projectsFromDb ] );
    }
    fetchProjects();
  }, [] )

  return (
      <div>
        <h4>Projects:</h4>
        <ul>
          {
            projects.map( project => {
              return (
                  <Link to={ `projects/${ project.id }` } key={ project.id }>
                    <li>{ project.name }</li>
                  </Link>
              )
            } )

          }
        </ul>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add new project
        </Button>

        <CreateProjectModal
            show={showModal}
            onHide={() => setShowModal(false)}
        />
      </div>
  );
}