/* eslint-disable no-console */
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Entries, FilterType, NewEntry } from '../interfaces/Entries';
import entriesApi from '../api/axios';

interface EntriesState {
  isLoading: boolean;
  page: number;
  search: string;
  filter: FilterType;
  entries: Entries[];
  getEntries: (page?: number, search?: string, filter?: FilterType) => void;
  stateModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  addEntry: (entry: NewEntry) => void;
}

const entriesStore: StateCreator<EntriesState, [['zustand/devtools', never]]> = (set, get) => ({
  stateModal: false,
  entries: [],
  filter: 'title',
  isLoading: false,
  page: 0,
  search: '',
  openModal: () => set((state: EntriesState) => ({ ...state, stateModal: true })),
  closeModal: () => set((state: EntriesState) => ({ ...state, stateModal: false })),
  getEntries: async (page = 1, search = '', filter = 'title') => {
    if (page < 1) {
      return;
    }
    set((state: EntriesState) => ({ ...state, isLoading: true }), false, 'isLoading');
    try {
      const { data } = await entriesApi.post('/entries/getEntries', { search, filter, page });
      set((state: EntriesState) => ({
        ...state, entries: data, page, search, filter,
      }), false, 'data Cargada');
    } catch (error) {
      console.log(error);
      set((state: EntriesState) => ({ ...state, entries: [] }), false, 'Error');
      window.alert('Error al cargar las entradas. Por favor, inténtalo de nuevo.');
      throw new Error('Error al cargar las entradas');
    } finally {
      set((state: EntriesState) => ({ ...state, isLoading: false }), false, 'Termino de Cargar');
    }
  },
  addEntry: async (entry: NewEntry) => {
    set((state: EntriesState) => ({ ...state, isLoading: true }), false, 'isLoading');
    try {
      await entriesApi.post('/entries/addEntry', { ...entry, fecha_creacion: entry.fecha_creacion.toISOString().split('T')[0] });
      get().getEntries();
    } catch (error) {
      console.log(error);
      window.alert('Error al agregar la entrada. Por favor, inténtalo de nuevo.');
      throw new Error('Error al agregar la entrada');
    } finally {
      set((state: EntriesState) => ({ ...state, stateModal: false, isLoading: false }), false, 'Termino de Agregar entrada');
    }
  },
});

const useEntriesStore = create<EntriesState>()(
  devtools(
    persist(
      entriesStore,
      {
        name: 'EntriesStore',
        partialize: (state) => {
          const { isLoading, ...rest } = state;
          return rest;
        },
      },
    ),
  ),
);

export default useEntriesStore;
