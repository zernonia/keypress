<script setup lang="ts">
import type { Tags } from "~~/utils/types"
import { PropType } from "vue"
import Multiselect from "@vueform/multiselect"

const props = defineProps({
  modelValue: { type: Object as PropType<string[]>, default: [] },
  id: String,
})
const emits = defineEmits(["update:modelValue"])

const client = useSupabaseClient()
const { data: tags } = useAsyncData("tags", async () => {
  const { data } = await client.from<Tags>("tags_view").select("*")
  return data.map((i) => i.name)
})
</script>

<template>
  <div>
    <Multiselect
      v-model="modelValue"
      @change="emits('update:modelValue', $event)"
      :options="tags ?? []"
      createOption
      mode="tags"
      placeholder="Add tags"
      :close-on-select="false"
      :searchable="true"
      :classes="{
        container: 'relative mx-auto p-2 w-full flex items-center justify-end cursor-pointer rounded-2xl bg-light-300',
        tag: 'bg-dark-300 text-white text-sm font-semibold py-0.5 pl-2 rounded-lg mr-1.5 mb-1.5 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
        tagsSearch:
          'not-default bg-transparent absolute inset-0 border-0 focus:ring-0 outline-none appearance-none p-0 text-base font-sans box-border w-full',
        tagsSearchCopy: 'invisible whitespace-pre-wrap inline-block h-px',
        placeholder:
          'flex items-center h-full absolute left-2 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
        dropdown:
          'max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full -mt-px py-2 overflow-y-scroll z-50 bg-light-300 flex flex-col rounded-b-2xl shadow-lg',
        dropdownHidden: '!hidden',
        optionPointed: 'text-dark-300 bg-light-700',
        optionSelected: 'text-dark-300 bg-light-700',
        noResults: 'py-2 px-3 text-gray-400 text-center font-semibold',
      }"
    />
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.is-open {
  @apply rounded-b-none transition;
}
.is-active {
  @apply ring-3 ring-gray-400;
}
</style>
