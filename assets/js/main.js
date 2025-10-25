document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');

if (nav && toggle) {
    toggle.addEventListener('click', () => {
      // nav（メニュー）と toggle（ボタン）の両方にクラスを付け外し
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open'); 

      // (推奨) アクセシビリティ対応
      // ※HTMLの<button>に aria-expanded="false" を追加してください
      toggle.setAttribute('aria-expanded', isOpen);

      document.body.classList.toggle('hidden', isOpen);
    });
  }

  const navLinks = document.querySelectorAll('.nav__link[href]');
  if (navLinks.length) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const normalizedHref = href.split('/').pop();
      if (normalizedHref === currentPath || (normalizedHref === 'index.html' && currentPath === '')) {
        link.classList.add('is-current');
      }
    });
  }

  // Close navigation when clicking a link (mobile)
  if (nav) {
    nav.addEventListener('click', event => {
      if (event.target.classList.contains('nav__link') || event.target.classList.contains('nav__cta')) {
        nav.classList.remove('is-open');
      }
    });
  }

  const roleCards = document.querySelectorAll('[data-role-card]');
  const roleModal = document.querySelector('[data-role-modal]');

  if (roleCards.length && roleModal) {
    const modalTitle = roleModal.querySelector('.modal__title');
    const modalIcon = roleModal.querySelector('.modal__icon');
    const modalBody = roleModal.querySelector('.modal__body');
    const closeTargets = roleModal.querySelectorAll('[data-modal-close]');
    let activeCard = null;

    const openModal = card => {
      activeCard = card;
      const icon = card.querySelector('.card__icon');
      const detail = card.querySelector('.role-card__detail');

      // Populate modal with the selected card's content
      modalTitle.textContent = card.querySelector('.card__title').textContent;
      if (icon && modalIcon) {
        modalIcon.textContent = icon.textContent;
      }
      if (detail) {
        modalBody.innerHTML = detail.innerHTML;
      }

      roleModal.classList.add('is-open');
      roleModal.setAttribute('aria-hidden', 'false');
      roleModal.querySelector('.modal__close').focus();
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      roleModal.classList.remove('is-open');
      roleModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (activeCard) {
        activeCard.focus();
      }
    };

    roleCards.forEach(card => {
      card.addEventListener('click', () => openModal(card));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(card);
        }
      });
    });

    closeTargets.forEach(target => {
      target.addEventListener('click', closeModal);
    });

    roleModal.addEventListener('click', event => {
      if (event.target === roleModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && roleModal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }
});
