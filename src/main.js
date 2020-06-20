const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true;
const intervalTime = 8000;
let slideInterval;

function nextSlide() {
    // get current class
    const current = document.querySelector('.current');
    // remove current class
    current.classList.remove('current');
    // check for next slide 
    if (current.nextElementSibling) {
        // add current to next sibling
        current.nextElementSibling.classList.add('current');

    } else {
        // add current to start 
        slides[0].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
}

function prevSlide() {
    // get current class
    const current = document.querySelector('.current');
    // remove current class
    current.classList.remove('current');
    // check for prev slide 
    if (current.previousElementSibling) {
        // add current to prev sibling
        current.previousElementSibling.classList.add('current');

    } else {
        // add current to last
        slides[slides.length - 1].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
};
// auto slide
if (auto === true) {
    // run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime);
}