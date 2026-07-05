/* ===================================================
   SRIMEHAR THIRUNAGARI — AI ENGINEER PORTFOLIO JS
   Premium Interactions | Neural Canvas | Counters | Animations
   =================================================== */

// ===== TYPED.JS =====
var typed = new Typed(".typing-text", {
  strings: [
    "AI Software Engineer",
    "Generative AI Engineer",
    "Agentic AI Engineer",
    "LangChain Developer",
    "Automotive AI Engineer",
    "Backend Engineer"
  ],
  loop: true,
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 1800,
});

// ===== JQUERY READY =====
$(document).ready(function () {

  // Mobile menu toggle
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  // Close menu on scroll
  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    // Header scroll style
    if (window.scrollY > 60) {
      document.querySelector('#header').classList.add('scrolled');
    } else {
      document.querySelector('#header').classList.remove('scrolled');
    }

    // Scroll-to-top button
    if (window.scrollY > 300) {
      document.querySelector('#scroll-top').classList.add('active');
    } else {
      document.querySelector('#scroll-top').classList.remove('active');
    }

    // Scroll spy - update active nav
    $('section').each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr('id');
      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }
    });

    // Trigger counter animation when stats section is visible
    triggerCounters();
  });

  // Smooth scroll
  $('a[href*="#"]').on('click', function (e) {
    const target = $(this).attr('href');
    if (target && target !== '#' && $(target).length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(target).offset().top - 70,
      }, 600, 'swing');
    }
  });

  // ===== WHATSAPP CONTACT FORM =====
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const statusDiv = document.getElementById('form-status');

  const fields = {
    name: {
      el: document.getElementById('form-name'),
      errorEl: document.getElementById('error-name'),
      validate: (val) => {
        if (!val.trim()) return 'Name is required';
        return '';
      }
    },
    email: {
      el: document.getElementById('form-email'),
      errorEl: document.getElementById('error-email'),
      validate: (val) => {
        if (!val.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Please enter a valid email address';
        return '';
      }
    },
    company: {
      el: document.getElementById('form-company'),
      errorEl: document.getElementById('error-company'),
      validate: (val) => {
        if (!val.trim()) return 'Company is required';
        return '';
      }
    },
    role: {
      el: document.getElementById('form-role'),
      errorEl: document.getElementById('error-role'),
      validate: () => '' // Optional
    },
    phone: {
      el: document.getElementById('form-phone'),
      errorEl: document.getElementById('error-phone'),
      validate: () => '' // Optional
    },
    subject: {
      el: document.getElementById('form-subject'),
      errorEl: document.getElementById('error-subject'),
      validate: (val) => {
        if (!val.trim()) return 'Subject is required';
        return '';
      }
    },
    message: {
      el: document.getElementById('form-message'),
      errorEl: document.getElementById('error-message'),
      validate: (val) => {
        if (!val.trim()) return 'Message is required';
        if (val.trim().length < 10) return 'Message must be at least 10 characters long';
        return '';
      }
    }
  };

  let hasSubmitted = false;

  /**
   * Validates a single field.
   */
  const validateField = (key, showErrors = false) => {
    const field = fields[key];
    const value = field.el.value;
    const errorMsg = field.validate(value);

    if (errorMsg && showErrors) {
      field.errorEl.textContent = errorMsg;
      field.el.parentElement.classList.add('invalid');
    } else {
      field.errorEl.textContent = '';
      field.el.parentElement.classList.remove('invalid');
    }

    return !errorMsg;
  };

  /**
   * Validates the whole form.
   */
  const validateForm = (showErrors = false) => {
    let isValid = true;
    Object.keys(fields).forEach(key => {
      const fieldValid = validateField(key, showErrors);
      if (!fieldValid) isValid = false;
    });
    submitBtn.disabled = !isValid;
    return isValid;
  };

  /**
   * Builds the formatted WhatsApp message.
   */
  const buildWhatsAppMessage = (data) => {
    return `🚀 New Portfolio Contact\n━━━━━━━━━━━━━━━━━━━━\n👤 Name:\n${data.name}\n\n🏢 Company:\n${data.company}\n\n💼 Job Role:\n${data.role || 'Not Specified'}\n\n📧 Email:\n${data.email}\n\n📱 Phone:\n${data.phone || 'Not Specified'}\n\n📌 Subject:\n${data.subject}\n\n💬 Message:\n${data.message}\n━━━━━━━━━━━━━━━━━━━━\nSent from Srimehar's AI Portfolio`;
  };

  /**
   * URL encodes the message text.
   */
  const encodeMessage = (text) => {
    return encodeURIComponent(text);
  };

  /**
   * Redirects the browser to WhatsApp.
   */
  const redirectToWhatsApp = (encodedText) => {
    return new Promise((resolve) => {
      const waNumber = '918688934220';
      const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

      try {
        const newTab = window.open(waUrl, '_blank');
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          window.location.href = waUrl;
        }
        resolve(true);
      } catch (e) {
        console.error('Failed to open WhatsApp window:', e);
        resolve(false);
      }
    });
  };

  /**
   * Resets the form.
   */
  const resetForm = () => {
    form.reset();
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      field.errorEl.textContent = '';
      field.el.parentElement.classList.remove('invalid');
    });
    submitBtn.disabled = true;
  };

  // Attach event listeners for real-time validation
  if (form) {
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      field.el.addEventListener('input', () => {
        validateForm(hasSubmitted);
      });
      field.el.addEventListener('blur', () => {
        validateField(key, true);
        validateForm(hasSubmitted);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      hasSubmitted = true;

      if (!validateForm(true)) {
        return;
      }

      const data = {
        name: fields.name.el.value,
        email: fields.email.el.value,
        company: fields.company.el.value,
        role: fields.role.el.value,
        phone: fields.phone.el.value,
        subject: fields.subject.el.value,
        message: fields.message.el.value
      };

      statusDiv.className = 'form-status loading';
      statusDiv.innerHTML = '<span class="spinner"></span> Processing your request...';
      statusDiv.style.display = 'flex';
      submitBtn.disabled = true;

      const rawMsg = buildWhatsAppMessage(data);
      const encodedMsg = encodeMessage(rawMsg);

      setTimeout(() => {
        statusDiv.innerHTML = '<span class="spinner"></span> Redirecting you to WhatsApp...';

        redirectToWhatsApp(encodedMsg).then((success) => {
          if (success) {
            statusDiv.className = 'form-status success';
            statusDiv.textContent = 'Redirecting to WhatsApp...';
            resetForm();
            hasSubmitted = false;
            setTimeout(() => {
              statusDiv.style.display = 'none';
            }, 4000);
          } else {
            statusDiv.className = 'form-status error';
            statusDiv.textContent = 'Unable to open WhatsApp. Please ensure WhatsApp is installed or WhatsApp Web is accessible.';
            submitBtn.disabled = false;
          }
        });
      }, 1000);
    });
  }

});

