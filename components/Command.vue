<script lang="ts" setup>
import { useFuse } from "@vueuse/integrations/useFuse"

const router = useRouter()
const user = useSupabaseUser()
const subdomain = useSubdomain()
const url = useUrl()

const keys = useMagicKeys()
const CmdK = keys["Meta+K"]
const Escape = keys["Escape"]
const isVisible = useState("command-visible", () => false)

watch(CmdK, (v) => {
  if (v) {
    isVisible.value = !isVisible.value
  }
})
watch(Escape, () => (isVisible.value = false))

const navAction = (path: string) => {
  router.push(path)
  isVisible.value = false
  searchTerm.value = ""
}
const navList = computed(() =>
  subdomain.value
    ? [
        { label: "Home", value: "home", action: () => navAction("/"), show: true },
        {
          label: "Write",
          value: "write",
          action: () => (window.location.href = url + "/write"),
          show: true,
        },
        {
          label: "Login",
          value: "login",
          action: () => (window.location.href = url + "/login"),
          show: !user.value?.id,
        },
        {
          label: "Dashboard",
          value: "dashboard",
          action: () => (window.location.href = url + "/dashboard/posts"),
          show: user.value?.id,
        },
        {
          label: "KeyPress",
          value: "keypress",
          action: () => (window.location.href = url),
          show: true,
        },
      ]
    : [
        { label: "Home", value: "home", action: () => navAction("/"), show: true },
        { label: "Write", value: "write", action: () => navAction("/write"), show: true },
        { label: "Posts", value: "posts", action: () => navAction("/posts"), show: true },
        { label: "Login", value: "login", action: () => navAction("/login"), show: !user.value?.id },
        { label: "Dashboard", value: "dashboard", action: () => navAction("/dashboard/posts"), show: user.value?.id },
      ]
)

const searchTerm = ref("")
const { results } = useFuse(
  searchTerm,
  navList.value.filter((i) => i.show),
  {
    fuseOptions: {
      keys: ["label"],
    },
    matchAllWhenSearchEmpty: true,
  }
)
</script>

<template>
  <div>
    <button class="btn-plain" @click="isVisible = true">⌘K</button>

    <Modal class="!items-start" inner-class="!max-w-screen-sm rounded-xl mt-48" v-model:open="isVisible">
      <div class="p-2">
        <div>
          <input
            type="text"
            class="not-default p-2 w-full focus-visible:outline-none text-sm"
            v-model="searchTerm"
            placeholder="Search for commands..."
          />
        </div>

        <div class="py-6">
          <ul v-if="results?.length">
            <div class="text-xs p-2">Navigation</div>
            <li v-for="{ item } in results">
              <button
                @click="item.action()"
                class="not-default outline-none bg-transparent focus-visible:bg-light-300 rounded-lg transition-all p-2 my-0.5 w-full text-left text-sm"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>
          <div v-else class="p-8 text-sm text-center">No results found.</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
