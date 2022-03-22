import React, {useState} from 'react';
import UserContext from './weavy-user-context';

const UserProvider = ({children}) => {
  const [weavyUser, setUser] = useState(null);

  const weavyLogin = (weavyUser) => {
    setUser(weavyUser);
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
