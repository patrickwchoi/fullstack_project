import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
          <Switch> 
            <Route path="/login"> 
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch> 
    </>
  );
}

export default App;
