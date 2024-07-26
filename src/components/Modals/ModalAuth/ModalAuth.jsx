import css from './style.module.css';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import RegistrationForm from '../ModalForm/RegistrationForm.jsx';
import LoginForm from '../ModalForm/LoginForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/auth/authSlice.js';
import { logout } from '../../../redux/auth/authOperation.js';

const ModalAuth = ({ isOpen, onClose, type }) => {
  const [isRegister, setIsRegister] = useState(type === 'register');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const authenticated = Boolean(user && user.uid);

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setIsRegister(type === 'register');
  }, [type]);

  const handleLogout = async () => {
    dispatch(logout());
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={css.modal_backdrop} onClick={onClose}>
      <div className={css.modal_content} onClick={e => e.stopPropagation()}>
        <button className={css.close_button} onClick={onClose}>
          ×
        </button>
        {authenticated ? (
          <div>
            <p> {user.displayName || 'User'}</p>
            <button className={css.auth_button_logout} onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <>
            {isRegister ? <RegistrationForm onClose={onClose} /> : <LoginForm onClose={onClose} />}
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalAuth;