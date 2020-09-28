import create from "zustand";
import { getProjectDetails, getProjects } from "../db/actions";

export const useProjectStore = create( set => ( {
  projects: [],
  filteredProjects: [],
  projectDetails: {},
  setFilteredProjects: projects => {
    set( { filteredProjects: [ ...projects ] } )
  },
  fetchProjects: async () => {
    const response = await getProjects();
    set( {
      projects: [ ...response ],
      filteredProjects: [ ...response ]
    } )
  },
  fetchDetails: async ( id ) => {
    let data = await getProjectDetails( id );
    set( { projectDetails: data } );
  }
} ) )