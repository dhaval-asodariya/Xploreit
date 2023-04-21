var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};




// navbar menu responsive script 

let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar-links");
let navLinks = navBar.querySelectorAll("li");

hamMenuIcon.addEventListener("click", () => {
navBar.classList.toggle("active");
hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
navLinks.addEventListener("click", () => {
  navBar.classList.remove("active");
  hamMenuIcon.classList.toggle("fa-times");
});
});


//navbar search script

let searchGlassIcon = document.getElementById("search-glass");
let toorSearch = document.getElementById("toor-search");
// let navLinks = navBar.querySelectorAll("li");

searchGlassIcon.addEventListener("click", () => {
  toorSearch.classList.toggle("active");
  searchGlassIcon.classList.toggle("fa-times");
});



//home page parallax script

const parallax =document.getElementById("parallax");

window.addEventListener("scroll",function ()
{
let offset = window.pageYOffset;
 parallax.style.backgroundPositionY = offset * 0.6 + "px";

})

//onclick open manali page
let manaliToor = document.getElementById("manali-toor");

manaliToor.addEventListener("click", () => {
window.open("./toorpage");
})