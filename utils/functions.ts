import { Posts } from "./types"

export const constructUrl = (post: Posts, subdomain = false) => {
  if (subdomain) return `/${post.slug}`
  if (process.dev) return `http://${post?.profiles?.username}.localhost:3000/${post.slug}`
  else {
    if (post?.profiles?.domains?.active) return `https://${post.profiles.domains.url}/${post.slug}`
    else return `https://${post?.profiles?.username}.keypress.blog/${post.slug}`
  }
}
