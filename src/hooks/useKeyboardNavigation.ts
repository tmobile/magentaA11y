import { useEffect, useState } from 'react';

export const useKeyboardNavigation = () => {
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);

  useEffect(() => {
    const handleKeyDown = () => setIsKeyboardNavigation(true);
    const handleMouseDown = () => setIsKeyboardNavigation(false);

    window.addEventListener('keyup', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchstart', handleMouseDown);

    return () => {
      window.removeEventListener('keyup', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleMouseDown);
    };
  }, []);

  return isKeyboardNavigation;
};
