/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {},
    "tailwindcss/nesting": {},
    tailwindcss: { config: "./tailwind.config.ts" },
    autoprefixer: {},
    "postcss-mixins": {},
  },
};

export default config;
