import transformerDirective from "@unocss/transformer-directives"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@nuxtjs/supabase", "@vueuse/nuxt"],
  css: ["@unocss/reset/tailwind.css", "~~/assets/main.css"],
  runtimeConfig: {},
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`,
    typography: true,
    transformers: [transformerDirective({ enforce: "pre" })], // enabled `@unocss/transformer-directives`,

    // core options
    shortcuts: [
      {
        btn: " text-sm md:text-base font-medium rounded-2xl py-2 px-4 outline-none transition ring-3 ring-transparent disabled:opacity-50 relative inline-flex justify-center items-center shadow-none",
        "btn-primary": "btn bg-dark-300 text-white focus:ring-gray-300 focus:shadow-xl",
        "btn-secondary": "btn bg-white hover:bg-gray-100 focus:ring-gray-100",
        "btn-danger": "btn bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
      },
    ],
    rules: [],
  },

  build: {
    transpile: ["@tiptap/extension-link", "@tiptap/extension-placeholder", "@tiptap/extension-document"],
  },
})
