document.addEventListener("DOMContentLoaded", function () {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            // notify other scripts that navbar has been inserted
            try { document.dispatchEvent(new Event('navbarLoaded')); } catch (e) { }

            const burger = document.getElementById('burger-menu');
            const navLinks = document.getElementById('nav-links');

            // safety: bail out if expected elements are missing
            if (!burger || !navLinks) return;

            // small entrance animation for the navbar
            if (window.gsap) {
                try { gsap.from('#navbar-container .navbar', { y: -18, autoAlpha: 0, duration: 0.6 }); } catch (e) { }
            }

            burger.addEventListener('click', () => {
                const links = Array.from(navLinks.querySelectorAll('li'));
                const isActive = navLinks.classList.contains('active');

                // toggle class for legacy CSS
                navLinks.classList.toggle('active');
                burger.classList.toggle('active');

                // animate with GSAP when available
                if (window.gsap) {
                    try {
                        if (!isActive) {
                            gsap.fromTo(links, { y: -8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, stagger: 0.06 });
                        } else {
                            gsap.to(links, { y: -8, autoAlpha: 0, duration: 0.18, stagger: 0.03 });
                        }
                    } catch (e) { }
                }
            });

            // toggle `scrolled` class as soon as the user scrolls
            const navbarEl = document.querySelector('#navbar-container .navbar');
            if (navbarEl) {
                const onScroll = () => {
                    if (window.scrollY > 0) navbarEl.classList.add('scrolled');
                    else navbarEl.classList.remove('scrolled');
                };
                window.addEventListener('scroll', onScroll, { passive: true });
                // set initial state
                onScroll();
            }
        })
        .catch(error => console.error('Erreur:', error));
});