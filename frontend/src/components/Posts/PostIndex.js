import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory  } from "react-router-dom";
import PostIndexItem from './PostIndexItem';
import { getPosts, getPostsReversed, fetchPosts } from '../../store/posts'
import { getComments } from '../../store/comments'
import './Posts.css';
import './MyProjects.css';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github_white.png';
import bagon from '../../assets/bagon.jpg';
import mern from '../../assets/mern.jpg';

const PostIndex = (props) => {
  const dispatch = useDispatch();
  let posts = useSelector(getPostsReversed);

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
        <div className="list-of-projects">
          <div className="JS-project project">
            <img src={bagon}/>
            <div className="project-text">
              <h3>Bagon Adventures</h3>
              <h4>Bagon Adventures is a browser-based game made with vanilla Javascript and HTML Canvas</h4>
            </div>
          </div>
          <div className="MERN-project project">
            <div className="project-text">
              <h3>Singed</h3>
              <h4>Singed is a group project with 3 other contributors for a web application that recommends users dishes and restaurants. Built using the MERN  stack.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PostIndex;