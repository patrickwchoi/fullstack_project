import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost} from '../../store/posts';
import { useHistory } from "react-router-dom";

const UserShow = (userId) => {
  const sessionUser = useSelector(state => state.session.user);
  const isUserLoggedIn = (sessionUser.id === userId);



}
export default UserShow;