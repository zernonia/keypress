export default defineNuxtPlugin(() => {
  const cfg = useRuntimeConfig()

  const moduleOptions = {
    scriptUrl: "https://umami-zernonia.vercel.app/script.js",
    websiteId: cfg.public.UMAMI_WEBSITE_ID,
  }
  const options = { ...moduleOptions }

  if (moduleOptions.websiteId) {
    loadScript(options)
  }
})

function loadScript(options: any) {
  const head = document.head || document.getElementsByTagName("head")[0]
  const script = document.createElement("script")

  script.async = true
  script.defer = true
  script.setAttribute('data-website-id', options.websiteId);

  script.src = options.scriptUrl

  head.appendChild(script)
}
