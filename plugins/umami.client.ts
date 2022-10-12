export default defineNuxtPlugin(() => {
  const cfg = useRuntimeConfig()

  const moduleOptions = {
    scriptUrl: "https://umami-zernonia.vercel.app/umami.js",
    websiteId: cfg.public.UMAMI_WEBSITE_ID,
  }
  const options = { ...moduleOptions }

  console.log(cfg.public, moduleOptions.websiteId)
  if (moduleOptions.websiteId) {
    loadScript(options)
  }
})

function loadScript(options: any) {
  const head = document.head || document.getElementsByTagName("head")[0]
  const script = document.createElement("script")

  script.async = true
  script.defer = true
  script.dataset.websiteId = options.websiteId
  script.dataset.domains = options.domains
  script.src = options.scriptUrl
  console.log(script)
  head.appendChild(script)
}
