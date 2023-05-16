<script lang="ts" setup>
import { stripHtml } from "string-strip-html";
import slugify from "slugify";
import { Posts } from "~~/utils/types";

const user = useSupabaseUser();
const client = useSupabase();

const { params } = useRoute();
const postId = ref(params.id);

const title = postId.value ? ref("") : useLocalStorage("new-post-title", "");
const body = postId.value ? ref("") : useLocalStorage("new-post-body", "");
const settings = ref({
  image: "",
  active: false,
  tags: [],
});

const isSaving = ref(false);
const isLoginVisible = ref(false);
const save = async () => {
  if (!title.value || !stripHtml(body.value).result || isSaving.value) return;
  if (!user.value?.id) {
    // login modal
    isLoginVisible.value = true;
    return;
  }

  isSaving.value = true;
  const { data, error } = await client
    .from<Posts>("posts")
    .upsert({
      id: postId.value?.toString(),
      slug: slugify(title.value, { lower: true }),
      title: title.value,
      body: body.value,
      author_id: user.value.id,
      active: settings.value.active,
      cover_img: settings.value.image,
      tags: settings.value.tags,
    })
    .single();
  console.log({ data });
  if (data) {
    if (!postId.value) {
      postId.value = data.id;
      // history.pushState(null, "Title?", `${window.origin}/edit/${postId.value}`)

      localStorage.removeItem("new-post-title");
      localStorage.removeItem("new-post-body");
      navigateTo(`/edit/${postId.value}`);
    }
  }
  isSaving.value = false;
};

useMagicKeys({
  passive: false,
  onEventFired(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s" && e.type === "keydown") {
      e.preventDefault();
      save();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === "e" && e.type === "keydown") {
      isDrawerOpen.value = !isDrawerOpen.value;
    }
  },
});

const { pending } = await useAsyncData(
  `post-${postId.value}`,
  async () => {
    if (!postId.value) throw Error("no id found");
    const { data } = await client.from<Posts>("posts").select("*").eq("id", postId.value).single();
    title.value = data.title;
    body.value = data.body;
    settings.value = {
      image: data.cover_img ?? "",
      active: data.active ?? false,
      tags: data.tags ?? [],
    };

    return data;
  },
  { server: false, lazy: true }
);

const isDrawerOpen = ref(false);

useCustomHead("Write your post");
definePageMeta({
  alias: "/write",
  middleware: "auth",
});
</script>

<template>
  <div>
    <Loader v-if="pending"></Loader>
    <div v-else ref="el" class="flex flex-col mt-8">
      <div class="flex justify-end prose mx-auto w-full">
        <button :disabled="isSaving" class="btn-plain mr-6" @click="isDrawerOpen = true">
          Settings <span class="ml-2">⌘E</span>
        </button>
        <Button :loading="isSaving" class="btn-primary" @click="save">Save <span class="ml-2">⌘S</span></Button>
      </div>

      <div class="md:p-2 prose mx-auto w-full" spellcheck="false">
        <TiptapHeading v-model="title"></TiptapHeading>
        <Tiptap editable v-model="body"></Tiptap>
      </div>

      <DrawerEditPost v-model:show="isDrawerOpen" :settings="settings"></DrawerEditPost>
      <div id="modal"></div>
      <ModalLogin v-model:show="isLoginVisible"></ModalLogin>
    </div>
  </div>
</template>
