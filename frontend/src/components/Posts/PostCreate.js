import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPosts, createPost, updatePost } from '../../store/posts';
import { useHistory } from "react-router-dom";
import csrfFetch from '../../store/csrf';
import Modal from 'react-modal';
import { MdEditNote } from "react-icons/md";


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

function PostCreate(){
  let post = { 
    title:'',
    body: ''
  }
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [photoFile, setPhotoFile] = useState (null);
  const [photoUrl, setPhotoUrl] = useState (null); 
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch();

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

  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[body]', body);
    if (photoFile) {
      formData.append('post[photo]', photoFile);
    }
    try {
      const response = await csrfFetch('/api/posts', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        const message = await response.json();
        setTitle("");
        setPhotoFile(null);
        setPhotoUrl(null);
        dispatch(fetchPosts());
      }
    }

    catch (error) {
      console.log(error)
      setErrors(error)
      }
    console.log(errors)

    closeModal();
  }

  const preview = photoUrl ? <img src={photoUrl} alt="" height="200" /> : null;

  return (
    <>
    <button id='new-post' onClick={openModal}><MdEditNote/></button>
    <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={style}
      >

    <div className='new-post-form'>
      <form onSubmit={handleSubmit}>
        <h1>Create New Post</h1>
          <input 
            type="text"  value={title} onChange={(e)=> setTitle(e.target.value)}
            placeholder='Title'
          />
          <input 
            type="text"  value={body} onChange={(e)=> setBody(e.target.value)}
            placeholder='Body'
          />
        <br/>
        <input type="file" onChange={handleFile} /> 
        {preview}
        <button>Create Post</button>
      </form>
    </div>
    </Modal>

    </>
  );
}

export default PostCreate;
