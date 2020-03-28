import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/actions/login';
import './LoginPage.css';

export const Login: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const inputElement = React.useRef<HTMLInputElement>(null);

  const updateLogin = (resStatus: number, resMsg: ResponseMessage): void => {
    if (resStatus === 200) {
      dispatch(setLogin(inputElement.current.value));
    } else {
      inputElement.current.value = '';
      inputElement.current.placeholder = resMsg.msg;
    }
  };

  const fetchUser = async () => {
    await fetch(`http://localhost:4200/users/${inputElement.current.value}`)
      .then(res => res)
      .then(async res => updateLogin(res.status, await res.json()))
      .catch(err => console.log(err));
  };

  const preventReload = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <form id="login-form" onSubmit={preventReload}>
        <input
          type="text"
          id="login-form-input"
          className="text-input"
          placeholder="Username"
          ref={inputElement}
          autoFocus
        ></input>
        <button
          type="submit"
          className="button"
          id="login-form-submit"
          onClick={fetchUser}
        >
          Connect
        </button>
      </form>
    </div>
  );
};
