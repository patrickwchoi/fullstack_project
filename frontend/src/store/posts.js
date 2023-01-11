import csrfFetch, {storeCSRFToken} from './csrf';

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const REMOVE_POST = 'posts/REMOVE_POST'

export const RECEIVE_USERS = 'USERS/RECEIVE_USERS'
export const RECEIVE_USER = 'USERS/RECEIVE_USER'
export const REMOVE_USER = 'USERS/REMOVE_USER'

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})
const receivePost = post => ({ 
  type: RECEIVE_POST,
  post
})
const removePost = postId => ({
  type: REMOVE_POST,
  postId
})

export const getPost = (postId) => (state) => { //grabs from state, not backend
  return state?.posts ? state.posts[postId] : null;
}
export const getPosts = (state) => {
  return state?.posts ? Object.values(state.posts) : [];
}

export const fetchPosts = () => async (dispatch) =>{
  const res = await csrfFetch('/api/posts');
  if (res.ok){
    const posts = await res.json();
    dispatch(receivePosts(posts));
  }
}
export const fetchPost = (postId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/posts/${[postId]}`);
  if (res.ok){
    const post = await res.json();
    dispatch(receivePost(post));
  }
}
export const createPost = (post) => async (dispatch) =>{
  const res = await csrfFetch(`/api/posts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    } , 
    body: JSON.stringify(post)
  });
  if (res.ok){
    const post = await res.json();
    dispatch(receivePost(post));
  }
}
export const updatePost = (post) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${post.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(post)
    }
  );
  if (res.ok){
    const newPost = await res.json(); //content comes from show view in backend
    dispatch(receivePost(newPost))
  }
}

export const deletePost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: 'DELETE'
    }
  );
  if(res.ok){
    dispatch(removePost(postId));
  }
}

const postsReducer = (state={}, action) =>{//returns new state after handling action
  switch(action.type){
    case RECEIVE_POSTS:
      return {...action.posts.posts}; 
    case RECEIVE_POST:
      return {...state, [action.post.id]: action.post};
    case REMOVE_POST:
      const newState = {...state};
      delete newState[action.postId]
      return newState;
    case RECEIVE_USER:
      // return {...state, ...action.user.posts};
      //rn, state only has posts, not session or users bc it is only postsReducer
      //therefore, I dont have to return old state. I only want to grab user posts, so this resets posts to user posts
      return {...action.user.posts};

      
    default: 
      return state;
  }
} 
export default postsReducer;