export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  if (!user.value && to.path !== "/write") {
    return navigateTo("/login")
  }
})
