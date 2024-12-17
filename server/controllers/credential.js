"use strict";

const { PLUGIN_API_NAMES, GOOGLE_AUTH_MOBILE, CREDENTIAL } = require("../constants");

const { createCoreController } = require('@strapi/strapi').factories;

// @ts-ignore
module.exports = createCoreController(PLUGIN_API_NAMES.GOOGLE_AUTH_MOBILE_CREDENTIAL, {
  async findAll() {
    const entries = await strapi
      .plugin(GOOGLE_AUTH_MOBILE)
      .service(CREDENTIAL)
      .findAll();
      
    return entries;
  }
});