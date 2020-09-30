import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import { initDb } from "./db/utils/initDb";

import { Customers, Employees, Home, Projects, } from "./pages";
import { BackgroundImage } from "./components/wrappers/BackgroundImage";
import { useScreenProperties } from "./store/screenProperties";

function App() {

  const setScreenWidth = useScreenProperties( state => state.setWidth );
  const setScreenHeight = useScreenProperties( state => state.setHeight );
  const setIsSmallScreen = useScreenProperties( state => state.setIsSmallScreen );

  window.onresize = () => {
    setScreenWidth();
    setScreenHeight();
    setIsSmallScreen();
  }

  useEffect( () => {
    const init = async () => {
      await initDb();
    };
    init();
    setIsSmallScreen();
  }, [] );

  return (
      <>
        <BrowserRouter>
          <BackgroundImage>
            <NavBar/>
            <Switch>
              <Route exact path="/projects">
                <Projects/>
              </Route>
              <Route path="/employees">
                <Employees/>
              </Route>
              <Route exact path="/customers">
                <Customers/>
              </Route>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path={ "*" }>
                <NotFound/>
              </Route>
            </Switch>
          </BackgroundImage>
        </BrowserRouter>
      </>
  );
}

export default App;