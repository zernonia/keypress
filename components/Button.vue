<script setup lang="ts">
defineProps({
  loading: Boolean,
})
</script>

<template>
  <button :data-loading="loading" :disabled="loading" class="btn-loader" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style>
.btn-loader[data-loading="true"]::before,
[data-loading] [data-type="submit"] .formkit-input::before {
  -webkit-animation: rotate 0.5s linear infinite;
  animation: rotate 0.5s linear infinite;
  width: 1rem;
  border: 0.1428571429em solid #fff;
  border-right-color: transparent;
  margin-right: 0.75em;
}

.btn-loader::before,
[data-type="submit"] .formkit-input::before {
  box-sizing: border-box;
  content: "";
  width: 0;
  margin-right: 0;
  height: 1rem;
  border: 0 solid transparent;
  border-radius: 1rem;
  transition: width 0.25s, border 0.25s, margin-right 0.25s;
}

@-ms-keyframes rotate {
  from {
    -ms-transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
