import React, {useState} from 'react';
import UserContext from './weavy-user-context';

const UserProvider = ({children}) => {
  const [weavyUser, setUser] = useState(null);

  const weavyLogin = user => {
    setUser(user);
  };
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
