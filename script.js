// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

// Character counter
messageTextarea.addEventListener('input', () => {
    const count = messageTextarea.value.length;
    charCount.textContent = count;
    
    if (count > 500) {
        messageTextarea.value = messageTextarea.value.substring(0, 500);
        charCount.textContent = 500;
    }
});

// Form validation
function validateField(field, errorId, validationFn, errorMessage) {
    const errorElement = document.getElementById(errorId);
    const isValid = validationFn(field.value);
    
    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
        return false;
    } else {
        field.classList.remove('error');
        errorElement.classList.remove('show');
        return true;
    }
}

function validateName(value) {
    return value.trim().length >= 2;
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function validatePhone(value) {
    // Kenyan phone number format: +254 or 0, followed by 9 digits
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    const cleanPhone = value.replace(/\s/g, '');
    return phoneRegex.test(cleanPhone);
}

function validateLocation(value) {
    return value.trim().length >= 2;
}

function validateInquiryType(value) {
    return value !== '';
}

function validateMessage(value) {
    return value.trim().length >= 10 && value.length <= 500;
}

// Clear all errors
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
}

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const location = document.getElementById('location');
    const inquiryType = document.getElementById('inquiryType');
    const message = document.getElementById('message');
    
    // Validate all fields
    const isNameValid = validateField(name, 'nameError', validateName, 'Name must be at least 2 characters');
    const isEmailValid = validateField(email, 'emailError', validateEmail, 'Please enter a valid email address');
    const isPhoneValid = validateField(phone, 'phoneError', validatePhone, 'Please enter a valid Kenyan phone number (e.g., +254 700 000 000)');
    const isLocationValid = validateField(location, 'locationError', validateLocation, 'Please enter your location');
    const isInquiryTypeValid = validateField(inquiryType, 'inquiryTypeError', validateInquiryType, 'Please select an inquiry type');
    const isMessageValid = validateField(message, 'messageError', validateMessage, 'Message must be between 10 and 500 characters');
    
    // If all validations pass
    if (isNameValid && isEmailValid && isPhoneValid && isLocationValid && isInquiryTypeValid && isMessageValid) {
        // Hide form
        contactForm.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'flex';
        
        // In a real application, you would send the data to a server here
        console.log('Form submitted:', {
            name: name.value,
            email: email.value,
            phone: phone.value,
            location: location.value,
            inquiryType: inquiryType.value,
            message: message.value
        });
        
        // Reset form after 5 seconds and show it again
        setTimeout(() => {
            contactForm.reset();
            charCount.textContent = '0';
            successMessage.style.display = 'none';
            contactForm.style.display = 'flex';
        }, 5000);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Real-time validation on blur
document.getElementById('name').addEventListener('blur', function() {
    validateField(this, 'nameError', validateName, 'Name must be at least 2 characters');
});

document.getElementById('email').addEventListener('blur', function() {
    validateField(this, 'emailError', validateEmail, 'Please enter a valid email address');
});

document.getElementById('phone').addEventListener('blur', function() {
    validateField(this, 'phoneError', validatePhone, 'Please enter a valid Kenyan phone number (e.g., +254 700 000 000)');
});

document.getElementById('location').addEventListener('blur', function() {
    validateField(this, 'locationError', validateLocation, 'Please enter your location');
});

document.getElementById('inquiryType').addEventListener('change', function() {
    validateField(this, 'inquiryTypeError', validateInquiryType, 'Please select an inquiry type');
});

document.getElementById('message').addEventListener('blur', function() {
    validateField(this, 'messageError', validateMessage, 'Message must be between 10 and 500 characters');
});

// Sticky header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});