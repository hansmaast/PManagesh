import { getCostumerById, getEmployeesFromProject, getProjectById } from "../actions";

export async function parseProject( id ) {
  try {
    let project = await getProjectById( id );
    let costumer = await getCostumerById( project.costumerId );
    let employees = await getEmployeesFromProject( project );
    const { id: _id, name, status, description } = project;
    // returns new data structure
    return {
      details: { _id, name, status, description },
      costumer: { ...costumer },
      employees: [ ...employees ]
    }
  } catch (e) {
    console.log( e );
  }
}