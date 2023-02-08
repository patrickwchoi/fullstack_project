
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LikePostItem from '../Likes/LikePostItem';
import CommentPostItem from '../Comments/CommentPostItem';
import {createComment} from '../../../store/comments';
import '../Notes.css'


const NotesDropdown = ({likes, comments, postId, sessionUserId}) => {
  const dispatch = useDispatch();
  const [showLikes, setShowLikes] = useState(true)
  const closeLikes = () => {
    setShowLikes(false)
  }
  const openLikes = () => {
    setShowLikes(true)
    closeComments();
  }
  const [commentBody, setCommentBody] = useState(''); //user's input comment
  const [showComments, setShowComments] = useState(false)
  const closeComments = () => {
    setShowComments(false)
  }
  const openComments = () => {
    setShowComments(true)
    closeLikes();
  }
    
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (sessionUserId===null) {
      alert('Please log in to like a post.')
    }
    else{
      const comment = {post_id : postId, user_id: sessionUserId, body: commentBody}
      dispatch(createComment(comment))
      setCommentBody('');
    }
  }

  return (
    <div className="notes-dropdown">
      <div className="notes-dropdown-header">
        <div className={"notes-icon ".concat(showLikes ? "notes_highlighted" : "")}>
          <button onClick={openLikes}
             className={"fa-regular fa-heart "}/>
          <div className="notes-icon-count">{likes.length}</div>
        </div>
        <div className={"notes-icon ".concat(showComments ? "notes_highlighted" : "")}>
          <button onClick={openComments} 
            className={"fa-regular fa-comment "}/>
          <div className="notes-icon-count">{comments.length}</div>
        </div>
      </div>
      <div className="notes-dropdown-content">
        {showComments && 
          <>
            <form onSubmit={handleSubmitComment} className="comment-input-form">
              <input type="text" placeholder="Send something nice" value={commentBody} 
              onChange={e => setCommentBody(e.target.value)} />
              <button className={(commentBody ? "blue" : "")} type="submit">Reply</button>
            </form>
          </>
        }
        {showLikes && 
          <>
            <ul>
              {likes.map(like => <LikePostItem key={like.id} postId={like.postId} userId={like.userId} />)}
            </ul>
          </>
        }
        {showComments && 
        <>
          {/* <CommentsDropdown/> */}
          <ul>
            {comments.map(comment => <CommentPostItem key={comment.id} comment={comment} sessionUserId={sessionUserId} />)}
          </ul>
        </>
        }
      </div>
    </div>
  )
}

export default NotesDropdown;