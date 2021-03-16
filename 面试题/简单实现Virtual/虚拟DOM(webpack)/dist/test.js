/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/diff.js":
/*!*********************!*\
  !*** ./src/diff.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patch */ "./src/patch.js");

function diff(oldTree, newTree) {
  const patches = {};
  const index = {
    value: 0,
  };
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}
// 比较属性的变化
function diffProps(oldProps, newProps, index, currentIndexPatches) {
  // 遍历旧的属性,找到被删除和修改的情况
  for (const propKey in oldProps) {
    // 新属性中不存在,旧属性存在,属性被删除
    if (!newProps.hasOwnProperty(propKey)) {
      currentIndexPatches.push({
        type: _patch__WEBPACK_IMPORTED_MODULE_0__.default.NODE_ATTRIBUTE_DELETE,
        key: propKey,
      });
    } else if (newProps[propKey] !== oldProps[propKey]) {
      // 新旧属性中都存在,但是值不同: 属性被修改
      currentIndexPatches.push({
        type: _patch__WEBPACK_IMPORTED_MODULE_0__.default.NODE_ATTRIBUTE_MODIFY,
        key: propKey,
        value: newProps[propKey],
      });
    }
  }

  // 遍历新元素,找到添加的部分
  for (const propKey in newProps) {
    // 旧属性中不存在,新属性中存在: 添加属性
    if (!oldProps.hasOwnProperty(propKey)) {
      currentIndexPatches.push({
        type: _patch__WEBPACK_IMPORTED_MODULE_0__.default.NODE_ATTRIBUTE_ADD,
        key: propKey,
        value: newProps[propKey],
      });
    }
  }
}
// 顺序比较子元素的变化（未实现数组元素的key比较）
function diffChildren(
  oldChildren,
  newChildren,
  index,
  currentIndexPatches,
  patches
) {
  if (oldChildren.length < newChildren.length) {
    // 有元素被添加
    let i = 0;
    for (; i < oldChildren.length; i++) {
      console.log("oldChildren,index.value", index.value);
      index.value++;
      dfsWalk(oldChildren[i], newChildren[i], index, patches);
    }
    for (; i < newChildren.length; i++) {
      currentIndexPatches.push({
        type: _patch__WEBPACK_IMPORTED_MODULE_0__.default.NODE_ADD,
        value: newChildren[i],
      });
    }
  } else {
    // 对比新旧子元素的变化
    for (let i = 0; i < oldChildren.length; i++) {
      console.log("newChildren.index.value", index.value);
      index.value++;
      dfsWalk(oldChildren[i], newChildren[i], index, patches);
    }
  }
}
// 比较innerHTML的变化
function dfsWalk(oldNode, newNode, index, patches) {
  const currentIndex = index.value;
  const currentIndexPatches = [];
  if (newNode === undefined) {
    // 节点被移除
    currentIndexPatches.push({
      type: _patch__WEBPACK_IMPORTED_MODULE_0__.default.NODE_DELETE,
    });
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    // 文本节点被修改
    if (oldNode !== newNode) {
      currentIndexPatches.push({
        type: _patch__WEBPACK_IMPORTED_MODULE_0__.default.NODE_TEXT_MODIFY,
        value: newNode,
      });
    }
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // 同时根据tagName和key来进行对比
    diffProps(oldNode.props, newNode.props, index, currentIndexPatches);
    diffChildren(
      oldNode.children,
      newNode.children,
      index,
      currentIndexPatches,
      patches
    );
  } else {
    currentIndexPatches.push({
      type: _patch__WEBPACK_IMPORTED_MODULE_0__.default.NODE_REPLACE,
      value: newNode,
    });
  }
  if (currentIndexPatches.length > 0) {
    console.log("currentIndex", currentIndex);
    patches[currentIndex] = currentIndexPatches;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (diff);


/***/ }),

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


/***/ }),

