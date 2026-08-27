/* ============================================================
   ESEOGHENE'S PORTFOLIO — MASTER SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Copyright year ───────────────────────────────────────
  const year = new Date().getFullYear();
  document.querySelectorAll('.copyright').forEach(el => {
    el.textContent = `© ${year} Eseoghene Christine Otuaga. All rights reserved.`;
  });

  // ── Active nav link ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  // ── Totoro ───────────────────────────────────────────────
  const totoro = document.getElementById('totoro');
  if (totoro) {
    totoro.addEventListener('click', () => {
      alert("Hello! I'm a friendly Totoro — keeper of Ghibli magic and good vibes.");
    });
  }

  // ── IntersectionObserver — handles ALL fade-in elements ──
  // Also used for hobby-card stagger and workflow nodes
  const allFadeEls = document.querySelectorAll('.fade-in, .hobby-card, .mentor-note, .wf-node, .wf-arrow');

  if (allFadeEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, _i) => {
        if (e.isIntersecting) {
          // Stagger siblings inside the same parent
          const siblings = Array.from(e.target.parentElement.children);
          const idx = siblings.indexOf(e.target);
          const delay = idx * 100;

          setTimeout(() => {
            e.target.classList.add('visible');
          }, delay);

          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    allFadeEls.forEach(el => observer.observe(el));
  }

  // ── Chess personality quiz ───────────────────────────────
  const personalityBtns = document.querySelectorAll('.personality-btn');
  const chessResult = document.getElementById('chess-result');
  const pieces = {
    pawn: { title: 'The Pawn', desc: 'Methodical and persistent — you know small, consistent steps lead to great things. You start humble but have extraordinary potential.' },
    knight: { title: 'The Knight', desc: 'Creative and unpredictable — you solve problems from unexpected angles and love a challenge that others find confusing.' },
    bishop: { title: 'The Bishop', desc: 'Strategic and focused — you think in clear lines, excel at long-term planning, and always see the bigger picture.' },
    rook: { title: 'The Rook', desc: 'Direct and powerful — you cut through complexity and tackle problems head-on with efficient, no-nonsense solutions.' },
    queen: { title: 'The Queen', desc: 'Versatile and dynamic — you adapt to any situation, juggle multiple challenges at once, and lead naturally.' },
    king: { title: 'The King', desc: 'Steady and strategic — you provide direction, protect what matters, and understand that patience is its own kind of power.' },
  };

  if (personalityBtns.length && chessResult) {
    personalityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const piece = btn.dataset.piece;
        const data = pieces[piece];
        chessResult.innerHTML = `<h4>${data.title}</h4><p>${data.desc}</p>`;
        chessResult.classList.add('active');
      });
    });
  }

  // ── Contact form ─────────────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn') || contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill in all fields before sending.';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }
      if (formStatus) {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thanks for reaching out! I will get back to you shortly.';
          }
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          const errorMsg = (data && data.errors && data.errors.map(err => err.message).join(', '))
            || 'Oops! There was a problem sending your message. Please try again.';
          if (formStatus) {
            formStatus.className = 'form-status error';
            formStatus.textContent = errorMsg;
          }
        }
      } catch (err) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Network error. Please check your internet connection and try again.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  // ── Bouncing marshmallows (marshmallows page only) ───────
  const marshmallowContainer = document.getElementById('marshmallow-container');
  if (marshmallowContainer) {
    for (let i = 0; i < 22; i++) {
      const m = document.createElement('div');
      const size = Math.random() * 28 + 16;

      m.classList.add('marshmallow-piece');
      m.style.width = `${size}px`;
      m.style.height = `${size * 0.85}px`;
      m.style.left = `${Math.random() * 100}vw`;
      m.style.top = `${Math.random() * 60}vh`;
      m.style.animationDuration = `${Math.random() * 10 + 8}s`;
      m.style.animationDelay = `${Math.random() * 6}s`;
      m.style.animationTimingFunction = 'ease-in-out';

      marshmallowContainer.appendChild(m);
    }
  }

});
