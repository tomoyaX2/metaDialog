import { useEffect } from 'react';
import { useToaster } from 'rsuite';
import { useAppDispatch, useAppSelector } from 'src/store';
import { hideNotification } from 'src/store/notifications';
import { Toast } from './toast';

let timeout = setTimeout(() => {}, 0);

const useStoreEffects = () => {
  const dispatch = useAppDispatch();
  const toaster = useToaster();

  const { text, type, header, placement, isVisible } = useAppSelector(
    state => state.notifications
  );

  useEffect(() => {
    if (isVisible) {
      clearTimeout(timeout);
      toaster.push(<Toast type={type} header={header} text={text} />, {
        placement
      });
      timeout = setTimeout(() => {
        toaster.clear();
        dispatch(hideNotification());
      }, 3000);
    }
  }, [isVisible]);
};

export { useStoreEffects };
