import React, {useState} from 'react';
import Modal from 'react-modal';

import { BrowserRouter, Route, Link, useHistory  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost, fetchPost} from '../../store/posts';
import {getUser} from '../../store/users';
import { formatDateTime } from '../../utils/dateUtil';
import {BsThreeDots} from "react-icons/bs";
import {getLikesGivenPost , createLike } from '../../store/likes'
import LikePostItem from '../Likes/LikePostItem';

// import TempModal from './tempmodal';
import PostEdit from './PostEdit';
import './Posts.css';

const PostIndexItem = ({post}) => {
  const author = useSelector(getUser(post.authorId));
  const likes = useSelector(getLikesGivenPost(post.id));
  const history = useHistory();
  
  const dispatch = useDispatch();
  const [isRed, setIsRed] = useState(false);
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

  const handleLike = (e) => {
    setIsRed(current => !current);
    const like = {post_id : post.id, user_id: sessionUser.id}
    dispatch(createLike(like));
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
        {/* <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2> */}
        <div className='post-text'>
          <h2>{post.title}</h2>
          <p> {post.body} </p>
        </div>
        <img src={post.photoUrl} className='post-photo'/>
        <div className='postindex-right-footer'>
          <div className="notes-footer-left">
            {likes.length} notes
          </div>
          <div className="notes-footer-right">
            {/* add heart here */}
            {/* <FontAwesomeIcon icon="fa-solid fa-heart" /> */}
            {/* <i className='fa-solid fa-heart'></i> */}
            {/* <FontAwesomeIcon icon={heart} /> */}
            <i className={'fa fa-heart '.concat(isRed ? 'red' : 'grey')} onClick={handleLike}></i>

          </div>
          {/* <div className="postindex-likes">
            {likes.map(like => <LikePostItem postId={like.postId} userId={like.userId} key={like.id}/>)}
          </div> */}
        </div>
      </div>

    </div>
  )
}

export default PostIndexItem;