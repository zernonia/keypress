<script lang="ts" setup>
const client = useSupabaseClient()

const signIn = async () => {
  const { user } = await client.auth.signIn({ provider: "github" })
}
</script>

<template>
  <div>
    Login

    <button @click="signIn">Login with GitHub</button>
  </div>
</template>
