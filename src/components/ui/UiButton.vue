<script setup lang="ts">
defineProps<{ type?: 'button' | 'submit' | 'reset' | undefined }>();
</script>

<template>
  <button
    :type="type"
    class="w-full font-medium py-3 text-center hover:brightness-95 duration-100 transition active:bg-rose-900 bg-red text-rose-50 rounded-full"
  >
    <slot />
  </button>
</template>
