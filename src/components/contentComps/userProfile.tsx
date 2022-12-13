import React from 'react';
import { useContext } from 'react';
import { MainContext, mainConType } from '../../UserContextAndTypes';

const UserProfile = () => {
  const mainCon = useContext(MainContext) as mainConType;

  return (
    <div>
      <h1>My Profile</h1>
      <p className={mainCon.get.styles.textStrings}>Username: {mainCon.get.user.username}</p>
      <p className={mainCon.get.styles.textStrings}>Email: {mainCon.get.user.email}</p>
      <div className={mainCon.get.styles.profilePictures}>
        {mainCon.get.user.imageUrl.map((img, i) => <div key={i} >
          <img className={mainCon.get.styles.singlePicture} src={img} alt="" />
        </div>)}
      </div>
    </div>
  );
};

export default UserProfile;