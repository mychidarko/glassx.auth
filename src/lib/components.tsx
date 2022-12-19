import * as React from 'react';
import { AuthState, GuestState } from './../@types';
import Auth from './core';

export function withAuth<Types>(WrappedComponent: React.FC<Types & AuthState>) {
  const AuthWrapper = (props: any) => {
    const GlassX = Auth.options('glassx');

    const [user, setUser] = GlassX.useStore(Auth.options('userKey'));
    const [token, setToken] = GlassX.useStore(Auth.options('tokenKey'));
    const [refreshToken, setRefreshToken] = GlassX.useStore(
      Auth.options('refreshTokenKey')
    );

    const logout: AuthState['logout'] = callback => {
      setUser(null);
      setToken(null);
      setRefreshToken(null);

      if (callback) callback();
    };

    React.useEffect(() => {
      if (Auth.options('environment') === 'react') {
        if (typeof window !== 'undefined') {
          if (!Boolean(user)) {
            window.location.replace(Auth.options('loginPath'));
          }
        }
      } else {
        if (!Boolean(user)) {
          const router = props?.navigation ?? Auth.options('router');

          if (router?.replace) {
            router?.replace?.(Auth.options('loginPath'));
          } else {
            router?.navigate?.(Auth.options('loginPath'));
          }
        }
      }
    }, [user]);

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
  };

  return AuthWrapper;
}

export function asGuest<Types>(WrappedComponent: React.FC<Types & GuestState>) {
  const AuthWrapper = (props: any) => {
    const GlassX = Auth.options('glassx');

    const [user, setUser] = GlassX.useStore(Auth.options('userKey'));
    const [, setToken] = GlassX.useStore(Auth.options('tokenKey'));
    const [, setRefreshToken] = GlassX.useStore(
      Auth.options('refreshTokenKey')
    );

    const login: GuestState['login'] = loginItems => {
      setUser(loginItems.user);
      setToken(loginItems.token);

      if (loginItems.refreshToken) {
        setRefreshToken(loginItems.refreshToken);
      }
    };

    React.useEffect(() => {
      if (Auth.options('environment') === 'react') {
        if (typeof window !== 'undefined') {
          if (Boolean(user)) {
            window.location.replace(Auth.options('dashboardPath'));
          }
        }
      } else {
        if (Boolean(user)) {
          const router = props?.navigation ?? Auth.options('router');

          if (router?.replace) {
            router?.replace?.(Auth.options('dashboardPath'));
          } else {
            router?.navigate?.(Auth.options('dashboardPath'));
          }
        }
      }
    }, [user]);

    return (
      <WrappedComponent
        {...{
          login,
          ...props
        }}
      />
    );
  };

  return AuthWrapper;
}
