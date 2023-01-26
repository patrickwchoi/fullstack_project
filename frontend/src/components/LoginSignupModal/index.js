// import LoginFormPage from "../LoginFormPage";
// import SignupFormPage from "../SignupFormPage";
// import {useLoginModal, useSignupModal } from '../../context/Modal';
// import './LoginSignupModal.css';

// const LoginSignupModal = () => {
//   const {showLogin, openLogin, closeLogin} = useLoginModal();
//   const {showSignup, openSignup, closeSignup} = useSignupModal();

//   const closeModals = () => {
//     closeLogin();
//     closeSignup();
//   }

//   return (showSignup||showLogin) ? (
//    <>
//     <div className='modal-background' id='modal-background' onClick={closeModals}>
//     </div>
    
    
//     <div className='modal' id='modal' >
//       <div id='modal_img'>
//         <img src="https://assets.tumblr.com/pop/src/assets/images/login-wall/art_v2-3f0f7a0b.gif"/>
//       </div>

//       <div className='modal-bottomhalf'>
//         <div className='modal-tumblr'>
//           {/* <svg xmlns="http://www.w3.org/2000/svg" height="56" width="274" role="presentation"><use href="#managed-icon__logo-tumblr"></use></svg> */}
//         </div>

        

//         <LoginFormPage />
//         <SignupFormPage />
//       </div>
//     </div>
//    </>
//   ): null;
// } 
// export default LoginSignupModal;