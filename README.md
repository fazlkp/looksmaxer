# 🏆 LooksMaxer — React + Tailwind CSS

> Self-improvement & looksmaxing platform. Converted from vanilla HTML/CSS to production-grade React.

---

## 📁 Project Structure

```
looksmaxer/
├── public/
│   └── index.html                  # HTML entry point
├── src/
│   ├── assets/
│   │   ├── README.md               # ⚠️ Read this for media setup
│   │   ├── logo.png                # → copy 20241112_144601.png here
│   │   └── videos/
│   │       ├── main-hero.mp4       # → copy "Untitled design.mp4" here
│   │       ├── main-footer.mp4     # → copy "videoplayback (1).mp4" here
│   │       ├── female-hero.mp4     # → copy "Untitled design (3).mp4" here
│   │       └── female-footer.mp4   # → copy "Untitled design (4).mp4" here
│   ├── components/
│   │   ├── Navbar.jsx              # Responsive sticky navbar w/ mobile menu
│   │   ├── Footer.jsx              # Footer with quick links + feedback
│   │   ├── VideoHero.jsx           # Reusable video hero section w/ mute toggle
│   │   ├── ProgramCard.jsx         # Program pricing card w/ animations
│   │   ├── FormInput.jsx           # Reusable form input + password strength bar
│   │   └── ScrollProgress.jsx      # Scroll progress bar + scroll-to-top button
│   ├── pages/
│   │   ├── Home.jsx                # Main/Male page
│   │   ├── Female.jsx              # Female-specific page
│   │   ├── Register.jsx            # Registration form
│   │   ├── Login.jsx               # Login form
│   │   ├── Payment.jsx             # Payment page
│   │   └── NotFound.jsx            # 404 page
│   ├── hooks/
│   │   └── index.js                # Custom React hooks (scroll, form, observer, etc.)
│   ├── utils/
│   │   └── index.js                # ⭐ All JS features (validation, auth, toast, analytics...)
│   ├── App.jsx                     # Router + layout
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles + Tailwind directives
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Add your media files

**Logo** — copy `20241112_144601.png` into `public/` as `logo.png`:
```
public/logo.png
```

**Videos** — rename and copy into `src/assets/videos/`:
| Your file | Rename to |
|---|---|
| `Untitled design.mp4` | `main-hero.mp4` |
| `videoplayback (1).mp4` | `main-footer.mp4` |
| `Untitled design (3).mp4` | `female-hero.mp4` |
| `Untitled design (4).mp4` | `female-footer.mp4` |

Background images load from their original online URLs automatically — no setup needed.

### 3. Start development server
```bash
npm start
```
Opens at **http://localhost:3000**

### 4. Build for production
```bash
npm run build
```

---

## ✨ Features Added (Professional Grade)

| Feature | File |
|---|---|
| **React Router** — multi-page SPA with URL routing | `App.jsx` |
| **Sticky Navbar** — glass blur effect on scroll | `Navbar.jsx` |
| **Mobile Hamburger Menu** — animated, responsive | `Navbar.jsx` |
| **Scroll Progress Bar** — cyan gradient at top | `ScrollProgress.jsx` |
| **Scroll-to-Top Button** — appears after 400px scroll | `ScrollProgress.jsx` |
| **Reveal on Scroll** — IntersectionObserver animations | `hooks/index.js` |
| **Form Validation** — real-time with error messages | `utils/index.js` |
| **Password Strength Meter** — visual bar indicator | `FormInput.jsx` |
| **Toast Notifications** — success/error/info/warning | `utils/index.js` |
| **Plan Selection** → carries to Payment page | `utils/index.js` (cart) |
| **LocalStorage Auth** — session persistence | `utils/index.js` (auth) |
| **Analytics Tracking** — page views + custom events | `utils/index.js` |
| **Animated Stat Counters** — count-up on scroll | `hooks/index.js` |
| **Video Mute Toggle** — per-video audio control | `VideoHero.jsx` |
| **404 Page** — styled not-found with back button | `NotFound.jsx` |
| **Page Titles** — document.title per route | `hooks/index.js` |
| **Debounce/Throttle** — perf utilities | `utils/index.js` |
| **Custom Scrollbar** | `index.css` |
| **Smooth page transitions** | `index.css` |
| **SEO meta tags** | `public/index.html` |

---

## 🎨 Design Preserved

- **Color scheme**: `rgba(0,136,169,1)` cyan + `#24252A` dark
- **Font**: Montserrat (headings) + Verdana (body)
- **Glow shadows**: `box-shadow: -2px -1px 10px rgba(0,136,169,1)`
- **Animated gradient background**: same keyframe animation
- **All video sections**: same layout, now with mute button
- **All program cards**: same style, with hover lift effect added
- **All form pages**: same look, with validation added

---

## 📦 Dependencies

```
react                 ^18.2.0
react-dom             ^18.2.0
react-router-dom      ^6.22.0
react-scripts         5.0.1
tailwindcss           ^3.4.0
autoprefixer          ^10.4.17
postcss               ^8.4.33
```

---

*Built with ❤️ — Copyrighted by Fazl KP*
