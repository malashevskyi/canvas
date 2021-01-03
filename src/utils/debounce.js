import { store } from 'react-notifications-component';

function debounce({message, title, type}) {
  let timeout;
  return () => {
    clearTimeout(timeout);

    window.notificationIds.forEach((id) => {
      store.removeNotification(id);
    });

    timeout = setTimeout(() => {
      const id = Math.random() * Math.random();
      window.notificationIds?.push(id)

      store.addNotification({
        showIcon: true,
        title,
        message,
        type,
        id,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated animated flipInY"],
      });
    }, 1000)
  }
}

function debounce2() {
  function clear() {
    clearInterval(window.interval)
  }
  // Clear intervals when browser tab changes.
  // If you need to resume interval, you can check
  // (document.visibilityState === 'visible') inside sketch function
  document.addEventListener('visibilitychange', clear);
  
  return (func, delay) => {
    // Clear previous intervals before creating the new one;
    clear();
    window.interval = setInterval(func, delay);
  }
}

export const debounceInterval = debounce2();

export const debounceNotification = debounce({
  message: 'You can also click to see an animation',
  title: 'Info',
  type: 'info'
})