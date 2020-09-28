import create from "zustand";
import { getEmployees } from "../db/actions";

export const useEmployeeStore = create( set => ( {
  employees: [],
  filteredEmployees: [],
  setFilteredEmployees: employees => {
    set( { filteredEmployees: [ ...employees ] } )
  },
  fetchEmployees: async () => {
    const response = await getEmployees();
    set( {
      employees: [ ...response ],
      filteredEmployees: [ ...response ]
    } )
  },
} ) )