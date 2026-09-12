// ============================================================
//  LooksMaxer — utils/index.js
//  Central JavaScript utilities for all professional features
// ============================================================

// ─── 1. FORM VALIDATION ──────────────────────────────────────
export const validators = {
  /**
   * Validate email format
   * @param {string} email
   * @returns {{ valid: boolean, error: string }}
   */
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { valid: false, error: "Email is required." };
    if (!re.test(email)) return { valid: false, error: "Enter a valid email address." };
    return { valid: true, error: "" };
  },

  /**
   * Validate password strength
   * @param {string} password
   * @returns {{ valid: boolean, error: string, strength: "weak"|"medium"|"strong" }}
   */
  password: (password) => {
    if (!password) return { valid: false, error: "Password is required.", strength: "weak" };
    if (password.length < 6) return { valid: false, error: "Password must be at least 6 characters.", strength: "weak" };
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const strong = hasUpper && hasNumber && hasSpecial && password.length >= 8;
    const medium = (hasUpper || hasNumber) && password.length >= 6;
    return {
      valid: true,
      error: "",
      strength: strong ? "strong" : medium ? "medium" : "weak",
    };
  },

  /**
   * Validate username
   * @param {string} username
   * @returns {{ valid: boolean, error: string }}
   */
  username: (username) => {
    if (!username) return { valid: false, error: "Username is required." };
    if (username.length < 3) return { valid: false, error: "Username must be at least 3 characters." };
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return { valid: false, error: "Only letters, numbers, and underscores allowed." };
    return { valid: true, error: "" };
  },

  /**
   * Validate full name
   * @param {string} name
   * @returns {{ valid: boolean, error: string }}
   */
  fullName: (name) => {
    if (!name || name.trim().length < 2) return { valid: false, error: "Please enter your full name." };
    return { valid: true, error: "" };
  },
};

// ─── 2. LOCAL STORAGE HELPERS ────────────────────────────────
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("localStorage unavailable:", e);
    }
  },
  get: (key, fallback = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("localStorage unavailable:", e);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn("localStorage unavailable:", e);
    }
  },
};

// ─── 3. SESSION / AUTH HELPERS ───────────────────────────────
export const auth = {
  /**
   * Simulate user login — stores session in localStorage
   * @param {{ username: string, email: string }} user
   */
  login: (user) => {
    const session = {
      ...user,
      loggedIn: true,
      loginTime: new Date().toISOString(),
    };
    storage.set("looksmax_user", session);
    return session;
  },

  /**
   * Log out the current user
   */
  logout: () => {
    storage.remove("looksmax_user");
  },

  /**
   * Get current logged-in user
   * @returns {object|null}
   */
  getUser: () => storage.get("looksmax_user"),

  /**
   * Check if user is logged in
   * @returns {boolean}
   */
  isLoggedIn: () => {
    const user = storage.get("looksmax_user");
    return Boolean(user && user.loggedIn);
  },
};

// ─── 4. SCROLL UTILITIES ─────────────────────────────────────
export const scroll = {
  /**
   * Smooth scroll to a section by ID
   * @param {string} id
   * @param {number} offset - pixels offset from top
   */
  toSection: (id, offset = 80) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  },

  /**
   * Scroll to top of page
   */
  toTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),

  /**
   * Get current scroll progress (0–1)
   * @returns {number}
   */
  progress: () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    return scrollTop / (scrollHeight - clientHeight);
  },
};

// ─── 5. INTERSECTION OBSERVER (Reveal on Scroll) ─────────────
/**
 * Attach a reveal-on-scroll observer to elements with class "reveal"
 * Call once on app mount.
 */
export const initRevealObserver = () => {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
  return observer;
};

// ─── 6. TOAST NOTIFICATION SYSTEM ───────────────────────────
let toastContainer = null;

