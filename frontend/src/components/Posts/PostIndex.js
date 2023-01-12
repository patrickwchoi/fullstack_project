import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory  } from "react-router-dom";
import PostIndexItem from './PostIndexItem';
import { getPosts, fetchPosts } from '../../store/posts'
import './Posts.css';
import { fetchUsers, getUser, getUsers } from '../../store/users';
import PostCreate from './PostCreate'

const PostIndex = (props) => {
  const dispatch = useDispatch();
  let posts = useSelector(getPosts);
  const sessionUser = useSelector(state => state.session.user);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  //posts = shuffle(posts); //randomize posts order, doesnt change state
  
  const history = useHistory();
  const redirectToCreate = ()=>{
    history.push('/posts/new')
  }
  
  useEffect(()=>{
    dispatch(fetchPosts()); //later, I want to only fetch first 15~ posts
    // dispatch(fetchUsers()); 
  }, [window.location.pathname])
  //returns another "loggedin index" if you are logged in

  return (
    <div className='PostIndex'>
      <ul>
        {/* <button onClick={redirectToCreate}>new post button</button> */}
        <PostCreate/>
        {posts.map(post=> <PostIndexItem post={post} key={post.id} /*author={post.author}*//>)} 
      </ul>
    </div>
  )
};

export default PostIndex;