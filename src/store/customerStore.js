import create from 'zustand'
import { getCustomers, getProjectsFromCustomer } from "../db/actions";

export const useCustomerStore = create( set => ( {
  customers: [],
  filteredCustomers: [],
  customerProjects: [],
  setFilteredCustomers: customers => {
    set( { filteredCustomers: [ ...customers ] } )
  },
  fetchCustomers: async () => {
    const response = await getCustomers();
    set( { customers: [ ...response ] } )
  },
  fetchCustomerProjects: async customer => {
    const projects = await getProjectsFromCustomer(customer);
    set( { customerProjects: projects });
  }
} ) )