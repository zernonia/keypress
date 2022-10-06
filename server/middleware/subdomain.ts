export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "keypress.blog"

  if (hostname !== "localhost:3000" && hostname !== "keypress.blog") {
    const currentHost =
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? hostname.replace(`.keypress.blog`, "")
        : hostname.replace(`.localhost:3000`, "")

    console.log({ currentHost })
    context.subdomain = currentHost
  }
})
