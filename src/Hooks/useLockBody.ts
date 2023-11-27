import { useLayoutEffect } from 'react';
import useFilterModal from './useFilterModal';
import useSearchModal from './useSearchModal';

export function useLockBody() {
  const filterModal = useFilterModal();
  const searchModal = useSearchModal();

  useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body,
    ).overflow;
    filterModal.isOpen || searchModal.isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'show');
    return () => (document.body.style.overflow = originalStyle);
  }, [filterModal.isOpen, searchModal.isOpen]);
}
