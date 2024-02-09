/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Grid, Modal, TextInput, Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import useEntriesStore from '../../../store/useEntriesStore';
import { NewEntry } from '../../../interfaces/Entries';
import 'dayjs/locale/es';
import CustomLoader from '../../loader/CustomLoader';

const ModalAddEntry = () => {
  const stateModal = useEntriesStore((state) => state.stateModal);
  const closeModal = useEntriesStore((state) => state.closeModal);
  const addEntry = useEntriesStore((state) => state.addEntry);
  const isLoading = useEntriesStore((state) => state.isLoading);

  const form = useForm({
    initialValues: {
      title: '',
      author: '',
      content: '',
      fecha_creacion: new Date(),
    },
    validate: {
      title: (value) => (/\S/.test(value) ? null : 'El campo no debe estar vacio'),
      author: (value) => (/\S/.test(value) ? null : 'El campo no debe estar vacio'),
      content: (value) => (/\S/.test(value) ? null : 'El campo no debe estar vacio'),
      fecha_creacion: (value) => {
        if (value > new Date()) {
          return 'La fecha no puede ser futura';
        }
        return null;
      },
    },
  });

  const Submit = (values: NewEntry) => {
    addEntry(values);
    form.reset();
    form.setFieldValue('fecha_creacion', new Date());
  };

  const onClose = () => {
    if (!isLoading) {
      closeModal();
      form.reset();
      form.setFieldValue('fecha_creacion', new Date());
    }
  };

  return (
    <Modal opened={stateModal} onClose={onClose} title="Nueva Entrada">
      {
        isLoading ? (
          <CustomLoader />
        ) : (
          <form onSubmit={form.onSubmit(Submit)}>
            <Grid>
              <Grid.Col span={{ base: 12 }}>
                <TextInput
                  label="Título"
                  placeholder="Proporciona un título a la entrada"
                  required
                  autoComplete="nope"
                  {...form.getInputProps('title')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <TextInput
                  label="Autor"
                  placeholder="Proporciona un autor a la entrada"
                  required
                  autoComplete="nope"
                  {...form.getInputProps('author')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <DateTimePicker
                  locale="es"
                  label="Fecha"
                  {...form.getInputProps('fecha_creacion')}
                  maxDate={new Date()}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12 }}>
                <Textarea
                  label="Contenido"
                  placeholder="Proporciona un contenido a la entrada"
                  required
                  autoComplete="nope"
                  autosize
                  minRows={4}
                  maxRows={4}
                  {...form.getInputProps('content')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12 }} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="filled" size="sm" type="submit">
                  Crear Entrada
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        )
      }
    </Modal>
  );
};

export default ModalAddEntry;
