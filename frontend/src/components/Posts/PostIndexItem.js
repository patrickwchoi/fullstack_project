import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost} from '../../store/posts';
import { useHistory } from "react-router-dom";
import './Posts.css'
import defaultProfilePic from '../../assets/default_profile_pic.png';

const PostIndexItem = ({post}) => {

  const history = useHistory();
  const redirectToEdit = (postId)=>{
    history.push(`/posts/${postId}/edit`)
  }

  const sessionUser = useSelector(state => state.session.user);
  const isAuthorLoggedIn = ( sessionUser && (sessionUser.id === post.authorId));

  const dispatch = useDispatch();

  return (
    <div className='PostIndexItem'>
      <img src={defaultProfilePic} className='post-profile-pic'/>
      <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
      <p>{post.author.username}</p>
      <p> {post.body} </p>
      <img src={post.photoUrl} className='post-photo'/>
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