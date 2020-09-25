import { costumerTable, employeeTable, projectTable } from "./tables";
import { COSTUMER_PREFIX, EMPLOYEE_PREFIX, PROJECT_PREFIX } from "../constants";
import { getAllFrom } from "./utils/getAllFrom";
import { getByIdsFromTable } from "./utils/getByIdsFromTable";
import { parseProject } from "./utils/parseProject";
import { addDataToTable } from "./utils/addDataToTable";

export const getProjects = async () => {
  return await getAllFrom( projectTable );
}

export const getCostumers = async () => {
  return await getAllFrom( costumerTable );
}

export const getEmployees = async () => {
  return await getAllFrom( employeeTable );
}

export const getEmployeesFromProject = async ( { employeeIds } ) => {
  return await getByIdsFromTable( employeeIds, employeeTable );
}

export const getProjectsFromEmployee = async ( { projectIds } ) => {
  return await getByIdsFromTable( projectIds, projectTable );
}

export const getProjectDetails = async id => {
  return await parseProject( id );
}

export const getProjectById = async id => {
  return await projectTable.getItem( PROJECT_PREFIX + id );
}

export const getCostumerById = async id => {
  return await costumerTable.getItem( COSTUMER_PREFIX + id );
}

export const getEmployeeById = async id => {
  return await employeeTable.getItem( EMPLOYEE_PREFIX + id );
}

export const addProjectToDb = async project => {
  return await addDataToTable( project, projectTable );
}

export const addCostumerToDb = async costumer => {
  return await addDataToTable( costumer, costumerTable );
}

export const addEmployeeToDb = async employee => {
  return await addDataToTable( employee, employeeTable );
}