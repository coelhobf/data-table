const events = Object.keys(window)
  .map(key => key.match(/^on(.*)/)?.[1])
  .filter(Boolean);

function composedPath(el) {
  var path = [];
  while (el) {
    path.push(el);
    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
}

function retargetEvents(shadowRoot: ShadowRoot, eventNames: string[] = events) {
  let removeEventListeners = [];

  eventNames.forEach(function (eventName) {
    // console.log('eventName', eventName)
    function retargetEvent(event) {
      let path = event.path || (event.composedPath && event.composedPath()) || composedPath(event.target);
      // console.log('path', path)

      for (var i = 0; i < path.length; i++) {
        let el = path[i];

        el.target = path[0];
        if (event.cancelBubble) {
          break;
        }

        if (el === shadowRoot) {
          break;
        }

        let listenersArray = [];
        try {
          listenersArray = el.getEventListeners();
        } catch (e) {
          console.log('Catch!');
          console.log('element', el);
          console.log('event', e);
        }
        let listenersObj = {};
        listenersArray.forEach(entry => {
          listenersObj[entry.type] ||= [];
          listenersObj[entry.type].push(entry);
        });

        if (listenersObj.hasOwnProperty(eventName)) {
          // console.log(eventName, 'trigged!');
          // console.log('el', el);
          listenersObj[eventName].forEach(entry => {
            if(entry.useCapture) return;
            // console.log('entry', entry);
            // console.log(el);
            // console.log(event);
            // console.log('called by entry')
            entry.listener(event);
          });
        }
      }
    }

    shadowRoot.addEventListener(eventName, retargetEvent, false);

    removeEventListeners.push(function () {
      shadowRoot.removeEventListener(eventName, retargetEvent, false);
    });
  });

  return function () {
    removeEventListeners.forEach(function (removeEventListener) {
      removeEventListener();
    });
  };
}

export default retargetEvents;
