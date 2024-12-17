import React, { useState, useEffect } from "react";
import { Box, Typography } from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
// @ts-ignore
import { useFetchClient } from "@strapi/helper-plugin";
import { EditForm } from "../EditForm";
import pluginId from "../../pluginId";
import { CreateForm } from "../CreateForm";

export const SettingsBlock = () => {
  const { get } = useFetchClient();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getAllCreds = async () => {
    try {
      const res = await get(`/${pluginId}/credentials`);
      if (res?.status === 200 && res?.data?.length > 0) {
        setData(res.data);
      } else if (res?.status === 200 && res?.data?.length === 0) {
        setError("Credentials have not been set yet");
      } else {
        throw Error();
      }
    } catch (e) {
      setError("Unable to get credentials from server");
    }
  };

  useEffect(() => {
    getAllCreds();
  }, []);

  return (
    <Box
      style={{ alignSelf: "center" }}
      background="neutral0"
      padding="32px"
      hasRadius={true}
    >
      <Box padding={4}>
        <Link
          isExternal
          href="https://console.cloud.google.com/projectcreate?previousPage=%2Fcloud-resource-manager%3Fproject%3D%26folder%3D%26organizationId%3D"
        >
          Create Google Project
        </Link>
      </Box>
      <Box padding={4}>
        <Typography variant="epsilon">
          You can also update your Credentials via &nbsp;
          <Link
            isInternal
            href="/admin/content-manager/collectionType/plugin::google-auth-mobile.credential?page=1&pageSize=10&sort=client_id:ASC"
          >
            Content Manager
          </Link>
        </Typography>
      </Box>
      <Box padding={4}>
        <Typography variant="beta">
          Create Google Authentication Details for new application.
        </Typography>
      </Box>
      <CreateForm onUpdate={getAllCreds}></CreateForm>
      {error && (
        <Box padding={4}>
          <Typography variant="epsilon">{error}</Typography>
        </Box>
      )}
      <Box padding={4}>
        <Typography variant="beta">
          Update your Google Authentication Details for existing applications.
        </Typography>
      </Box>
      {data.map((item) => (
        <EditForm item={item} onUpdate={getAllCreds}></EditForm>
      ))}
    </Box>
  );
};
