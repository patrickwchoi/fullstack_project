import Modal from 'react-modal';
import { deletePost, updatePost} from '../../store/posts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {useState} from 'react';

const PostModal = (post) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectToEdit = (postId)=>{
    history.push(`/posts/${postId}/edit`)
  }

  const sessionUser = useSelector(state => state.session.user);
  const isAuthorLoggedIn = ( sessionUser && (sessionUser.id === post.authorId));

  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const openPostModal = () => {
    setPostModalIsOpen(true);
  }
  const closePostModal = () => {
    setPostModalIsOpen(false);
  }

  return (
    <Modal isOpen={postModalIsOpen}>
      
    </Modal>
  )

}