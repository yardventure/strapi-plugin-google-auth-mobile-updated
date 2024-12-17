'use strict';

const GOOGLE_AUTH_MOBILE = 'google-auth-mobile';
const USERS_PERMISSIONS = 'users-permissions';

const CREDENTIAL = 'credential';
const GOOGLE_AUTH = 'googleAuth';
const ROLE = 'role';
const USER = 'user';
const JWT = 'jwt';

const PLUGIN_API_NAMES = {
  GOOGLE_AUTH_MOBILE_CREDENTIAL: `plugin::${GOOGLE_AUTH_MOBILE}.${CREDENTIAL}`,
  USER_PERMISSIONS_ROLE: `plugin::${USERS_PERMISSIONS}.${ROLE}`,
  USER_PERMISSIONS_USER: `plugin::${USERS_PERMISSIONS}.${USER}`,
}

module.exports = {
  GOOGLE_AUTH_MOBILE,
  USERS_PERMISSIONS,
  CREDENTIAL,
  GOOGLE_AUTH,
  ROLE,
  USER,
  JWT,
  PLUGIN_API_NAMES
};