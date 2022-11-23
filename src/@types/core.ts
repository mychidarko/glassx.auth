import { SetStoreFn } from "glassx";

export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

export type InternalOptions = {
  userKey: string;
  tokenKey: string;
  refreshTokenKey: string;
  loginPath: string;
  logoutPath: string;
  dashboardPath: string;
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
