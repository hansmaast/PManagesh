import { costumerTable, employeeTable, projectTable } from "../tables";
import { COSTUMER_PREFIX, EMPLOYEE_PREFIX, PROJECT_PREFIX } from "../../constants";

export function getPrefixFor( table ) {

  let PREFIX;

  switch (table) {
    case projectTable:
      PREFIX = PROJECT_PREFIX;
      break;
    case costumerTable:
      PREFIX = COSTUMER_PREFIX;
      break;
    case employeeTable:
      PREFIX = EMPLOYEE_PREFIX;
      break;
    default:
      PREFIX = null;
  }

  return PREFIX;

}