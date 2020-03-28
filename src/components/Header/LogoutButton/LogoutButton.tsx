import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../redux/actions/login';
import './LogoutButton.css';

export const LogoutButton: React.FC<any> = ({ socket }): JSX.Element => {
  const dispatch = useDispatch();

  const disconnect = () => {
    socket.removeAllListeners();
    socket.close();
    dispatch(setLogin(null));
  };

  return (
    <button id="disconnect-button" className="button" onClick={disconnect}>
      Disconnect
    </button>
  );
};
