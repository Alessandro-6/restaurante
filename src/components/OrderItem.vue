<script setup lang="ts">
import { computed } from 'vue';

const { img, price, quantity } = defineProps<{
  img: string;
  name: string;
  category?: string;
  price: number;
  quantity: number;
}>();

const total = computed((): number => price * quantity);
const icon = computed((): string => new URL(img, import.meta.url).href);
</script>

<template>
  <li class="flex text-rose-900 py-3 font-medium border-b border-b-rose-300 items-center">
    <img :src="icon" :alt="category" class="h-14 w-14 mr-5" />
    <div class="flex flex-col self-start capitalize">
      <h3 class="mb-0.5 text-sm text-rose-900 font-semibold">{{ name }}</h3>
      <div class="space-x-2.5 flex items-center">
        <span class="font-semibold text-sm text-red">{{ quantity }}x</span>
        <span class="text-rose-400 text-sm font-medium">@ ${{ price.toFixed(2) }}</span>
      </div>
    </div>
    <span class="text-rose-500 text-sm font-semibold ml-auto">${{ total.toFixed(2) }}</span>
  </li>
</template>
