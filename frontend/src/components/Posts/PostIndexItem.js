import React, {useState} from 'react';
import Modal from 'react-modal';
// import { Modal } from 'react-bootstrap';

import { BrowserRouter, Route, Link, useHistory  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost, fetchPost} from '../../store/posts';
import {getUser} from '../../store/users';
import { formatDateTime } from '../../utils/dateUtil';
import TempModal from './tempmodal';
import './Posts.css'


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

  //start
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  //end
  return (
    <div className='PostIndexItem'>
      {/* temp modal */}
      <TempModal userId={post.authorId} postId={post.id}/>

      {/* modal */}
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
          },
        }}
      >
        <h1>Modal Title</h1>
        <p>Modal content goes here</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>

    {/* end of modal */}


      <img src={author.profilePic} className='post-profile-pic' onClick={redirectToUser}/>
      <button onClick={openDropdown} >dropdown </button>
      {dropdownIsOpen && (
        <>
          <div id='post-modal-background' onClick={closeDropdown}></div>
          <div className='post-dropdown'>
            {/* <p>{createdAtDate}</p> */}
            <p>{formatDateTime(post.createdAt)}</p>
            <p>Share</p>
            {isAuthorLoggedIn ? ( //replace with a modal menu that gives options like delete, share, edit, etc
              <>
                <button onClick={()=>{handleEdit(post.id)}}>Edit</button>
                <button onClick={()=>dispatch(deletePost(post.id))}>Delete</button>
              </>
              ) : null}
              <button onClick={closeDropdown}>Close</button>
          </div>
        </>
      )};
      {/* <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2> */}
      <h2>{post.title}</h2>
      <a onClick={redirectToUser} id="username">{author.username}</a>
      <p> {post.body} </p>
      <img src={post.photoUrl} className='post-photo'/>
      
    </div>
  )
}

export default PostIndexItem;