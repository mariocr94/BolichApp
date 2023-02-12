import { KEY } from '@common/constants/keyCodes';
import { useEffect } from 'react';

const useKeyPress = (key: KEY, onEnter: Function) => {
   useEffect(() => {
      const handleEsc = (event: any) => {
         if (event.keyCode === 13) onEnter();
      };
      window.addEventListener('keydown', handleEsc);

      return () => {
         window.removeEventListener('keydown', handleEsc);
      };
   }, []);
};

export default useKeyPress;
