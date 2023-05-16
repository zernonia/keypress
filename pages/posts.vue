<script setup lang="ts">
const client = useSupabase();

const { data, pending } = useAsyncData("posts", async () => {
  const { data } = await client
    .from("posts")
    .select("*, profiles(avatar_url, name,username, domains (url, active))")
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return data;
});

const { data: tags } = useAsyncData("tags", async () => {
  const { data } = await client.from("tags_view").select("*");
  return data;
});

useCustomHead("Explore all posts");
</script>

<template>
  <div class="my-12">
    <h1 class="text-4xl font-semibold">Posts</h1>
    <div class="flex flex-col-reverse md:flex-row">
      <div class="w-full">
        <div v-if="pending">
          <Loader></Loader>
        </div>
        <ul v-else>
          <li class="my-4" v-for="post in data">
            <PostCard :post="post"></PostCard>
          </li>
        </ul>
      </div>
      <aside class="md:ml-6 md:w-60 mt-3 flex-shrink-0">
        <h5 class="text-xl font-medium">Tags</h5>

        <ul class="mt-4 p-4 bg-light-600 rounded-xl flex flex-col space-y-2">
          <li v-for="tag in tags" class="flex justify-between items-center">
            <div class="text-sm">{{ tag.name }}</div>
            <div class="text-xs px-1 py-0.5 flex items-center bg-gray-200 font-medium rounded">{{ tag.count }}</div>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
