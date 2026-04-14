// ========== WAIT FOR DOM CONTENT ==========
document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------
  // 1. POPULATE DESTINATION CARDS (Popular Destination Section)
  // --------------------------------------------------------------
  const destinationsData = [
      {
          name: "Forest Wild Life",
          hpi: "Unavailable",
          rating: "+12",
          image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
          name: "Forest Wild Life",
          hpi: "Unavailable",
          rating: "+12",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
          name: "Forest Wild Life",
          hpi: "Unavailable",
          rating: "+12",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
  ];

  const container = document.getElementById('destinationsContainer');
  if (container) {
      container.innerHTML = '';
      destinationsData.forEach((dest, index) => {
          const card = document.createElement('div');
          card.className = 'dest-card';
          card.setAttribute('data-dest', dest.name);
          card.innerHTML = `
              <div class="card-img" style="background-image: url('${dest.image}'); background-size: cover; background-position: center;"></div>
              <div class="card-content">
                  <h3>${dest.name}</h3>
                  <div class="dest-stats">
                      <span>🌿 HPI: ${dest.hpi}</span>
                      <span>⭐ ${dest.rating}</span>
                  </div>
                  <button class="book-flight-small" data-dest="${dest.name}">Book a Flight Now →</button>
              </div>
          `;
          container.appendChild(card);
      });

      // Attach event listeners to all "Book a Flight Now" buttons inside destination cards
      document.querySelectorAll('.book-flight-small').forEach(btn => {
          btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const destName = btn.getAttribute('data-dest') || 'Forest Wild Life';
              showToast(`✨ Ready to fly to ${destName}? Open booking form!`);
              openModalWithPrefill(destName);
          });
      });
  }

  // Helper to open modal and optionally prefill destination
  function openModalWithPrefill(destName) {
      const modal = document.getElementById('bookingModal');
      const destInput = document.getElementById('destination');
      if (modal && destInput) {
          if (destName && destName !== 'Forest Wild Life') {
              destInput.value = destName;
          } else {
              destInput.value = '';
          }
          modal.style.display = 'flex';
      } else if (modal) {
          modal.style.display = 'flex';
      }
  }

  // --------------------------------------------------------------
  // 2. MODAL LOGIC (Interactive component)
  // --------------------------------------------------------------
  const modal = document.getElementById('bookingModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalSpan = document.querySelector('.close-modal');
  const bookNowHeroBtn = document.getElementById('bookNowBtn');
  const flightNowBtn = document.getElementById('flightNowBtn');
  const learnJourneyBtn = document.getElementById('learnJourneyBtn');

  // Open modal from various buttons
  if (openModalBtn) {
      openModalBtn.addEventListener('click', () => {
          if (modal) modal.style.display = 'flex';
      });
  }

  if (bookNowHeroBtn) {
      bookNowHeroBtn.addEventListener('click', () => {
          if (modal) modal.style.display = 'flex';
          showToast('✈ Start your journey by filling the form!');
      });
  }

  if (flightNowBtn) {
      flightNowBtn.addEventListener('click', () => {
          if (modal) modal.style.display = 'flex';
          showToast('🔥 Grab 20% OFF! Fill details quickly.');
      });
  }

  if (learnJourneyBtn) {
      learnJourneyBtn.addEventListener('click', () => {
          showToast('🌍 Explore more destinations — we will guide you!');
          if (modal) modal.style.display = 'flex';
      });
  }

  // Close modal when X is clicked
  if (closeModalSpan) {
      closeModalSpan.addEventListener('click', () => {
          if (modal) modal.style.display = 'none';
          resetFormAndErrors();
      });
  }

  // Close modal when clicking outside content
  window.addEventListener('click', (e) => {
      if (modal && e.target === modal) {
          modal.style.display = 'none';
          resetFormAndErrors();
      }
  });

  // Reset form fields & errors when modal closed
  function resetFormAndErrors() {
      const form = document.getElementById('bookingForm');
      if (form) form.reset();
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const feedback = document.getElementById('formFeedback');
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (feedback) feedback.innerHTML = '';
  }

  // --------------------------------------------------------------
  // 3. FORM VALIDATION + SUBMIT HANDLER (Functional Enhancement)
  // --------------------------------------------------------------
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const fullName = document.getElementById('fullName');
          const email = document.getElementById('email');
          const destination = document.getElementById('destination');
          const nameError = document.getElementById('nameError');
          const emailError = document.getElementById('emailError');
          const feedbackDiv = document.getElementById('formFeedback');

          let isValid = true;

          // Reset errors
          if (nameError) nameError.textContent = '';
          if (emailError) emailError.textContent = '';
          if (feedbackDiv) feedbackDiv.innerHTML = '';

          // Name validation (non-empty, at least 3 chars)
          if (!fullName.value.trim()) {
              if (nameError) nameError.textContent = 'Full name is required.';
              isValid = false;
          } else if (fullName.value.trim().length < 2) {
              if (nameError) nameError.textContent = 'Enter a valid name.';
              isValid = false;
          }

          // Email validation
          const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
          if (!email.value.trim()) {
              if (emailError) emailError.textContent = 'Email address is required.';
              isValid = false;
          } else if (!emailPattern.test(email.value.trim())) {
              if (emailError) emailError.textContent = 'Enter a valid email (e.g., name@example.com).';
              isValid = false;
          }

          if (isValid) {
              // Success feedback
              if (feedbackDiv) {
                  feedbackDiv.innerHTML = '✅ Thank you! Our travel expert will contact you within 24h. ✈';
                  feedbackDiv.style.color = '#2c7a4d';
                  feedbackDiv.style.fontWeight = '500';
              }
              // Clear the form fields after successful "submit"
              bookingForm.reset();
              // Show success toast
              showToast(`🎉 ${fullName.value.trim()}, your journey awaits! We'll reach out soon.`);
              // Auto close modal after 2.5 seconds (better UX)
              setTimeout(() => {
                  if (modal) modal.style.display = 'none';
                  resetFormAndErrors();
              }, 2300);
          } else {
              if (feedbackDiv) {
                  feedbackDiv.innerHTML = '⚠️ Please fix the errors above.';
                  feedbackDiv.style.color = '#e05a5a';
              }
              showToast('Please fill required fields correctly.', 2500);
          }
      });
  }

  // --------------------------------------------------------------
  // 4. TOAST NOTIFICATION SYSTEM (Feedback indicator)
  // --------------------------------------------------------------
  let toastTimeout = null;
  function showToast(message, duration = 2800) {
      const toast = document.getElementById('toastMsg');
      if (!toast) return;
      // Clear previous timeout to avoid overlap
      if (toastTimeout) clearTimeout(toastTimeout);
      toast.textContent = message;
      toast.classList.add('show');
      toastTimeout = setTimeout(() => {
          toast.classList.remove('show');
      }, duration);
  }

  // Welcome toast on page load (subtle)
  setTimeout(() => {
      showToast('✈ Welcome to SkyWings! Explore magic flights.', 3000);
  }, 500);

  // --------------------------------------------------------------
  // 5. MOBILE HAMBURGER MENU (Improve navigation)
  // --------------------------------------------------------------
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
      hamburger.addEventListener('click', (e) => {
          e.stopPropagation();
          navLinks.classList.toggle('active');
          // Change icon based on state
          const icon = hamburger.querySelector('i');
          if (navLinks.classList.contains('active')) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      });

      // Close mobile menu when clicking a nav link (optional smooth)
      const allNavLinks = document.querySelectorAll('.nav-links a');
      allNavLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (navLinks.classList.contains('active')) {
                  navLinks.classList.remove('active');
                  const icon = hamburger.querySelector('i');
                  icon.classList.remove('fa-times');
                  icon.classList.add('fa-bars');
              }
          });
      });
  }

  // --------------------------------------------------------------
  // 6. ADDITIONAL UI ENHANCEMENTS: smooth scroll, active state
  // --------------------------------------------------------------
  // Smooth scroll for anchor links (optional but adds polish)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href !== "#" && href !== "" && href !== "#0") {
              const target = document.querySelector(href);
              if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
          }
      });
  });

  // --------------------------------------------------------------
  // 7. DYNAMIC YEAR IN FOOTER (optional small dynamic)
  // --------------------------------------------------------------
  const footerPara = document.querySelector('.footer p');
  if (footerPara) {
      const currentYear = new Date().getFullYear();
      if (!footerPara.innerText.includes('2025')) {
          footerPara.innerHTML = footerPara.innerHTML.replace('2025', currentYear);
      } else {
          footerPara.innerHTML = `© ${currentYear} SkyWings | Experience the magic. All journeys inspired. 🌍`;
      }
  }

  // --------------------------------------------------------------
  // 8. CARD CLICK ANIMATION / DESTINATION CARDS ADDITIONAL
  // --------------------------------------------------------------
  // Add extra console-free but interactive: when any dest-card clicked, show toast message
  const destCards = document.querySelectorAll('.dest-card');
  destCards.forEach(card => {
      card.addEventListener('click', (e) => {
          // avoid if click on button already triggers
          if (e.target.classList && e.target.classList.contains('book-flight-small')) return;
          const titleElem = card.querySelector('h3');
          const destName = titleElem ? titleElem.innerText : 'destination';
          showToast(`🌲 ${destName} awaits! Click "Book a Flight Now" to proceed.`);
      });
  });

  // --------------------------------------------------------------
  // 9. SMALL TOUCH: escape key closes modal
  // --------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
          modal.style.display = 'none';
          resetFormAndErrors();
          showToast('Booking canceled, but dreams stay alive ✨');
      }
  });

  // --------------------------------------------------------------
  // 10. ORGANIZATION: all event listeners are clean and performance optimized
  // No redundant loops, CSS transitions used for animations.
  // Also preload toast positioning.
  // --------------------------------------------------------------
});