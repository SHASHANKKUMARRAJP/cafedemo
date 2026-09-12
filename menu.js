/* ==========================================================================
   DineCraft - Standalone Menu Page Script
   Renders dishes & filters by category matching Reference Image 1
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const menuData = [
        // Starters
        {
            category: 'starters',
            dietary: ['vegetarian'],
            title: 'Mediterranean Mezze Board',
            desc: 'Hummus, marinated olives, grilled flatbread, feta crumble.',
            price: '$24',
            tag: 'Vegetarian',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop'
        },
        {
            category: 'starters',
            dietary: ['signature'],
            title: 'Seared Scallops',
            desc: 'Pan-seared scallops, pea purée, crispy pancetta.',
            price: '$26',
            tag: '',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop'
        },
        {
            category: 'starters',
            dietary: ['vegetarian', 'gluten-free', 'organic'],
            title: 'Burrata & Heirloom Tomatoes',
            desc: 'Fresh burrata, heirloom tomatoes, basil oil, aged balsamic.',
            price: '$22',
            tag: 'Vegetarian',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'starters',
            dietary: ['vegetarian', 'organic'],
            title: 'Truffle Mushroom Soup',
            desc: 'Wild mushroom bisque, truffle oil, herb croutons.',
            price: '$18',
            tag: 'Vegetarian',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80'
        },

        // Main Course
        {
            category: 'mains',
            dietary: ['gluten-free', 'organic'],
            title: 'Grilled Citrus Salmon',
            desc: 'Citrus butter glaze, thyme roasted vegetables, smoked sea salt.',
            price: '$38',
            tag: 'Gluten Free',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'mains',
            dietary: ['signature'],
            title: 'Wagyu Ribeye Steak',
            desc: '8oz A5 Wagyu, garlic confit, seasonal greens, red wine reduction.',
            price: '$68',
            tag: '',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'mains',
            dietary: ['vegetarian'],
            title: 'Truffle Alfredo Tagliatelle',
            desc: 'Creamy parmesan sauce, wild mushrooms, fresh black truffle shavings.',
            price: '$34',
            tag: 'Vegetarian',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'mains',
            dietary: ['gluten-free'],
            title: 'Herb-Crusted Rack of Lamb',
            desc: 'Minted pea purée, fondant potatoes, rosemary au jus.',
            price: '$52',
            tag: 'Gluten Free',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80'
        },

        // Desserts
        {
            category: 'desserts',
            dietary: ['signature', 'vegetarian'],
            title: 'Belgian Chocolate Lava Cake',
            desc: 'Warm molten dark chocolate, vanilla bean gelato, gold leaf.',
            price: '$18',
            tag: '',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'desserts',
            dietary: ['vegetarian'],
            title: 'Deconstructed Tiramisu',
            desc: 'Espresso-soaked ladyfingers, mascarpone mousse, dark cocoa.',
            price: '$16',
            tag: 'Artisanal',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'desserts',
            dietary: ['vegetarian', 'organic'],
            title: 'Pistachio & Raspberry Tart',
            desc: 'Pistachio frangipane, fresh raspberries, edible gold dust.',
            price: '$17',
            tag: 'Chef Special',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80'
        },

        // Coffee & Tea
        {
            category: 'coffee',
            dietary: ['signature', 'vegan', 'gluten-free', 'organic'],
            title: 'Smoked Vanilla Cold Brew',
            desc: 'Single-origin Ethiopian cold brew, smoked maple vanilla cream.',
            price: '$12',
            tag: 'Signature Coffee',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop'
        },
        {
            category: 'coffee',
            dietary: ['gluten-free', 'organic'],
            title: 'Gold Leaf Artisan Espresso',
            desc: 'Double shot dark roast espresso with edible 24k gold leaf.',
            price: '$10',
            tag: 'Specialty',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
        },

        // Wine & Drinks
        {
            category: 'drinks',
            dietary: ['organic'],
            title: 'Château Margaux Grand Cru',
            desc: 'Bordeaux vintage glass, complex blackberry and oak nuances.',
            price: '$45',
            tag: 'Sommelier Pick',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop'
        },
        {
            category: 'drinks',
            dietary: ['signature', 'organic'],
            title: 'Dom Pérignon Vintage',
            desc: 'Crisp minerality, notes of brioche, white peach, fine bubbles.',
            price: '$220',
            tag: 'Cellar Reserve',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?q=80&w=800&auto=format&fit=crop'
        },

        // Seasonal Specials
        {
            category: 'specials',
            dietary: ['signature', 'gluten-free'],
            title: 'Chilean Sea Bass Risotto',
            desc: 'Pan-seared sea bass, saffron arborio rice, braised fennel.',
            price: '$46',
            tag: 'Seasonal',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop'
        }
    ];

    const cardsGrid = document.getElementById('menuCardsGrid');
    const pillBtns = document.querySelectorAll('#categoryPills .pill-btn');
    const dietaryBtns = document.querySelectorAll('#dietaryFilterBar .dietary-pill');
    const searchInput = document.getElementById('menuSearchInput');
    let activeCategory = 'starters';
    let activeDietary = 'all';

    function renderCards() {
        if (!cardsGrid) return;
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtered = menuData.filter(item => {
            const catMatch = activeCategory === 'all' || item.category === activeCategory;
            const searchMatch = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
            const dietaryMatch = activeDietary === 'all' || (item.dietary && item.dietary.includes(activeDietary));
            return catMatch && searchMatch && dietaryMatch;
        });

        if (filtered.length === 0) {
            cardsGrid.innerHTML = `
                <div class="empty-menu-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                    <i class="fa-solid fa-utensils" style="font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.1rem;">No dishes match your selected filters or search query.</p>
                </div>
            `;
            return;
        }

        cardsGrid.innerHTML = filtered.map(item => `
            <article class="menu-page-card">
                <div class="card-img-container">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    ${item.isSignature ? `<span class="signature-badge"><i class="fa-solid fa-star"></i> Signature</span>` : ''}
                    <span class="price-tag">${item.price}</span>
                </div>
                <div class="card-body-content">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; margin-bottom: 0.4rem;">
                        <h3 class="card-dish-title" style="margin-bottom: 0;">${item.title}</h3>
                        <span style="font-family: var(--font-heading); color: var(--color-gold); font-size: 1.2rem; font-weight: 700; flex-shrink: 0;">${item.price}</span>
                    </div>
                    <p class="card-dish-desc">${item.desc}</p>
                    <div class="card-dish-footer" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.8rem;">
                        ${item.tag ? `<span class="tag-pill"><i class="fa-solid fa-leaf"></i> ${item.tag}</span>` : ''}
                        ${item.dietary && item.dietary.includes('gluten-free') ? `<span class="tag-pill" style="border-color: rgba(212, 175, 55, 0.4);"><i class="fa-solid fa-wheat-awn-circle-exclamation"></i> Gluten Free</span>` : ''}
                        ${item.dietary && item.dietary.includes('organic') ? `<span class="tag-pill" style="border-color: rgba(46, 204, 113, 0.4);"><i class="fa-solid fa-seedling"></i> Organic</span>` : ''}
                    </div>
                </div>
            </article>
        `).join('');
    }

    pillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            renderCards();
        });
    });

    dietaryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dietaryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeDietary = btn.getAttribute('data-dietary');
            renderCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', renderCards);
    }

    // Initial Render
    renderCards();

    // Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.querySelector('.nav-list').classList.toggle('active');
        });
    }
});
