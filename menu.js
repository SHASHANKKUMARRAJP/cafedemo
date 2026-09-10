/* ==========================================================================
   DineCraft - Standalone Menu Page Script
   Renders dishes & filters by category matching Reference Image 1
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const menuData = [
        // Starters (Matching Reference Image 1)
        {
            category: 'starters',
            title: 'Mediterranean Mezze Board',
            desc: 'Hummus, marinated olives, grilled flatbread, feta crumble.',
            price: '$24',
            tag: 'Vegetarian',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop'
        },
        {
            category: 'starters',
            title: 'Seared Scallops',
            desc: 'Pan-seared scallops, pea purée, crispy pancetta.',
            price: '$26',
            tag: '',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop'
        },
        {
            category: 'starters',
            title: 'Burrata & Heirloom Tomatoes',
            desc: 'Fresh burrata, heirloom tomatoes, basil oil, aged balsamic.',
            price: '$22',
            tag: 'Vegetarian',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'starters',
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
            title: 'Grilled Citrus Salmon',
            desc: 'Citrus butter glaze, thyme roasted vegetables, smoked sea salt.',
            price: '$38',
            tag: 'Gluten Free',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'mains',
            title: 'Wagyu Ribeye Steak',
            desc: '8oz A5 Wagyu, garlic confit, seasonal greens, red wine reduction.',
            price: '$68',
            tag: '',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'mains',
            title: 'Truffle Alfredo Tagliatelle',
            desc: 'Creamy parmesan sauce, wild mushrooms, fresh black truffle shavings.',
            price: '$34',
            tag: 'Vegetarian',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'mains',
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
            title: 'Belgian Chocolate Lava Cake',
            desc: 'Warm molten dark chocolate, vanilla bean gelato, gold leaf.',
            price: '$18',
            tag: '',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'desserts',
            title: 'Deconstructed Tiramisu',
            desc: 'Espresso-soaked ladyfingers, mascarpone mousse, dark cocoa.',
            price: '$16',
            tag: 'Artisanal',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80'
        },
        {
            category: 'desserts',
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
            title: 'Smoked Vanilla Cold Brew',
            desc: 'Single-origin Ethiopian cold brew, smoked maple vanilla cream.',
            price: '$12',
            tag: 'Signature Coffee',
            isSignature: true,
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop'
        },
        {
            category: 'coffee',
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
            title: 'Château Margaux Grand Cru',
            desc: 'Bordeaux vintage glass, complex blackberry and oak nuances.',
            price: '$45',
            tag: 'Sommelier Pick',
            isSignature: false,
            image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop'
        },
        {
            category: 'drinks',
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
    const searchInput = document.getElementById('menuSearchInput');
    let activeCategory = 'starters';

    function renderCards() {
        if (!cardsGrid) return;
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtered = menuData.filter(item => {
            const catMatch = activeCategory === 'all' || item.category === activeCategory;
            const searchMatch = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
            return catMatch && searchMatch;
        });

        if (filtered.length === 0) {
            cardsGrid.innerHTML = `
                <div class="empty-menu-state">
                    <i class="fa-solid fa-utensils"></i>
                    <p>No dishes match your search query.</p>
                </div>
            `;
            return;
        }

        cardsGrid.innerHTML = filtered.map(item => `
            <article class="menu-page-card">
                <div class="card-img-container">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    ${item.isSignature ? `<span class="signature-badge"><i class="fa-solid fa-star"></i> Signature</span>` : ''}
                </div>
                <div class="card-body-content">
                    <h3 class="card-dish-title">${item.title}</h3>
                    <p class="card-dish-desc">${item.desc}</p>
                    ${item.tag ? `
                    <div class="card-dish-footer">
                        <span class="tag-pill"><i class="fa-solid fa-leaf"></i> ${item.tag}</span>
                    </div>` : ''}
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
