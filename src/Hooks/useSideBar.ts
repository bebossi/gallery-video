import { create } from 'zustand';

interface UseSidebarStore {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const useSidebar = create<UseSidebarStore>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebar;
