import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../store/posts';
import { getUser } from '../../../store/users';

const LikePostItem = ({postId, userId}) => {
  const dispatch = useDispatch();
  const post = useSelector(getPost(postId));
  const user = useSelector(getUser(userId));
  return (
    <div className="like-item">
      {/* <img src={user.profilePic} className="like-profile-pic" /> */}
      <div className="like-item-right">
        <a className="like-username">{user.username}</a>
      </div>
    </div>
  )
}

export default LikePostItem;