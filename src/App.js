import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import EmployeePage from "./pages/EmployeesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/projects">
            <Projects />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path={"/employeespage"}>
            <EmployeePage />
          </Route>
          <Route path={"*"}>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
