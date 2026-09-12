// ─── src/assets/index.js ─────────────────────────────────────
// Central asset manifest.
// Import everything from here so all pages stay in sync.
//
// ⚠️  Before running the app, copy your files into src/assets/:
//     - 20241112_144601.png  → logo.png
//     - src/assets/videos/   → see README.md

// ── Logo ─────────────────────────────────────────────────────

export { default as logo } from "./logo1.png";

// ── Videos ───────────────────────────────────────────────────
export { default as mainHeroVideo }   from "./videos/main-hero.mp4";
export { default as mainFooterVideo } from "./videos/main-footer.mp4";
export { default as femaleHeroVideo }  from "./videos/female-hero.mp4";
export { default as femaleFooterVideo} from "./videos/female-footer.mp4";

// ── Background Images (hosted externally — no local copy needed) ──
export const BG = {
  // Male program cards
  summerMale:  "https://herwellnessdiaries.com/wp-content/uploads/2023/06/French-Riviera-summer-1.jpeg",
  winterMale:  "https://i.pinimg.com/736x/7a/d0/c4/7ad0c4c265bbad940717fac08ec69e11.jpg",

  // Female program cards
  summerFemale: "https://publish.purewow.net/wp-content/uploads/sites/2/2023/11/looksmaxxing-parents-opinion-universal.jpg?resize=720%2C780",
  winterFemale: "https://i.pinimg.com/236x/32/58/eb/3258eb21894fa73c4fee846597f7db45.jpg",

  // Section backgrounds
  about: "https://i.pinimg.com/564x/08/d1/fb/08d1fbc386fb820d237e1051333b98e8.jpg",
  why:   "https://i0.wp.com/www.laurag.tv/wp-content/uploads/2015/09/irinae.png",
};
