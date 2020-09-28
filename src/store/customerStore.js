import create from 'zustand'
import { getCustomers } from "../db/actions";

export const useCustomerStore = create( set => ( {
  customers: [],
  filteredCustomers: [],
  setFilteredCustomers: customers => {
    set( { filteredCustomers: [ ...customers ] } )
  },
  fetchCustomers: async () => {
    const response = await getCustomers();
    set( { customers: [ ...response ] } )
  },
} ) )