import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../store/posts';
import { getUser } from '../../../store/users';
import { useState } from 'react';
import { deleteComment } from '../../../store/comments';
import '../Notes.css'

const CommentPostItem = ({comment, sessionUserId}) => {
  const dispatch = useDispatch();
  const post = useSelector(getPost(comment.postId));
  const user = useSelector(getUser(comment.userId));
  const [body, setBody] = useState(comment.body)
  const [authorLoggedIn, setauthorLoggedIn] = useState(comment.userId === sessionUserId)
  
  const commentBody = document.getElementById("comment-body");
  const editButton = document.getElementById("comment-edit-button");
  const editCommentForm = document.getElementById("edit-comment-form");

  const handleDelete = (e) => {
    dispatch(deleteComment(comment.id))
  }
  const startEdit = (e) => {
    editButton.style.display = "none";
    editCommentForm.style.display = "inline-block";
  }
  const handleEdit = (e) => {
    editButton.style.display = "inline-block";
    editCommentForm.style.display = "none";
    console.log(body)
  }

  


  if (!user ) return null;
  return (
    <>
      <div className="comment-item">
        <div className="comment-item-left">
          <img src={user.profilePic} className="notes-profile-pic" />
          <div className="comment-text-container">
            <a className="notes-username ">{user.username}</a>
            <p className="comment-body" id="comment-body">{comment.body}</p>
            
            <form id="edit-comment-form" onSubmit={handleEdit} style={{display: "none"}}>
              <input id="edit-comment-input"
                type="text" value={body} onChange={(e)=> setBody(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="comment-item-right">
          {authorLoggedIn && 
            <>
              <button id="comment-edit-button"onClick={startEdit}>Edit</button>
              <button className="delete-comment" onClick={handleDelete}>Delete</button>
            </>
          }
        </div>
      </div>
    </>
  )
}


export default CommentPostItem;