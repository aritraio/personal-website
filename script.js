/* ══════════════════════════════════════════════════════════════
   ARITRA SAHA — PORTFOLIO INTERACTIONS
   Typing effect · Fade-in observer · Mouse parallax
   ══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ── TYPING EFFECT ────────────────────────────────────────────
    const headline = document.getElementById('typed-headline');
    const text = 'Aritra Saha';
    let idx = 0;

    function type() {
        if (idx < text.length) {
            headline.textContent += text[idx];
            idx++;
            setTimeout(type, 110 + Math.random() * 60);
        } else {
            headline.classList.add('done');
        }
    }

    // Start typing after a brief delay so the page settles
    setTimeout(type, 600);

    // ── INTERSECTION OBSERVER (fade-in on scroll) ───────────────
    const faders = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    faders.forEach(function (el) {
        observer.observe(el);
    });

    // ── MOUSE PARALLAX on Icosahedron ───────────────────────────
    const scene = document.querySelector('.icosahedron-scene');

    if (scene && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', function (e) {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx; // -1 → 1
            const dy = (e.clientY - cy) / cy;

            // Gentle shift — max ±18px
            scene.style.transform =
                'translate(-50%, -50%) translate(' +
                (dx * 18).toFixed(1) + 'px, ' +
                (dy * 18).toFixed(1) + 'px)';
        });
    }

    // ── SMOOTH SCROLL for any in-page anchors ───────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
