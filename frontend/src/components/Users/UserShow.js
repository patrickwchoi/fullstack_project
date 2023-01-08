import {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {deleteUser, updateUser, getUser, fetchUser} from '../../store/users';
import './Users.css';
// import PostIndexItem from '../Posts/PostIndexItem';
import UserPostItem from './UserPostItem';

const UserShow = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const isUserLoggedIn =( sessionUser &&(sessionUser.id === userId));

  const user = useSelector(getUser(userId));
  // const profile_pic_url = user.profile_pic; //i dont see profile pic in state, so this might error
  const history = useHistory();
  useEffect(()=>{ //i dont think this will be necessary if we decide to add users to state in index. but ig it doesnt hurt
    if (userId){
      dispatch(fetchUser(userId))
    }
  }, [userId])

  //this will prevent the component from running while user is null. 
  //it only runs after useEffect runs, which is an async function
  if (!user ) return null;
  return (
    <div className='UserShow'>

      <ul>
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
        {/* <img src={require('../../assets/default_profile_pic.png')}/> */}
        <img src={user.profilePic} className='user-profile-pic'/>
        <br/>

        <ul>
          {(Object.values(user.posts)).map(post=> <UserPostItem post={post} key={post.id} author={user}/>)} 
        </ul>

      </ul>
    </div>
  )


}
export default UserShow;