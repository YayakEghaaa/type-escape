// ============================================
// TYPING BATTLE - RESPONSIVE JAVASCRIPT
// ============================================

// Configuration
// Detect base path for GitHub Pages
const BASE_PATH = window.location.hostname.includes('github.io') 
  ? window.location.pathname.split('/').slice(0, 2).join('/') + '/'
  : '/';

const CONFIG = {
  phaseData: {
    warehouse: {
      title: "GUDANG",
      description:
        "The starting area where Rika awakens. Limited visibility due to poor lighting and stacked crates. Enemies use ambush tactics from behind cover. Master the basics of cover-based typing combat here.",
      enemies: "8-12",
      feature: "Destructible Environment",
      image: `${BASE_PATH}assets/images/phases/warehouse.png`,
    },
    hallway: {
      title: "HALLWAY",
      description:
        "Narrow corridors with no cover options. Enemies approach in waves from both directions. This phase tests pure typing speed and accuracy under pressure. No hiding, only skill.",
      enemies: "15-20",
      feature: "Endless Enemy Waves",
      image: `${BASE_PATH}assets/images/phases/hallway.png`,
    },
    parking: {
      title: "PARKING LOT",
      description:
        "Open area combat with enemies attacking from all directions. The final and most challenging phase features a boss fight with unique typing patterns. Environmental hazards add to the complexity.",
      enemies: "25+",
      feature: "Boss Fight & Hazards",
      image: `${BASE_PATH}assets/images/phases/parking.png`,
    },
  },

  requirements: {
    minimum: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-4460",
      memory: "8 GB RAM",
      graphics: "NVIDIA GeForce GTX 960",
      storage: "5 GB available space",
    },
    recommended: {
      os: "Windows 11 64-bit",
      processor: "Intel Core i7-7700K",
      memory: "16 GB RAM",
      graphics: "NVIDIA GeForce RTX 2060",
      storage: "5 GB available space (SSD recommended)",
    },
  },
};

// ============================================
// MAIN APPLICATION CLASS
// ============================================
class TypingBattleApp {
  constructor() {
    // DOM Elements
    this.navbar = document.querySelector('.navbar');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    this.mobileMenuClose = document.getElementById('mobile-menu-close');
    this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    this.phaseTabs = document.querySelectorAll('.phase-tab');
    this.downloadBtns = document.querySelectorAll('#download-btn, #final-download-btn');
    this.downloadModal = document.getElementById('download-modal');
    this.closeModalBtn = document.getElementById('close-modal');
    this.startDownloadBtn = document.getElementById('start-download');
    this.playTrailerBtn = document.getElementById('play-trailer');
    this.trailerBtn = document.getElementById('trailer-btn');
    this.videoPlaceholder = document.getElementById('video-placeholder');
    this.videoPlayer = document.getElementById('video-player');
    this.trailerVideo = document.getElementById('trailer-video');
    this.fullscreenBtn = document.getElementById('fullscreen-btn');
    this.minReqBtn = document.getElementById('min-req-btn');
    this.recReqBtn = document.getElementById('rec-req-btn');
    this.galleryGrid = document.getElementById('gallery-grid');
    this.galleryPrevBtn = document.getElementById('gallery-prev');
    this.galleryNextBtn = document.getElementById('gallery-next');

    // State
    this.currentGalleryIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isScrolling = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupSmoothScrolling();
    this.setupGalleryGestures();
    this.setupIntersectionObserver();
    console.log('✅ Typing Battle App Initialized!');
  }

