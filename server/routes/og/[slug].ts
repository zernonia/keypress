import { readFileSync } from "fs"
import { join, resolve } from "path"
import { serverSupabaseClient } from "#supabase/server"
import { useUrl } from "~~/composables/url"
import { Resvg, ResvgRenderOptions } from "@resvg/resvg-js"
import type { Posts } from "~~/utils/types"
import satori from "satori"

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const url = useUrl()
  const slug = event.context.params.slug
  const fonts = ["arial.ttf", "arial_bold.ttf"]

  try {
    const { data, error } = await client
      .from<Posts>("posts")
      .select("title, profiles(name, avatar_url)")
      .eq("slug", slug)
      .single()
    if (error) throw Error(error.message)

    // svg inspired from https://og-playground.vercel.app/
    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            letterSpacing: "-.02em",
            fontWeight: 700,
            background: "#f8f9fa",
          },
          children: [
            {
              type: "img",
              props: {
                style: {
                  right: 42,
                  bottom: 42,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  width: "300px",
                },
                src: url + "/banner.png",
              },
            },
            {
              type: "div",
              props: {
                style: {
                  left: 42,
                  bottom: 42,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                },
                children: [
                  {
                    type: "img",
                    props: {
                      style: {
                        width: "70px",
                        height: "70px",
                        borderRadius: "9999px",
                      },
                      src: data.profiles.avatar_url,
                    },
                  },
                  {
                    type: "p",
                    props: {
                      style: {
                        marginLeft: "20px",
                        fontSize: "24px",
                      },
                      children: data.profiles.name,
                    },
                  },
                ],
              },
            },
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  padding: "20px 50px",
                  margin: "0 42px 150px 42px",
                  fontSize: "64px",
                  width: "auto",
                  maxWidth: 1200 - 48 * 2,
                  textAlign: "center",
                  backgroundColor: "#2D2D2D",
                  borderRadius: "30px",
                  color: "white",
                  lineHeight: 1.4,
                },
                children: data.title,
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Arial",
            data: readFileSync(join(process.cwd(), "public/fonts", fonts[0])),
            weight: 400,
            style: "normal",
          },
          {
            name: "Arial",
            data: readFileSync(join(process.cwd(), "public/fonts", fonts[1])),
            weight: 700,
            style: "normal",
          },
        ],
      }
    )

    // render to svg as image

    const resvg = new Resvg(svg, {
      fitTo: {
        mode: "width",
        value: 1200,
      },
      font: {
        fontFiles: fonts.map((i) => join(resolve("."), "public/fonts", i)), // Load custom fonts.
        loadSystemFonts: false,
      },
    })

    const resolved = await Promise.all(
      resvg.imagesToResolve().map(async (url) => {
        console.info("image url", url)
        const img = await fetch(url)
        const buffer = await img.arrayBuffer()
        return {
          url,
          buffer: Buffer.from(buffer),
        }
      })
    )
    if (resolved.length > 0) {
      for (const result of resolved) {
        const { url, buffer } = result
        resvg.resolveImage(url, buffer)
      }
    }

    const renderData = resvg.render()
    const pngBuffer = renderData.asPng()

    event.res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate")
    return pngBuffer
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: err })
  }
})
