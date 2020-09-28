import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import { initDb } from "./db/utils/initDb";

import { Customers, EmployeeDetails, Employees, Home, ProjectDetails, Projects, } from "./pages";
import Team from "../src/pages/Team";
import { BackgroundImage } from "./components/wrappers/BackgroundImage";

function App() {
  useEffect(() => {
    const init = async () => {
      await initDb();
    };
    init();
  }, [] );

  return (
    <>
      <BrowserRouter>
        <BackgroundImage>
        <NavBar/>
        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/employees">
            <Employees />
          </Route>
          <Route  path="/customers">
            <Customers />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={"*"}>
            <NotFound />
          </Route>
        </Switch>
      </BackgroundImage>
      </BrowserRouter>
    </>
  );
}

export default App;