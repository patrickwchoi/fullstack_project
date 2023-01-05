import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPost, createPost, updatePost } from '../../store/posts';
import { useHistory } from "react-router-dom";

function PostCreate(){
  let post = { 
    title:'',
    body: ''
  }
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const dispatch = useDispatch();

  const history = useHistory();
  const redirectToIndex = ()=>{
    history.push('/posts')
  }

  // useEffect(()=>{
  //   if (postId){ //whats this if for?
  //     dispatch(fetchPost(postId))
  //   }
  // }, [postId]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    post = {...post, title, body}; //what is ...post??
    dispatch(createPost(post));
    redirectToIndex();
  }

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
        <button>Create Post</button>
      </form>
    </div>
  );
}

export default PostCreate;
