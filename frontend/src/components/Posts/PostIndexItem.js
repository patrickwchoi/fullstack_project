import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost} from '../../store/posts';
import { useHistory } from "react-router-dom";
import './Posts.css'


const PostIndexItem = ({post}) => {

  const history = useHistory();
  const redirectToEdit = (postId)=>{
    history.push(`/posts/${postId}/edit`)
  }

  const sessionUser = useSelector(state => state.session.user);
  const isAuthorLoggedIn = (sessionUser.id === post.authorId);

  const dispatch = useDispatch();
  return (
    <div className='PostIndexItem'>
      <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
      <p>Author Id: {post.authorId}</p>
      {/* <img src='author's profile pic'/> */}
      <p> {post.body} </p>
      {isAuthorLoggedIn ? ( //replace with a modal menu that gives options like delete, share, edit, etc
        <>
          <button onClick={()=>{redirectToEdit(post.id)}}>Edit</button>
          <button onClick={()=>dispatch(deletePost(post.id))}>Delete</button>
        </>
      ) : null}
    </div>
  )
}

export default PostIndexItem;