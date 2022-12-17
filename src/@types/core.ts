import { SetStoreFn } from 'glassx';

export interface Router extends Record<string, any> {
  navigate: (screen: string) => any;
}

export type InternalOptions = {
  userKey: string;
  tokenKey: string;
  refreshTokenKey: string;
  loginPath: string;
  logoutPath: string;
  dashboardPath: string;
  environment: 'react' | 'react-native';
  /**
   * Router
   * ----
   * This field allows you to add a custom router for routing between auth and guest screen
   */
  router?: Router;
};

export type AuthState = {
  user: any;
  setUser: SetStoreFn;
  token: any;
  setToken: SetStoreFn;
  refreshToken?: any;
  setRefreshToken?: SetStoreFn;
  logout: (callback?: VoidFunction) => void;
};

export type GuestState = {
  user: any;
  login: (items: { user: any; token: any; refreshToken?: any }) => void;
};
