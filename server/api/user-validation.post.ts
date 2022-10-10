export default defineEventHandler(async (event) => {
  const { access_token } = await useBody(event)
  const hostname = event.req.headers.host

  // validate this token
  // setCookie(event, "sb-access-token", access_token, {
  //   maxAge: 60 * 60 * 8 ?? 0,
  //   path: "/",
  //   sameSite: "lax",
  // })
  return "auth cookie set"
})
