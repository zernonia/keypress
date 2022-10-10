import { setCookie, defineEventHandler } from "h3"

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const config = useRuntimeConfig().public

  const cookieOptions = config.supabase.cookies

  const { event: signEvent, session } = body

  if (!event) {
    throw new Error("Auth event missing!")
  }

  if (signEvent === "SIGNED_IN") {
    if (!session) {
      throw new Error("Auth session missing!")
    }
    setCookie(event, `${cookieOptions.name}-access-token`, session.access_token, {
      domain: cookieOptions.domain,
      maxAge: cookieOptions.lifetime ?? 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite as boolean | "lax" | "strict" | "none",
    })
    setCookie(event, `${cookieOptions.name}-refresh-token`, session.refresh_token, {
      domain: cookieOptions.domain,
      maxAge: cookieOptions.lifetime ?? 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite as boolean | "lax" | "strict" | "none",
    })
  }

  if (signEvent === "SIGNED_OUT") {
    setCookie(event, `${cookieOptions.name}-access-token`, "", {
      maxAge: -1,
      path: cookieOptions.path,
    })
  }

  return "custom auth cookie set"
})
