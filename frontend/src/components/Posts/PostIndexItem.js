import React, {useState} from 'react';
import Modal from 'react-modal';

import { BrowserRouter, Route, Link, useHistory  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost, fetchPost} from '../../store/posts';
import {getUser} from '../../store/users';
import { formatDateTime } from '../../utils/dateUtil';
import {BsThreeDots} from "react-icons/bs";

// import TempModal from './tempmodal';
import PostEdit from './PostEdit';
import './Posts.css';

const PostIndexItem = ({post}) => {
  const author = useSelector(getUser(post.authorId));
  const history = useHistory();
  
  const handleEdit = (postId) =>{
    dispatch(fetchPost(postId)) //I want to make sure the post is in the store, bc going here from User show doesnt have post in the state
    history.push(`/posts/${postId}/edit`)
  }
  
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const isAuthorLoggedIn = ( sessionUser && (sessionUser.id === author.id));
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const openDropdown = () => {
    setDropdownIsOpen(true);
  }
  const closeDropdown = () => {
    setDropdownIsOpen(false);
  }
  const redirectToUser = () => {
    history.push(`/users/${post.authorId}`)
  }

  // //start
  // const [isOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // }

  // const closeModal = () => {
  //   setIsOpen(false);
  // }
  // //end
  Modal.setAppElement("#root");
  return (
    <div className='PostIndexItem'>

      {/* <PostEdit postId={post.id} /> */}
      <div className='postindex-left'>
        <img src={author.profilePic} className='post-profile-pic' onClick={redirectToUser}/> 
      </div>
      <div className='postindex-right'>
        <div className='postindex-right-header'>
          {/* <p>{author.username}</p> */}
          <a onClick={redirectToUser} id="username">{author.username}</a>
          <button id='three-dots' onClick={openDropdown} > <BsThreeDots/> </button>
        </div>
        {dropdownIsOpen && (
          <>
            <div id='post-modal-background' onClick={closeDropdown}></div>
            <div className='post-dropdown'>
              {/* <p>{createdAtDate}</p> */}
              <div>{formatDateTime(post.createdAt)}</div>
              {isAuthorLoggedIn ? ( //replace with a modal menu that gives options like delete, share, edit, etc
                <>
                  {/* <button onClick={()=>{handleEdit(post.id)}}>Edit</button> */}
                  <PostEdit postId={post.id} />
                  <div onClick={()=>dispatch(deletePost(post.id))}>Delete</div>
                </>
                ) : null}
                <div onClick={closeDropdown}>Close</div>
            </div>
          </>
        )}
        {/* <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2> */}
        <div className='post-text'>
          <h2>{post.title}</h2>
          <p> {post.body} </p>
        </div>
        <img src={post.photoUrl} className='post-photo'/>
      </div>

    </div>
  )
}

export default PostIndexItem;