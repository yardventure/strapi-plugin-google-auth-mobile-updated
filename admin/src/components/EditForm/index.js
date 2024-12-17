// @ts-nocheck
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextInput,
  Flex,
  Button,
  Alert,
} from "@strapi/design-system";
import { useFetchClient } from "@strapi/helper-plugin";
import { Write, Lock, Cross, Trash } from "@strapi/icons";
import pluginId from "../../pluginId";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { TIMEOUT, wait } from "../../utils/alertsTimeout";

export const EditForm = ({ item, onUpdate }) => {
  const { put } = useFetchClient();
  const [buttonsDisabled, setButtonsDisabled] = useState({
    edit: true,
    save: true,
  });
  const [loadingOnSave, setLoadingOnSave] = useState(false);
  const [form, setForm] = useState({
    clientIdInputValue: item.client_id,
    platformIdInputValue: item.platform,
    platformIdSavedValue: item.platform,
    clientIdSavedValue: item.client_id,
    clientIdError: "",
    platformIdError: "",
    error: "",
  });
  const [modalOpened, setModalOpened] = useState(false);

  const openDeleteModal = () => {
    setModalOpened(true);
  };

  const closeDeleteModal = () => {
    setModalOpened(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setButtonsDisabled({ edit: !buttonsDisabled.edit, save: true });
    setForm({
      ...form,
      clientIdInputValue: form.clientIdSavedValue,
      platformIdInputValue: form.platformIdSavedValue,
      clientIdError: "",
      platformIdError: "",
      error: "",
    });
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
      case `${item.platform}clientIDInput`: {
        if (!e.target.value || e.target.value === form.clientIdSavedValue) {
          setButtonsDisabled({ ...buttonsDisabled, save: true });
        } else {
          setButtonsDisabled({ ...buttonsDisabled, save: false });
        }

        setForm({
          ...form,
          clientIdInputValue: e.target.value,
          clientIdError: error,
        });
        break;
      }
      case `${item.platform}platformInput`: {
        if (!e.target.value || e.target.value === form.platformIdSavedValue) {
          setButtonsDisabled({ ...buttonsDisabled, save: true });
        } else {
          setButtonsDisabled({ ...buttonsDisabled, save: false });
        }

        setForm({
          ...form,
          platformIdInputValue: e.target.value,
          platformIdError: error,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingOnSave(true);

    try {
      await put(`/${pluginId}/credentials/${item.id}`, {
        data: {
          client_id: form.clientIdInputValue,
          platform: form.platformIdInputValue,
        },
      });
      await onUpdate();
      setLoadingOnSave(false);
      setForm({
        ...form,
        platformIdSavedValue: form.platformIdInputValue,
        clientIdSavedValue: form.clientIdInputValue,
      });
      setButtonsDisabled({ ...buttonsDisabled, edit: true });
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
        closeAlert()
      }
      setLoadingOnSave(false);
    }
  };

  return (
    <Box
      style={{ alignSelf: "center" }}
      background="neutral0"
      padding="4px"
      hasRadius={true}
    >
      <Box padding={4}>
        <Flex justifyContent="start" gap="5">
          <Typography variant="delta">
            {item?.platform?.toUpperCase()
              ? item.platform.toUpperCase()
              : "No platform"}
          </Typography>
          <Flex gap="5">
            <Button
              endIcon={buttonsDisabled.edit ? <Write /> : <Cross />}
              onClick={handleEdit}
              variant={buttonsDisabled.edit ? "secondary" : "tertiary"}
            >
              {buttonsDisabled.edit ? "Edit" : "Cancel"}
            </Button>
            <Button
              endIcon={<Trash />}
              onClick={openDeleteModal}
              variant="danger-light"
            >
              Delete
            </Button>
            {modalOpened && (
              <ConfirmDeleteModal
                onClose={closeDeleteModal}
                onUpdate={onUpdate}
                id={item.id}
              ></ConfirmDeleteModal>
            )}
          </Flex>
        </Flex>
      </Box>
      {form.error && <Alert title={form.error} variant="danger" onClose={closeAlert}></Alert>}
      <Flex justifyContent="space-between" alignItems="stretch">
        <Box
          style={{ flexGrow: 3 }}
          padding={4}
          hasRadius
          background="neutral0"
          shadow="tableShadow"
        >
          <TextInput
            required
            disabled={buttonsDisabled.edit}
            placeholder="*****************.apps.googleusercontent.com"
            error={form.clientIdError}
            label="Google Client ID"
            name={`${item?.platform}clientIDInput`}
            hint="Ends with apps.googleusercontent.com"
            value={form.clientIdInputValue}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
          <TextInput
            style={{ alignSelf: "start" }}
            required
            disabled={buttonsDisabled.edit}
            placeholder="The name of the platform, ex. Android or iOS"
            label="Platform ID"
            error={form.platformIdError}
            name={`${item?.platform}platformInput`}
            value={form.platformIdInputValue}
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
            disabled={buttonsDisabled.edit || buttonsDisabled.save}
            loading={loadingOnSave}
            size="L"
            endIcon={<Lock />}
            onClick={handleSave}
            variant="default"
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
