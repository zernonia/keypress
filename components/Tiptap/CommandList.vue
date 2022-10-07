<template>
  <div class="bg-white px-2 py-4 rounded-xl shadow-xl flex flex-col w-72">
    <template v-if="items.length">
      <button
        class="p-2 flex flex-col text-sm text-left rounded-lg bg-transparent transition"
        :class="{ '!bg-light-300': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
      >
        <span>{{ item.title }}</span>
        <span class="opacity-40 text-xs">{{ item.description }}</span>
      </button>
    </template>
    <div class="item" v-else>No result</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue"

interface Item {
  title: string
  description: string
}

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
})
const { items } = toRefs(props)
const selectedIndex = ref(0)

watch(items, () => (selectedIndex.value = 0))

const selectItem = (index: number) => {
  const item = items.value[index]

  if (item) {
    props.command(item)
  }
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "ArrowUp") {
    selectedIndex.value = (selectedIndex.value + items.value.length - 1) % items.value.length
    return true
  }
  if (event.key === "ArrowDown") {
    selectedIndex.value = (selectedIndex.value + 1) % items.value.length
    return true
  }
  if (event.key === "Enter") {
    selectItem(selectedIndex.value)
    return true
  } else return
}

defineExpose({
  onKeyDown,
})
</script>
