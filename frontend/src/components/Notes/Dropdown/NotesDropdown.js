

import { useDispatch, useSelector } from 'react-redux';

import LikePostItem from '../Likes/LikePostItem';
const NotesDropdown = ({likes}) => {
  const dispatch = useDispatch();
  
  return (
    <div>
      {likes.map(like => <LikePostItem key={like.id} postId={like.postId} userId={like.userId} />)}
    </div>
  )
}

export default NotesDropdown;