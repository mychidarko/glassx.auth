import * as React from 'react';
import { useStore } from 'glassx';
import { AuthState, GuestState } from './../@types';
import Auth from './core';

export function withAuth<Types>(WrappedComponent: React.FC<Types & AuthState>) {
  const AuthWrapper = (props: any) => {
    const [user, setUser] = useStore(Auth.options('userKey'));
    const [token, setToken] = useStore(Auth.options('tokenKey'));
    const [refreshToken, setRefreshToken] = useStore(
      Auth.options('refreshTokenKey')
    );

    const logout: AuthState['logout'] = (callback) => {
      setUser(null);
      setToken(null);
      setRefreshToken(null);

      if (callback) callback();
    };

    if (Auth.options('environment') === 'react') {
      if (typeof window !== 'undefined') {
        if (!Boolean(user)) {
          window.location.replace(Auth.options('loginPath'));
          return null;
        }

        return (
          <WrappedComponent
            {...{
              user,
              setUser,
              token,
              setToken,
              refreshToken,
              setRefreshToken,
              logout,
              ...props
            }}
          />
        );
      }
    } else {
      const router = Auth.options('router');

      if (!Boolean(user)) {
        router?.navigate(Auth.options('loginPath'));
        return null;
      }

      return (
        <WrappedComponent
          {...{
            user,
            setUser,
            token,
            setToken,
            refreshToken,
            setRefreshToken,
            logout,
            ...props
          }}
        />
      );
    }

    return null;
  };

  return AuthWrapper;
}

export function asGuest<Types> (WrappedComponent: React.FC<Types & GuestState>) {
  const AuthWrapper = (props: any) => {
    const [user, setUser] = useStore(Auth.options('userKey'));
    const [, setToken] = useStore(Auth.options('tokenKey'));
    const [, setRefreshToken] = useStore(
      Auth.options('refreshTokenKey')
    );

    const login: GuestState['login'] = (loginItems) => {
      setUser(loginItems.user);
      setToken(loginItems.token);

      if (loginItems.refreshToken) {
        setRefreshToken(loginItems.refreshToken);
      }
    }

    if (Auth.options('environment') === 'react') {
      if (typeof window !== 'undefined') {
        if (Boolean(user)) {
          window.location.replace(Auth.options('dashboardPath'));
          return null;
        }

        return (
          <WrappedComponent
            {...{
              user,
              login,
              ...props
            }}
          />
        );
      }
    } else {
      const router = Auth.options('router');

      if (Boolean(user)) {
        router?.navigate(Auth.options('dashboardPath'));
        return null;
      }

      return (
          <WrappedComponent
            {...{
              user,
              login,
              ...props
            }}
          />
        );
    }

    return null;
  };

  return AuthWrapper;
};