/***/ "./src/patch.js":
/*!**********************!*\
  !*** ./src/patch.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function patch($dom, patches) {
  const index = {
    value: 0,
  };
  dfsWalk($dom, index, patches);
}
patch.NODE_DELETE = "NODE_DELETE"; // 节点被删除
patch.NODE_TEXT_MODIFY = "NODE_TEXT_MODIFY"; // 文本节点被更改
patch.NODE_REPLACE = "NODE_REPLACE"; // 节点被替代
patch.NODE_ADD = "NODE_ADD"; // 添加节点
patch.NODE_ATTRIBUTE_MODIFY = "NODE_ATTRIBUTE_MODIFY"; // 更新属性
patch.NODE_ATTRIBUTE_ADD = "NODE_ATTRIBUTE_ADD"; // 添加属性
patch.NODE_ATTRIBUTE_DELETE = "NODE_ATTRIBUTE_DELETE"; // 删除属性

// 根据不同类型的差异对当前节点进行 DOM 操作：
function dfsWalk($node, index, patches, isEnd = false) {
  if (patches[index.value]) {
    patches[index.value].forEach((p) => {
      switch (p.type) {
        case patch.NODE_ATTRIBUTE_MODIFY: {
          $node.setAttribute(p.key, p.value);
          break;
        }
        case patch.NODE_ATTRIBUTE_DELETE: {
          $node.removeAttribute(p.key, p.value);
          break;
        }
        case patch.NODE_ATTRIBUTE_ADD: {
          $node.setAttribute(p.key, p.value);
          break;
        }
        case patch.NODE_ADD: {
          $node.appendChild(p.value.render());
          break;
        }
        case patch.NODE_TEXT_MODIFY: {
          $node.textContent = p.value;
          break;
        }
        case patch.NODE_REPLACE: {
          $node.replaceWith(p.value.render());
          break;
        }
        case patch.NODE_DELETE: {
          $node.remove();
          break;
        }
        default: {
          console.log(p);
        }
      }
    });
  }
  if (isEnd) {
    return;
  }
  if ($node.children.length > 0) {
    for (let i = 0; i < $node.children.length; i++) {
      index.value++;
      dfsWalk($node.children[i], index, patches);
    }
  } else {
    index.value++;
    dfsWalk($node, index, patches, true);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (patch);


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
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/element.js");
/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diff */ "./src/diff.js");
/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./patch */ "./src/patch.js");




// 1.构建虚拟DOM
const tree = new _element__WEBPACK_IMPORTED_MODULE_0__.default("div", { classname: "div" }, [
  new _element__WEBPACK_IMPORTED_MODULE_0__.default("h1", { style: "color: red;" }, [
    "Hello, This is my Vdom library",
  ]),
  new _element__WEBPACK_IMPORTED_MODULE_0__.default("p", { style: "color: blue;" }, ["extra text"]),
  new _element__WEBPACK_IMPORTED_MODULE_0__.default("ul", [new _element__WEBPACK_IMPORTED_MODULE_0__.default("li", ["1111"]), new _element__WEBPACK_IMPORTED_MODULE_0__.default("li", ["2222"])]),
]);

// 2.通过虚拟DOM构建真正的DOM
const $dom = tree.render();
const $app = document.querySelector("#app");
$app.replaceWith($dom);

// 3.生成新的虚拟DOM
const newTree = new _element__WEBPACK_IMPORTED_MODULE_0__.default("div", { id: "div1" }, [
  new _element__WEBPACK_IMPORTED_MODULE_0__.default("h1", { style: "color: red;" }, [
    "Hello, This is my vdom library111",
  ]),
  new _element__WEBPACK_IMPORTED_MODULE_0__.default("p", { style: "color: blue;" }, ["extra text"]),
  new _element__WEBPACK_IMPORTED_MODULE_0__.default("ul", [
    new _element__WEBPACK_IMPORTED_MODULE_0__.default("li", ["1111"]),
    new _element__WEBPACK_IMPORTED_MODULE_0__.default("li", ["5555"]),
    new _element__WEBPACK_IMPORTED_MODULE_0__.default("li", ["333"]),
  ]),
]);

console.log(tree, newTree);
// 4.比较新旧虚拟DOM树的差异
const patches = (0,_diff__WEBPACK_IMPORTED_MODULE_1__.default)(tree, newTree);

console.log(patches);
// 5.根据变化了的部分去更新DOM
setTimeout(() => {
  (0,_patch__WEBPACK_IMPORTED_MODULE_2__.default)($dom, patches);
}, 3000);

})();

/******/ })()
;
//# sourceMappingURL=test.js.map