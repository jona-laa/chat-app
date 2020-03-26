import React from 'react'
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/actions/login';

export const LogoutButton = ({ socket }) => {
    const dispatch = useDispatch();

    const disconnect = () => {
        socket.removeAllListeners();
        socket.close();
        dispatch(setLogin(null));
    };

    return (
        <button id="disconnect-button" className="button"
            onClick={disconnect}>
            Disconnect
        </button>
    )
}
