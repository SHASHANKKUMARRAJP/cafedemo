/* ==========================================================================
   DineCraft - Standalone Booking Page Script
   Handles table reservation form submission + WhatsApp notification
   ========================================================================== */

// Your WhatsApp number (with country code, no + or spaces)
const OWNER_WHATSAPP = '918310311290';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('standaloneBookingForm');
    const successView = document.getElementById('pageBookingSuccess');
    const dateInput = document.getElementById('bkDate');
    const resetBtn = document.getElementById('resetBookingBtn');

    // Seating Zone Selection Logic
    const zoneCards = document.querySelectorAll('#zoneSelectorGrid .zone-card');
    const selectedZoneImg = document.getElementById('selectedZoneImg');
    const selectedZoneName = document.getElementById('selectedZoneName');
    const selectedZoneDesc = document.getElementById('selectedZoneDesc');
    let currentSelectedZone = 'Fireside Main Lounge';

    zoneCards.forEach(card => {
        card.addEventListener('click', () => {
            zoneCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            currentSelectedZone = card.getAttribute('data-name');
            const desc = card.getAttribute('data-desc');
            const img = card.getAttribute('data-img');

            if (selectedZoneName) selectedZoneName.textContent = `Selected Zone: ${currentSelectedZone}`;
            if (selectedZoneDesc) selectedZoneDesc.textContent = desc;
            if (selectedZoneImg) selectedZoneImg.src = img;
        });
    });

    // Luxury Add-ons Selection Logic
    const addonCards = document.querySelectorAll('#addonPillGrid .addon-checkbox-card');
    const selectedAddons = new Set();

    addonCards.forEach(card => {
        card.addEventListener('click', () => {
            const addonName = card.getAttribute('data-addon');
            if (card.classList.contains('active')) {
                card.classList.remove('active');
                selectedAddons.delete(addonName);
            } else {
                card.classList.add('active');
                selectedAddons.add(addonName);
            }
        });
    });

    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect all form data
            const name    = document.getElementById('bkName').value.trim();
            const email   = document.getElementById('bkEmail').value.trim();
            const phone   = document.getElementById('bkPhone').value.trim();
            const date    = document.getElementById('bkDate').value;
            const time    = document.getElementById('bkTime').value;
            const guests  = document.getElementById('bkGuests').value;
            const notes   = document.getElementById('bkNotes').value.trim();

            // Generate booking reference
            const refCode = '#DC-' + Math.floor(1000 + Math.random() * 9000);

            // Format date nicely
            const formattedDate = new Date(date).toLocaleDateString('en-IN', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });

            // Convert add-ons set to string
            const addonsList = Array.from(selectedAddons).join(', ');

            // --- Build WhatsApp message ---
            const msg = [
                `✨ *NEW TABLE RESERVATION — DineCraft* ✨`,
                `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                `📌 *Booking Reference:* ${refCode}`,
                ``,
                `👤 *Guest Name:* ${name}`,
                `✉️ *Email Address:* ${email}`,
                `📞 *Phone Number:* ${phone}`,
                ``,
                `📍 *Seating Zone:* ${currentSelectedZone}`,
                `📅 *Reservation Date:* ${formattedDate}`,
                `⏰ *Preferred Time:* ${time}`,
                `👥 *Party Size:* ${guests} Guest(s)`,
                `${addonsList ? `🥂 *Luxury Add-ons:* ${addonsList}` : ''}`,
                ``,
                `📝 *Special Requests / Notes:*`,
                `${notes ? notes : 'None'}`,
                `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                `⚡ *Action Required:* Please confirm & hold this reservation.`
            ].filter(line => line !== null).join('\n');

            // Open WhatsApp with the message
            const waURL = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`;
            window.open(waURL, '_blank');

            // Update success screen
            document.getElementById('pConfRef').textContent = refCode;
            document.getElementById('pConfName').textContent = name;
            document.getElementById('pConfDateTime').textContent = `${formattedDate} at ${time} (${currentSelectedZone})`;
            document.getElementById('pConfGuests').textContent = `${guests} Guest(s)`;

            // Show success view
            form.classList.add('hidden');
            successView.classList.remove('hidden');

            showToast(`🎉 Table confirmed! Ref: ${refCode} — WhatsApp notification sent!`);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            selectedAddons.clear();
            addonCards.forEach(c => c.classList.remove('active'));
            if (dateInput) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
            successView.classList.add('hidden');
            form.classList.remove('hidden');
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
        }, 4000);
    }

    // Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.querySelector('.nav-list').classList.toggle('active');
        });
    }
});
