import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import posts from './posts';
import users from './users';
import likes from './likes';
import comments from './comments';
// 
let enhancer;
export const rootReducer = combineReducers({
    //This is where we initialze our state with objects
    session,
    posts, 
    users,
    likes,
    comments
})

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadState = {}) => {
    return createStore(rootReducer, preloadState, enhancer)
}

export default configureStore