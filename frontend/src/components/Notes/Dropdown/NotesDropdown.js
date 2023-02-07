
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
        <button onClick={openLikes}>Likes</button>
        <button onClick={openComments}>Comments</button>
      </div>
      <div className="notes-dropdown-content">
        <form onSubmit={handleSubmitComment}>
          <input type="text" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
        </form>
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