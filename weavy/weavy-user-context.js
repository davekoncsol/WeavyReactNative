import {createContext} from 'react';

const UserContext = createContext({
  weavyUser: null,
  weavyLogin: () => null,
  logout: () => null,
});

export default UserContext;
