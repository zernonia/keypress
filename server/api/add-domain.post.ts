// ref: https://github.com/vercel/platforms/blob/main/lib/api/domain.ts

export default defineEventHandler(async (event) => {
  try {
    const { domain, user_id } = await useBody(event)

    if (Array.isArray(domain) || Array.isArray(user_id))
      createError({ statusCode: 400, statusMessage: "Bad request. Query parameters are not valid." })

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

    // Domain is successfully added
    // await prisma.site.update({
    //   where: {
    //     id: siteId,
    //   },
    //   data: {
    //     customDomain: domain,
    //   },
    // });

    return data
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: err })
  }
})
