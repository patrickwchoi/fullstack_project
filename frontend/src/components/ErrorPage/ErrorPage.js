import { Link } from 'react-router-dom';
import tumblr_logo from '../../assets/tumblr_logo.png';
import './ErrorPage.css';
const ErrorPage = () => {
  return (
    <div className="error-page">
      <img className="error-background" src="https://64.media.tumblr.com/tumblr_m8jk6nInJO1qzt4vjo1_r1_500.gif">
      </img>
      <div className="error-content">
        <h1>404</h1>
        <h2>
          Whatever you were looking for doesn't currently exist at this address. 
          Unless you were looking for this error page, in which case: Congrats! You totally found it.
        </h2>
      </div>
      <Link to='/posts'>
        <img id="error-logo"  src={tumblr_logo}></img>
      </Link>
    </div>
  )
}

export default ErrorPage;