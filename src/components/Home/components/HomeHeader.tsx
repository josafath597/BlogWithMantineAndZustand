/* eslint-disable react/jsx-props-no-spreading */
import {
  Button, Grid, Select, TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useEntriesStore from '../../../store/useEntriesStore';
import type { FilterType } from '../../../interfaces/Entries';

const options = [
  { value: 'author', label: 'Autor' },
  { value: 'title', label: 'Titulo' },
  { value: 'content', label: 'Contenido' },
];

interface Values {
  search: string;
  filter: string;
}

const style = { display: 'flex', gap: 10, alignItems: 'flex-end' };

const HomeHeader = () => {
  const form = useForm({
    initialValues: {
      search: '',
      filter: 'author',
    },
    validate: {
      search: (value) => (/\S/.test(value) ? null : 'El campo no debe estar vacio'),
    },
  });

  const getEntries = useEntriesStore((state) => state.getEntries);
  const page = useEntriesStore((state) => state.page);
  const search = useEntriesStore((state) => state.search);
  const entries = useEntriesStore((state) => state.entries);
  const openModal = useEntriesStore((state) => state.openModal);

  const Submit = (values: Values) => {
    getEntries(1, values.search, values.filter as FilterType);
    form.reset();
  };

  return (
    <Grid mb="xl">
      <Grid.Col span={{ base: 12, md: 4 }}>
        <form
          onSubmit={form.onSubmit(Submit)}
          style={style}
        >
          <TextInput
            label="Buscar"
            placeholder="Haz una Busqueda"
            required
            autoComplete="nope"
            {...form.getInputProps('search')}
            style={{
              maxWidth: '10rem',
            }}
          />
          <Select
            comboboxProps={{ withinPortal: true }}
            data={options}
            label="Filtro"
            style={{
              maxWidth: '8rem',
            }}
            {...form.getInputProps('filter')}
            allowDeselect={false}
          />
          <Button type="submit">Buscar</Button>
        </form>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }} style={style}>
        <Button type="submit" color="blue" onClick={openModal}>Nueva Entrada</Button>
        <Button type="submit" onClick={() => getEntries(1, '')}>Restablecer</Button>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }} style={{ ...style, justifyContent: 'flex-end' }}>
        <Button type="submit" disabled={page < 2} onClick={() => getEntries(page - 1, search)}>Anterior</Button>
        <Button type="submit" disabled={entries.length < 70} onClick={() => getEntries(page + 1, search)}>Siguiente</Button>
      </Grid.Col>
    </Grid>
  );
};

export default HomeHeader;
