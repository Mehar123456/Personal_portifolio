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

  // EmailJS contact form
  $("#contact-form").submit(function (event) {
    event.preventDefault();
    const btn = $('#contact-submit');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...').prop('disabled', true);
    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
    emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
      .then(function (response) {
        btn.html('<i class="fas fa-check"></i> Sent!');
        document.getElementById("contact-form").reset();
        setTimeout(() => btn.html('<i class="fas fa-paper-plane"></i> Send Message').prop('disabled', false), 3000);
      }, function (error) {
        btn.html('<i class="fas fa-exclamation-triangle"></i> Failed').prop('disabled', false);
        setTimeout(() => btn.html('<i class="fas fa-paper-plane"></i> Send Message'), 2000);
      });
  });

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