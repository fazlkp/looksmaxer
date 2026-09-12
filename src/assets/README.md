# Assets Setup

## 1. Logo → goes in `/public/`
Copy your `20241112_144601.png` into the `public/` folder and rename it `logo.png`:
```
public/logo.png
```

## 2. Videos → go in `src/assets/videos/`
Rename and copy your video files like this:

| Your file | Rename to |
|---|---|
| `Untitled design.mp4` | `main-hero.mp4` |
| `videoplayback (1).mp4` | `main-footer.mp4` |
| `Untitled design (3).mp4` | `female-hero.mp4` |
| `Untitled design (4).mp4` | `female-footer.mp4` |

```
src/assets/videos/main-hero.mp4
src/assets/videos/main-footer.mp4
src/assets/videos/female-hero.mp4
src/assets/videos/female-footer.mp4
```

## 3. Background images
Background images are loaded from their original online URLs — no action needed.
If you want offline support, download them and replace the URL strings in `Home.jsx` and `Female.jsx`.
