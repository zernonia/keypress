import { ComputedRef } from "vue"

export const useCustomHead = (
  title?: string | ComputedRef<string>,
  description?: string | ComputedRef<string>,
  image?: string | ComputedRef<string>
) => {
  useHead({
    title,
    meta: [
      {
        name: "description",
        content:
          description ?? "An open-source blogging platform + free custom domains. Powered by Nuxt 3, Supabase & Vercel",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@zernonia" },
      { name: "twitter:title", content: title ?? "KeyPress | Write your blog with keyboard only experience" },
      {
        name: "twitter:description",
        content:
          description ?? "An open-source blogging platform + free custom domains. Powered by Nuxt 3, Supabase & Vercel",
      },
      { name: "twitter:image", content: image ?? "https://keypress.blog/og.png" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title ?? "KeyPress | Write your blog with keyboard only experience" },
      { property: "og:url", content: "https://keypress.blog/" },
      { property: "og:image", content: image ?? "https://keypress.blog/og.png" },
      { property: "og:image:secure_url", content: image ?? "https://keypress.blog/og.png" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:description",
        content:
          description ?? "An open-source blogging platform + free custom domains. Powered by Nuxt 3, Supabase & Vercel",
      },
    ],
  })
}
