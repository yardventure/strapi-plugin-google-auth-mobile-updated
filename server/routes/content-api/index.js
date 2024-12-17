'use strict';

module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/connect',
      handler: 'googleAuth.connect',
      config: {
        auth: false,
        policies: [],
      },
    }
  ],
};