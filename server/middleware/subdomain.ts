export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "keypress.blog"

  const mainDomain = ["localhost:3000", "keypress.blog"]

  if (!mainDomain.includes(hostname)) {
    const currentHost =
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? hostname.replace(`.keypress.blog`, "")
        : hostname.replace(`.localhost:3000`, "")

    console.log({ currentHost })
    context.subdomain = currentHost
  }
})
