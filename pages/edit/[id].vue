<script lang="ts" setup>
import { stripHtml } from "string-strip-html"
import slugify from "slugify"

const user = useSupabaseUser()
const client = useSupabaseClient()

const { params, path } = useRoute()
const postId = ref(params.id)

const title = ref("")
const body = ref("")

const isSaving = ref(false)
const save = async () => {
  if (!title.value || !stripHtml(body.value).result) return
  isSaving.value = true
  const { data, error } = await client
    .from("posts")
    .upsert({
      id: postId.value,
      slug: slugify(title.value),
      title: title.value,
      body: body.value,
      author_id: user.value.id,
    })
    .single()
  console.log({ data })
  if (data) {
    if (!postId.value) {
      postId.value = data.id
      history.pushState(null, "Title?", `${window.origin}/edit/${postId.value}`)
    }
  }
  isSaving.value = false
}

useMagicKeys({
  passive: false,
  onEventFired(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s" && e.type === "keydown") {
      e.preventDefault()
      save()
    }

    if ((e.ctrlKey || e.metaKey) && e.key === "e" && e.type === "keydown") {
      isDrawerOpen.value = !isDrawerOpen.value
    }
  },
})

await useAsyncData(
  `post-${postId.value}`,
  async () => {
    if (!postId.value) throw Error("no id found")
    const { data } = await client.from("posts").select("*").eq("id", postId.value).single()
    title.value = data.title
    body.value = data.body

    return data
  },
  { server: false, lazy: true }
)

// todo: visit focus trap in the future
// const el = ref<HTMLElement>()
// const { activate, deactivate } = useFocusTrap(el )
// const isVisible = useState("command-visible")

// watch(
//   isVisible,
//   (n) => {
//     n ? deactivate() : activate()
//   },
//   { immediate: true }
// )

const isDrawerOpen = ref(false)

useCustomHead("Write your post")
definePageMeta({
  alias: "/write",
})
</script>

<template>
  <div ref="el" class="flex flex-col mt-8">
    <div class="flex justify-end prose mx-auto w-full">
      <button :disabled="isSaving" class="btn font-semibold text-gray-300 mr-6" @click="isDrawerOpen = true">
        Edit <span class="ml-2">⌘E</span>
      </button>
      <button :disabled="isSaving" class="btn-primary" @click="save">Save <span class="ml-2">⌘S</span></button>
    </div>

    <div class="p-2 prose mx-auto w-full">
      <TiptapHeading v-model="title"></TiptapHeading>
      <Tiptap editable v-model="body"></Tiptap>
    </div>

    <DrawerEditPost v-model:show="isDrawerOpen"></DrawerEditPost>
    <div id="modal"></div>
  </div>
</template>
