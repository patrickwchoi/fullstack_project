import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../store/posts';
import './Posts.css'
const PostIndexItem = ({post}) => {

  const dispatch = useDispatch();
  return (
    <div className='PostIndexItem'>
      <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
      <p>Author Id: {post.authorId}</p>
      <p> {post.body} </p>
      {/* <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>   */}
    <button onClick={()=>dispatch(deletePost(post.id))}>Delete</button>
    </div>
  )
}

export default PostIndexItem;