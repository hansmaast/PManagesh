import React, { useEffect } from 'react';
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import { initDb } from "./db/utils/initDb";
import { Costumers, EmployeeDetails, Employees, Home, ProjectDetails, Projects } from "./pages";

function App() {

  useEffect( () => {
    const init = async () => {
      await initDb();
    }
    init();
  }, [] )
  return (
      <>
        <BrowserRouter>
          <NavBar/>
          <Switch>
            <Route exact path="/projects">
              <Projects/>
            </Route>
            <Route exact path="/projects/:id">
              <ProjectDetails/>
            </Route>
            <Route exact path="/employees">
              <Employees/>
            </Route>
            <Route exact path="/employees/:id">
              <EmployeeDetails/>
            </Route>
            <Route exact path="/costumers">
              <Costumers/>
            </Route>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path={ "*" }>
              <NotFound/>
            </Route>
          </Switch>
        </BrowserRouter>
      </>
  );
}

export default App;