<script lang="ts" setup>
import slugify from "slugify"
const user = useSupabaseUser()
const client = useSupabaseClient()

const { params, path } = useRoute()
const postId = ref(params.id)

const title = ref("")
const body = ref("")

const save = async () => {
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
}

const { ctrl_s } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s" && e.type === "keydown") {
      e.preventDefault()
      save()
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

definePageMeta({
  alias: "/write",
})
</script>

<template>
  <div class="flex flex-col">
    <button @click="save">Save</button>

    <div class="p-2 prose mx-auto w-full">
      <TiptapHeading v-model="title"></TiptapHeading>
      <Tiptap v-model="body"></Tiptap>
    </div>
    <div id="modal"></div>
  </div>
</template>
