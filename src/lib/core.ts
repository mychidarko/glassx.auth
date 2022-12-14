import GlassX from 'glassx';
import { InternalOptions } from './../@types';

/**
 * Configuration options for GlassX Auth.
 */
export default class Auth {
  private static _options: InternalOptions = {
    userKey: 'user',
    tokenKey: 'token',
    refreshTokenKey: 'refreshToken',
    loginPath: '/auth/login',
    logoutPath: '/logout',
    dashboardPath: '/dashboard',
    environment: 'react',
    router: null,
    glassx: GlassX
  };

  public static config(options: Partial<InternalOptions>) {
    this._options = { ...this._options, ...options };
  }

  public static options(
    key: keyof InternalOptions
  ): InternalOptions[keyof InternalOptions];

  public static options(): InternalOptions;

  /**
   * @inheritdoc
   */
  public static options(key?: keyof InternalOptions) {
    return key ? this._options[key] : this._options;
  }
}
