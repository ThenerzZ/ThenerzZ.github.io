// Theme handling with enhanced transitions
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    function updateThemeIcon(theme) {
        icon.className = `fas fa-${theme === 'dark' ? 'sun' : 'moon'}`;
    }
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add fade transition
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                setTheme(newTheme);
                document.body.style.opacity = '1';
            }, 200);
        });
        
        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }
}

// Initialize theme handling
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeroInteraction();
    initAnimations();
});

// Enhanced animations
function initAnimations() {
    // Add animation order to project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
    // Add animation order to skills
    document.querySelectorAll('.skills li').forEach((skill, index) => {
        skill.style.setProperty('--animation-order', index);
    });
    
    // Add parallax effect
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;
        
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        });
    });
}

// Smooth section transitions
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '-50px'
});

document.querySelectorAll('section').forEach(section => {
    section.style.transform = 'translateY(50px)';
    section.style.opacity = '0';
    section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
});

// Enhanced hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const moveX = (e.clientX - centerX) / 20;
        const moveY = (e.clientY - centerY) / 20;
        
        card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(50px)`;
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const moveX = (e.clientX - centerX) / 20;
        const moveY = (e.clientY - centerY) / 20;
        
        card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(50px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        card.style.transition = 'transform 0.5s ease';
    });
});

// Enhanced particle system
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 30;
    const particles = [];
    
    // Clear existing particles
    hero.querySelectorAll('.particle').forEach(p => p.remove());
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 8 + 2;
        const startPosition = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 6 + Math.random() * 4;
        const color = Math.random() > 0.5 ? 'var(--primary-orange)' : 'var(--accent-pink)';
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startPosition}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        hero.appendChild(particle);
        particles.push(particle);
    }
    
    return particles;
}

// Mouse interaction for hero section
function initHeroInteraction() {
    const hero = document.querySelector('.hero');
    let particles = createParticles();
    
    // Recreate particles periodically
    setInterval(() => {
        particles.forEach(p => {
            if (Math.random() > 0.8) { // 20% chance to reset
                p.style.animation = 'none';
                p.offsetHeight; // Trigger reflow
                p.style.animation = null;
            }
        });
    }, 3000);
    
    // Mouse movement effect
    document.addEventListener('mousemove', (e) => {
        if (hero) {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            hero.style.setProperty('--mouse-x', `${x}%`);
            hero.style.setProperty('--mouse-y', `${y}%`);
            
            // Affect nearby particles
            particles.forEach(particle => {
                const particleRect = particle.getBoundingClientRect();
                const particleX = particleRect.left + particleRect.width / 2;
                const particleY = particleRect.top + particleRect.height / 2;
                const distance = Math.hypot(e.clientX - particleX, e.clientY - particleY);
                
                if (distance < 100) {
                    const angle = Math.atan2(e.clientY - particleY, e.clientX - particleX);
                    const force = (100 - distance) / 100;
                    const moveX = Math.cos(angle) * force * 50;
                    const moveY = Math.sin(angle) * force * 50;
                    
                    particle.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
                } else {
                    particle.style.transform = '';
                }
            });
        }
    });
}

// Add loading animation for project links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const spinner = document.createElement('span');
        spinner.className = 'loading-spinner';
        this.appendChild(spinner);
        
        setTimeout(() => {
            spinner.remove();
        }, 1000);
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const successMsg = submitBtn.querySelector('.success-message');
            const spinner = submitBtn.querySelector('.loading-spinner');
            
            // Show loading state
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    spinner.style.display = 'none';
                    successMsg.style.display = 'inline-block';
                    form.reset();
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                        btnText.style.display = 'inline-block';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                // Show error state
                spinner.style.display = 'none';
                btnText.textContent = 'Error! Try Again';
                btnText.style.display = 'inline-block';
                submitBtn.disabled = false;
                
                // Reset button text after 3 seconds
                setTimeout(() => {
                    btnText.textContent = 'SEND MESSAGE';
                }, 3000);
            }
        });
    }
});
