export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "hydrogen-self.vercel.app"

  if (hostname !== "localhost:3000" && hostname !== "hydrogen-self.vercel.app") {
    const currentHost =
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? hostname.replace(`.hydrogen-self.vercel.app`, "")
        : hostname.replace(`.localhost:3000`, "")

    console.log({ currentHost })
    context.subdomain = currentHost
  }
})
