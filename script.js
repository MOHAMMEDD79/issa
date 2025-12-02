// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : 'none';
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Fade In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.problem-card, .solution-item, .benefit-card, .team-card, .goal-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Map Display (Leaflet + OpenStreetMap)
if (document.getElementById('map')) {
    // الإحداثيات الدقيقة
    const startPoint = [31.7602564317659, 35.262639094289426]; // نقطة البداية
    const endPoint = [31.756340072034693, 35.26265083343506];   // نقطة النهاية
    
    // إنشاء الخريطة
    const map = L.map('map', {
        center: [(startPoint[0] + endPoint[0]) / 2, (startPoint[1] + endPoint[1]) / 2],
        zoom: 16,
        scrollWheelZoom: true
    });

    // إضافة طبقة الخريطة من OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);

    // أيقونة البداية (أخضر)
    const startIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: #2C5F2D; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });

    // أيقونة النهاية (ذهبي)
    const endIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: #D4AF37; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>',
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    });

    // إضافة نقطة البداية
    const startMarker = L.marker(startPoint, { icon: startIcon }).addTo(map);
    startMarker.bindPopup('<div style="text-align: center; font-family: Arial;"><strong style="color: #2C5F2D;">نقطة البداية</strong><br>سوبر ماركت النور<br><small>31.760256, 35.262639</small></div>');

    // إضافة نقطة النهاية
    const endMarker = L.marker(endPoint, { icon: endIcon }).addTo(map);
    endMarker.bindPopup('<div style="text-align: center; font-family: Arial;"><strong style="color: #D4AF37;">نقطة النهاية</strong><br>بوابة كلية الطب - جامعة القدس<br><small>31.756340, 35.262651</small></div>');

    // رسم خط بين النقطتين
    const routeLine = L.polyline([startPoint, endPoint], {
        color: '#E67E22',
        weight: 5,
        opacity: 0.8,
        dashArray: '10, 5'
    }).addTo(map);

    // إضافة popup للخط
    routeLine.bindPopup('<div style="text-align: center; font-family: Arial;"><strong style="color: #E67E22;">شارع المقبرة</strong><br>المسافة: ~435 متر<br>من سوبر ماركت النور إلى بوابة كلية الطب</div>');

    // ضبط الخريطة لتظهر المسار كاملاً
    map.fitBounds([startPoint, endPoint], { padding: [50, 50] });

    console.log('✅ Leaflet Map Loaded Successfully');
    console.log('📍 نقطة البداية:', startPoint);
    console.log('🏛️ نقطة النهاية:', endPoint);
    console.log('📏 المسافة: ~435 متر');
}

// Counter Animation
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target, 1500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Add hover effect to cards
document.querySelectorAll('.problem-card, .benefit-card, .team-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images (when you add real images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Active navigation link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Print page functionality (optional)
const addPrintButton = () => {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ طباعة';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        padding: 12px 24px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50px;
        font-family: 'Cairo', sans-serif;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(44, 95, 45, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(44, 95, 45, 0.4)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(44, 95, 45, 0.3)';
    });
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    // Only add print button on main pages, not on print view
    if (window.matchMedia('screen').matches) {
        document.body.appendChild(printBtn);
    }
};

// Initialize print button after page load
window.addEventListener('load', addPrintButton);

// Log initialization
console.log('✅ Al-Maqbara Street Development Project - Website Initialized');
console.log('📍 جامعة القدس - مساق مواضيع تطبيقية');
console.log('👨‍🏫 د. محمد شريعة');
