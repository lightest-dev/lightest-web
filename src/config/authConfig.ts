import { AuthConfig } from 'angular-oauth2-oidc';
import { LOGIN_URL } from './apiConfig';

export const AUTH_CONFIG: AuthConfig = {
  // Url of the Identity Provider
  issuer: LOGIN_URL,
  requireHttps: false,
  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200',
  strictDiscoveryDocumentValidation: false,

  // URL of the SPA to redirect the user after silent refresh
  // silentRefreshRedirectUri: 'http://localhost:2020/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'client',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'api',
  clearHashAfterLogin: false
};
