<script setup lang="ts">
const profile = useProfile()

const payload = ref(profile.value)
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
      <label for="" class="flex-shrink-0 mr-2">Name :</label>
      <input type="text" name="" id="" v-model="payload.name" />
    </div>
  </div>
</template>
