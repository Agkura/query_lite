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
