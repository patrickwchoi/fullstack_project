import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../store/posts';
import { getUser } from '../../../store/users';
import { useState } from 'react';
import { deleteComment, updateComment } from '../../../store/comments';
import '../Notes.css'
import {useHistory} from 'react-router-dom';

const CommentPostItem = ({comment, sessionUserId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector(getPost(comment.postId));
  const user = useSelector(getUser(comment.userId));
  const [body, setBody] = useState(comment.body)
  const [authorLoggedIn, setauthorLoggedIn] = useState(comment.userId === sessionUserId)
  const [openCommentEdit, setOpenCommentEdit] = useState(false)

  const redirectToUser = (userId) => () => {
    history.push(`/users/${userId}`)
  }
  const handleDelete = (e) => {
    dispatch(deleteComment(comment.id))
  }

  const handleEdit = (e) => {
    e.preventDefault();
    const newComment = {
      id: comment.id,
      body: body,
      userId: comment.userId,
      postId: comment.postId
    }
    dispatch(updateComment(newComment))
    setOpenCommentEdit(false)
  }

  


  if (!user ) return null;
  return (
    <>
      <div className="comment-item">
        <div className="comment-item-left">
          <img src={user.profilePic} onClick={redirectToUser(user.id)} className="notes-profile-pic pointer" />
          <div className="comment-text-container">
            <a className="notes-username pointer" onClick={redirectToUser(user.id)}>{user.username}</a>
            {openCommentEdit ? (
              <form id="edit-comment-form" onSubmit={handleEdit} >
                <input id="edit-comment-input"
                  type="text" value={body} onChange={(e)=> setBody(e.target.value)}
                />
              </form>
            ) : (
            <p className="comment-body" id="comment-body">{comment.body}</p>
            )}
            
            
            
          </div>
        </div>
        <div className="comment-item-right">
          {authorLoggedIn && 
            <>
              <button id="comment-edit-button" onClick={() => setOpenCommentEdit(true)}>Edit</button>
              <button className="delete-comment" onClick={handleDelete}>Delete</button>
            </>
          }
        </div>
      </div>
    </>
  )
}


export default CommentPostItem;