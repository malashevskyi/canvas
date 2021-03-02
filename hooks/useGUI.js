import { useState, useEffect } from 'react';

function fpsObserver(locateGUI) {
  const observer = new MutationObserver((records) => {
    const fpsHidden = records[0].target.matches('.is-hidden');

    if (fpsHidden) {
      locateGUI(false);
    } else {
      locateGUI(true);
    }
  });
  observer.observe(document.querySelector('.fps-extension'), {
    attributes: true,
  });
}

function checkFPSExtension(locateGUI) {
  let fps = document.querySelector('.fps-extension');
  let fpsHidden = fps?.matches('.is-hidden');

  if (fps && !fpsHidden) {
    if (window.gui) {
      locateGUI(true);
    }
  }

  const observer = new MutationObserver((records) => {
    if (records[0].addedNodes) {
      records[0].addedNodes.forEach((element) => {
        fps = element.classList?.contains('fps-extension');
        fpsHidden = element.classList?.contains('is-hidden');

        if (fps && !fpsHidden) {
          locateGUI(true);
          observer.disconnect();
          fpsObserver(locateGUI);
        } else if (fps) {
          observer.disconnect();
          fpsObserver(locateGUI);
        }
      });
    }
  });
  observer.observe(document.body, {
    childList: true,
  });
}

const useGUI = () => {
  const [gui, setGUI] = useState(null);

  useEffect(() => {
    // load once when first sketch loaded
    /* eslint-disable-next-line */
    const dat = require('dat.gui');

    const newGUI = new dat.GUI();
    // hide on default, then in a sketch - gui.show(), gui.add...
    newGUI.hide();
    setGUI(newGUI);
  }, []);

  useEffect(() => {
    // check if fps extension enable, then change gui position
    checkFPSExtension((visible) => {
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
      /* eslint-disable-next-line */
      gui?.__controllers.forEach((controller) => {
        controller.remove();
      });
    };
  });

  return gui;
};

export default useGUI;
