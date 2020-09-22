import React, { useEffect, useState } from "react";
import { getProjects } from "../../db/actions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";
import ProjectCard from "../../components/Cards/ProjectCard";
import LayoutStyle from "../../components/LayoutStyle";

export default () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsFromDb = await getProjects();
      setProjects([...projects, ...projectsFromDb]);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h4>Projects:</h4>
      <LayoutStyle>
        {projects.map((project) => {
          return <ProjectCard project={project} />;
        })}
      </LayoutStyle>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add new project
      </Button>

      <CreateProjectModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};
