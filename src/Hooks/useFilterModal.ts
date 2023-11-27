import { create } from 'zustand';

interface UseFilterModalStore {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const useFilterModal = create<UseFilterModalStore>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useFilterModal;
