import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Navigation from "./components/Navigation";
import PostIndex from "./components/Posts/PostIndex";
import PostForm from "./components/Posts/PostCreate";
import PostEdit from "./components/Posts/PostEdit";
import PostShow from "./components/Posts/PostShow";
import UserShow from "./components/Users/UserShow";
import UserEdit from "./components/Users/UserEdit";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <div className='root' id='root'>
      {/* needed to add this to remove a 404 favicon get error. idrk */}
      <link rel="shortcut icon" href=""></link> 

      <Navigation />      
        <Switch> 
        <Route exact path="/"><Redirect to="/posts" /></Route>
          <Route exact path="/posts" component={PostIndex} />
          <Route exact path="/posts/new" component={PostForm} />
          <Route path="/posts/:postId/edit" component={PostEdit} />
          {/* <Route exact path="/posts/:postId" component={PostShow} /> */}
          <Route path="/users/:userId/edit" component={UserEdit} />
          <Route path="/users/:userId" component={UserShow} />
          <Route component={ErrorPage} />
        </Switch> 
    </div>
  );
}

export default App;
