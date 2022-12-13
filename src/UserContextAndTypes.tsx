import React from 'react';
import { Socket } from 'socket.io-client';

//mainContextClass ============================================================================================
export class Context {
  isLoggedIn: boolean;
  user: User;
  showLoginForm: boolean;
  socket: Socket;
  error: Error;
  styles: Styles;


  constructor(context: Context) {
    this.isLoggedIn = context.isLoggedIn;
    this.user = context.user;
    this.showLoginForm = context.showLoginForm;
    this.socket = context.socket;
    this.error = context.error;
    this.styles = context.styles;
  }

}

export const defaultContext: Context = new Context({
  isLoggedIn: false,
  user: {} as User,
  showLoginForm: false,
  socket: {} as Socket,
  error: {} as Error,
  styles: {
    app: 'container text-center mx-auto bg-yellow-400',
    label: 'inline-block m-1 p-3 px-3 border border-solid border-yellow-800 w-4/12 text-center ',
    btnStyle: 'm-1 p-1 px-3 border border-solid border-black bg-yellow-700',
    textStrings: 'inline-block bg-yellow-300 w-4/12',
    singlePicture: 'm-1 p-1 px-3 border border-solid',
    profilePictures: 'flex flex-1'
  },
});

//types====================================================================================================

export type mainConType = {
  get: Context;
  set: (uCon: Context) => void;
}

interface Styles { [key: string]: string }

export type NewUser = {
  username: string,
  email: string,
  password: string,
  gender: string,
  age: number,
  city: string,
}

export type User = {
  _id: string,
  username: string,
  email: string,
  password: string,
  gender: string,
  imageUrl: string[],
  age: number,
  city: string,
}

//otherExports============================================================================================
export const MainContext = React.createContext<Context | mainConType>(defaultContext);


