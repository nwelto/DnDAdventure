// authContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { checkUser, registerUser } from '../auth';
import { firebase } from '../client';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        checkUser(fbUser.uid)
          .then((userInfo) => {
            if (userInfo) {
              setUser({ fbUser, ...userInfo });
            } else {
              // User doesn't exist; register them
              const newUserInfo = {
                uid: fbUser.uid,
                displayName: fbUser.displayName || fbUser.email,
                email: fbUser.email,
              };
              registerUser(newUserInfo).then(() => {
                setUser({ fbUser, ...newUserInfo });
              });
            }
          })
          .catch((error) => {
            console.error('Error during user check:', error);
            setUser(false);
          });
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
    }),
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
