var largeNumber;
largeNumber = (() => {
  "use strict";
  var __webpack_modules__ = [
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        default: () => add,
      });
      function add(a, b) {
        let i = a.length - 1;
        let j = b.length - 1;
        let res = "";
        let carray = 0;
        while (i >= 0 || j >= 0) {
          let x = 0;
          let y = 0;
          let sum;
          if (i >= 0) {
            x = a[i] - "0";
            i--;
          }
          if (j >= 0) {
            y = b[j] - "0";
            j--;
          }
          sum = x + y + carray;
          if (sum >= 10) {
            carray = 1;
            sum -= 10;
          } else {
            carray = 0;
          }
          res = sum + res;
        }
        if (carray > 0) {
          res = carray + res;
        }
        return res;
      }
    },
  ];
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  /* webpack/runtime/define property getters */
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();
  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  /* webpack/runtime/make namespace object */
  (() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();
  return __webpack_require__(0);
})();
