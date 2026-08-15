/* ========================================
   PORTFOLIO CAROUSEL
======================================== */

const portfolio = [
    {
        image: "assets/images/portrait-01.jpg",
        category: "Retrato"
    },
    {
        image: "assets/images/portrait-02.jpg",
        category: "Retrato"
    },
    {
        image: "assets/images/street-01.jpg",
        category: "Calle"
    },
    {
        image: "assets/images/street-02.jpg",
        category: "Calle"
    },
    {
        image: "assets/images/street-03.jpg",
        category: "Calle"
    },
    {
        image: "assets/images/studio-01.jpg",
        category: "Estudio"
    },
    {
        image: "assets/images/editorial-02.jpg",
        category: "Estudio"
    },
    {
        image: "assets/images/events-01.jpg",
        category: "Eventos"
    },
    {
        image: "assets/images/events-02.jpg",
        category: "Eventos"
    },
    {
        image: "assets/images/events-03.jpg",
        category: "Eventos"
    },
    {
        image: "assets/images/lifestyle-01.jpg",
        category: "Lifestyle"
    },
    {
        image: "assets/images/lifestyle-02.jpg",
        category: "Lifestyle"
    }
];


/* ========================================
   ELEMENTS
======================================== */

const portfolioImage = document.querySelector("#portfolio-image");

const portfolioCounter = document.querySelector("#portfolio-counter");

const portfolioCategory = document.querySelector("#portfolio-category");

const progressBar = document.querySelector("#portfolio-progress-bar");

const previousButton = document.querySelector(".slider-button-prev");

const nextButton = document.querySelector(".slider-button-next");


/* ========================================
   STATE
======================================== */

let currentIndex = 0;

let autoplayTimer;

const AUTOPLAY_DELAY = 3000;


/* ========================================
   UPDATE SLIDE
======================================== */

function updateSlide() {

    const currentSlide = portfolio[currentIndex];

    portfolioImage.style.opacity = "0";

    portfolioImage.style.transform = "scale(1.02)";


    setTimeout(() => {

        portfolioImage.src = currentSlide.image;

        portfolioImage.alt = `${currentSlide.category} photography by Melisa Lodeiro`;

        portfolioCategory.textContent = currentSlide.category;

        portfolioCounter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ${String(portfolio.length).padStart(2, "0")}`;


        const progress =
            ((currentIndex + 1) / portfolio.length) * 100;

        progressBar.style.width = `${progress}%`;


        portfolioImage.onload = () => {

            portfolioImage.style.opacity = "1";

            portfolioImage.style.transform = "scale(1)";

        };

    }, 250);
}


/* ========================================
   NEXT SLIDE
======================================== */

function nextSlide() {

    currentIndex =
        (currentIndex + 1) % portfolio.length;

    updateSlide();

    resetAutoplay();
}


/* ========================================
   PREVIOUS SLIDE
======================================== */

function previousSlide() {

    currentIndex =
        (currentIndex - 1 + portfolio.length)
        % portfolio.length;

    updateSlide();

    resetAutoplay();
}


/* ========================================
   AUTOPLAY
======================================== */

function startAutoplay() {

    autoplayTimer = setInterval(() => {

        currentIndex =
            (currentIndex + 1) % portfolio.length;

        updateSlide();

    }, AUTOPLAY_DELAY);
}


function resetAutoplay() {

    clearInterval(autoplayTimer);

    startAutoplay();
}


/* ========================================
   BUTTON EVENTS
======================================== */

nextButton.addEventListener(
    "click",
    nextSlide
);

previousButton.addEventListener(
    "click",
    previousSlide
);


/* ========================================
   TOUCH / SWIPE
======================================== */

let touchStartX = 0;

let touchEndX = 0;


const sliderStage =
    document.querySelector(".slider-stage");


sliderStage.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


sliderStage.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;


    if (Math.abs(swipeDistance) < 50) {
        return;
    }


    if (swipeDistance < 0) {

        nextSlide();

    } else {

        previousSlide();

    }
}


/* ========================================
   INITIALIZE
======================================== */

updateSlide();

startAutoplay();