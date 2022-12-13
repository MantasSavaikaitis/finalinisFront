import React from 'react';
import UserProfile from './contentComps/userProfile';

export function MainPage() {
  return (
    <div className="main-page">
      <h1>Welcome!</h1>
      <p>You have successfully logged in to your account.</p>
      <UserProfile />
    </div>
  );
}