export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo("/login")
  }
})