  // ============================================
  // EVENT LISTENERS SETUP
  // ============================================
  setupEventListeners() {
    // Mobile Menu
    this.mobileMenuBtn?.addEventListener('click', () => this.toggleMobileMenu());
    this.mobileMenuClose?.addEventListener('click', () => this.closeMobileMenu());
    this.mobileMenuOverlay?.addEventListener('click', (e) => {
      if (e.target === this.mobileMenuOverlay) {
        this.closeMobileMenu();
      }
    });

    // Mobile Nav Links
    this.mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Phase Tabs
    this.phaseTabs.forEach(tab => {
      tab.addEventListener('click', (e) => this.handlePhaseTabClick(e));
    });

    // Download Modal
    this.downloadBtns.forEach(btn => {
      btn?.addEventListener('click', () => this.openDownloadModal());
    });
    this.closeModalBtn?.addEventListener('click', () => this.closeDownloadModal());
    this.downloadModal?.addEventListener('click', (e) => {
      if (e.target === this.downloadModal) {
        this.closeDownloadModal();
      }
    });
    this.startDownloadBtn?.addEventListener('click', () => this.simulateDownload());

    // Video Trailer
    this.playTrailerBtn?.addEventListener('click', () => this.handleVideoPlay());
    this.trailerBtn?.addEventListener('click', () => this.scrollToTrailer());
    this.fullscreenBtn?.addEventListener('click', () => this.toggleFullscreen());

    // System Requirements
    this.minReqBtn?.addEventListener('click', () => this.showMinimumRequirements());
    this.recReqBtn?.addEventListener('click', () => this.showRecommendedRequirements());

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNav(e));

    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDownloadModal();
        this.closeMobileMenu();
      }
    });

    // Window Resize
    window.addEventListener('resize', () => this.handleResize());
  }

  // ============================================
  // MOBILE MENU FUNCTIONS
  // ============================================
  toggleMobileMenu() {
    this.mobileMenuOverlay?.classList.toggle('active');
    document.body.style.overflow = this.mobileMenuOverlay?.classList.contains('active') ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.mobileMenuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ============================================
  // PHASE TABS
  // ============================================
  handlePhaseTabClick(event) {
    const tab = event.currentTarget;
    const phase = tab.getAttribute('data-phase');
    const data = CONFIG.phaseData[phase];

    if (!data) return;

    // Update active tab
    this.phaseTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update content with fade effect
    const phaseImage = document.getElementById('phase-image');
    const phaseTitle = document.getElementById('phase-title');
    const phaseDescription = document.getElementById('phase-description');
    const phaseEnemies = document.getElementById('phase-enemies');
    const phaseFeature = document.getElementById('phase-feature');

    // Fade out
    phaseImage.style.opacity = '0';
    
    setTimeout(() => {
      // Update content
      phaseTitle.textContent = data.title;
      phaseDescription.textContent = data.description;
      phaseEnemies.textContent = data.enemies;
      phaseFeature.textContent = data.feature;
      phaseImage.src = data.image;

      // Fade in
      setTimeout(() => {
        phaseImage.style.opacity = '1';
      }, 50);
    }, 300);
  }

  // ============================================
  // DOWNLOAD MODAL
  // ============================================
  openDownloadModal() {
    this.downloadModal?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  closeDownloadModal() {
    this.downloadModal?.classList.remove('show');
    document.body.style.overflow = '';
  }

  simulateDownload() {
    const btn = this.startDownloadBtn;
    const originalText = btn.innerHTML;
    const originalClass = btn.className;

    // Step 1: Preparing
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i> PREPARING DOWNLOAD...';
    btn.disabled = true;

    this.showNotification('Starting download simulation...', 'info');

    setTimeout(() => {
      // Step 2: Downloading
      btn.innerHTML = '<i class="fas fa-download mr-3"></i> DOWNLOADING... 0%';

      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        btn.innerHTML = `<i class="fas fa-download mr-3"></i> DOWNLOADING... ${progress}%`;

        if (progress >= 100) {
          clearInterval(progressInterval);

          // Step 3: Completed
          btn.innerHTML = '<i class="fas fa-check mr-3"></i> DOWNLOAD COMPLETE!';
          btn.style.background = 'linear-gradient(135deg, #00cc66, #00ff88)';

          this.showNotification(
            'Download simulation complete! In production, the game file would now be on your computer.',
            'success'
          );

          // Close modal after delay
          setTimeout(() => {
            this.closeDownloadModal();

            // Reset button
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.disabled = false;
              btn.className = originalClass;
              btn.style.background = '';
            }, 500);
          }, 2000);
        }
      }, 200);
    }, 1500);
  }

  // ============================================
  // VIDEO PLAYER
  // ============================================
  handleVideoPlay() {
    this.videoPlaceholder.style.display = 'none';
    this.videoPlayer.style.display = 'block';
    
    // Play video
    if (this.trailerVideo) {
      this.trailerVideo.play().catch(err => {
        console.log('Video play error:', err);
        this.showNotification('Unable to play video. Please try again.', 'error');
      });
    }
  }

  scrollToTrailer() {
    const trailerSection = document.getElementById('trailer');
    if (trailerSection) {
      trailerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        if (this.videoPlaceholder?.style.display !== 'none') {
          this.playTrailerBtn?.click();
        }
      }, 1000);
    }
  }

  toggleFullscreen() {
    if (!this.trailerVideo) return;

    if (this.trailerVideo.requestFullscreen) {
      this.trailerVideo.requestFullscreen();
    } else if (this.trailerVideo.webkitRequestFullscreen) {
      this.trailerVideo.webkitRequestFullscreen();
    } else if (this.trailerVideo.mozRequestFullScreen) {
      this.trailerVideo.mozRequestFullScreen();
    } else if (this.trailerVideo.msRequestFullscreen) {
      this.trailerVideo.msRequestFullscreen();
    }
  }

  // ============================================
  // SYSTEM REQUIREMENTS
  // ============================================
  showMinimumRequirements() {
    this.minReqBtn?.classList.add('active');
    this.recReqBtn?.classList.remove('active');
    this.updateRequirements('minimum');
  }

  showRecommendedRequirements() {
    this.recReqBtn?.classList.add('active');
    this.minReqBtn?.classList.remove('active');
    this.updateRequirements('recommended');
  }

  updateRequirements(type) {
    const requirements = CONFIG.requirements[type];
    if (!requirements) return;

    const reqElements = {
      os: document.querySelector('[data-req="os"]'),
      processor: document.querySelector('[data-req="processor"]'),
      memory: document.querySelector('[data-req="memory"]'),
      graphics: document.querySelector('[data-req="graphics"]'),
      storage: document.querySelector('[data-req="storage"]')
    };

    // Update each requirement with fade effect
    Object.keys(requirements).forEach(key => {
      const element = reqElements[key];
      if (element) {
        element.style.opacity = '0';
        setTimeout(() => {
          element.textContent = requirements[key];
          element.style.opacity = '1';
        }, 150);
      }
    });
  }

  // ============================================
  // GALLERY TOUCH GESTURES
  // ============================================
  setupGalleryGestures() {
    if (!this.galleryGrid) return;

    // Touch events for mobile swipe
    this.galleryGrid.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.galleryGrid.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleGallerySwipe();
    }, { passive: true });

    // Desktop navigation buttons
    this.galleryPrevBtn?.addEventListener('click', () => this.navigateGallery('prev'));
    this.galleryNextBtn?.addEventListener('click', () => this.navigateGallery('next'));
  }

  handleGallerySwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next
        this.navigateGallery('next');
      } else {
        // Swipe right - prev
        this.navigateGallery('prev');
      }
    }
  }

  navigateGallery(direction) {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    const visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const maxIndex = Math.ceil(items.length / visibleCount) - 1;

    if (direction === 'next') {
      this.currentGalleryIndex = Math.min(this.currentGalleryIndex + 1, maxIndex);
    } else {
      this.currentGalleryIndex = Math.max(this.currentGalleryIndex - 1, 0);
    }

    // Scroll to position (for mobile)
    const itemWidth = items[0].offsetWidth;
    const gap = 16; // Gap between items
    const scrollPosition = this.currentGalleryIndex * visibleCount * (itemWidth + gap);
    
    this.galleryGrid.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  // ============================================
  // SCROLL EFFECTS
  // ============================================
  setupScrollEffects() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Navbar scroll effect
      if (currentScroll > 100) {
        this.navbar?.classList.add('scrolled');
      } else {
        this.navbar?.classList.remove('scrolled');
      }

      // Update active nav link
      this.updateActiveNavLink();

      lastScroll = currentScroll;
    }, { passive: true });
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ============================================
  // SMOOTH SCROLLING
  // ============================================
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          const offset = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          this.closeMobileMenu();
        }
      });
    });
  }

  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('section, .mechanic-card, .combat-card, .gallery-item, .req-card').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  handleKeyboardNav(e) {
    // Gallery navigation with arrow keys
    if (document.activeElement.closest('.gallery-container')) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.navigateGallery('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.navigateGallery('next');
      }
    }
  }

  // ============================================
  // WINDOW RESIZE HANDLER
  // ============================================
  handleResize() {
    // Reset gallery index on resize
    if (this.galleryGrid) {
      this.currentGalleryIndex = 0;
      this.galleryGrid.scrollTo({ left: 0, behavior: 'smooth' });
    }

    // Close mobile menu on desktop
    if (window.innerWidth >= 1024) {
      this.closeMobileMenu();
    }
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    `;

    const colors = {
      success: { bg: '#00cc66', border: '#00aa55' },
      error: { bg: '#ff3333', border: '#cc0000' },
      info: { bg: 'var(--bg-card)', border: 'var(--border-color)' }
    };

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background-color: ${colors[type].bg};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 4px;
      border: 1px solid ${colors[type].border};
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      max-width: 90%;
      z-index: 3000;
      animation: slideInRight 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;

    // Mobile adjustments
    if (window.innerWidth < 640) {
      notification.style.top = '80px';
      notification.style.right = '10px';
      notification.style.left = '10px';
      notification.style.maxWidth = 'calc(100% - 20px)';
    }

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 0.875rem;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    });

    // Add keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
}

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const app = new TypingBattleApp();

  // Prevent zoom on double tap (iOS)
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Log app info
  console.log('%c🎮 TYPING BATTLE 🎮', 'font-size: 20px; font-weight: bold; color: #00f3ff;');
  console.log('%cApp loaded successfully!', 'color: #00ff88;');
  console.log(`%cScreen: ${window.innerWidth}x${window.innerHeight}`, 'color: #b0b0c0;');
  console.log(`%cDevice: ${/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'}`, 'color: #b0b0c0;');
});

// ============================================
// SERVICE WORKER FOR PWA (Optional)
// ============================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to enable PWA
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('Service Worker registered'))
    //   .catch(err => console.log('Service Worker registration failed'));
  });
}