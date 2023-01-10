import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPost, createPost, updatePost } from '../../store/posts';
import { useHistory } from "react-router-dom";

function PostEdit(){
  const {postId} = useParams();
  let post = useSelector(getPost(postId));

  useEffect(()=>{
    dispatch(fetchPost(postId)) //why do i need this if i have useSelector(getpost) above?
  }, [postId]);
  console.log(post)
  // if (!post) return null;
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const dispatch = useDispatch();

  const history = useHistory();
  const redirectToIndex = ()=>{
    history.push('/posts')
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    post = {...post, title, body};
    dispatch(updatePost(post));
    redirectToIndex();
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
        <button>Edit Post</button>
      </form>
    </div>
  );
}

export default PostEdit;
