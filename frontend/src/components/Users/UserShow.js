import {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {deleteUser, updateUser, getUser, fetchUser} from '../../store/users';
import { getPosts } from '../../store/posts';
import './Users.css';
// import UserPostItem from './UserPostItem';
import PostIndexItem from '../Posts/PostIndexItem';

const UserShow = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const isAuthorLoggedIn = ( sessionUser && (sessionUser.id == userId)); //i think i need two equal signs here instead of 3 bc userId is num, not string
  const posts = useSelector(getPosts); //grabs users posts bc state is only updated with user posts in reducer

  const user = useSelector(getUser(userId));
  const history = useHistory();
  const redirectToEditUser = ()=>{
    history.push(`/users/${userId}/edit`)
  }

  useEffect(()=>{ 
    if (userId){
      dispatch(fetchUser(userId));
    }
    
  }, [userId, dispatch, posts])
  
  

  //this will prevent the component from running while user is null. 
  //it only runs after useEffect runs, which is an async function
  if (!user ) return null;
  return (
    <div className='user-show-container'>
      <div className='UserShow'>
        <header className='user-header'>
          <div className='background-img-container'>
            <img className='user-backgroundimg' src={user.backgroundPic}/>
          </div>
          <div className='user-profile'>
            <img className='user-profile-pic' src={user.profilePic}/>
            <div className='user-text'>
              <h2 className='username'>{user.username}</h2>  
              <div className='user-bio'>{user.bio}</div>
            </div>
          </div>
        </header>
        {isAuthorLoggedIn ? ( 
          <>
            <button onClick={redirectToEditUser}>Edit</button>
            {/* <button onClick={redirectToCreatePost}>New Post</button> */}
          </>
        ) : null}
          <div className='user-posts'>
            <ul>
              {(Object.values(posts)).map(post=> <PostIndexItem post={post} key={post.id} author={user}/>)} 
            </ul>
          </div>

        
      </div>
    </div>
  )


}
export default UserShow;