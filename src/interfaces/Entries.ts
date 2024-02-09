export interface Entries {
  id: number;
  author: string;
  content: string;
  title: string;
  fecha_creacion: Date;
}

export interface EntryModalProps extends Entries {
  opened: boolean;
  close: () => void;
}

export type FilterType = 'author' | 'title' | 'content';

export interface NewEntry {
  author: string;
  content: string;
  fecha_creacion: Date;
  title: string;
}
