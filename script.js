//scrolling
const btnScrollTo = document.querySelector(".scroll--to");
const section1 = document.querySelector("#What_We_Do");
const section2 = document.querySelector("#How_It_Works");
const section3 = document.querySelector("#Prices");
const section4 = document.querySelector("#Contact_Us");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  //Scrolling
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});

//Page Navigation

document.querySelectorAll(".nav-link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

//Unblur image as we scroll

//Capping number of times function is called
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//Scroll
const unblurImage = document.querySelectorAll(".img");

function checkSlide(e) {
  //Halfway through image
  unblurImage.forEach((unblurImage) => {
    const slideInAt = window.scrollY + window.innerHeight;
    -unblurImage.height / 2;
    //Bottom of Image
    const imageBottom = unblurImage.offsetTop + unblurImage.height;
    const isHalfShown = slideInAt > unblurImage.offsetTop;
    const notScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && notScrolledPast) {
      unblurImage.classList.remove("lazy-img");
      unblurImage.classList.add("img-defined");
    } else {
      unblurImage.classList.add("lazy-img");
      unblurImage.classList.remove("img-defined");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
