import canvasSketch from 'canvas-sketch';
import { store } from 'react-notifications-component';
import { useEffect, useState } from 'react';

export const useCanvas = ({ canvas, sketch }) => {

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    let manager;

    async function start() {
      manager = await canvasSketch(sketch, {
        canvas,
        animate: true
      });
    };
    start()
      
    return () => {
      // clear canvas before changing route
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = 1;

      // Unload previous canvas sketch
      // console.log('manager', manager);
      manager?.unload()

      window.notificationIds?.forEach((id) => {
        store.removeNotification(id);
      });
      
      if (window.gui) {
        window.gui.domElement.style.display = 'none';
      }
    };
  }, [canvas, sketch]);
};