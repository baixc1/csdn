/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/element.js":
/*!************************!*\
  !*** ./src/element.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * 用javascript对象表示DOM结构
 */
class Element {
  constructor(tagName, ...args) {
    this.tagName = tagName;
    // 判断有没有props
    if (Array.isArray(args[0])) {
      this.props = {};
      this.children = args[0];
    } else {
      this.props = args[0];
      this.children = args[1];
    }
    this.key = this.props.key || void 0;
  }
  render() {
    // 创建一个元素
    const $dom = document.createElement(this.tagName);
    // 给元素加上所有的属性
    for (const proKey in this.props) {
      $dom.setAttribute(proKey, this.props[proKey]);
    }
    // 如果存在子节点
    if (this.children) {
      this.children.forEach((child) => {
        // 如果子元素还包含子元素,则递归
        if (child instanceof Element) {
          $dom.appendChild(child.render());
        } else {
          $dom.appendChild(document.createTextNode(child));
        }
      });
    }
    return $dom;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Element);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/test_element.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/element.js");


const tree = new _element__WEBPACK_IMPORTED_MODULE_0__.default("div", { classname: "div" }, [
  new _element__WEBPACK_IMPORTED_MODULE_0__.default("h1", { style: "color: red;" }, [
    "Hello, This is my Vdom library",
  ]),
  new _element__WEBPACK_IMPORTED_MODULE_0__.default("ul", [new _element__WEBPACK_IMPORTED_MODULE_0__.default("li", ["1111"]), new _element__WEBPACK_IMPORTED_MODULE_0__.default("li", ["2222"])]),
]);
const $dom = tree.render();
console.log(111, $dom);

})();

/******/ })()
;
//# sourceMappingURL=test_element.js.map