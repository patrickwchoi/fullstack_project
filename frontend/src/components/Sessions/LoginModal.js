
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const style={
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '1000',

  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    border: '1px solid #ccc',  },
}

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>
      <div onClick={openModal}>Modal</div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={style}
      ></Modal>
    </>
  )
}

export default LoginModal;