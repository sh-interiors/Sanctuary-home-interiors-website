document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for navbar links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = document.querySelector(link.getAttribute('href'));
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Contact form handling
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  function isValidEmail(email) {
    return /^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email);
  }

  function isValidMobile(mobile) {
    return /^\d{10}$/.test(mobile);
  }

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const formData = {
        user_name: form.user_name.value.trim(),
        user_email: form.user_email.value.trim(),
        mobile: form.mobile.value.trim(),
        message: form.message.value.trim()
      };

      // Validation
      let errorMsg = '';
      if (!formData.user_name) errorMsg += 'Name is required.<br>';
      if (!formData.user_email) errorMsg += 'Email is required.<br>';
      else if (!isValidEmail(formData.user_email)) errorMsg += 'Enter a valid email address.<br>';
      if (!formData.mobile) errorMsg += 'Mobile number is required.<br>';
      else if (!isValidMobile(formData.mobile)) errorMsg += 'Enter a valid 10-digit mobile number.<br>';
      if (!formData.message) errorMsg += 'Message is required.<br>';

      if (errorMsg) {
        statusDiv.innerHTML = errorMsg.replace(/<br>/g, '\n');
        statusDiv.style.color = 'red';
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Input',
          html: errorMsg,
          confirmButtonColor: '#6d7f3f'
        });
        return;
      }

      try {
        const res = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await res.json();

        // Show SweetAlert2 popup
        Swal.fire({
          icon: result.success ? 'success' : 'error',
          title: result.success ? 'sanctuaryhomeinteriors.in says' : 'Error',
          text: result.message,
          confirmButtonColor: '#6d7f3f'
        });

        // Show status below the form too
        statusDiv.textContent = result.message;
        statusDiv.style.color = result.success ? 'green' : 'red';

        if (result.success) form.reset();
      } catch (error) {
        statusDiv.textContent = 'Error submitting form.';
        statusDiv.style.color = 'red';
        Swal.fire({
          icon: 'error',
          title: 'sanctuaryhomeinteriors.in says',
          text: 'Error submitting form. Please try again.',
          confirmButtonColor: '#6d7f3f'
        });
      }
    });
  }
});

