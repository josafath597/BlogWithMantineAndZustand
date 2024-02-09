// Primero importa cada componente por defecto
import CardCollection from './CardCollection';
import EntryModal from './EntryModal';
import HomeHeader from './HomeHeader';
import ModalAddEntry from './ModalAddEntry';

// Luego exporta cada componente. Aquí puedes elegir:
// 1. Mantenerlos como exportaciones por defecto (no ideal en un archivo de barril)
// 2. Convertirlos a exportaciones nominales (recomendado para archivos de barril)

// Opción 2: Convertir a exportaciones nominales
export {
  CardCollection, EntryModal, HomeHeader, ModalAddEntry,
};
