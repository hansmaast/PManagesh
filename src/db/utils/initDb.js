import { costumerTable, employeeTable, projectTable } from "../tables";
import Projects from "../fakeData/ProjectData.json";
import Costumers from "../fakeData/CostumerData.json";
import Employees from "../fakeData/EmployeeData.json";
import { generateIdFor } from "./generateIdFor";
import * as blobUtil from "blob-util";
import { initAvatars } from "../fakeData/employeePhotos";


async function initDataToTable( dataSet, table ) {
  for ( const [ index, data ] of dataSet.entries() ) {
    if ( table === employeeTable ) {

      data.imageBlob = await blobUtil.imgSrcToBlob( initAvatars[index], 'image/svg' );

    }
    const { idWithPrefix } = await generateIdFor( table );
    await table.setItem( idWithPrefix, data );
  }
}

export const initDb = async () => {
  if ( await costumerTable.length() < 10 ) {
    try {

      await initDataToTable( Projects, projectTable );
      await initDataToTable( Costumers, costumerTable );
      await initDataToTable( Employees, employeeTable );

    } catch (e) {
      console.log( e );
    } finally {
      console.log( `
    Successfully initialized database with: 
    - ${ await projectTable.length() } projects 
    - ${ await costumerTable.length() } costumers 
    - ${ await employeeTable.length() } employees
    ` );
    }
  } else {
    console.log( 'db already initialized!' );
  }
}