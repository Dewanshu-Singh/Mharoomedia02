import './style.css';
import Lenis from 'lenis';

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  autoRaf: true,
  duration: 0.7,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

document.addEventListener('DOMContentLoaded', () => {
  // --- Initialize Lucide Icons if available ---
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Phone Dropdown ---
  const contactToggle = document.getElementById('contact-toggle');
  const contactDropdown = document.getElementById('contact-dropdown');

  if (contactToggle && contactDropdown) {
    contactToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      contactDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!contactToggle.contains(e.target) && !contactDropdown.contains(e.target)) {
        contactDropdown.classList.remove('show');
      }
    });
  }

  // --- Header Scrolled Effect ---
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Reading Progress Bar (Article Page) ---
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
    });
  }

  // --- Mobile Table of Contents Accordion Toggle ---
  const tocSidebar = document.querySelector('.toc-sidebar');
  const tocTitle = document.querySelector('.toc-title');
  const tocLinks = document.querySelectorAll('.toc-nav a');

  if (tocTitle && tocSidebar) {
    // Start collapsed on small screens for cleaner mobile reading experience
    if (window.innerWidth <= 1024) {
      tocSidebar.classList.add('collapsed');
    }

    tocTitle.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        tocSidebar.classList.toggle('collapsed');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        tocSidebar.classList.remove('collapsed');
      }
    });
  }

  // Auto-collapse TOC on mobile after clicking a link
  tocLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024 && tocSidebar) {
        tocSidebar.classList.add('collapsed');
      }
    });
  });

  // --- Table of Contents Active Link Highlight on Scroll ---
  const sections = document.querySelectorAll('.article-body h2[id]');

  if (tocLinks.length > 0 && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });

    sections.forEach(sec => observer.observe(sec));
  }

  // --- Social Share & Copy Link ---
  const copyLinkBtns = document.querySelectorAll('.copy-link-btn');
  const toast = document.getElementById('blog-toast');

  copyLinkBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 2500);
        }
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    });
  });

  // --- Blog Category Filter Tabs (Blogs Hub) ---
  const filterBtns = document.querySelectorAll('.blog-tab-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        blogCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category') || '';
          if (category === 'all' || cardCategory.includes(category)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Consultation Modal Logic ---
  const consultationModal = document.getElementById('consultation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const consultationForm = document.getElementById('consultation-form');
  const contactLinks = document.querySelectorAll('a[href="#contact"]');

  contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (consultationModal) {
        consultationModal.classList.add('active');
      }
    });
  });

  if (modalCloseBtn && consultationModal) {
    modalCloseBtn.addEventListener('click', () => {
      consultationModal.classList.remove('active');
    });
  }

  if (consultationModal) {
    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) {
        consultationModal.classList.remove('active');
      }
    });
  }

  // --- Consultation Form Submission ---
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (consultationForm) {
    consultationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(consultationForm);
      const data = Object.fromEntries(formData.entries());

      if (submitBtn) {
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
      }
      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.innerText = '';
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          if (formStatus) {
            formStatus.style.color = '#22c55e';
            formStatus.innerText = 'Request sent successfully! We will contact you soon.';
          }
          consultationForm.reset();
          setTimeout(() => {
            if (consultationModal) consultationModal.classList.remove('active');
            if (formStatus) formStatus.style.display = 'none';
          }, 3000);
        } else {
          if (formStatus) {
            formStatus.style.color = '#ef4444';
            formStatus.innerText = result.error || 'Failed to send request. Please try again.';
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        if (formStatus) {
          formStatus.style.color = '#ef4444';
          formStatus.innerText = 'A network error occurred. Please try again later.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.innerText = 'Submit Request';
          submitBtn.disabled = false;
        }
      }
    });
  }
});
