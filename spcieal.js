const heart = document.querySelector('.heart');
const mainBox = document.querySelector('.main-box');
const message = document.querySelector('.message');
const instruct = document.querySelector('.scroll-instruct');
const body = document.body;

// Initially block scroll
body.classList.add('block-scroll');

let allowAnimations = false;

// Heart click event
heart.addEventListener('click', () => {
    // Burst confetti
    confetti({
        particleCount: 200,
        spread: 500,
        origin: { y: 0.45 },
        scalar: 2,
        gravity: 0.8
    });

    confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.45 },
        colors: ['#ff0', '#f0f', '#0ff', '#ff6347', '#32cd32'],
        scalar: 2,
        gravity: 0.8
    });

    // Hide heart and text
    setTimeout(() => {
        mainBox.style.display = 'none';
    }, 100);

    // Show birthday message
    setTimeout(() => {
        message.style.display = 'block';

        message.addEventListener('animationend', () => {
            instruct.style.opacity = '1';
            instruct.style.transform = 'translateY(0)';

            // Now allow scrolling and animations
            allowAnimations = true;
            body.classList.remove('block-scroll');
            body.classList.add('allow-scroll');
        }, { once: true });

    }, 500);
});

// Function to animate on scroll
function animateOnScroll(className) {
    if (!allowAnimations) return;

    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 100) {
            el.setAttribute('data-scroll', 'in');
        }
    });
}

// Listen for scroll
window.addEventListener('scroll', () => {
    animateOnScroll('para-box');
    animateOnScroll('feelings');
});

// Initial check (will be ignored until heart clicked)
animateOnScroll('para-box');
animateOnScroll('feelings');
