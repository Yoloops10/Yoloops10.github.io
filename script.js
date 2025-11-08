// Enregistrement du Service Worker pour le mode hors ligne
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ Service Worker enregistré'))
      .catch(err => console.log('❌ Erreur Service Worker:', err));
  });
}

// Navigation scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Menu mobile toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      // Fermer le menu mobile après clic
      document.getElementById('navLinks').classList.remove('active');
    }
  });
});

// Animation au scroll (observer les éléments)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observer tous les project-cards et team-cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card, .team-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
});

// PWA Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

function showInstallButton() {
  const installBtn = document.createElement('button');
  installBtn.textContent = '📱 Installer';
  installBtn.className = 'install-button';
  installBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
    z-index: 999;
    transition: all 0.3s;
  `;
  
  installBtn.onmouseover = () => {
    installBtn.style.transform = 'translateY(-3px)';
    installBtn.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.6)';
  };
  
  installBtn.onmouseout = () => {
    installBtn.style.transform = 'translateY(0)';
    installBtn.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
  };
  
  installBtn.onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Installation: ${outcome}`);
      deferredPrompt = null;
      installBtn.remove();
    }
  };
  
  document.body.appendChild(installBtn);
}

// Message de bienvenue dans la console
console.log('%c🚀 EXPLORIUM - Toujours en Premium', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cSite créé avec 💜 par l\'équipe Explorium', 'color: #8b5cf6; font-size: 14px;');
console.log('%c📧 Contact: explorium.premium@gmail.com', 'color: #ec4899; font-size: 12px;');
