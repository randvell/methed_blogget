import React from 'react';
import PropTypes from 'prop-types';
import {useToken} from '../hooks/useToken';

export const tokenContext = React.createContext({});

export const TokenContextProvider = ({children}) => {
  const {token, revokeToken} = useToken('');

  return (
    <tokenContext.Provider value={{token, revokeToken}}>
      {children}
    </tokenContext.Provider>
  );
};

TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
