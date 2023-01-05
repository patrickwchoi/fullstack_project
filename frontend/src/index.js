import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import ModalProvider from './context/Modal';
import * as postActions from './store/posts';

const store = configureStore();
// const dispatch = useDispatch()


if (process.env.NODE_ENV !== 'production') {
  // window.dispatch = dispatch;
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.postActions = postActions;
}


function Root() {
  return (
    <ModalProvider>

      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>

    </ModalProvider>
  );
}


const renderApplication = () => {
  
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser") === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
