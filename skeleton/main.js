const Router = require('./router.js');

document.addEventListener("DOMContentLoaded", () => {
  let sideLi = Array.from(document.querySelectorAll(".sidebar-nav li"));
  sideLi.forEach(el => {
    el.addEventListener("click", e => {
      const hash = e.currentTarget.innerText.toLowerCase();
      window.location.hash = hash;
    });
  });
  let node = document.querySelector('.content');
  let router = new Router(node);
  router.start();
});
