/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button, Card, Grid, Stack, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import type { EntryModalProps } from '../../../interfaces/Entries';
import useEntriesStore from '../../../store/useEntriesStore';
import EntryModal from './EntryModal';
import CustomLoader from '../../loader/CustomLoader';

const CardCollection = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [selectedEntry, setSelectedEntry] = useState<EntryModalProps | null>(null);

  const getEntries = useEntriesStore((state) => state.getEntries);
  const entries = useEntriesStore((state) => state.entries);
  const isLoading = useEntriesStore((state) => state.isLoading);

  useEffect(() => {
    getEntries();
  }, []);

  const handleOpenModal = (entry: EntryModalProps) => {
    setSelectedEntry(entry);
    toggle();
  };
  return (
    isLoading ? (
      <CustomLoader />
    ) : (
      <>
        <Grid>
          {
          entries.map((entry) => (
            <Grid.Col
              span={{
                base: 12, xl: 3, md: 4, sm: 6, xs: 12,
              }}
              key={entry.id}
            >
              <Card shadow="sm" radius="md" withBorder style={{ minHeight: '15rem' }}>
                <Stack mb="xs" gap={1}>
                  <Text size="sm" fw={400} lineClamp={1}>{entry.author}</Text>
                  <Text size="xl" fw={600} lineClamp={1}>{entry.title}</Text>
                </Stack>
                <Text size="sm" c="dimmed" lineClamp={4}>
                  {entry.content}
                </Text>
                <Button variant="light" size="xs" style={{ marginTop: 'auto' }} onClick={() => handleOpenModal({ ...entry, opened, close })}>
                  Leer más
                </Button>
              </Card>
            </Grid.Col>
          ))
        }
        </Grid>
        {
          selectedEntry && (
            <EntryModal
              id={selectedEntry.id}
              author={selectedEntry.author}
              content={selectedEntry.content}
              title={selectedEntry.title}
              fecha_creacion={selectedEntry.fecha_creacion}
              opened={opened}
              close={close}
            />
          )
        }
      </>
    )
  );
};

export default CardCollection;
