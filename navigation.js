(() => {
    const nav = document.querySelector('.nav');
    const toggle = nav.querySelector('.nav-toggle');
    const links = nav.querySelector('#main-nav-links');
    const mobile = window.matchMedia('(max-width: 900px)');

    const closeMenu = (restoreFocus = false) => {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
        if (restoreFocus) toggle.focus();
    };

    toggle.hidden = false;
    nav.dataset.menuReady = '';
    nav.closest('.site-header').classList.add('has-mobile-menu');

    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        links.classList.toggle('is-open', !open);
    });

    nav.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobile.matches && links.classList.contains('is-open')) {
            closeMenu(true);
        }
    });

    links.addEventListener('click', event => {
        if (mobile.matches && event.target.closest('a')) closeMenu(true);
    });

    document.addEventListener('click', event => {
        if (!nav.contains(event.target)) closeMenu();
    });

    nav.addEventListener('focusout', event => {
        if (!nav.contains(event.relatedTarget)) closeMenu();
    });

    mobile.addEventListener('change', () => {
        const focusWillBeHidden = mobile.matches
            ? links.contains(document.activeElement)
            : document.activeElement === toggle;
        closeMenu();
        if (focusWillBeHidden) {
            (mobile.matches ? toggle : nav.querySelector('.brand')).focus();
        }
    });
})();
