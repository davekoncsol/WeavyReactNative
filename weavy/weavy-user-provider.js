import React, {useState} from 'react';
import UserContext from './weavy-user-context';
import {API_URL} from './weavy-constants';
import {generateJWT} from './weavy-service';

const UserProvider = ({children}) => {
  const [weavyUser, setUser] = useState(null);
  const [weavyLgin, weavyLogin] = useState(null);

  return (
    <UserContext.Provider
      value={{
        weavyUser,
        weavyLogin,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
