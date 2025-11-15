<script setup lang="ts">
import Times from '@/assets/images/icon-remove-item.svg';
import type { Item } from '@/types';
import { computed } from 'vue';

const { item } = defineProps<{
  item: Item;
}>();
const emit = defineEmits<{ 'drop-item': [item: Item] }>();
const total = computed<number>((): number => item.price * item.quantity);
</script>

<template>
  <li
    class="translate-0 flex justify-between w-full items-center border-b border-b-rose-100 pb-4 mb-3"
  >
    <div class="flex flex-col justify-center capitalize">
      <h3 class="mb-1 text-rose-900 font-semibold">{{ item.category }}</h3>
      <div class="space-x-2.5 flex items-center">
        <span class="font-semibold text-sm text-red">{{ item.quantity }}x</span>
        <span class="text-rose-400 font-medium">@ ${{ item.price.toFixed(2) }}</span>
        <span class="text-rose-500 font-semibold">${{ total.toFixed(2) }}</span>
      </div>
    </div>
    <button
      class="border border-rose-500 p-[0.22rem] rounded-full"
      @click="emit('drop-item', item)"
    >
      <Times />
    </button>
  </li>
</template>
