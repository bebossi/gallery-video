import { create } from 'zustand';

interface UseFilterModalStore {
  isOpen: boolean;
  uploadDate: string;
  type: string;
  sortBy: string;
  toggleSidebar: () => void;
  setUploadDate: (value: string) => void;
  setType: (value: string) => void;
  setSortBy: (value: string) => void;
}

const useFilterModal = create<UseFilterModalStore>((set) => ({
  isOpen: false,
  uploadDate: '',
  type: '',
  sortBy: '',
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setUploadDate: (value) =>
    set((state) => ({ uploadDate: state.uploadDate === value ? '' : value })),
  setType: (value) =>
    set((state) => ({ type: state.type === value ? '' : value })),
  setSortBy: (value) =>
    set((state) => ({ sortBy: state.sortBy === value ? '' : value })),
}));

export default useFilterModal;
