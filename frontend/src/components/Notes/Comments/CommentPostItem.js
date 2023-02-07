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
  const [authorLoggedIn, setauthorLoggedIn] = useState(comment.userId === sessionUserId)

  const handleDelete = (e) => {
    dispatch(deleteComment(comment.id))
  }
  const handleEdit = (e) => {
    console.log('edit')
  }

  if (!user ) return null;
  return (
    <>
      <div className="comment-item">
        <div className="comment-item-left">
          <img src={user.profilePic} className="notes-profile-pic" />
          <div className="comment-text-container">
            <a className="notes-username ">{user.username}</a>
            <p className="comment-body">{comment.body}</p>
          </div>
        </div>
        <div className="comment-item-right">
          {authorLoggedIn && 
            <>
              <button onClick={handleEdit}>Edit</button>
              <button className="delete-comment" onClick={handleDelete}>Delete</button>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default CommentPostItem;