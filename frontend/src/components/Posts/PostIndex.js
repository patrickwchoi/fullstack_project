import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm  from './PostForm';
import PostIndexItem from './PostIndexItem';
import { getPosts, fetchPosts } from '../../store/posts'
import './Posts.css';


const PostIndex = (props) => {

  const dispatch = useDispatch();
  const posts = useSelector(getPosts) 

  useEffect(()=>{
    dispatch(fetchPosts())
  }, [])
  return (
    <div className='PostIndex'>
      <ul>
        {posts.map(post=> <PostIndexItem post={post} key={post.id}/>)} 
      </ul>
      <PostForm/>
    </div>
  )
};

export default PostIndex;