<script lang="ts" setup>
const client = useSupabase();

const signIn = async () => {
  const { error } = await client.auth.signInWithOAuth({ provider: "github" });
  if (error) {
    return alert("Something went wrong !");
  }
};

useCustomHead("Login");
</script>

<template>
  <div class="flex flex-col mx-auto max-w-48 mt-20">
    <h1 class="text-4xl font-bold text-center">Login</h1>

    <button autofocus class="btn-primary mt-4" @click="signIn">Login with GitHub</button>
  </div>
</template>
