import GlassX, { SetStoreFn } from 'glassx';

export type InternalOptions = {
  userKey: string;
  tokenKey: string;
  refreshTokenKey: string;
  loginPath: string;
  logoutPath: string;
  dashboardPath: string;
  environment: 'react' | 'react-native';
  router?: any;
  glassx?: GlassX;
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
  login: (items: { user: any; token: any; refreshToken?: any }) => void;
};
