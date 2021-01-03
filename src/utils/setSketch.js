import canvasSketch from 'canvas-sketch';
import { useEffect } from 'react';
import { store } from 'react-notifications-component';

export default function setSketch(sketch, settings) {
  return () => {    
    useEffect(() => {
      
      let previousCanvas = document.querySelector('body > canvas');
      previousCanvas?.remove();
      
      canvasSketch(sketch, settings);
      
      return () => {
        // Clear interval from another route if exists,
        // otherwise intervals will multiply
        clearInterval(window.interval);
        
        window.notificationIds?.forEach((id) => {
          store.removeNotification(id);
        });

        if (window.gui) {
          window.gui.domElement.style.display = 'none';
        }

      };
    }, []);

    return '';
  };
}
