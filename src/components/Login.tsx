import { useRef, FormEvent, useContext } from 'react';
import { MainContext, mainConType, User } from '../UserContextAndTypes';

export function LoginForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mainCon = useContext(MainContext) as mainConType;



  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      mainCon.get.socket.emit('comms', { action: 'loginUser', data: { username, password } });
    }
  }

  mainCon.get.socket.on('loggedIn', (uObj) => {
    mainCon.get.isLoggedIn = true;
    mainCon.set({ ...mainCon.get, user: uObj as User });
  })

  return (
    <div> <form onSubmit={handleSubmit}>
      <p className={mainCon.get.styles.textStrings}>Username:</p>
      <div>
        <input className={mainCon.get.styles.label}
          type="text"
          ref={usernameRef}
        />
      </div>
      <p className={mainCon.get.styles.textStrings}>Password:</p>
      <div>
        <input className={mainCon.get.styles.label}
          type="password"
          ref={passwordRef}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
    </div>
  );
}