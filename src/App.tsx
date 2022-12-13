import './App.css';
import { LoginForm } from './components/Login';
import { RegisterForm } from './components/RegsisterComp';
import { useEffect, useState } from 'react';
import { MainPage } from './components/MainPageComp';
import { Context, MainContext, defaultContext, mainConType } from './UserContextAndTypes';
import { io, Socket } from "socket.io-client";

const socket: Socket = io('http://localhost:3000');

function App() {

  const [uCon, setUCon] = useState(new Context(defaultContext as Context));

  const mainCon: mainConType = {
    get: uCon,
    set: (uCon: Context) => setUCon({ ...uCon }),
  };

  const setIsLoggedIn = (bool: boolean): void => {
    if (bool) {
      setUCon({ ...uCon, isLoggedIn: bool });
    }
    else {
      uCon.socket.emit('comms', { action: 'Logout', data: uCon.user })
      setUCon({ ...uCon, isLoggedIn: bool });
    }
  };
  const setShowLoginForm = (bool: boolean): void => {
    setUCon({ ...uCon, showLoginForm: bool });
  };

  useEffect(() => {
    uCon.socket = socket as Socket;
    uCon.socket.on('connect', () => {
      console.log(uCon.socket.id);
    });
    uCon.socket.on('error', async (error: unknown) => {
      const err = error as Error;
      console.log(err);
      alert(err.message);
    });
  }, [uCon]);


  return (
    <MainContext.Provider value={mainCon}>
      <div className={mainCon.get.styles.app}>
        <div className="toolbar p-5">
          {uCon.isLoggedIn ? (
            <button className={uCon.styles.btnStyle} onClick={() => setIsLoggedIn(false)}>Log out</button>
          ) : (
            <button className={uCon.styles.btnStyle} onClick={() => { uCon.showLoginForm === true ? setShowLoginForm(false) : setShowLoginForm(true) }}>
              {uCon.showLoginForm ? 'Create an account' : 'Login'}
            </button>
          )}
        </div>
        {uCon.isLoggedIn ? (
          <MainPage />
        ) : (
          <>
            <h1>{uCon.showLoginForm ? 'User Login' : 'User Registration'}</h1>
            {uCon.showLoginForm ? <LoginForm /> : <RegisterForm />}
          </>
        )}
      </div>
    </MainContext.Provider >
  );
}

export default App;


