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
/*
Export as the default a `PostForm` component that renders a form to either
create or edit a post. The form should determine whether it is a create or edit
form based on the URL. For a create form, it should pre-fill the form's `title`
and `body` fields from a blank post. For edit, it should grab the specified post
from the store and pre-fill the form's fields with the data from that post. (It
should also fetch the specified post from the database to ensure that it is in
the store.)  

Use controlled inputs and trigger the appropriate action upon submission. Label
the `title` field `Title` and use a text input; label the `body` field `Body`
and use a `textarea`. 
*/