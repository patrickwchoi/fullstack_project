import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPost, createPost, updatePost } from '../../store/posts';
import { useHistory } from "react-router-dom";
import csrfFetch from '../../store/csrf';


function PostEdit(){
  const {postId} = useParams();
  let post = useSelector(getPost(postId));

  useEffect(()=>{
    dispatch(fetchPost(postId)) //why do i need this if i have useSelector(getpost) above?
  }, [postId]);
 
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [photoFile, setPhotoFile] = useState (null);
  const [photoUrl, setPhotoUrl] = useState (null); 
  const dispatch = useDispatch();

  const history = useHistory();
  const redirectToIndex = ()=>{
    history.push('/posts')
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[body]', body);
    if (photoFile) {
      formData.append('post[photo]', photoFile);
    }
    
    const response = await csrfFetch(`/api/posts/${postId}`, {
      method: 'PATCH',
      body: formData
    });
    if (response.ok) {
      const message = await response.json();
      setTitle("");
      setPhotoFile(null);
      setPhotoUrl(null);
    }
    // post = {...post, title, body};
    // dispatch(updatePost(post));
    redirectToIndex();
  }
  const handleFile = e => {
    const file = e.currentTarget.files[0];
    setPhotoFile(file);
  }

  return (
    <div className='edit-post-form'>
      <form onSubmit={handleSubmit}>
        <h1>Edit Post</h1>
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
        <button>Edit Post</button>
      </form>
    </div>
  );
}

export default PostEdit;
