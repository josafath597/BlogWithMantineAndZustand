/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Text } from '@mantine/core';
import { FC } from 'react';
import type { EntryModalProps } from '../../../interfaces/Entries';

const EntryModal: FC<EntryModalProps> = ({
  opened, close, title, author, content, fecha_creacion,
}) => (
  <Modal
    opened={opened}
    onClose={close}
    title={`${author} - ${fecha_creacion}`}
    radius={8}
    shadow="sm"
    overlayProps={{
      backgroundOpacity: 0.55,
      blur: 3,
    }}
  >
    <Text size="xl" fw={800} ta="center">
      {title}
    </Text>
    <Text size="lg" fw={400}>
      {content}
    </Text>
  </Modal>
);

export default EntryModal;
