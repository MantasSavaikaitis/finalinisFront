import { useRef, FormEvent, useContext } from 'react';
import { MainContext, mainConType, NewUser } from '../UserContextAndTypes';

export function RegisterForm() {
  const mainCon = useContext(MainContext) as mainConType;
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);


  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (password2Ref.current === null) {
        throw new Error('repeat pasword please');
      }
      if (usernameRef.current && emailRef.current && password1Ref.current && genderRef.current && ageRef.current && cityRef.current) {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const gender = genderRef.current.value;
        const age = Number(ageRef.current.value);
        const city = cityRef.current.value;
        const password = password1Ref.current.value === password2Ref.current.value ? password1Ref.current.value : false;
        if (!password)
          throw new Error('passwords doesnt match');
        mainCon.get.socket.emit("comms", {
          action: 'newUser',
          data: {
            username,
            email,
            password,
            gender,
            age,
            city
          } as NewUser,
        });
        mainCon.get.socket.on('registered', (bool: boolean) => {
          if (bool) {
            mainCon.get.showLoginForm = true;
            mainCon.set({ ...mainCon.get });
          }
        })
      }
    } catch (error) {
      const err = error as Error;
      alert(err.message);
    }
  }




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className={mainCon.get.styles.textStrings}>Username:</p>
        <div >
          <input className={mainCon.get.styles.label}
            type="text"
            ref={usernameRef}
          />
        </div>
        <p className={mainCon.get.styles.textStrings}>Email:</p>
        <div >
          <input className={mainCon.get.styles.label}
            type="email"
            ref={emailRef}
          />
        </div>
        <p className={mainCon.get.styles.textStrings}>Password:</p>
        <div >
          <input className={mainCon.get.styles.label}
            type="password"
            ref={password1Ref}
          />
        </div>
        <p className={mainCon.get.styles.textStrings}>Repeat password:</p>
        <div >
          <input className={mainCon.get.styles.label}
            type="password"
            ref={password2Ref}
          />
        </div>
        <p className={mainCon.get.styles.textStrings}>Gender:</p>
        <div >
          <select ref={genderRef}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>

        </div>
        <p className={mainCon.get.styles.textStrings}>Age:</p>
        <div >
          <input className={mainCon.get.styles.label}
            type="number"
            ref={ageRef}
          />
        </div>
        <p className={mainCon.get.styles.textStrings}>City:</p>
        <div >
          <input className={mainCon.get.styles.label}
            type="text"
            ref={cityRef}
          />
        </div>
        <button className={mainCon.get.styles.btnStyle} type="submit">Register</button>
      </form>
    </div>
  )
}
