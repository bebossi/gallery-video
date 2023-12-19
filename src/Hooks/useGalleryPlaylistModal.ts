import { create } from 'zustand';

interface UseGalleryPlaylistModalStore {
  isOpen: boolean;
  onOpen: (playlistId: string) => void;
  onClose: () => void;

  playlistId: string;
}

const useGalleryPlaylistModal = create<UseGalleryPlaylistModalStore>((set) => ({
  isOpen: false,
  playlistId: '',
  onOpen: (playlistId: string) => set({ isOpen: true, playlistId }),
  onClose: () => set({ isOpen: false, playlistId: '' }),
}));

export default useGalleryPlaylistModal;
