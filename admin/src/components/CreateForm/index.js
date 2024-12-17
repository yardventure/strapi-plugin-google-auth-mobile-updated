// @ts-nocheck
import React, { useState } from "react";
import { Box, TextInput, Flex, Button, Alert } from "@strapi/design-system";
import { useFetchClient } from "@strapi/helper-plugin";
import { Lock } from "@strapi/icons";
import pluginId from "../../pluginId";
import { TIMEOUT, wait } from "../../utils/alertsTimeout";

export const CreateForm = ({ onUpdate }) => {
  const { post } = useFetchClient();
  const [loadingOnCreate, setLoadingOnCreate] = useState(false);
  const [form, setForm] = useState({
    clientId: "",
    platformId: "",
    clientIdError: "",
    platformIdError: "",
    error: "",
  });

  const disableSaveButton = () => {
    if (!form.clientId || !form.platformId) {
      return true;
    }
    return false;
  };

  const closeAlert = () => {
    setForm({ ...form, error: ""});
  }

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let error = "";
    if (!e.target.value) {
      error = "Field is required!";
    }

    switch (e.target.name) {
      case `newClientIDInput`: {
        setForm({
          ...form,
          clientId: e.target.value,
          clientIdError: error,
        });
        break;
      }
      case `newPlatformInput`: {
        setForm({
          ...form,
          platformId: e.target.value,
          platformIdError: error,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingOnCreate(true);

    try {
      await post(`/${pluginId}/credentials`, {
        data: {
          client_id: form.clientId,
          platform: form.platformId,
        },
      });
      await onUpdate();
      setLoadingOnCreate(false);

      setForm({
        clientId: "",
        platformId: "",
        clientIdError: "",
        platformIdError: "",
        error: "",
      });
    } catch (error) {
      if (error?.response?.data?.error?.name === "ValidationError") {
        if (
          error?.response?.data?.error?.details?.errors[0]?.path[0] ===
          "platform"
        ) {
          setForm({
            ...form,
            platformIdError: error?.response?.data?.error?.message,
          });
        }
        if (
          error?.response?.data?.error?.details?.errors[0]?.path[0] ===
          "client_id"
        ) {
          setForm({
            ...form,
            clientIdError: error?.response?.data?.error?.message,
          });
        }
      } else {
        setForm({ ...form, error: "Unable to save credentials!" });
        await wait(TIMEOUT);
        closeAlert();
      }
      setLoadingOnCreate(false);
    }
  };

  return (
    <Box
      style={{ alignSelf: "center" }}
      background="neutral0"
      padding="4px"
      hasRadius={true}
    >
      {form.error && <Alert title={form.error} variant="danger" onClose={closeAlert}></Alert>}
      <Flex marginTop={4} justifyContent="space-between" alignItems="stretch">
        <Box
          style={{ flexGrow: 4 }}
          padding={4}
          hasRadius
          background="neutral0"
          shadow="tableShadow"
        >
          <TextInput
            required
            placeholder="*****************.apps.googleusercontent.com"
            error={form.clientIdError}
            label="Google Client ID"
            name={`newClientIDInput`}
            hint="Ends with apps.googleusercontent.com"
            value={form.clientId}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
          <TextInput
            style={{ alignSelf: "start" }}
            required
            placeholder="The name of the platform, ex. Android or iOS"
            error={form.platformIdError}
            label="Platform ID"
            name={`newPlatformInput`}
            value={form.platformId}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Flex
          padding={4}
          hasRadius
          background="neutral0"
          shadow="tableShadow"
          justifyContent="center"
        >
          <Button
            style={{ alignSelf: "center" }}
            disabled={disableSaveButton()}
            loading={loadingOnCreate}
            size="L"
            endIcon={<Lock />}
            onClick={handleCreate}
            variant="default"
          >
            Create
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
