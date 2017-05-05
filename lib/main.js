const DOMNodeCollection = require('./dom_node_collection.js');

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
