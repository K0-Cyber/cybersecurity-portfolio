// Content stays visible without JavaScript; motion is a progressive enhancement.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!reducedMotion.matches) {
        entry.target.animate(
          [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)' }
        );
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      document.getAnimations().forEach((animation) => animation.cancel());
      observer.disconnect();
    }
  });
}

// Copy is optional; the mailto link remains the primary contact action.
const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
if (copyButton && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('ekamanquah@hotmail.com');
      copyButton.textContent = 'Copied';
      copyStatus.classList.add('sr-only');
      copyStatus.textContent = 'Email address copied.';
    } catch {
      copyButton.textContent = 'Copy';
      copyStatus.classList.remove('sr-only');
      copyStatus.textContent = 'Copy is unavailable. Select the email address above or use Email Kofi.';
    }
  });
}
