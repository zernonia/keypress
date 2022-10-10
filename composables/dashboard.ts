import type { Profiles } from "~~/utils/types"
import type { Ref } from "vue"

export const useProfile = () => useState<Profiles>("profile", () => null)

export const useProfileSave = (payload: Ref<Partial<Profiles>>) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  const isSaving = ref(false)

  const save = async () => {
    // validate input here (if any)
    isSaving.value = true

    console.log("save profile settings", payload.value)
    const { data } = await client
      .from<Profiles>("profiles")
      .upsert({ ...payload.value, id: user.value?.id })
      .single()
    console.log({ data })
    isSaving.value = false
  }

  useMagicKeys({
    passive: false,
    onEventFired(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && e.type === "keydown") {
        e.preventDefault()
        save()
      }
    },
  })

  return {
    save,
    isSaving,
  }
}
