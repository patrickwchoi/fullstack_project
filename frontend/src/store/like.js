import csrfFetch, {storeCSRFToken} from './csrf';

export const RECEIVE_LIKES = 'likes/RECEIVE_LIKES'
export const RECEIVE_LIKE = 'likes/RECEIVE_LIKE'
export const REMOVE_LIKE = 'likes/REMOVE_LIKE'


const receiveLikes = likes => ({
  type: RECEIVE_LIKES,
  likes
})
const receiveLike = like => ({ 
  type: RECEIVE_LIKE,
  like
})
const removeLike = likeId => ({
  type: REMOVE_LIKE,
  likeId
})

export const getLike = (likeId) => (state) => { 
  return state?.likes ? state.likes[likeId] : null;
}
export const getLikes = (state) => { //not very useful bc we dont wanna get all the users prob
  return state?.likes ? Object.values(state.likes) : [];
}

//updates state from backend
// export const fetchUsers = () => async (dispatch) =>{ 
//   const res = await csrfFetch('/api/users');
//   if (res.ok){
//     const users = await res.json();
//     dispatch(receiveUsers(users));
//   }
// }
export const fetchLike = (likeId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/likes/${likeId}`);
  if (res.ok){
    const {like} = await res.json(); 
    dispatch(receiveLike(like));
  }
}

//edits state and backend from frontend
export const createLike = (like) => async (dispatch) =>{
  const res = await csrfFetch(`/api/likes`, {
    method: 'like',
    headers: { 
      'Content-Type': 'application/json'
    } , 
    body: JSON.stringify(like)
  });
  if (res.ok){
    const like = await res.json();
    dispatch(receiveLike(like));
  }
}

export const deleteLike = (likeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/likes/${likeId}`, {
    method: 'DELETE'
    }
  );
  if(res.ok){
    dispatch(removeLike(likeId));
  }
}

const likesReducer = (state={}, action) =>{
  switch(action.type){
    case RECEIVE_LIKES:
      return {...action.likes}; 
    case RECEIVE_LIKE:
      return {...state, [action.like.id]: action.like}; 
      //here, action.like is an object that is being returned in our views jbuilder in rails
      //After I edited my show page to nest the has_many posts, it used to show up parallel to like and thus wasnt being collected in state, bc state only grabs action.like
      //To fix that, I nested the post data inside the like object in jbuilder.
    case REMOVE_LIKE:
      const newState = {...state};
      delete newState[action.likeId]
      return newState;
    default: 
      return state;
  }
} 
export default likesReducer;