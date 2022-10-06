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
    shortcuts: [],
    rules: [],
  },
})
