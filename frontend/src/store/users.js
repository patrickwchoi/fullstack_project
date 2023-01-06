import csrfFetch, {storeCSRFToken} from './csrf';


export const RECEIVE_USERS = 'USERS/RECEIVE_USERS'
export const RECEIVE_USER = 'USERS/RECEIVE_USER'
export const REMOVE_USER = 'USERS/REMOVE_USER'

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})
const receiveUser = user => ({ 
  type: RECEIVE_USER,
  user
})
const removeUser = userId => ({
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
    const {user} = await res.json(); //must deconstruct user bc backend now sends nested user
    dispatch(receiveUser(user));
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
      return {...state, [action.user.id]: action.user};
    case REMOVE_USER:
      const newState = {...state};
      delete newState[action.userId]
      return newState;
    default: 
      return state;
  }
} 
export default usersReducer;