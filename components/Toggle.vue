<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  id: String,
})
const emits = defineEmits(["update:modelValue"])

const emitData = (ev: InputEvent) => {
  //@ts-ignore
  emits("update:modelValue", ev.target.checked)
}
</script>

<template>
  <label :for="id" class="inline-flex relative items-center cursor-pointer">
    <input
      type="checkbox"
      class="peer h-1px w-1px absolute border-0 outline-none"
      v-model="modelValue"
      :id="id"
      @change="emitData"
    />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-gray-400 rounded-full peer-checked:bg-dark-300 transition"
    ></div>
    <div
      class="peer-checked:translate-x-full peer-checked:border-white absolute top-[2px] left-[2px] bg-white border-gray-400 rounded-full h-5 w-5 transition-all"
    ></div>
    <span class="ml-2">
      <slot>Toggle</slot>
    </span>
  </label>
</template>
