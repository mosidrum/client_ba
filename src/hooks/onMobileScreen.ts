import { useEffect, useState } from 'react';

export const onMobileScreen = (sizeOfScreen: string) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = window.matchMedia(sizeOfScreen);
    if (check.matches !== isMobile) {
      setIsMobile(check.matches);
    }
    const eventListener = () => setIsMobile(check.matches);
    window.addEventListener('resize', eventListener);
    return () => window.removeEventListener('resize', eventListener);
  }, [isMobile, sizeOfScreen]);
  
  return isMobile;
};
