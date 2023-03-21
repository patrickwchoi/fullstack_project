import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPosts, createPost, updatePost } from '../../store/posts';
import { useHistory } from "react-router-dom";
import csrfFetch from '../../store/csrf';
import Modal from 'react-modal';

const style={
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '1000',

  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    border: '1px solid #ccc',  },
}

function PostEdit({postId}){
  const dispatch = useDispatch();
  let post = useSelector(getPost(postId));

  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [photoFile, setPhotoFile] = useState (null);
  const [photoUrl, setPhotoUrl] = useState (null);

   //start
   const [isOpen, setIsOpen] = useState(false);
   const openModal = () => {
     setIsOpen(true);
   }
   const closeModal = () => {
     setIsOpen(false);
   }
   //end

  const history = useHistory();
  const redirectToIndex = ()=>{
    history.push('/posts')
  }
  const redirectToUser = ()=>{
    history.push(`/users/${post.authorId}`)
  }

  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[body]', body);
    if (photoFile) {
      formData.append('post[photo]', photoFile);
    }
    const response = await csrfFetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      body: formData
    });
    if (response.ok) {
      const message = await response.json();
      setTitle("");
      setPhotoFile(null);
      setPhotoUrl(null);
      dispatch(fetchPosts());
    }
    closeModal();
  }
  const handleFile = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      };
    }
  }
  const preview = photoUrl ? <img src={photoUrl} alt="" height="200" /> : null;

  if (!post) return null;
  return (
    <>
    <div onClick={openModal}>Edit</div>
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={style}
      >
      <div className='edit-post-form'>
        <form onSubmit={handleSubmit}>
          <div className='postmodal-header'> 
            <h1>Edit Post</h1>
          </div>
          <div className='postmodal-content'>
            <input 
              type="text"  value={title} onChange={(e)=> setTitle(e.target.value)}
              placeholder='Title'
            />
            <input 
              type="text"  value={body} onChange={(e)=> setBody(e.target.value)}
              placeholder='Body'
            />
          </div>
          <div className='postmodal-pic'>
            <input type="file" onChange={handleFile} /> 
            {preview}
          </div>
          <div className='postmodal-footer'>
            <button>Edit Post</button>
          </div>
        </form>
      </div>

    </Modal>
    </>
  );
}

export default PostEdit;
