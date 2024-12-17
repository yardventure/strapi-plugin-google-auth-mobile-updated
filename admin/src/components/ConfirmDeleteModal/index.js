import React, { useState } from "react";
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Portal,
  Typography,
  Flex,
} from "@strapi/design-system";
// @ts-ignore
import { useFetchClient } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import { ERROR, SUCCESS, TIMEOUT, wait } from "../../utils/alertsTimeout";

const ConfirmDeleteModal = ({ onClose, onUpdate, id }) => {
  const { del } = useFetchClient();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleStatus = async (status, message) => {
    status === SUCCESS ? setIsSuccess(true) : setIsError(true);
    setMessage(message);
    setLoading(false);
    await wait(TIMEOUT);
    status === SUCCESS ? setIsSuccess(false) : setIsError(false);
    setMessage("");
    if (status === SUCCESS) onClose();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    try {
      await del(`/${pluginId}/credentials/${id}`);
      await onUpdate();
      await handleStatus(SUCCESS, "Entry was deleted successfully!");
    } catch (error) {
      await handleStatus(ERROR, "Unable to delete entry!");
    }
  };

  return (
    <Portal>
      <ModalLayout onClose={onClose} labelledBy="title" width="420px">
        <ModalHeader>
          <Typography
            fontWeight="bold"
            textColor="neutral800"
            as="h2"
            id="title"
          >
            Delete confirmation
          </Typography>
        </ModalHeader>
        <ModalBody>
          <Flex direction="column" gap="16px">
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="text"
            >
              Are you sure you want to delete CLIENT_ID for this app?
            </Typography>

            {isError && (
              <Typography
                fontWeight="bold"
                textColor="danger600"
                as="h2"
                id="error"
              >
                {message}
              </Typography>
            )}

            {isSuccess && (
              <Typography
                fontWeight="bold"
                textColor="success600"
                as="h2"
                id="success"
              >
                {message}
              </Typography>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter
          startActions={
            <>
              {!loading && (
                <Button variant="danger" onClick={handleDelete}>
                  Yes
                </Button>
              )}
              {loading && <Button loading>Loading...</Button>}
            </>
          }
          endActions={
            <Button onClick={onClose} variant="tertiary">
              Cancel
            </Button>
          }
        />
      </ModalLayout>
    </Portal>
  );
};

export default ConfirmDeleteModal;
