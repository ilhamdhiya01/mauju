import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkIsMobile = () => {
    // Anggap 768px sebagai breakpoint untuk mobile
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIsMobile(); // Cek saat komponen pertama kali dirender

    window.addEventListener('resize', checkIsMobile); // Tambahkan event listener

    // Bersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
