// script.js - Ultra Professional
function bookRoom(roomType) {
  document.getElementById('roomTypeModal').value = roomType;
  document.getElementById('bookingModal').style.display = 'block';
}

document.getElementById('bookingForm')?.addEventListener('submit', function(event) {
  event.preventDefault();
  alert(`Thank you! Booking for ${document.getElementById('roomTypeModal').value} received.`);
  document.getElementById('bookingModal').style.display = 'none';
});

// === AUTH (existing + validation) ===
function isLoggedIn() {
  const user = localStorage.getItem('user');
  return user && JSON.parse(user).isLoggedIn === true;
}

function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function login(userData) {
  localStorage.setItem('user', JSON.stringify({...userData, isLoggedIn: true}));
  updateNav();
}

function logout() {
  localStorage.removeItem('user');
  updateNav();
  window.location.href = 'index.html';
}

function updateNav() {
  const authNav = document.getElementById('auth-nav');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const usernameDisplay = document.getElementById('username-display');

  if (isLoggedIn()) {
    if (authNav) authNav.style.display = 'inline';
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    if (usernameDisplay) usernameDisplay.textContent = getCurrentUser().username;
  } else {
    if (authNav) authNav.style.display = 'none';
    if (loginLink) loginLink.style.display = 'inline';
    if (registerLink) registerLink.style.display = 'inline';
  }
}

// === VALIDATION (existing) ===
function getUsers() { const users = localStorage.getItem('users'); return users ? JSON.parse(users) : []; }
function saveUsers(users) { localStorage.setItem('users', JSON.stringify(users)); }

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorSpan = field.parentNode.querySelector('.error') || field.parentNode.appendChild(document.createElement('span'));
  errorSpan.textContent = message;
  errorSpan.className = 'error';
  field.classList.add('input-error');
  field.classList.remove('input-valid');
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorSpan = field.parentNode.querySelector('.error');
  if (errorSpan) errorSpan.textContent = '';
  field.classList.remove('input-error');
  field.classList.add('input-valid');
}

function validateUsername(username) {
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, underscores';
  return '';
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
}

function validatePassword(password) {
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character';
  return '';
}

function validateFullName(fullName) {
  if (!fullName || fullName.trim().length < 2) return 'Full name must be at least 2 characters';
  if (fullName.length > 50) return 'Full name must be less than 50 characters';
  if (!/^[a-zA-Z\s\-']+$/.test(fullName.trim())) return 'Full name can only contain letters, spaces, hyphens, or apostrophes';
  return '';
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/; // International phone format
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (!cleaned || cleaned.length < 10) return 'Phone number must be at least 10 digits';
  if (!phoneRegex.test(cleaned)) return 'Please enter a valid phone number';
  return '';
}

function validateRegister(username, fullName, phone, email, password, confirmPassword) {
  const errors = {};
  const usernameErr = validateUsername(username); if (usernameErr) errors.regUsername = usernameErr;
  const fullNameErr = validateFullName(fullName); if (fullNameErr) errors.regFullName = fullNameErr;
  const phoneErr = validatePhone(phone); if (phoneErr) errors.regPhone = phoneErr;
  const emailErr = validateEmail(email); if (emailErr) errors.regEmail = emailErr;
  const passwordErr = validatePassword(password); if (passwordErr) errors.regPassword = passwordErr;
  if (password !== confirmPassword) errors.regConfirmPassword = 'Passwords do not match';
  const users = getUsers(); 
  if (users.some(u => u.username === username || u.email === email)) errors.regUsername = 'Username or email already exists';
  return { valid: Object.keys(errors).length === 0, errors };
}

function validateLogin(credential, password) {
  const users = getUsers();
  const user = users.find(u => u.username === credential || u.email === credential);
  if (!user) return { valid: false, error: 'Invalid username or email' };
  if (!password) return { valid: false, error: 'Password is required' };
  return { valid: true, user };
}

function addRealTimeValidation(fieldId, validateFn, errorFieldId) {
  const field = document.getElementById(fieldId);
  field.addEventListener('blur', () => {
    const value = field.value;
    const error = validateFn(value);
    if (error) showFieldError(errorFieldId, error); else clearFieldError(errorFieldId);
  });
}

// === NEW ULTRA-PROFESSIONAL FEATURES ===
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
let testimonialInterval;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.style.display = i === index ? 'block' : 'none';
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function startTestimonialCarousel() {
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = 'auto';
}

function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
}

// Event listeners for modals/closes
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('booking-modal') || e.target.classList.contains('close')) {
    closeModal('bookingModal');
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateNav();
  showTestimonial(0);
  startTestimonialCarousel();
  
  // Real-time validation setup (if on auth pages)
  const regUsername = document.getElementById('regUsername');
  if (regUsername) addRealTimeValidation('regUsername', validateUsername, 'regUsername');
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // login validation logic here (from inline)
  }
  
  // Loading spinner
  const loading = document.querySelector('.loading');
  if (loading) loading.style.display = 'none';
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });
});
