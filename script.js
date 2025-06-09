// Current language
let currentLanguage = 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize age calculation for default English content
    const currentYear = new Date().getFullYear();
    const age = currentYear - 2008;
    const aboutText = document.querySelector('.about-text span');
    if (aboutText && aboutText.textContent.includes('{age}')) {
        aboutText.textContent = aboutText.textContent.replace('{age}', age);
    }
    
    // Load saved language
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        changeLanguage(savedLang);
    }
    
    // Create wave background
    createWaves();
    
    // Setup mouse following for waves
    setupMouseFollow();
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('langDropdown');
        const button = document.querySelector('.lang-button');
        
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
});

// Create animated waves
function createWaves() {
    const container = document.getElementById('waveContainer');
    const numWaves = 50;
    
    for (let i = 0; i < numWaves; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.left = Math.random() * 100 + '%';
        wave.style.top = Math.random() * 100 + '%';
        wave.style.animationDelay = Math.random() * 6 + 's';
        wave.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(wave);
    }
}

// Setup mouse following effect for waves
function setupMouseFollow() {
    const waves = document.querySelectorAll('.wave');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        waves.forEach((wave, index) => {
            const delay = index * 0.01;
            setTimeout(() => {
                const offsetX = (mouseX - 0.5) * 20;
                const offsetY = (mouseY - 0.5) * 20;
                const currentTransform = wave.style.transform;
                const baseTransform = currentTransform.split(' translate')[0];
                wave.style.transform = `${baseTransform} translate(${offsetX}px, ${offsetY}px)`;
            }, delay * 1000);
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    dropdown.classList.toggle('show');
}

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update current language display
    document.getElementById('currentLang').textContent = lang.toUpperCase();
    
    // Calculate current age (born in 2008)
    const currentYear = new Date().getFullYear();
    const age = currentYear - 2008;
    
    // Update all text elements
    const elements = document.querySelectorAll('[data-' + lang + ']');
    elements.forEach(element => {
        let text = element.getAttribute('data-' + lang);
        if (text) {
            // Replace {age} placeholder with actual age
            text = text.replace('{age}', age);
            element.textContent = text;
        }
    });
    
    // Close dropdown
    document.getElementById('langDropdown').classList.remove('show');
}

// Show Discord modal
function showDiscordModal() {
    const modal = document.getElementById('discordModal');
    modal.classList.add('show');
}

// Hide Discord modal
function hideDiscordModal() {
    const modal = document.getElementById('discordModal');
    modal.classList.remove('show');
}