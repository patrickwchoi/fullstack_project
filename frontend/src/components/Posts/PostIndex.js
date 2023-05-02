import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory  } from "react-router-dom";
import PostIndexItem from './PostIndexItem';
import { getPosts, getPostsReversed, fetchPosts } from '../../store/posts'
import MyProjects from './MyProjects.jsx';
import './Posts.css';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github_white.png';


const PostIndex = (props) => {
  const dispatch = useDispatch();
  let posts = useSelector(getPosts);

  const sessionUser = useSelector(state => state.session.user);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  // posts = shuffle(posts); //randomize posts order, doesnt change state
  const history = useHistory();
  useEffect(()=>{
    dispatch(fetchPosts()); //later, I want to only fetch first 15~ posts
  }, [sessionUser])



  return (
    <div className="PostIndex-container">
      <div className='PostIndex'>
        <ul>
          {posts.map(post=> <PostIndexItem post={post} key={post.id} /*author={post.author}*//>)} 
        </ul>
      </div>
      <div className="post-index-right">
        <h2>Check out my other work!</h2>
        <div className="post-index-right-patrick">
          <h3>Patrick Choi</h3>
          <div className="post-index-right-links">
            <a href="https://www.linkedin.com/in/patrickwchoi/" target="_blank"><img src={linkedin} id='linkedin'/></a>
            <a href="https://www.github.com/patrickwchoi/" target="_blank"><img src={github} id='github'/></a>
          </div>
        </div>
        <MyProjects/>
      </div>
    </div>
  )
};

export default PostIndex;