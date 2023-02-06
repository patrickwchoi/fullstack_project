import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../store/posts';
import { getUser } from '../../../store/users';

const CommentPostItem = ({comment}) => {
  const dispatch = useDispatch();
  const post = useSelector(getPost(comment.postId));
  const user = useSelector(getUser(comment.userId));
  
  if (!user ) return null;
  return (
    <>
      <div className="comment-item">
        {/* <img src={user.profilePic} className="notes-profile-pic" /> */}
        <div className="comment-item-right">
          <a className="comment-username">{user.username}</a>
          <p className="comment-body">{comment.body}</p>
        </div>
      </div>
    </>
  )
}

export default CommentPostItem;