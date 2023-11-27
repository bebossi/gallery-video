import { create } from 'zustand';

interface UseSearchModalStore {
  isOpen: boolean;
  //   toggleSidebar: () => void;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal = create<UseSearchModalStore>((set) => ({
  isOpen: false,
  //   toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));

export default useSearchModal;
