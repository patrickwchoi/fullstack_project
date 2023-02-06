import csrfFetch, {storeCSRFToken} from './csrf';

export const RECEIVE_LIKES = 'likes/RECEIVE_LIKES'
export const RECEIVE_LIKE = 'likes/RECEIVE_LIKE'
export const REMOVE_LIKE = 'likes/REMOVE_LIKE'

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const REMOVE_POST = 'posts/REMOVE_POST'

export const RECEIVE_USERS = 'USERS/RECEIVE_USERS'
export const RECEIVE_USER = 'USERS/RECEIVE_USER'
export const REMOVE_USER = 'USERS/REMOVE_USER'

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
export const getLikesGivenPost = (postId) => (state) => { 
  // return state.posts[postId] ? Object.values(state.post.likes) : [];
  if (state.posts[postId])
    return Object.values(state.likes).filter(like => like.postId === postId);
  return [];
}
export const getLikeGivenPostAndUser = (post, user) => (state) => {
  if (post === null || user === null) return null;
  let postId= post.id;
  let userId= user.id;
  if (state.posts[postId]){
    return Object.values(state.likes).find(like => like.postId === postId && like.userId === userId);
  }
  return null;
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
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    } , 
    body: JSON.stringify(like)
  });
  if (res.ok){
    const like = await res.json();
    // console.log(like)
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
    case REMOVE_LIKE:
      const newState = {...state};
      delete newState[action.likeId]
      return newState;
    // case RECEIVE_POST:
    //   return {...action.post.likes};
    case RECEIVE_POSTS: //for post index
      return {...state, ...action.posts.likes};
    case RECEIVE_USER: //for user show
      return {...action.payload.likes}
    default: 
      return state;
  }
} 
export default likesReducer;