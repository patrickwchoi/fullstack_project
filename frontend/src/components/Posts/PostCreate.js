import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPost, createPost, updatePost } from '../../store/posts';
import { useHistory } from "react-router-dom";
import csrfFetch from '../../store/csrf';


console.log('post create')
function PostCreate(){
  let post = { 
    title:'',
    body: ''
  }
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [photoFile, setPhotoFile] = useState (null);
  const [photoUrl, setPhotoUrl] = useState (null); 
  const dispatch = useDispatch();

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
    
    const response = await csrfFetch('/api/posts', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      const message = await response.json();
      setTitle("");
      setPhotoFile(null);
      setPhotoUrl(null);
    }
    //I have questions. Should I expedite this formData logic to my thunk action creators? 
    //Is it ok that Im not updating state with the photo?
    //Why can I dispatch two POST methods for the same post?

    // post = {...post, title, body}; 
    // dispatch(createPost(post));
    redirectToIndex();
  }

  const preview = photoUrl ? <img src={photoUrl} alt="" height="200" /> : null;

  return (
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
  );
}

export default PostCreate;
