/* ==========================================================================
   DineCraft - Main Application JavaScript
   Interactive functionality: Modals, Full Menu Filter, Table Booking, Ambient Audio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Full Menu Data Structure ---
    const menuItems = [
        // Starters
        { id: 101, category: 'starters', name: 'Pan-Seared Sea Scallops', price: '$26', desc: 'Cauliflower purée, crispy prosciutto, truffle oil drizzle.', tags: ['GF', 'Chef Pick'] },
        { id: 102, category: 'starters', name: 'Artisanal Burrata & Heirloom', price: '$22', desc: 'Wild arugula, aged balsamic reduction, grilled sourdough.', tags: ['Vegetarian'] },
        { id: 103, category: 'starters', name: 'Wagyu Beef Tartare', price: '$28', desc: 'Cured egg yolk, pickled mustard seeds, brioche crisps.', tags: ['Signature'] },
        { id: 104, category: 'starters', name: 'Wild Forest Mushroom Soup', price: '$18', desc: 'Chervil cream, porcini dust, truffle crostini.', tags: ['Vegetarian'] },
        
        // Mains
        { id: 201, category: 'mains', name: 'Grilled Citrus Salmon', price: '$38', desc: 'Citrus butter glaze, thyme roasted vegetables, smoked sea salt.', tags: ['GF', 'Signature'] },
        { id: 202, category: 'mains', name: 'Wagyu Ribeye Steak (8oz)', price: '$68', desc: 'A5 Wagyu, garlic confit, seasonal greens, red wine reduction.', tags: ['Chef Pick'] },
        { id: 203, category: 'mains', name: 'Truffle Alfredo Tagliatelle', price: '$34', desc: 'Creamy parmesan sauce, wild mushrooms, fresh black truffle.', tags: ['Vegetarian'] },
        { id: 204, category: 'mains', name: 'Herb-Crusted Rack of Lamb', price: '$52', desc: 'Minted pea purée, fondant potatoes, rosemary au jus.', tags: ['GF'] },
        { id: 205, category: 'mains', name: 'Chilean Sea Bass', price: '$46', desc: 'Saffron risotto, braised fennel, champagne velouté.', tags: ['GF'] },

        // Desserts
        { id: 301, category: 'desserts', name: 'Belgian Chocolate Lava Cake', price: '$18', desc: 'Warm molten chocolate center, Madagascar vanilla ice cream, gold leaf.', tags: ['Signature'] },
        { id: 302, category: 'desserts', name: 'Deconstructed Tiramisu', price: '$16', desc: 'Espresso-soaked ladyfingers, mascarpone mousse, dark cocoa.', tags: ['Artisanal'] },
        { id: 303, category: 'desserts', name: 'Pistachio & Raspberry Tart', price: '$17', desc: 'Pistachio frangipane, fresh raspberries, gold dust.', tags: ['Chef Pick'] },

        // Wines & Coffees
        { id: 401, category: 'drinks', name: 'Château Margaux Grand Cru (Glass)', price: '$45', desc: 'Bordeaux 2015 vintage, complex red berry notes, subtle oak finish.', tags: ['Vintage'] },
        { id: 402, category: 'drinks', name: 'Dom Pérignon Champagne', price: '$220', desc: 'Crisp minerality, notes of brioche and white peach.', tags: ['Cellar Pick'] },
        { id: 403, category: 'drinks', name: 'Smoked Vanilla Cold Brew', price: '$12', desc: 'Single-origin Ethiopian beans, smoked maple vanilla cream.', tags: ['Signature Coffee'] },
        { id: 404, category: 'drinks', name: 'Gold Leaf Espresso Martini', price: '$24', desc: 'Artisanal espresso, premium vodka, Kahlúa, 24k edible gold.', tags: ['Cocktail'] }
    ];

    // --- 2. Modal Management System ---
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalCloseBtns = document.querySelectorAll('.modal-close');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target');
            const note = trigger.getAttribute('data-note');

            if (targetId === 'reservationModal' && note) {
                const notesInput = document.getElementById('resNotes');
                if (notesInput) notesInput.value = note;
            }

            openModal(targetId);
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => closeModal(modal));
        }
    });

    // --- 3. Sticky Navigation Header Scroll Effect ---
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.querySelector('.nav-list').classList.toggle('active');
        });
    }

    // --- 4. Interactive Menu Filtering & Search ---
    const menuGrid = document.getElementById('fullMenuGrid');
    const tabBtns = document.querySelectorAll('#menuTabs .tab-btn');
    const searchInput = document.getElementById('menuSearchInput');
    let currentCategory = 'all';

    function renderMenu() {
        if (!menuGrid) return;
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtered = menuItems.filter(item => {
            const matchesCat = currentCategory === 'all' || item.category === currentCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                                  item.desc.toLowerCase().includes(searchTerm);
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            menuGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
                    <i class="fa-solid fa-utensils" style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-gold);"></i>
                    <p>No culinary items match your search.</p>
                </div>
            `;
            return;
        }

        menuGrid.innerHTML = filtered.map(item => `
            <div class="menu-item-row">
                <div class="menu-item-left">
                    <h4 class="menu-item-name">${item.name}</h4>
                    <p class="menu-item-desc">${item.desc}</p>
                    <div style="margin-top: 6px;">
                        ${item.tags.map(t => `<span style="font-size: 0.7rem; background: rgba(212,175,55,0.15); color: var(--color-gold); padding: 2px 8px; border-radius: 10px; margin-right: 4px; border: 1px solid rgba(212,175,55,0.3);">${t}</span>`).join('')}
                    </div>
                </div>
                <span class="menu-item-price">${item.price}</span>
            </div>
        `).join('');
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderMenu();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', renderMenu);
    }
    renderMenu();

    // --- 5. Interactive Reservation Form Submission ---
    const resForm = document.getElementById('reservationForm');
    const resSuccess = document.getElementById('reservationSuccess');
    const resDateInput = document.getElementById('resDate');

    if (resDateInput) {
        // Set default date to today YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
        resDateInput.value = today;
        resDateInput.min = today;
    }

    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('resName').value;
            const date = document.getElementById('resDate').value;
            const time = document.getElementById('resTime').value;
            const guests = document.getElementById('resGuests').value;
            const area = document.getElementById('resArea').value;

            // Generate Random Booking Reference
            const refNum = '#DC-' + Math.floor(1000 + Math.random() * 9000);

            document.getElementById('confRef').textContent = refNum;
            document.getElementById('confName').textContent = name;
            document.getElementById('confDateTime').textContent = `${date} at ${time}`;
            document.getElementById('confGuests').textContent = `${guests} Guests`;
            document.getElementById('confArea').textContent = area;

            resForm.classList.add('hidden');
            resSuccess.classList.remove('hidden');

            showToast(`Table confirmed! Reference ${refNum}`);
        });
    }

    // --- 6. Quick View Dish Details Modal ---
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const dishDetailContent = document.getElementById('dishDetailContent');

    const dishDetailsMap = {
        salmon: {
            title: "Grilled Citrus Salmon",
            price: "$38",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
            desc: "Fresh Atlantic salmon grilled over applewood charcoal, finished with a bright citrus butter glaze, thyme roasted root vegetables, and smoked Maldon sea salt.",
            pairings: "Pairs exquisitely with Sancerre Sauvignon Blanc or Crisp Chardonnay.",
            chefNotes: "Sourced daily from sustainable North Atlantic fisheries."
        },
        wagyu: {
            title: "Wagyu Ribeye Steak",
            price: "$68",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
            desc: "8oz Miyazaki A5 Wagyu ribeye seared to rare perfection, served with garlic confit cloves, braised micro greens, and an 18-hour red wine bone marrow glaze reduction.",
            pairings: "Pairs best with Cabernet Sauvignon or Vintage Bordeaux Grand Cru.",
            chefNotes: "Certified Grade A5 marbling score 10+"
        },
        truffle: {
            title: "Truffle Alfredo Tagliatelle",
            price: "$34",
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
            desc: "Hand-rolled egg tagliatelle tossed in aged Parmigiano-Reggiano cream sauce, sautéed wild chanterelles, finished with generous tableside shavings of fresh Umbrian black truffle.",
            pairings: "Pairs wonderfully with Italian Barolo or Pinot Noir.",
            chefNotes: "Pasta hand-crafted in-house fresh every morning."
        },
        cake: {
            title: "Chocolate Lava Cake",
            price: "$18",
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
            desc: "Decadent 72% Belgian dark chocolate cake with a velvety molten center, served alongside Madagascar vanilla bean gelato and edible 24k gold leaf accent.",
            pairings: "Pairs delightfully with Tawny Port or Single Origin Espresso.",
            chefNotes: "Baked to order (please allow 12 mins)."
        }
    };

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dishKey = btn.getAttribute('data-dish');
            const data = dishDetailsMap[dishKey];

            if (data && dishDetailContent) {
                dishDetailContent.innerHTML = `
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <span class="gold-subtitle">SIGNATURE CREATION</span>
                        <h3 class="modal-title">${data.title}</h3>
                        <span class="price-tag" style="position: static; display: inline-block; margin-top: 0.5rem;">${data.price}</span>
                    </div>
                    <div style="border-radius: var(--radius-md); overflow: hidden; height: 240px; margin-bottom: 1.5rem; border: 1px solid var(--border-gold);">
                        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <p style="color: var(--text-primary); font-size: 1rem; line-height: 1.6; margin-bottom: 1.2rem;">${data.desc}</p>
                    <div style="background: rgba(7,21,16,0.8); border: 1px solid var(--border-gold); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
                        <p style="font-size: 0.85rem; color: var(--color-gold-light);"><i class="fa-solid fa-wine-glass"></i> <strong>Sommelier Pairing:</strong> ${data.pairings}</p>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;"><i class="fa-solid fa-user-chef"></i> <strong>Chef's Note:</strong> ${data.chefNotes}</p>
                    </div>
                    <button class="btn btn-gold btn-block modal-trigger" data-target="reservationModal">
                        Reserve Table To Savor This Dish
                    </button>
                `;
                openModal('dishModal');
            }
        });
    });

    // --- 7. Atmosphere Audio Engine (HTML5 Music Player + Web Audio Synthesizer) ---
    const ambientBtn = document.getElementById('ambientToggleBtn');
    const ambientStatus = document.getElementById('ambientStatus');
    const ambientIcon = document.getElementById('ambientIcon');
    const audioWaves = document.getElementById('audioWaves');

    let isPlayingAudio = false;
    let htmlAudio = null;
    let audioCtx = null;
    let masterGainNode = null;
    let ambientNodes = [];

    // Initialize HTML5 Audio Element for real relaxing cafe lounge music
    function initHtmlAudio() {
        if (!htmlAudio) {
            htmlAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3');
            htmlAudio.loop = true;
            htmlAudio.volume = 0.5;
            htmlAudio.crossOrigin = "anonymous";
        }
    }

    async function startAmbientAudio() {
        initHtmlAudio();
        let htmlSuccess = false;

        // 1. Play real relaxing cafe music track via HTML5 Audio
        try {
            htmlAudio.currentTime = htmlAudio.currentTime || 0;
            await htmlAudio.play();
            htmlSuccess = true;
        } catch (e) {
            console.warn('HTML5 Audio restricted, activating Web Audio Synthesizer fallback:', e);
        }

        // 2. Web Audio Synthesizer (runs alongside or acts as immediate offline fallback)
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }

            if (audioCtx.state === 'suspended') {
                await audioCtx.resume();
            }

            stopSynthAudio();

            masterGainNode = audioCtx.createGain();
            const targetGain = htmlSuccess ? 0.06 : 0.25; // Boost synth volume if HTML5 audio fails
            masterGainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
            masterGainNode.gain.exponentialRampToValueAtTime(targetGain, audioCtx.currentTime + 1.0);
            masterGainNode.connect(audioCtx.destination);

            ambientNodes = [];

            // Warm Acoustic Lounge Pad (C3, E3, G3, B3, D4, G4)
            const freqs = [130.81, 164.81, 196.00, 246.94, 293.66, 392.00];
            freqs.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const oscGain = audioCtx.createGain();
                const filter = audioCtx.createBiquadFilter();

                osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(500 + idx * 80, audioCtx.currentTime);

                const lfo = audioCtx.createOscillator();
                lfo.frequency.setValueAtTime(0.1 + idx * 0.03, audioCtx.currentTime);
                const lfoGain = audioCtx.createGain();
                lfoGain.gain.setValueAtTime(2.0, audioCtx.currentTime);
                lfo.connect(osc.frequency);
                lfo.start();
                ambientNodes.push(lfo);

                oscGain.gain.setValueAtTime(0.2 / freqs.length, audioCtx.currentTime);

                osc.connect(filter);
                filter.connect(oscGain);
                oscGain.connect(masterGainNode);

                osc.start();
                ambientNodes.push(osc);
            });
        } catch (e) {
            console.error('Web Audio Synth Error:', e);
        }

        isPlayingAudio = true;

        if (ambientStatus) ambientStatus.textContent = 'ON';
        if (ambientIcon) {
            ambientIcon.className = 'fa-solid fa-volume-high';
            ambientIcon.style.color = 'var(--color-gold-bright)';
        }
        if (audioWaves) audioWaves.classList.add('playing');
        showToast('🎵 Atmosphere cafe music enabled.');
    }

    function stopSynthAudio() {
        ambientNodes.forEach(node => {
            try { node.stop(); } catch(e) {}
            try { node.disconnect(); } catch(e) {}
        });
        ambientNodes = [];
    }

    function stopAmbientAudio() {
        if (htmlAudio) {
            try { htmlAudio.pause(); } catch(e) {}
        }

        if (masterGainNode && audioCtx) {
            try {
                masterGainNode.gain.setValueAtTime(masterGainNode.gain.value, audioCtx.currentTime);
                masterGainNode.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
            } catch(e) {}

            setTimeout(() => {
                stopSynthAudio();
            }, 320);
        } else {
            stopSynthAudio();
        }

        isPlayingAudio = false;

        if (ambientStatus) ambientStatus.textContent = 'OFF';
        if (ambientIcon) {
            ambientIcon.className = 'fa-solid fa-volume-xmark';
            ambientIcon.style.color = 'var(--text-muted)';
        }
        if (audioWaves) audioWaves.classList.remove('playing');
    }

    if (ambientBtn) {
        ambientBtn.addEventListener('click', async () => {
            if (isPlayingAudio) {
                stopAmbientAudio();
            } else {
                await startAmbientAudio();
            }
        });
    }

    // --- 8. Newsletter Form & Toast System ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input && input.value) {
                showToast('Thank you for subscribing to DineCraft VIP list!');
                input.value = '';
            }
        });
    }

    function showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-bell"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // --- 9. Auto-scrolling Review Carousel ---
    const reviewsData = [
        { initials: 'SM', name: 'Sarah Mitchell', role: 'Culinary Food Critic', stars: 5, text: '"An extraordinary dining experience. Every detail is impeccable — from the Truffle Alfredo to the perfectly curated wine list. DineCraft is in a league of its own."' },
        { initials: 'JC', name: 'James Chen', role: 'Regular Guest & Entrepreneur', stars: 5, text: '"Our go-to for every anniversary. The Wagyu Ribeye is consistently exceptional and the sommelier\'s wine pairings never disappoint. A truly world-class restaurant."' },
        { initials: 'ER', name: 'Emily Rodriguez', role: 'Wine Enthusiast', stars: 5, text: '"The Friday Jazz Nights are magical. Smooth jazz, expertly crafted cocktails, and incredible ambience. Chef Marco\'s desserts are simply divine."' },
        { initials: 'DL', name: 'David Laurent', role: 'Food & Travel Writer', stars: 5, text: '"I\'ve dined at Michelin-starred restaurants across Europe, and DineCraft holds its own beautifully. The Private Dining Emerald Suite is an unparalleled experience."' },
        { initials: 'AP', name: 'Arjun Patel', role: 'Corporate Events Director', stars: 5, text: '"Booked the Garden Terrace for our company dinner — flawless. 45 guests, impeccable service, and every single dish was a conversation starter. Will be back."' },
        { initials: 'NS', name: 'Natalie Svensson', role: 'Chef & Food Blogger', stars: 5, text: '"As a chef myself, I pay attention to technique. DineCraft\'s kitchen demonstrates extraordinary precision and creativity. The Burrata starter is a masterclass in simplicity."' },
        { initials: 'MK', name: 'Marcus Klein', role: 'Luxury Travel Reviewer', stars: 5, text: '"Visited during a New York trip — DineCraft was the highlight. From the glowing signboard ambience to the 24k Gold Lava Cake, every moment was Instagram-worthy and delicious."' },
    ];

    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (track) {
        // Render cards
        track.innerHTML = reviewsData.map(r => `
            <div class="review-card">
                <div class="quote-icon"><i class="fa-solid fa-quote-left"></i></div>
                <div class="review-stars">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(r.stars)}
                </div>
                <p class="review-text">${r.text}</p>
                <div class="reviewer">
                    <div class="avatar-circle">${r.initials}</div>
                    <div class="reviewer-info">
                        <strong class="reviewer-name">${r.name}</strong>
                        <span class="reviewer-role">${r.role}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Build dots
        reviewsData.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Review ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        let currentSlide = 0;
        let autoInterval;
        const CARD_WIDTH = 340 + 24; // card width + gap
        const VISIBLE = 3; // visible cards
        const MAX_SLIDE = reviewsData.length - VISIBLE;

        function goToSlide(idx) {
            currentSlide = Math.max(0, Math.min(idx, MAX_SLIDE));
            track.style.transform = `translateX(-${currentSlide * CARD_WIDTH}px)`;
            dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentSlide);
            });
        }

        function startAuto() {
            autoInterval = setInterval(() => {
                goToSlide(currentSlide >= MAX_SLIDE ? 0 : currentSlide + 1);
            }, 4000);
        }

        function stopAuto() { clearInterval(autoInterval); }

        if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); goToSlide(currentSlide - 1); startAuto(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); goToSlide(currentSlide + 1); startAuto(); });

        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);

        goToSlide(0);
        startAuto();
    }

    // --- 10. Floating Action Button (FAB) Toggle ---
    const fabMain = document.getElementById('fabMain');
    const fabOptions = document.getElementById('fabOptions');
    const fabIcon = document.getElementById('fabIcon');

    if (fabMain) {
        fabMain.addEventListener('click', () => {
            const isOpen = fabOptions.classList.toggle('open');
            fabIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-headset';
        });

        // Close FAB when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#fabContainer')) {
                fabOptions.classList.remove('open');
                if (fabIcon) fabIcon.className = 'fa-solid fa-headset';
            }
        });
    }
});

