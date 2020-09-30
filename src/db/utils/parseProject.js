import { getCostumerById, getEmployeesFromProject, getProjectById } from "../actions";

export async function parseProject( id ) {
  try {
    let project = await getProjectById( id );
    let customer = await getCostumerById( project.costumerId );
    let employees = await getEmployeesFromProject( project );
    const { id: _id, name, status, description } = project;
    // returns new data structure
    return {
      id: _id,
      name: name,
      status: status,
      description: description,
      customer: { ...customer },
      employees: [ ...employees ]
    }
  } catch (e) {
    console.log( e );
  }
}