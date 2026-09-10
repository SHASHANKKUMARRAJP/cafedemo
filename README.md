# 🍽️ DineCraft — Premier Fine Dining & Artisanal Cafe

A modern, responsive, and luxurious website designed for **DineCraft Fine Dining & Artisanal Cafe**. Featuring a curated Deep Emerald (`#071510`) and Antique Gold (`#D4AF37`) color palette, interactive Web Audio ambient soundscapes, dynamic category-filtered menus, modal dish quick-views, and an interactive table reservation system.

---

## ✨ Features

- **🏆 Chef's Signature Masterpieces:** Highlighted culinary creations with interactive Quick View modal popups containing sommelier pairings and chef notes.
- **🍸 Private Dining & VIP Suites:** Dedicated showcase for exclusive celebrations (Emerald VIP Suite, Vintage Wine Vault, Grand Garden Terrace).
- **🎶 Web Audio Ambient Soundscape:** Interactive floating sound Synthesizer generating relaxing cafe ambience in real-time.
- **📜 Standalone & Modal Menu System:** Interactive category pill filtering and live search across Starters, Mains, Desserts, Coffees, and Vintage Wines.
- **📅 Interactive Table Booking:** Real-time table booking engine with party size selectors, time slot validation, and instant confirmation reference numbers.
- **📱 Fully Responsive Design:** Pixel-perfect experience optimized for desktop, tablet, and mobile devices.

---

## 📁 Project Structure

```
cafe-demo/
├── index.html       # Home page (Hero, Signatures, Ambience, Events, Private Dining, Reviews)
├── menu.html        # Standalone Full Menu Page
├── booking.html     # Dedicated Table Reservation Page
├── index.css        # Core Design System & Component Styles
├── main.js          # Main Application Logic, Modals & Web Audio Synthesizer
├── menu.js          # Dynamic Menu Rendering & Filter Script
├── booking.js       # Dedicated Table Booking Form Processor
└── vercel.json      # Vercel Production Deployment Configuration
```

---

## 🚀 Deployment Instructions

### 1. Push to GitHub

Run the following commands in your terminal to commit and push your project to GitHub:

```bash
# Initialize Git repository (if not already initialized)
git init

# Add all project files
git add .

# Create initial commit
git commit -m "Initial commit: DineCraft Fine Dining & Cafe Web Application"

# Rename branch to main
git branch -M main

# Add your GitHub remote repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/dinecraft-cafe.git

# Push code to GitHub
git push -u origin main
```

---

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)
1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** $\rightarrow$ **"Project"**.
3. Select your **`dinecraft-cafe`** GitHub repository.
4. Click **"Deploy"** — Vercel will automatically build and publish your live website URL in seconds!

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from terminal
vercel
```

---

## 🛠️ Built With

- **HTML5 & Vanilla JS (ES6+)**
- **Vanilla CSS3 (Flexbox & Grid)**
- **Web Audio API**
- **FontAwesome 6 Icons**
- **Google Fonts (Playfair Display, Cormorant Garamond, Plus Jakarta Sans)**

---

&copy; 2026 DineCraft. All rights reserved.
