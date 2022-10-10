<script setup lang="ts">
import { PropType } from "vue"

const props = defineProps({
  show: Boolean,
})
const emits = defineEmits(["update:show"])

const save = () => {
  console.log("save")
}
</script>

<template>
  <Drawer :open="show" @update:open="emits('update:show', $event)">
    <div class="flex flex-col px-4 py-12">
      <h2 class="text-3xl font-bold">Settings</h2>

      <div class="mt-8">
        <label for="url">Source url</label>
        <input type="url" name="url" id="alt-name" />
      </div>

      <div>
        <button @click="save">Save</button>
      </div>
    </div>
  </Drawer>
</template>