// ===== TAB VISIBILITY =====
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Srimehar Thirunagari | AI Software Engineer";
    $("#favicon").attr("href", "assets/images/favicon.png");
  } else {
    document.title = "Come Back | Srimehar AI Engineer";
    $("#favicon").attr("href", "assets/images/favhand.png");
  }
});

// ===== ANIMATED COUNTER =====
let countersTriggered = false;

function triggerCounters() {
  if (countersTriggered) return;
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.85) {
    countersTriggered = true;
    document.querySelectorAll('.stat-card').forEach(card => {
      const target = parseInt(card.getAttribute('data-target'));
      const counter = card.querySelector('.counter');
      let current = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }
}

// ===== NEURAL NETWORK CANVAS =====
(function () {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const NODES = 55;
  const CONNECTION_DIST = 150;
  let nodes = [];
  let mouse = { x: null, y: null };

  class Node {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2.5 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < NODES; i++) {
    nodes.push(new Node());
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      // Mouse interaction
      if (mouse.x !== null) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const opacity = (1 - dist / 200) * 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => { n.update(); n.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();



// ===== SCROLL REVEAL ANIMATIONS =====
const sr = ScrollReveal({
  origin: 'bottom',
  distance: '40px',
  duration: 800,
  reset: false,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
});

// Hero
sr.reveal('.hero-badge', { delay: 100 });
sr.reveal('.hero-name', { delay: 200 });
sr.reveal('.hero-title', { delay: 300 });
sr.reveal('.hero-subtitle', { delay: 350 });
sr.reveal('.hero-desc', { delay: 400 });
sr.reveal('.hero-buttons', { delay: 500 });
sr.reveal('.hero-socials', { delay: 600 });
sr.reveal('.hero-visual', { delay: 400, origin: 'right' });

// Stats
sr.reveal('.stat-card', { interval: 100 });

// About
sr.reveal('.about-image', { delay: 200, origin: 'left' });
sr.reveal('.about-content', { delay: 300, origin: 'right' });

// Skills
sr.reveal('.skill-category', { interval: 150 });

// Experience
sr.reveal('.exp-card', { interval: 200 });

// Projects
sr.reveal('.project-card', { interval: 150 });

// Automotive
sr.reveal('.auto-card', { interval: 100 });

// Education
sr.reveal('.edu-card', { interval: 200 });

// Contact
sr.reveal('.availability-card', { delay: 200, origin: 'left' });
sr.reveal('.contact-links .contact-link', { interval: 100 });
sr.reveal('.contact-form-wrap', { delay: 300, origin: 'right' });

// ===== VANILLA TILT ON PROJECT CARDS =====
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.08,
  });
  VanillaTilt.init(document.querySelectorAll(".stat-card"), {
    max: 8,
    speed: 400,
  });
}

// ===== ACTIVE NAV ON LOAD =====
window.dispatchEvent(new Event('scroll'));