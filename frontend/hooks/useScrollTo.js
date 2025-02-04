import { useCallback } from 'react';

const useScrollTo = () => {
  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log(`Scrolling to ${id} section...`); // Debugging
    } else {
      console.error(`${id} section not found.`);
    }
  }, []);

  return scrollTo;
};

export default useScrollTo;