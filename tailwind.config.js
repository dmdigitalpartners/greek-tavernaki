/**
 * Tailwind config for the one-off CSS build.
 *
 * The site used to load cdn.tailwindcss.com, which compiles CSS in the browser
 * on every page view — render-blocking, and Tailwind itself warns against it in
 * production. This config reproduces the theme that was declared inline next to
 * that script tag, so `npm run build:css` can emit a static stylesheet instead.
 *
 * Regenerate and commit the result after changing markup or the theme:
 *   npm run build:css
 *
 * Same "generate, commit the output, no build step at deploy time" pattern as
 * _tools/generate-menu.py and _tools/prerender-menu.mjs.
 */
module.exports = {
  content: [
    './index.html',
    './404.html',
    './pages/*.html',
    './js/*.js',
  ],
  // `hidden` is only ever applied via classList.toggle(), so the scanner cannot
  // see it in a class attribute reliably.
  safelist: ['hidden'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#071510',
          900: '#0D2B1A',
          800: '#1A4A2E',
          700: '#2D6A3F',
          600: '#3A8050',
          100: '#E8F2EB',
        },
        stone: {
          50: '#FAF8F3',
          100: '#F0EDE6',
          200: '#E0DBD0',
          300: '#C8C2B4',
        },
        tavred: '#C0392B',
        ink: '#2C2C2C',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
