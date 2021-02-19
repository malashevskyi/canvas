import React from 'react'
import canvasSketch from 'canvas-sketch';
import { useEffect } from 'react';
import { store } from 'react-notifications-component';
// import gsap from 'gsap';

export default function setSketch(sketch, settings) {
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
        manager = await canvasSketch(sketch, {
          canvas,
          ...settings
        });
      };
      start()
        
      return () => {
        // clear canvas before changing route
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        
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

    return '';
  })
}
