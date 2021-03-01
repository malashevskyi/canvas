import { getURL } from 'next/dist/next-server/lib/utils';
import { useEffect } from 'react';
import { store } from 'react-notifications-component';

export const useNotification = ({ message, delay = 0 }) => {
  const notificationId = Math.random();

  useEffect(() => {

    const timeout = setTimeout(() => {
      store.addNotification({
        showIcon: true,
        title: 'Info',
        message,
        type: 'info',
        id: notificationId,
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated animated flipInY"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }, delay);

    return () => {
      clearTimeout(timeout);
      store.removeNotification(notificationId);
    };
  }, []);
};