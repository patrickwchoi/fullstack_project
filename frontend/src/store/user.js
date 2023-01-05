import csrfFetch, {storeCSRFToken} from './csrf';


export const RECEIVE_USERS = 'USERs/RECEIVE_USERS'
export const RECEIVE_USER = 'USERs/RECEIVE_USER'
export const REMOVE_USER = 'USERs/REMOVE_USER'

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})
const receiveUser = user => ({ 
  type: RECEIVE_user,
  user
})
const removeUser = userId => ({
  type: REMOVE_USER,
  userId
})

export const getUser = (userId) => (state) => {
  return state?.users ? state.users[userId] : null;
}
export const getUsers = (state) => {
  return state?.users ? Object.values(state.users) : [];
}

export const fetchUsers = () => async (dispatch) =>{
  const res = await csrfFetch('/api/users');
  if (res.ok){
    const users = await res.json();
    dispatch(receiveUsers(users));
  }
}
export const fetchuser = (userId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/users/${[userId]}`);
  if (res.ok){
    const user = await res.json();
    dispatch(receiveuser(user));
  }
}
export const createuser = (user) => async (dispatch) =>{
  const res = await csrfFetch(`/api/users`, {
    method: 'user',
    headers: { 
      'Content-Type': 'application/json'
    } , 
    body: JSON.stringify(user)
  });
  if (res.ok){
    const user = await res.json();
    dispatch(receiveuser(user));
  }
}
export const updateuser = (user) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
    }
  );
  if (res.ok){
    const newuser = await res.json();
    dispatch(receiveuser(newuser))
  }
}

export const deleteuser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`, {
    method: 'DELETE'
    }
  );
  if(res.ok){
    dispatch(removeuser(userId));
  }
}

const usersReducer = (state={}, action) =>{//returns new state after handling action
  switch(action.type){
    case RECEIVE_userS:
      return {...action.users}; 
    case RECEIVE_user:
      return {...state, [action.user.id]: action.user};
    case REMOVE_user:
      const newState = {...state};
      delete newState[action.userId]
      return newState;
    default: 
      return state;
  }
} 
export default usersReducer;