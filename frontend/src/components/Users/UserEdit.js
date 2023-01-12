import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {deleteUser, updateUser, getUser, fetchUser} from '../../store/users';
import { getPosts } from '../../store/posts';
import './Users.css';
import PostIndexItem from '../Posts/PostIndexItem';
import csrfFetch from '../../store/csrf';


function UserEdit()  {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const isAuthorLoggedIn = ( sessionUser && (sessionUser.id == userId)); //i think i need two equal signs here instead of 3 bc userId is num, not string
  
  const posts = useSelector(getPosts); //grabs users posts bc state is only updated with user posts in reducer
  
  const user = useSelector(getUser(userId));
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [backgroundPic, setBackgroundPic] = useState (null);
  const [backgroundPicUrl, setBackgroundPicUrl] = useState (null);
  const [profilePic, setProfilePic] = useState (null);
  const [profilePicUrl, setProfilePicUrl] = useState (null);
  const history = useHistory();
  useEffect(()=>{ 
    // if (userId){
      dispatch(fetchUser(userId));
      setUsername(user?.username);
      setBio(user?.bio)
    // }
  }, [userId, dispatch])
  
  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[username]', username);
    formData.append('user[bio]', bio);
    if (backgroundPic) {
      formData.append('user[backgroundPic]', backgroundPic);
    }
    if (profilePic) {
      formData.append('user[profilePic]', profilePic);
    }
    
    const response = await csrfFetch(`/api/users/${userId}`, {
      method: 'PATCH',
      body: formData
    });
    if (response.ok) {
      const message = await response.json();
      setUsername("");
      setBio("");
      setProfilePic(null);
      setProfilePicUrl(null);
      setBackgroundPic(null);
      setBackgroundPicUrl(null);
    }
    history.push(`/users/${userId}`);
  }
  const handleBackgroundPic = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setBackgroundPic(file);
        setBackgroundPicUrl(fileReader.result);
      };
    }
  }
  const handleProfilePic = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setProfilePic(file);
        setProfilePicUrl(fileReader.result);
      };
    }
  }
  
  const BackgroundPicPreview = backgroundPicUrl ? <img src={backgroundPicUrl} alt="" height="200" /> : null;
  const ProfilePicPreview = profilePicUrl ? <img src={profilePicUrl} alt="" height="200" /> : null;

  //this will prevent the component from running while user is null. 
  //it only runs after useEffect runs, which is an async function

  console.log(`is author logged in: ${isAuthorLoggedIn}`)
  if (!isAuthorLoggedIn) return null;
  if (!user ) return null;

  return (
    <div className='user-show-container'>
      <div className='UserEdit'>
      <form onSubmit={handleSubmit}>
      <div className='user-show-container'>
      <div className='UserShow'>
        <header className='user-header'>
          <div className='background-img-container'>
            <img className='user-backgroundimg' src={user.backgroundPic}/>
          </div>
          <div className='user-profile'>
            <img className='user-profile-pic' src={user.profilePic}/>
            <div className='user-text'>
            <text>Username</text>
              <h2><input 
            type="text"  value={username} onChange={(e)=> setUsername(e.target.value)}
            placeholder='username'
              /></h2>
              <text>Bio</text>
              {/* <div className='user-bio'>{user.bio}</div> */}
              <input 
            type="text"  value={bio} onChange={(e)=> setBio(e.target.value)}
            placeholder='bio'
              />
            </div>
          </div>
        </header>

      </div>
    </div>
      {/* end of imported user show */}

        {/* <input type="file" onChange={handleBackgroundPic}> Background Pic </input>
        <input type="file" onChange={handleProfilePic}> Profile Pic </input>

        {BackgroundPicPreview}
        {ProfilePicPreview} */}

        <button>Edit User</button>
      </form>

      </div>
    </div>
  )


}
export default UserEdit;