import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory  } from "react-router-dom";
import PostIndexItem from './PostIndexItem';
import { getPosts, fetchPosts } from '../../store/posts'
import './Posts.css';
import { fetchUsers, getUser } from '../../store/users';

const PostIndex = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const sessionUser = useSelector(state => state.session.user);
  
  
  
  const history = useHistory();
  const redirectToCreate = ()=>{
    history.push('/posts/new')
  }
  
  useEffect(()=>{
    dispatch(fetchPosts()); //later, I want to only fetch first 15~ posts
    // dispatch(fetchUsers()); //later, I want to only fetch the users that are authors of the posts
  }, [])
  //returns another "loggedin index" if you are logged in

  return (
    <div className='PostIndex'>
      <ul>
        <button onClick={redirectToCreate}>new post button</button>
        {posts.map(post=> <PostIndexItem post={post} key={post.id}/>)} 
      </ul>
    </div>
  )
};

export default PostIndex;