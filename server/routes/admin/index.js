'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/credentials',
      handler: 'credential.findAll',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/credentials/:id',
      handler: 'credential.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/credentials',
      handler: 'credential.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/credentials/:id',
      handler: 'credential.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/credentials/:id',
      handler: 'credential.delete',
      config: {
        policies: [],
      },
    }
  ],
};