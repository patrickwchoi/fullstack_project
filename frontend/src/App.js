import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import LoginSignupModal from "./components/LoginSignupModal";
import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Navigation from "./components/Navigation";
import PostIndex from "./components/Posts/PostIndex";

function App() {
  return (
    <div className='root'>
      {/* needed to add this to remove a 404 favicon get error. idrk */}
      <link rel="shortcut icon" href=""></link> 

      <Navigation />
      <LoginSignupModal />
      
        <Switch> 
          <Route exact path="/posts" component={PostIndex} />
        </Switch> 
    </div>
  );
}

export default App;
