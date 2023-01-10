import React, {useState} from 'react';
import Modal from 'react-modal';
// import { Modal } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost} from '../../store/posts';
import { useHistory } from "react-router-dom";
import './Posts.css'


Modal.setAppElement('#root');
const customStyles = {
  content: {
    left: "0",
    top: "100%",
    right: "auto",
    bottom: "auto",
    bottom: "auto",
    height: "320px",
    width: "440px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
  },
};

const PostIndexItem = ({post}) => {

  const history = useHistory();
  const redirectToEdit = (postId)=>{
    history.push(`/posts/${postId}/edit`)
  }

  const sessionUser = useSelector(state => state.session.user);
  const isAuthorLoggedIn = ( sessionUser && (sessionUser.id === post.authorId));
  const dispatch = useDispatch();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const openDropdown = () => {
    setDropdownIsOpen(true);
  }
  const closeDropdown = () => {
    setDropdownIsOpen(false);
  }
  return (
    <div className='PostIndexItem'>
      <img src={post.author.profilePic} className='post-profile-pic'/>
      {/* <button onClick={openPostModal} style={{position: 'relative',   display: 'inline-block'}}>Open</button> */}
      {/* <div className='post-modal'> */}
        {/* <Modal isOpen={postModalIsOpen} style={customStyles} overlayClassName="Overlay" 
        backdrop={true} onRequestClose={closePostModal}    >
            <h2>{post.title}</h2>
            <button onClick={closePostModal}>Close</button>
        </Modal> */}
      {/* </div> */}
      <button onClick={openDropdown} >dropdown </button>
      {dropdownIsOpen && (
        <div className='post-dropdown'>
           <button onClick={closeDropdown}>close Dropdown</button>
        </div>
      )};
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