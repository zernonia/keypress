<script setup lang="ts">
const profile = useProfile()

const payload = ref({ name: profile.value.name })
const { save, isSaving } = useProfileSave(payload)

const saveProfile = async () => {
  // validate
  save()
}
</script>

<template>
  <div class="w-full">
    <div class="flex w-full justify-end">
      <Button :loading="isSaving" @click="saveProfile" class="mb-8 btn-primary"
        >Save <span class="ml-2">⌘S</span></Button
      >
    </div>

    <div class="flex items-center">
      <label for="name" class="flex-shrink-0 mr-2">Name :</label>
      <input type="text" name="name" id="name" class="bg-white" v-model="payload.name" />
    </div>
  </div>
</template>
