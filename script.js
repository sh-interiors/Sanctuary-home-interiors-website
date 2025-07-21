document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = document.querySelector(link.getAttribute('href'));
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Contact form submit
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const formData = {
        user_name: form.user_name.value.trim(),
        user_email: form.user_email.value.trim(),
        mobile: form.mobile.value.trim(),
        message: form.message.value.trim()
      };

      // Simple validation
      if (!formData.user_name || !formData.user_email || !formData.mobile || !formData.message) {
        statusDiv.textContent = 'Please fill in all fields.';
        return;
      }

      try {
        const res = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await res.json();
        statusDiv.textContent = result.message;
        statusDiv.style.color = result.success ? 'green' : 'red';

        if (result.success) form.reset();
      } catch (error) {
        statusDiv.textContent = 'Error submitting form.';
        statusDiv.style.color = 'red';
      }
    });
  }
});
