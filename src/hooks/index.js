// ============================================================
//  LooksMaxer — hooks/index.js
//  Custom React Hooks
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react";
import { debounce, throttle, scroll } from "../utils";

// ─── useScrollY: track scroll position ───────────────────────
export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = throttle(() => setScrollY(window.pageYOffset), 100);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrollY;
};

// ─── useScrollProgress: 0–100 progress ───────────────────────
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    }, 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return progress;
};

// ─── useIntersectionObserver: reveal on scroll ───────────────
export const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// ─── useWindowSize ───────────────────────────────────────────
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = debounce(() =>
      setSize({ width: window.innerWidth, height: window.innerHeight }), 200
    );
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
};

// ─── useLocalStorage ─────────────────────────────────────────
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const val = value instanceof Function ? value(storedValue) : value;
        setStoredValue(val);
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        console.warn(e);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

// ─── useClickOutside: close dropdowns/modals ─────────────────
export const useClickOutside = (callback) => {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [callback]);
  return ref;
};

// ─── useMediaQuery ───────────────────────────────────────────
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

// ─── useForm: form state + validation ────────────────────────
export const useForm = (initialValues, validateFn) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validateFn) {
        const errs = validateFn({ ...values, [name]: values[name] });
        setErrors(errs);
      }
    },
    [values, validateFn]
  );

  const validate = useCallback(() => {
    if (!validateFn) return true;
    const errs = validateFn(values);
    setErrors(errs);
    setTouched(Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    return Object.keys(errs).length === 0;
  }, [values, validateFn]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues,
  };
};

// ─── usePageTitle: set document title ────────────────────────
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | LooksMaxer`;
    return () => { document.title = "LooksMaxer"; };
  }, [title]);
};

// ─── useCountUp: animated number counter ─────────────────────
export const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};
