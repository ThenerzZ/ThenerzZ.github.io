// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements when they come into view
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
};

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section, .project-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Particle background effect
const createParticles = () => {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5}px;
            height: ${Math.random() * 5}px;
            background: ${Math.random() > 0.5 ? '#ff6b00' : '#ff69b4'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            opacity: ${Math.random()};
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        hero.appendChild(particle);
    }
};

// Floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
        }
        50% {
            transform: translateY(-${Math.random() * 100}px) translateX(${Math.random() * 100}px);
        }
        100% {
            transform: translateY(0) translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Form submission with animation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Add loading animation
    submitBtn.innerHTML = '<span class="loading-spinner"></span>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        submitBtn.innerHTML = '✓ Sent!';
        this.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// Typing animation for hero text
const heroText = document.querySelector('.hero-content h1');
const text = heroText.textContent;
heroText.textContent = '';
let i = 0;

const typeWriter = () => {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});
