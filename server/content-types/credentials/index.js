module.exports = {
  kind: "collectionType",
  info: {
    displayName: "Google Creds",
    singularName: "credential",
    pluralName: "credentials",
    description: "Stores google auth credentials",
    tableName: "mobile_auth_creds",
  },
  options: {
    privateAttributes: ["id", "created_at"],
    populateCreatorFields: true,
    draftAndPublish: false,
  },
  pluginOptions: {
    "content-manager": {
      visible: true,
    },
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    client_id: {
      type: "string",
      configurable: false,
      required: true,
      unique: true,
      default: null,
    },
    platform: {
      type: "string",
      configurable: false,
      required: true,
      unique: true,
      default: null
    }
  },
};
