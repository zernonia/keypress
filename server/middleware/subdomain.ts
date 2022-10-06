export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "hydrogen.vercel.app"

  if (hostname !== "localhost:3000") {
    const currentHost =
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? hostname.replace(`.vercel.pub`, "").replace(`.hydrogen-self.vercel.app`, "")
        : hostname.replace(`.localhost:3000`, "")

    console.log({ currentHost })
    context.subdomain = currentHost
  }
})
