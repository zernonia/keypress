//ref: https://github.com/vercel/platforms/blob/main/pages/api/domain/check.ts
import { serverSupabaseClient } from "#supabase/server"
import type { Domains } from "~~/utils/types"

export default defineEventHandler(async (event) => {
  try {
    const { domain, subdomain = false } = await useBody(event)
    const client = serverSupabaseClient(event)

    if (Array.isArray(domain))
      return createError({ statusCode: 400, statusMessage: "Bad request. domain parameter cannot be an array." })

    // if (subdomain) {
    //   const sub = (domain as string).replace(/[^a-zA-Z0-9/-]+/g, "");

    //   const data = await prisma.site.findUnique({
    //     where: {
    //       subdomain: sub,
    //     },
    //   });

    //   const available = data === null && sub.length !== 0;

    //   return res.status(200).json(available);
    // }

    const data = (await $fetch(`https://api.vercel.com/v6/domains/${domain}/config`, {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
    })) as any
    console.log({ domain, data })

    const valid = data?.configuredBy ? true : false
    if (valid) {
      const { error: domainError } = await client.from<Domains>("domains").update({
        url: domain,
        active: true,
      })
      if (domainError)
        return createError({ statusCode: 400, statusMessage: "Bad request. domain parameter cannot be an array." })
    }

    return { valid }
  } catch (err) {
    return createError({ statusCode: 404, statusMessage: err })
  }
})
