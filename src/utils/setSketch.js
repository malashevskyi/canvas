import React from 'react'
import canvasSketch from 'canvas-sketch';
import { useEffect } from 'react';
import { store } from 'react-notifications-component';

export default function setSketch(Sketch, settings) {
  return React.forwardRef((props, ref) => {
    
    useEffect(() => {
      const canvas = ref.current;
      // if (window.countRoute) {
      //   window.countRoute++
      // } else {
      //   window.countRoute = 1
      // }
      // console.log(window.countRoute);
      
      let manager;

      // clear previos canvas timeout
      clearTimeout(window.timeout);

      async function start() {
        manager = await canvasSketch(Sketch, {
          canvas,
          ...settings
        });
      };
      start()
        
      return () => {
        // clear canvas before changing route
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        // stop all gsap
        // gsap.globalTimeline.pause()
        for (let keyTls in window.tls) {
          for (let i = 0; i < window.tls[keyTls].length; i++) {
            const tl = window.tls[keyTls][i];

            tl.pause();
          }
        }
        
        // Unload previous canvas sketch
        manager.unload()

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
    }, [ref]);

    return <Sketch />;
  })
}
