/* ==========================================================================
   DineCraft - Standalone Booking Page Script
   Handles table reservation form submission matching Reference Image 2
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('standaloneBookingForm');
    const successView = document.getElementById('pageBookingSuccess');
    const dateInput = document.getElementById('bkDate');
    const resetBtn = document.getElementById('resetBookingBtn');

    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('bkName').value;
            const date = document.getElementById('bkDate').value;
            const time = document.getElementById('bkTime').value;
            const guests = document.getElementById('bkGuests').value;

            const refCode = '#DC-' + Math.floor(1000 + Math.random() * 9000);

            document.getElementById('pConfRef').textContent = refCode;
            document.getElementById('pConfName').textContent = name;
            document.getElementById('pConfDateTime').textContent = `${date} at ${time}`;
            document.getElementById('pConfGuests').textContent = `${guests} Guests`;

            form.classList.add('hidden');
            successView.classList.remove('hidden');

            showToast(`Table confirmed! Booking Ref ${refCode}`);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
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
        }, 3500);
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