const getToastContainer = () => {
  if (toastContainer) return toastContainer;
  toastContainer = document.createElement("div");
  toastContainer.id = "toast-root";
  toastContainer.style.cssText =
    "position:fixed;bottom:2rem;right:2rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;";
  document.body.appendChild(toastContainer);
  return toastContainer;
};

export const toast = {
  /**
   * Show a toast notification
   * @param {string} message
   * @param {"success"|"error"|"info"|"warning"} type
   * @param {number} duration - ms
   */
  show: (message, type = "info", duration = 4000) => {
    const colors = {
      success: "background:rgba(34,197,94,0.9);",
      error: "background:rgba(239,68,68,0.9);",
      info: "background:rgba(0,136,169,0.9);",
      warning: "background:rgba(234,179,8,0.9);",
    };
    const icons = { success: "✓", error: "✕", info: "ℹ", warning: "⚠" };

    const container = getToastContainer();
    const el = document.createElement("div");
    el.style.cssText = `
      ${colors[type]}
      color:#fff;
      padding:0.75rem 1.25rem;
      border-radius:8px;
      font-family:'Montserrat',sans-serif;
      font-size:14px;
      font-weight:600;
      display:flex;
      align-items:center;
      gap:0.5rem;
      backdrop-filter:blur(8px);
      animation:slideInRight 0.4s ease;
      min-width:220px;
      box-shadow:0 4px 20px rgba(0,0,0,0.4);
    `;
    el.innerHTML = `<span style="font-size:16px">${icons[type]}</span>${message}`;
    container.appendChild(el);

    setTimeout(() => {
      el.style.animation = "fadeOut 0.4s ease forwards";
      setTimeout(() => el.remove(), 400);
    }, duration);
  },

  success: (msg, dur) => toast.show(msg, "success", dur),
  error: (msg, dur) => toast.show(msg, "error", dur),
  info: (msg, dur) => toast.show(msg, "info", dur),
  warning: (msg, dur) => toast.show(msg, "warning", dur),
};

// ─── 7. ANALYTICS / EVENT TRACKING (stub) ────────────────────
export const analytics = {
  /**
   * Track a page view
   * @param {string} pageName
   */
  pageView: (pageName) => {
    const views = storage.get("looksmax_views", {});
    views[pageName] = (views[pageName] || 0) + 1;
    storage.set("looksmax_views", views);
    console.info(`[Analytics] Page view: ${pageName}`);
  },

  /**
   * Track a custom event
   * @param {string} event
   * @param {object} data
   */
  track: (event, data = {}) => {
    const events = storage.get("looksmax_events", []);
    events.push({ event, data, timestamp: new Date().toISOString() });
    storage.set("looksmax_events", events.slice(-50)); // keep last 50
    console.info(`[Analytics] Event: ${event}`, data);
  },
};

// ─── 8. DEVICE & BROWSER DETECTION ──────────────────────────
export const device = {
  isMobile: () => window.innerWidth <= 768,
  isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
  isDesktop: () => window.innerWidth > 1024,
  prefersReducedMotion: () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};

// ─── 9. DEBOUNCE & THROTTLE ──────────────────────────────────
/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttle a function
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
export const throttle = (fn, limit = 200) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ─── 10. CLIPBOARD ───────────────────────────────────────────
/**
 * Copy text to clipboard
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// ─── 11. PRICE FORMATTER ─────────────────────────────────────
/**
 * Format a number as USD price
 * @param {number} amount
 * @returns {string}
 */
export const formatPrice = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

// ─── 12. CART / SELECTED PLAN HELPERS ───────────────────────
export const cart = {
  savePlan: (plan) => {
    storage.set("looksmax_selected_plan", plan);
    analytics.track("plan_selected", plan);
  },
  getPlan: () => storage.get("looksmax_selected_plan"),
  clearPlan: () => storage.remove("looksmax_selected_plan"),
};

export default {
  validators,
  storage,
  auth,
  scroll,
  initRevealObserver,
  toast,
  analytics,
  device,
  debounce,
  throttle,
  copyToClipboard,
  formatPrice,
  cart,
};
