import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import { BrowserRouter, Route, Link, useHistory  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost, fetchPost} from '../../store/posts';
import {getUser} from '../../store/users';
import { formatDateTime } from '../../utils/dateUtil';
import {BsThreeDots} from "react-icons/bs";
import {getLikesGivenPost , createLike, getLikeGivenPostAndUser, deleteLike} from '../../store/likes'
import LikePostItem from '../Notes/Likes/LikePostItem';
import NotesDropdown from '../Notes/Dropdown/NotesDropdown';
import {getCommentsGivenPost} from '../../store/comments';

// import TempModal from './tempmodal';
import PostEdit from './PostEdit';
import './Posts.css';
import '../Notes/Notes.css'

const PostIndexItem = ({post}) => {
  const author = useSelector(getUser(post.authorId));
  const likes = useSelector(getLikesGivenPost(post.id));
  const history = useHistory();
  
  
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const [isLiked, setIsLiked] = useState(sessionUser && likes.some(like => like.userId === sessionUser.id));
  let like = useSelector(getLikeGivenPostAndUser(post, sessionUser))
  let comments = useSelector(getCommentsGivenPost(post.id));
  const isAuthorLoggedIn = ( sessionUser && (sessionUser.id === author.id));
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const openDropdown = () => {
    setDropdownIsOpen(true);
  }
  const closeDropdown = () => {
    setDropdownIsOpen(false);
  }
  //This causes error, I think bc in POstINdex there will be two useEffects running
  // useEffect = (() => {
  //   if (sessionUser===null) {
  //     setIsLiked(false)
  //   }
  // }, [sessionUser]);
  
  const redirectToUser = () => {
    history.push(`/users/${post.authorId}`)
  }

  const handleLike = (e) => {
    if (sessionUser===null) {
      alert('Please log in to comment')
    }
    else if (isLiked===false) {
      setIsLiked(current => !current);
      const like = {post_id : post.id, user_id: sessionUser.id}
      dispatch(createLike(like));
    }
    else {
      setIsLiked(current => !current);
      // console.log(like)
      dispatch(deleteLike(like.id));
    }
  }
  const [notesIsOpen, setNotesIsOpen] = useState(false)
  const toggleNotes = () => {
    if (notesIsOpen) {
      setNotesIsOpen(false);
    }
    else{
      setNotesIsOpen(true);
    }
  }
  const closeNotes = () => {
    setNotesIsOpen(false);
  }

  return (
    <div className='PostIndexItem'>
      <div className='postindex-left'>
        <img src={author.profilePic} className='post-profile-pic' onClick={redirectToUser}/> 
      </div>
      <div className='postindex-right'>
        <div className='postindex-right-header'>
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
        <div className='post-text'>
          <h2>{post.title}</h2>
          <p> {post.body} </p>
        </div>
        <img src={post.photoUrl} className='post-photo'/>
        <div className='postindex-right-footer'>
          <div className={notesIsOpen ? 'notes-open notes-footer-left' : 'notes-closed notes-footer-left'} onClick={toggleNotes}>
            {likes.length + comments.length} notes
            {notesIsOpen ? <i class="fa-solid fa-angles-up"></i> : <i class="fa-solid fa-angles-down"></i>}
          </div>
          <div className="notes-footer-right">
            <i className={'fa fa-heart '.concat(isLiked ? 'red' : 'grey')} onClick={handleLike}></i>
          </div>
        </div>
        {notesIsOpen && <>
            <NotesDropdown likes={likes} comments={comments} postId={post.id} sessionUserId={sessionUserId}/>
          </>
        }
      </div>

    </div>
  )
}

export default PostIndexItem;