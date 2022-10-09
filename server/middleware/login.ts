import { sendRedirect, defineEventHandler } from "h3"

export default defineEventHandler(async (event) => {
  const { req, res } = event
  const referrer = req.headers.referer
  const cookie = useCookies(event)
  const supabaseCookie = cookie["sb-access-token"]
  console.log({ url: req.url, referrer, supabaseCookie, cookie })
  // if cookie already exist in main route, then redirect with jwt
  if (req.url === "/login" && referrer && supabaseCookie) {
    return await sendRedirect(event, referrer + `#access_token=${supabaseCookie}`, 302)
  }
})
