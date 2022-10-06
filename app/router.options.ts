import type { RouterOptions } from "@nuxt/schema"

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
  routes: (_routes) => {
    const { ssrContext } = useNuxtApp()
    const subdomain = useState("subdomain", () => ssrContext?.event.context.subdomain)

    if (subdomain.value) {
      const userRoute = _routes.filter((i) => i.path.includes("/user/:slug"))
      const userRouteMapped = userRoute.map((i) => ({
        ...i,
        path: i.path === "/user/:slug" ? i.path.replace("/user/:slug", "/") : i.path.replace("/user/:slug/", "/"),
      }))

      return userRouteMapped
    }
  },
}
