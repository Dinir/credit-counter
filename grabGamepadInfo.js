const rAF = window.requestAnimationFrame;

const gamepads = {};

const handler = {
  connect: function(e) {
    gamepads[e.index] = e;
    console.log(`${e.index} connected`);
  },
  disconnect: function(e) {
    console.log(`disconnecting ${e.index}`);
    delete gamepads[e.index];
  },
  /**
   * scans currently connected gamepads and add/remove it to/from the given array.
   *
   * it gets gamepads from `navigator.getGamepads()`
   * then it check if any gamepads in it is already in the array.
   * if it's new to the array, the function will add it to the array.
   *
   * @param {object} gamepadObjects object containing gamepad objects
   */
  refresh: function(gamepadObjects) {
    // I assume this web thing will only run on Chrome environments,
    // so not adding any other forms of this method.
    let rawGamepads = Array.from(navigator.getGamepads());
    let rawIndexes = rawGamepads.map((v) => { if(v) return v.index; });
    // check if we already have it
    rawGamepads.forEach(function(v) {
      if ( v === null ) return;
      // checking if a gamepad is in the raw list, and in the array.
      if (v && !gamepadObjects[v.index]) {
        // it doesn't exist in the array. adding it
        handler.connect(v);
      } else {
        // it exists. updating it
        gamepadObjects[v.index] = v;
      }
    });
    // remove gamepad that's disconnected but existing in the array
    Object.keys(gamepadObjects).forEach(function(v) {
      if(rawIndexes.indexOf(parseInt(v))===-1) {
        handler.disconnect(gamepadObjects[v]);
      }
    });

    rAF(() => handler.refresh(gamepads));

    try {
      if(handler.isUpdating) {
        handler.update();
      } else {
        handler.isUpdating = !isEmptyObject(gamepads);
      }  
    } catch(e) {
      handler.isUpdating = false;
    }
  },
  isUpdating: false,
  update: function() {
    
  }
};

const isEmptyObject = obj =>
  Object.keys(obj).length === 0 &&
  obj.constructor === Object;

const getGamepadNumber = (index = 0, idPattern = /([0-9a-f]{4})/g) => {
  /*
    Actual gamepad ID is going like this:
    Firefox 54c-5c4-Wireless Controller
    Chrome  Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)
  
    To catch vendor and product id, we need
    `/([0-9a-f]{1,4})-/g` in Firefox,
    `/([0-9a-f]{4})/g` in Chrome.
  */
  if(!gamepads.hasOwnProperty(index))
    return false;
  
  const numbers = gamepads[index].id.match(idPattern);
  
  if(numbers.length !== 2)
    return false;  
  
  return numbers.reduce(
    (pv, cv) => pv + (cv.replace(/[^0-9a-f]/, '')).padStart(4, '0'),
    ''
  );
};
