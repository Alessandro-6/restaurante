<script setup lang="ts">
import { computed } from 'vue';
import AddToCart from '../assets/images/icon-add-to-cart.svg';
const { img } = defineProps<{
  img: string;
  name: string;
  category: string;
  price: number;
}>();

const icon = computed(() => new URL(img, import.meta.url).href);
</script>

<template>
  <div>
    <div class="relative">
      <img class="object-contain rounded-lg" :src="icon" :alt="name" />
      <button
        class="flex rounded-full h-9 items-center justify-center w-36 text-sm space-x-2 border border-rose-500 absolute z-10 bg-white font-medium -bottom-4 left-1/2 -translate-x-1/2"
      >
        <AddToCart class="inline-block" /> <span>Add to Cart</span>
      </button>
    </div>
    <div class="mt-7">
      <p class="text-rose-400 text-sm font-medium">{{ category }}</p>
      <p class="font-semibold text-rose-900">{{ name }}</p>
      <p class="text-red">${{ price }}</p>
    </div>
  </div>
</template>
