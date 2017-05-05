class Router{
  constructor(node){
    this.node = node;
  }

  start() {
    this.render();
    window.addEventListener("hashchange", this.render);
  }

  activeRoute() {
    let locHash = window.location.hash;
    return locHash.slice(1);
  }

  render() {
    console.log("hit");
    this.node.innerHTML = "";
    let routeName = this.activeRoute();
    let para = document.createElement('p');
    para.innerHTML = routeName;
    this.node.appendChild(para);
  }
}

module.exports = Router;
