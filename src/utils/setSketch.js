import React from 'react'
import canvasSketch from 'canvas-sketch';
import { useEffect } from 'react';
import { store } from 'react-notifications-component';
// import gsap from 'gsap';

export default function setSketch(sketch, settings) {
  return React.forwardRef((props, ref) => {    

    useEffect(() => {
      // if (window.countRoute) {
      //   window.countRoute++
      // } else {
      //   window.countRoute = 1
      // }
      // console.log(window.countRoute);
      let manager;

      async function start() {
        manager = await canvasSketch(sketch, {
          canvas: ref.current,
          ...settings
        });
      };
      start()
        
      return () => {
        // gsap.globalTimeline.pause();
        
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
