/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection{
  constructor(htmlElements){
    this.elements = htmlElements;
  }

  html(value){
    if (value === undefined) {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach(el => {
        el.innerHTML = value;
        return this;
      });
    }
  }

  empty(){
    this.html('');
  }

  append(arg){
    if (arg instanceof DOMNodeCollection) {
      arg.elements.forEach(element => {
        this.innerHTML += element.outerHTML;
      });
    } else if (arg instanceof HTMLElement) {
      this.innerHTML += arg.outerHTML;
    } else if (arg instanceof String){
      this.innerHTML += arg;
    }
  }

  attr(name, value){
    if (value === undefined){
      this.elements[0].getAttribute(name);
    } else {
      this.elements.forEach(el => {
        el.setAttribute(name, value);
      });
    }
  }

  addClass(className){
    this.elements.forEach(el => {
      el.classList.add(className);
    });
    return this;
  }

  removeClass(className){
    this.elements.forEach(el => {
      el.classList.remove(className);
    });
    return this;
  }

  children(){
    let childs = [];
    this.elements.forEach((el) => {
      childs = childs.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childs);
  }

  parent(){
    let par = [];
    this.elements.forEach((el) => {
      if (!par.includes(el.parentElement)){
        par.push(el.parentElement);
    }});
    return new DOMNodeCollection(par);
  }

  find(selector){
    let found = [];
    this.elements.forEach((el) => {
      found = found.concat(Array.from(el.querySelectorAll(selector)));
    });
    return found;
  }

  remove(){
    let result = this.elements;
    this.elements.forEach(el => {
      el.parentElement.removeChild(el);
    });
    this.elements = [];
    return new DOMNodeCollection(result);
  }

  on(eventName, callback){
    this.elements.forEach((el) => {
      el.addEventListener(eventName, callback);
      el.eventCall = callback;
    });
  }

  off(eventName){
    this.elements.forEach((el) => {
      el.removeEventListener(eventName, el.eventCall);
    });
  }

}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", (e)=>{
  funcs.forEach((el) => {
    el();
  });
});

const funcs = [];

function $l(arg) {
  if (typeof(arg) === 'string') {
    const result = Array.prototype.slice.call(document.querySelectorAll(arg));
    return new DOMNodeCollection(result);
  } else if (arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  } else if (typeof(arg) === 'function'){
    if (document.readyState === 'complete') {
      arg();
    }else {
      funcs.push(arg);
    }
  }
}

$l.extend = function(target, ...args) {
  console.log(args);
  let targetKeys = Object.keys(target);
  args.forEach((el) => {
    Object.keys(el).forEach((key) => {
      target[key] = el[key];
    });
  });
  return target;
};

$l.ajax = function(options){
  const defaults = {
    type: 'GET',
    data: 'Important information',
    success: (res) => {
      return res;
    },
    error: (err) => {
      return err;
    },
    dataType: 'JSON',
    contentType: 'HTML',
    url: window.location.href
  };
  Object.assign(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(defaults.type, defaults.url);

  xhr.onload = () => {
    if (defaults.dataType === 'JSON') {
      //
    }
    defaults.success(JSON.parse(xhr.response));
  };

  xhr.send();
  return "I PROMISE";
};


window.$l = $l;


/***/ })
/******/ ]);