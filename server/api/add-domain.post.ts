// ref: https://github.com/vercel/platforms/blob/main/lib/api/domain.ts
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Domains } from "~~/utils/types"

export default defineEventHandler(async (event) => {
  try {
    const { domain, user_id } = await useBody(event)
    const user = await serverSupabaseUser(event)
    const client = serverSupabaseClient(event)

    if (Array.isArray(domain) || Array.isArray(user_id))
      createError({ statusCode: 400, statusMessage: "Bad request. Query parameters are not valid." })

    const { data: domainData } = await client.from<Domains>("domains").select("*").eq("url", domain).maybeSingle()
    if (domainData.user_id === user.id) return true

    const data = (await $fetch(`https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
      body: {
        name: domain,
      },
    })) as any
    console.log({ domain, data })
    // Domain is already owned by another team but you can request delegation to access it
    if (data.error?.code === "forbidden") return createError({ statusCode: 400, statusMessage: data.error.code })

    // Domain is already being used by a different project
    if (data.error?.code === "domain_taken") return createError({ statusCode: 409, statusMessage: data.error.code })

    const { error: domainError } = await client.from<Domains>("domains").upsert({
      url: domain,
      user_id: user.id,
      active: false,
    })

    if (domainError) return createError({ statusCode: 400, statusMessage: domainError.message })

    return data
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: err })
  }
})
