// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// Form Submission Handling
const form = document.getElementById('consultation-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;
        const lineId = document.getElementById('line-id').value;
        const location = document.getElementById('location-select').value;
        const tradingStyle = document.getElementById('trading-style').value;

        // Feedback notification
        alert(`ขอบคุณครับ คุณ ${fullName}\n\nเราได้รับข้อมูลการจองคิวประเมินระบบเทรดเรียบร้อยแล้ว\nเจ้าหน้าที่จะติดต่อกลับผ่าน Line: ${lineId} เพื่อคอนเฟิร์มวันและเวลาเรียนตัวต่อตัวครับ!`);
        
        form.reset();
    });
}
