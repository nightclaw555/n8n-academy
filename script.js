document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle-btn');
    const navMenu = document.getElementById('nav-menu-list');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Toggle hamburger animation
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // 3. Active Link Highlighter on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
                if (targetLink) {
                    navItems.forEach(item => item.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActive);

    // 4. Booking Form Interactivity & Mock Submission
    const bookingForm = document.getElementById('booking-form');
    const formToast = document.getElementById('form-toast');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard page reload

            // Collect form data (can be used to send to API or save to DB in future)
            const formData = {
                name: document.getElementById('user-name').value,
                email: document.getElementById('user-email').value,
                lineId: document.getElementById('user-line').value,
                course: document.getElementById('course-select').value,
                message: document.getElementById('user-message').value
            };

            console.log('Booking request submitted:', formData);

            // Hide the form with an animation and display the success toast
            bookingForm.style.opacity = '0';
            setTimeout(() => {
                bookingForm.style.display = 'none';
                formToast.style.display = 'flex';
            }, 300);
        });
    }

    // 5. Add dynamic glow effect tracking mouse movements on cards (Premium Micro-interaction)
    const cards = document.querySelectorAll('.module-card, .format-card, .comparison-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate inside the card
            const y = e.clientY - rect.top;  // y coordinate inside the card

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    // 6. Carousel Slider Logic
    const track = document.getElementById('carousel-track-list');
    const nextBtn = document.getElementById('carousel-next-btn');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const items = document.querySelectorAll('.carousel-item');
    
    if (track && nextBtn && prevBtn) {
        let currentTranslate = 0;
        const itemWidth = 274; // item width (250) + gap (24)
        
        nextBtn.addEventListener('click', () => {
            const trackParentWidth = track.parentElement.offsetWidth;
            const maxScrollDynamic = (items.length * itemWidth) - trackParentWidth + 24;
            
            if (Math.abs(currentTranslate) < maxScrollDynamic) {
                currentTranslate -= itemWidth;
                if (Math.abs(currentTranslate) > maxScrollDynamic) {
                    currentTranslate = -maxScrollDynamic;
                }
                track.style.transform = `translateX(${currentTranslate}px)`;
            } else {
                currentTranslate = 0;
                track.style.transform = `translateX(${currentTranslate}px)`;
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentTranslate < 0) {
                currentTranslate += itemWidth;
                if (currentTranslate > 0) currentTranslate = 0;
                track.style.transform = `translateX(${currentTranslate}px)`;
            } else {
                const trackParentWidth = track.parentElement.offsetWidth;
                const maxScrollDynamic = (items.length * itemWidth) - trackParentWidth + 24;
                currentTranslate = -maxScrollDynamic;
                track.style.transform = `translateX(${currentTranslate}px)`;
            }
        });
    }
});
