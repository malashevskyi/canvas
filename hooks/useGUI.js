import { useState, useEffect } from 'react';

function fpsObserver(locateGUI) {
  let observer = new MutationObserver(records => {
    const fpsHidden = records[0].target.matches('.is-hidden')
    
    fpsHidden ? locateGUI(false) : locateGUI(true);
  })
  observer.observe(document.querySelector('.fps-extension'), {
    attributes: true
  });
}

function checkFPSExtension(locateGUI) {
  const fps = document.querySelector('.fps-extension') 
  const fpsHidden = fps?.matches('.is-hidden') 
  
  if (fps && !fpsHidden) {
    if (window.gui) {
      locateGUI(true)
    }
  }

  let observer = new MutationObserver(records => {

    if (records[0].addedNodes) {
      for (let element of records[0].addedNodes) {

        const fps = element.classList?.contains('fps-extension') 
        const fpsHidden = element.classList?.contains('is-hidden') 
        
        if (fps && !fpsHidden) {
          locateGUI(true)
          observer.disconnect();
          fpsObserver(locateGUI);
        } else if (fps) {
          observer.disconnect();
          fpsObserver(locateGUI);
        }
      }
    }
  });
  observer.observe(document.body, {
    childList: true
  });
}

export const useGUI = () => {
  const [gui, setGUI] = useState(null);

  useEffect(() => {
    // load once when first sketch loaded
    const dat = require('dat.gui');

    const gui = new dat.GUI;
    // hide on default, then in a sketch - gui.show(), gui.add...
    gui.hide();
    setGUI(gui);

  }, []);
  
  useEffect(() => {
    // check if fps extension enable, then change gui position
    checkFPSExtension(visible => {
      if (!gui) return;
      const guiDom = gui.domElement;
  
      if (visible) {
        guiDom.style.top = '85px';
      } else {
        guiDom.style.top = 0;
      }
    });

    // unmount
    return () => {
      // gui? check first load

      // hide on default, then in a sketch - gui.show(), gui.add...
      gui?.hide();

      // remove all properties from previous sketch
      gui?.__controllers.forEach(controller => {
        controller.remove();
      });
    }
  });

  return gui;
};