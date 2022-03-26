import React from 'react';

const ConnectionContext = React.createContext({
  connect: () => null,
  proxy: null,
  notificationCount: null,
});

export default ConnectionContext;
