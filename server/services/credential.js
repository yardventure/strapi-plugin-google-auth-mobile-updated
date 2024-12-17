"use strict";

const { PLUGIN_API_NAMES } = require("../constants");

const { createCoreService } = require('@strapi/strapi').factories;

// @ts-ignore
module.exports = createCoreService(PLUGIN_API_NAMES.GOOGLE_AUTH_MOBILE_CREDENTIAL, {
  async findAll() {
    const entries = await strapi.db.query(PLUGIN_API_NAMES.GOOGLE_AUTH_MOBILE_CREDENTIAL).findMany();
    return entries;
  },
});