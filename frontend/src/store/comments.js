import csrfFetch, {storeCSRFToken} from './csrf';

export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT'
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

export const RECEIVE_LIKES = 'likes/RECEIVE_LIKES'
export const RECEIVE_LIKE = 'likes/RECEIVE_LIKE'
export const REMOVE_LIKE = 'likes/REMOVE_LIKE'

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const REMOVE_POST = 'posts/REMOVE_POST'

export const RECEIVE_USERS = 'USERS/RECEIVE_USERS'
export const RECEIVE_USER = 'USERS/RECEIVE_USER'
export const REMOVE_USER = 'USERS/REMOVE_USER'

const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})
const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})
const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId
})

export const getComments = (state) => { 
  return state?.comments ? Object.values(state.comments) : [];
}
export const getCommentsGivenPost = (postId) => (state) => { 
  if (state.posts[postId])
    return Object.values(state.comments).filter(comment => comment.postId === postId);
  return [];
}

//updates state from backend
// export const fetchUsers = () => async (dispatch) =>{ 
//   const res = await csrfFetch('/api/users');
//   if (res.ok){
//     const users = await res.json();
//     dispatch(receiveUsers(users));
//   }
// }

export const fetchComments = (commentId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/comments/${commentId}`);
  if (res.ok){
    const {comment} = await res.json(); 
    dispatch(receiveComment(comment));
  }
}

//edits state and backend from frontend
export const createComment = (comment) => async (dispatch) =>{
  const res = await csrfFetch(`/api/comments`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    } , 
    body: JSON.stringify(comment)
  });
  if (res.ok){
    const comment = await res.json();
    // console.log(comment)
    dispatch(receiveComment(comment));
  }
}
export const updateComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
    }
  );
  if (res.ok){
    const newComment = await res.json(); //content comes from show view in backend
    dispatch(receiveComment(newComment))
  }
}
export const deleteComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
    }
  );
  if(res.ok){
    dispatch(removeComment(commentId));
  }
}

const commentsReducer = (state={}, action) =>{
  switch(action.type){
    case RECEIVE_COMMENTS:
      return {...action.comments}; 
    case RECEIVE_COMMENT:
      return {...state, [action.comment.id]: action.comment}; 
    case REMOVE_COMMENT:
      const newState = {...state};
      delete newState[action.commentId]
      return newState;
    case RECEIVE_POSTS: //for post index
      return {...state, ...action.posts.comments};
    case RECEIVE_USER: //for user show
      return {...action.payload.comments}
    default: 
      return state;
  }
} 
export default commentsReducer;