import {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {deleteUser, updateUser, getUser, fetchUser} from '../../store/users';
import './Users.css';

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
  if (!user) return null;
  return (
    <div className='UserShow'>

      <ul>
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
        {/* <p>{user.profilePic}</p>
        <img src='fullstack_project/frontend/src/assets/default_profile_pic.png'/>
        <img src='https://www.birdnote.org/sites/default/files/Mountain%20Bluebird%20Male%20%C2%A9%20Tom%20Grey-crp.jpg'/> */}

      </ul>
    </div>
  )


}
export default UserShow;