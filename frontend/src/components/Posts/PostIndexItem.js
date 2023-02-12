import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import { BrowserRouter, Route, Link, useHistory  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost, fetchPost} from '../../store/posts';
import {getUser} from '../../store/users';
import { formatDateTime } from '../../utils/dateUtil';
import {BsThreeDots} from "react-icons/bs";
import {getLikesGivenPost , createLike, getLikeGivenPostAndUser, deleteLike} from '../../store/likes'
import NotesDropdown from '../Notes/Dropdown/NotesDropdown';
import {getCommentsGivenPost} from '../../store/comments';

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
  let didUserLike = likes.filter(like => like.userId === sessionUser?.id).length === 1;
  // const [isLiked, setIsLiked] = useState(sessionUser && likes.some(like => like.userId === sessionUser.id));
  //cant use useState bc it doesnt update when sessionUser changes bc it fires off at same time as sessionUser 
  //normally, u use useEffect to update state when sessionUser changes, but useEffect wasnt working
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
  //This causes error, I think bc in PostIndex there will be two useEffects running
  // useEffect = (() => { 
  //   if (sessionUser===null) {
  //     setIsLiked(false)
  //   }
  // }, [sessionUser]);
  
  const redirectToUser = () => {
    history.push(`/users/${post.authorId}`)
  }

  const handleCreateLike = (e) => {
    if (sessionUser===null) {
      return alert('Please log in to comment')
    }
    const like = {post_id : post.id, user_id: sessionUser.id}
    dispatch(createLike(like));
  }

  const handleDeleteLike = (e) => {
    dispatch(deleteLike(like.id));
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
              <div>{formatDateTime(post.createdAt)}</div>
              {isAuthorLoggedIn ? ( 
                <>
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
            {notesIsOpen ? <i className="fa-solid fa-angles-up"></i> : <i className="fa-solid fa-angles-down"></i>}
          </div>
          <div className="notes-footer-right">
            {(didUserLike) ? 
              <i className={'fa fa-heart red'} onClick={handleDeleteLike}></i> : 
              <i className={'fa fa-heart grey'} onClick={handleCreateLike}></i> }
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