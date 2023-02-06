
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LikePostItem from '../Likes/LikePostItem';
const NotesDropdown = ({likes}) => {
  const dispatch = useDispatch();
  const [showLikes, setShowLikes] = useState(true)
  const closeLikes = () => {
    setShowLikes(false)
  }
  const openLikes = () => {
    setShowLikes(true)
  }
    
  return (
    <div className="notes-dropdown">
      <div className="notes-dropdown-header">
        <button onClick={openLikes}>Likes</button>
      </div>
      <div className="notes-dropdown-content">
        {showLikes && likes.map(like => <LikePostItem key={like.id} postId={like.postId} userId={like.userId} />)}
      </div>
    </div>
  )
}

export default NotesDropdown;