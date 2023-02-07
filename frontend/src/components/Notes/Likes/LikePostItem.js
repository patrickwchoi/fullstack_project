import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../store/posts';
import { getUser } from '../../../store/users';
import '../Notes.css'

const LikePostItem = ({postId, userId}) => {
  const dispatch = useDispatch();
  const post = useSelector(getPost(postId));
  const user = useSelector(getUser(userId));
  
  if (!user ) return null;
  return (
    <>
      <div className="like-item">
        <img src={user.profilePic} className="notes-profile-pic" />
        <div className="like-item-right">
          <a className="notes-username">{user.username}</a>
        </div>
      </div>
    </>
  )
}

export default LikePostItem;