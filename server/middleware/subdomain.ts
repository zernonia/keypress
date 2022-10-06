export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "hydrogen.vercel.app"
  const splitHostname = hostname.split(".")
  context.subdomain = splitHostname.length > 1 ? splitHostname[0] : undefined
})
