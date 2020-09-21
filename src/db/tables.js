import localforage from "localforage";
import { DB_NAME } from "../constants";

export const projectTable = localforage.createInstance( {
  name: DB_NAME,
  storeName: 'projectsTable',
} );

export const costumerTable = localforage.createInstance( {
  name: DB_NAME,
  storeName: 'costumerTable',
} );

export const employeeTable = localforage.createInstance( {
  name: DB_NAME,
  storeName: 'employeeTable',
} );