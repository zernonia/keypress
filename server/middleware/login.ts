import { sendRedirect, defineEventHandler } from "h3"

export default defineEventHandler(async (event) => {
  const { req, res } = event
  const referrer = req.headers.referer
  const cookie = useCookies(event)
  const accessToken = cookie["sb-access-token"]
  const refreshToken = cookie["sb-refresh-token"]
  // console.log({ url: req.url, referrer, accessToken, refreshToken, cookie })
  // if cookie already exist in main route, then redirect with jwt
  if (req.url === "/login" && referrer && accessToken && refreshToken) {
    // redirect with same parameter as Supabase login
    return await sendRedirect(
      event,
      referrer +
        `#access_token=${accessToken}&expires_in=604800&provider_token=${process.env.GITHUB_PROVIDER_TOKEN}&refresh_token=${refreshToken}&token_type=bearer`,
      302
    )
  }
})
