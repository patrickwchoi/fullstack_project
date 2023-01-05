import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory  } from "react-router-dom";
import PostIndexItem from './PostIndexItem';
import { getPosts, fetchPosts } from '../../store/posts'
import './Posts.css';


const PostIndex = (props) => {

  const dispatch = useDispatch();
  const posts = useSelector(getPosts) 

  useEffect(()=>{
    dispatch(fetchPosts())
  }, [])

  const history = useHistory();
  const redirectToCreate = ()=>{
    history.push('/posts/new')
  }

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