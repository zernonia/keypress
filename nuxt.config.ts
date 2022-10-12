import transformerDirective from "@unocss/transformer-directives"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@nuxtjs/supabase", "@vueuse/nuxt", "@nuxt/image-edge", "~~/modules/og"],
  css: ["@unocss/reset/tailwind.css", "~~/assets/main.css"],
  runtimeConfig: {
    public: {
      UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID,
    },
  },
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`,
    typography: {
      cssExtend: {
        h1: {
          "font-weight": 700,
        },
        img: {
          "border-radius": "1.5rem",
        },
        pre: {
          "border-radius": "1.5rem",
          background: "white !important",
        },
        iframe: {
          height: "400px",
          "border-radius": "1.5rem",
        },
        "p code": {
          padding: "0.25rem 0.5rem",
          "border-radius": "0.35rem",
          "background-color": "#ececec",
        },
        "code::before": {
          content: "''",
        },
        "code::after": {
          content: "''",
        },
      },
    },
    transformers: [transformerDirective({ enforce: "pre" })], // enabled `@unocss/transformer-directives`,
    safelist: [
      "ic-round-format-bold",
      "ic-round-format-underlined",
      "ic-round-format-strikethrough",
      "ic-round-format-italic",
    ],
    // core options
    shortcuts: [
      {
        btn: " text-sm md:text-base font-medium rounded-2xl py-2 px-4 transition ring-3 ring-transparent disabled:opacity-50 relative inline-flex justify-center items-center shadow-none",
        "btn-plain": "btn font-semibold text-gray-400 focus:text-dark-50 hover:text-dark-50",
        "btn-primary": "btn bg-dark-300 text-white focus:ring-gray-400 focus:shadow-xl",
        "btn-secondary": "btn bg-white hover:bg-gray-100 focus:ring-gray-100",
        "btn-danger": "btn bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
      },
    ],
    rules: [],
  },
  image: {
    domains: ["avatars0.githubusercontent.com", "avatars.githubusercontent.com/", "images.unsplash.com/"],
  },
  build: {
    transpile: ["@tiptap/extension-link", "@tiptap/extension-placeholder", "@tiptap/extension-document"],
  },
  nitro: {
    preset: "vercel",
  },
})
