import {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {deleteUser, updateUser, getUser, fetchUser} from '../../store/users';

const UserShow = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const isUserLoggedIn = (sessionUser.id === userId);
  
  const user = useSelector(getUser(userId));
  console.log(user)
  // const profile_pic_url = user.profile_pic; //i dont see profile pic in state, so this might error
  const history = useHistory();
  
  useEffect(()=>{ //i dont think this will be necessary if we decide to add users to state in index. but ig it doesnt hurt
    dispatch(fetchUser(userId))
    console.log('finished dispatch')
  }, [userId, dispatch])
  
  return (
    <div className='UserShow'>
      {/* <img src=`user.profile_pic`/> */}

      <ul>
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </ul>
    </div>
  )


}
export default UserShow;