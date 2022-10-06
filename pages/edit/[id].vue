<script lang="ts" setup>
import slugify from "slugify"
const user = useSupabaseUser()
const client = useSupabaseClient()

const { params } = useRoute()

const title = ref("")
const body = ref("")

const save = async () => {
  const { data, error } = await client.from("posts").upsert({
    id: params.id,
    slug: slugify(title.value),
    title: title.value,
    body: body.value,
    author_id: user.value.id,
  })
  console.log({ data })
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
  `post-${params.id}`,
  async () => {
    const { data } = await client.from("posts").select("*").eq("id", params.id).single()
    title.value = data.title
    body.value = data.body

    console.log({ data, title, body })
    return data
  },
  { server: false, lazy: true }
)
</script>

<template>
  <div class="flex flex-col">
    <button @click="save">Save</button>

    <div class="p-2 prose mx-auto">
      <TiptapHeading v-model="title"></TiptapHeading>
      <Tiptap v-model="body"></Tiptap>
    </div>
    <div id="modal"></div>
  </div>
</template>
