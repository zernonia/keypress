<script setup lang="ts">
const client = useSupabaseClient()

defineProps({
  show: Boolean,
})
const emits = defineEmits(["update:show"])

const signIn = async () => {
  const { user } = await client.auth.signIn({ provider: "github" })
}
</script>

<template>
  <Modal :open="show" @update:open="emits('update:show', $event)">
    <div class="flex flex-col items-center px-6 py-12">
      <h1 class="text-4xl font-bold text-center">Login</h1>
      <button autofocus class="btn-primary w-max mt-6" @click="signIn">Login with GitHub</button>
    </div>
  </Modal>
</template>
