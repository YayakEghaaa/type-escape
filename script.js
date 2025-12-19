// ============================================
// TYPING BATTLE - MAIN JAVASCRIPT
// ============================================

// Configuration
const CONFIG = {
  phaseData: {
    warehouse: {
      title: "WAREHOUSE",
      description:
        "The starting area where Rika awakens. Limited visibility due to poor lighting and stacked crates. Enemies use ambush tactics from behind cover. Master the basics of cover-based typing combat here.",
      enemies: "8-12",
      feature: "Destructible Environment",
      image: "assets/images/phases/warehouse.png",
    },
    hallway: {
      title: "HALLWAY",
      description:
        "Narrow corridors with no cover options. Enemies approach in waves from both directions. This phase tests pure typing speed and accuracy under pressure. No hiding, only skill.",
      enemies: "15-20",
      feature: "Endless Enemy Waves",
      image: "assets/images/phases/hallway.png",
    },
    parking: {
      title: "PARKING LOT",
      description:
        "Open area combat with enemies attacking from all directions. The final and most challenging phase features a boss fight with unique typing patterns. Environmental hazards add to the complexity.",
      enemies: "25+",
      feature: "Boss Fight & Hazards",
      image: "assets/images/phases/parking.png",
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

// DOM Elements
class TypingBattleApp {
  constructor() {
    this.phaseTabs = document.querySelectorAll(".phase-tab");
    this.downloadBtns = document.querySelectorAll(
      "#download-btn, #final-download-btn, #start-download"
    );
    this.downloadModal = document.getElementById("download-modal");
    this.closeModalBtn = document.getElementById("close-modal");
    this.playTrailerBtn = document.getElementById("play-trailer");
    this.videoPlaceholder = document.getElementById("video-placeholder");
    this.videoPlayer = document.getElementById("video-player");
    this.minReqBtn = document.getElementById("min-req-btn");
    this.recReqBtn = document.getElementById("rec-req-btn");
    this.reqValueElements = {
      os: document.querySelectorAll(".req-value")[0],
      processor: document.querySelectorAll(".req-value")[1],
      memory: document.querySelectorAll(".req-value")[2],
      graphics: document.querySelectorAll(".req-value")[3],
      storage: document.querySelectorAll(".req-value")[4],
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollAnimations();
    this.setupSmoothScrolling();
    this.setupMobileMenu();
    console.log("Typing Battle App Initialized!");
  }

  setupEventListeners() {
    // Phase Tabs
    this.phaseTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => this.handlePhaseTabClick(e));
    });

    // Download Modal
    this.downloadBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.openDownloadModal());
    });

    this.closeModalBtn.addEventListener("click", () =>
      this.closeDownloadModal()
    );
    this.downloadModal.addEventListener("click", (e) => {
      if (e.target === this.downloadModal) {
        this.closeDownloadModal();
      }
    });

    // Video Trailer
    this.playTrailerBtn.addEventListener("click", () => this.handleVideoPlay());

    // System Requirements
    this.minReqBtn.addEventListener("click", () =>
      this.showMinimumRequirements()
    );
    this.recReqBtn.addEventListener("click", () =>
      this.showRecommendedRequirements()
    );

    // Start Download
    document
      .getElementById("start-download")
      .addEventListener("click", () => this.simulateDownload());
  }

  handlePhaseTabClick(event) {
    const tab = event.currentTarget;
    const phase = tab.getAttribute("data-phase");
    const data = CONFIG.phaseData[phase];

    // Update active tab
    this.phaseTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Update content
    document.getElementById("phase-title").textContent = data.title;
    document.getElementById("phase-description").textContent = data.description;
    document.getElementById("phase-enemies").textContent = data.enemies;
    document.getElementById("phase-feature").textContent = data.feature;
    document.getElementById("phase-image").src = data.image;

    // Add animation effect
    const phaseImage = document.getElementById("phase-image");
    phaseImage.style.opacity = "0.5";
    setTimeout(() => {
      phaseImage.style.opacity = "1";
    }, 300);
  }

  openDownloadModal() {
    this.downloadModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  closeDownloadModal() {
    this.downloadModal.classList.remove("show");
    document.body.style.overflow = "";
  }

  handleVideoPlay() {
    this.videoPlaceholder.style.display = "none";
    this.videoPlayer.style.display = "block";

    // In production, you would actually play the video
    // const video = document.getElementById('trailer-video');
    // video.play();

    // For demo, show a message
    this.showNotification(
      "Video player activated. In production, this would play the game trailer."
    );
  }

  showMinimumRequirements() {
    this.minReqBtn.classList.add("active");
    this.recReqBtn.classList.remove("active");

    this.updateRequirements("minimum");
  }

  showRecommendedRequirements() {
    this.recReqBtn.classList.add("active");
    this.minReqBtn.classList.remove("active");

    this.updateRequirements("recommended");
  }

  updateRequirements(type) {
    const requirements = CONFIG.requirements[type];

    if (this.reqValueElements.os) {
      this.reqValueElements.os.textContent = requirements.os;
      this.reqValueElements.processor.textContent = requirements.processor;
      this.reqValueElements.memory.textContent = requirements.memory;
      this.reqValueElements.graphics.textContent = requirements.graphics;
      this.reqValueElements.storage.textContent = requirements.storage;
    }
  }

  simulateDownload() {
    const btn = document.getElementById("start-download");
    const originalText = btn.innerHTML;
    const originalClass = btn.className;

    // Step 1: Preparing
    btn.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-3"></i> PREPARING DOWNLOAD...';
    btn.disabled = true;

    this.showNotification("Starting download simulation...", "info");

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
          btn.innerHTML =
            '<i class="fas fa-check mr-3"></i> DOWNLOAD COMPLETE!';
          btn.className = originalClass
            .replace("from-green-600", "from-gray-600")
            .replace("to-cyan-600", "to-gray-700");

          this.showNotification(
            "Download simulation complete! In production, the game file would now be on your computer.",
            "success"
          );

          // Close modal after delay
          setTimeout(() => {
            this.closeDownloadModal();

            // Reset button
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.disabled = false;
              btn.className = originalClass;
            }, 500);
          }, 2000);
        }
      }, 200);
    }, 1500);
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
      section.classList.add("fade-in");
      observer.observe(section);
    });

    // Observe cards and other elements
    document
      .querySelectorAll(".mechanic-card, .combat-card, .gallery-item")
      .forEach((el) => {
        el.classList.add("fade-in");
        observer.observe(el);
      });
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offset = 80;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update active nav link
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active");
          });
          this.classList.add("active");
        }
      });
    });
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const desktopNav = document.querySelector(".desktop-nav");

    mobileMenuBtn.addEventListener("click", () => {
      // Toggle mobile menu
      if (desktopNav.style.display === "flex") {
        desktopNav.style.display = "none";
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      } else {
        desktopNav.style.display = "flex";
        desktopNav.style.flexDirection = "column";
        desktopNav.style.position = "absolute";
        desktopNav.style.top = "100%";
        desktopNav.style.left = "0";
        desktopNav.style.right = "0";
        desktopNav.style.backgroundColor = "var(--bg-secondary)";
        desktopNav.style.padding = "1rem";
        desktopNav.style.gap = "1rem";
        desktopNav.style.borderTop = "1px solid var(--border-color)";
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          desktopNav.style.display = "none";
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${
              type === "success"
                ? "#00cc66"
                : type === "error"
                ? "#ff3333"
                : "var(--bg-card)"
            };
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            border: 1px solid ${
              type === "success"
                ? "#00aa55"
                : type === "error"
                ? "#cc0000"
                : "var(--border-color)"
            };
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            max-width: 400px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;

    // Add close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 0.875rem;
        `;

    closeBtn.addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });

    // Add keyframes for animation
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }

    // Add to document
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }

  // Trailer button in hero
  setupTrailerButton() {
    document.getElementById("trailer-btn").addEventListener("click", () => {
      document.getElementById("trailer").scrollIntoView({ behavior: "smooth" });

      // Auto-play video when scrolled to
      setTimeout(() => {
        this.playTrailerBtn.click();
      }, 1000);
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const app = new TypingBattleApp();
  app.setupTrailerButton();

  // Add typewriter effect to tagline
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = "";
    tagline.classList.add("typewriter");

    setTimeout(() => {
      tagline.textContent = originalText;
      tagline.style.animation = "none";
      tagline.style.borderRight = "none";
    }, 4000);
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  const desktopNav = document.querySelector(".desktop-nav");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");

  if (window.innerWidth >= 768) {
    desktopNav.style.display = "flex";
    desktopNav.style.flexDirection = "row";
    desktopNav.style.position = "static";
    desktopNav.style.backgroundColor = "transparent";
    desktopNav.style.padding = "0";
    desktopNav.style.borderTop = "none";
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  } else {
    desktopNav.style.display = "none";
  }
});
