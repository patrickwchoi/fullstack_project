import csrfFetch, {storeCSRFToken} from './csrf';

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const REMOVE_POST = 'posts/REMOVE_POST'

export const RECEIVE_USERS = 'USERS/RECEIVE_USERS'
export const RECEIVE_USER = 'USERS/RECEIVE_USER'
export const REMOVE_USER = 'USERS/REMOVE_USER'

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})
export const receiveUser = payload => ({ //grabbing payload instead of user bc payload has both {posts, user}, and we want to access both
  type: RECEIVE_USER,
  payload
})
export const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})

//grabs user from state
export const getUser = (userId) => (state) => { 
  // return state.users
  return state?.users ? state.users[userId] : null;
}
export const getUsers = (state) => { //not very useful bc we dont wanna get all the users prob
  return state?.users ? Object.values(state.users) : [];
}

//updates state from backend
export const fetchUsers = () => async (dispatch) =>{ 
  const res = await csrfFetch('/api/users');
  if (res.ok){
    const users = await res.json();
    dispatch(receiveUsers(users));
  }
}
export const fetchUser = (userId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/users/${userId}`);
  if (res.ok){
    const payload = await res.json();  //instead of user, we are grabbing the payload bc we changed our action
                                      // now, our payload has {posts, user} so we can grab both
    dispatch(receiveUser(payload));
  }
}

//edits state and backend from frontend
export const createUser = (user) => async (dispatch) =>{
  const res = await csrfFetch(`/api/users`, {
    method: 'user',
    headers: { 
      'Content-Type': 'application/json'
    } , 
    body: JSON.stringify(user)
  });
  if (res.ok){
    const user = await res.json();
    dispatch(receiveUser(user));
  }
}
export const updateUser = (user) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
    }
  );
  if (res.ok){
    const newUser = await res.json();
    dispatch(receiveUser(newUser))
  }
}

export const deleteuser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`, {
    method: 'DELETE'
    }
  );
  if(res.ok){
    dispatch(removeUser(userId));
  }
}

const usersReducer = (state={}, action) =>{
  switch(action.type){
    case RECEIVE_USERS:
      return {...action.users}; 
    case RECEIVE_USER:
      return {...state, [action.payload.user.id]: action.payload.user}; 
      //here, action.user is an object that is being returned in our views jbuilder in rails
      //After I edited my show page to nest the has_many posts, it used to show up parallel to user and thus wasnt being collected in state, bc state only grabs action.user
      //To fix that, I nested the post data inside the user object in jbuilder.
    case REMOVE_USER:
      const newState = {...state};
      delete newState[action.userId]
      return newState;
    case RECEIVE_POSTS:
      return {...action.posts.users};
    default: 
      return state;
  }
} 
export default usersReducer;