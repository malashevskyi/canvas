import * as dat from 'dat.gui';

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


function getGui(callback) {
  window.gui?.destroy()
  window.gui = new dat.GUI();

  checkFPSExtension(visible => {
    if (visible) {
      window.gui.domElement.style.top = '85px';
    } else {
      window.gui.domElement.style.top = 0;
    }
  })

  callback(window.gui);
}

export default getGui;