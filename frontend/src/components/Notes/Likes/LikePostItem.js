import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../store/posts';
import { getUser } from '../../../store/users';
import { useHistory } from 'react-router-dom';
import '../Notes.css'

const LikePostItem = ({postId, userId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector(getPost(postId));
  const user = useSelector(getUser(userId));

  const redirectToUser = (userId) => () => {
    history.push(`/users/${userId}`)
  }
  if (!user ) return null;
  return (
    <>
      <div className="like-item">
        <img src={user.profilePic} className="notes-profile-pic pointer"  onClick={redirectToUser(user.id)}/>
        <div className="like-item-right">
          <a className="notes-username pointer" onClick={redirectToUser(user.id)}>{user.username}</a>
        </div>
      </div>
    </>
  )
}

export default LikePostItem;