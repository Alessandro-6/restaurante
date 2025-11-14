<script setup lang="ts">
import CarbonNeutral from '@/assets/images/icon-carbon-neutral.svg';
import EmptyCart from '../assets/images/illustration-empty-cart.svg';
import Button from './ui/UiButton.vue';
import CartItem from './CartItem.vue';
import type { Item } from '@/types';
import { computed } from 'vue';

const { items } = defineProps<{ items: Array<Item>; onDropItem: (item: Item) => void }>();
const emit = defineEmits<{ confirm: [] }>();
const total = computed<number>((): number =>
  items.reduce<number>((prev, currItem) => prev + currItem.price * currItem.quantity, 0),
);
</script>

<template>
  <div class="bg-white rounded-lg py-6 px-5 box-border min-w-104 min-h-80 flex flex-col">
    <h1 class="text-red font-bold text-2xl mb-8 self-start">Your Cart({{ items.length }})</h1>
    <div class="flex flex-col gap-2 items-center" v-if="items.length <= 0">
      <EmptyCart class="mb-6" />
      <p class="text-rose-500 font-semibold">Your added items will appear here</p>
    </div>
    <div v-else>
      <ul class="h-60 overflow-y-scroll">
        <CartItem v-for="(item, idx) in items" :key="idx" :item="item" @drop-item="onDropItem" />
      </ul>
      <div class="mt-auto">
        <div class="flex justify-between items-center mb-6 mt-6">
          <h3 class="text-rose-900 font-medium">Order Total</h3>
          <span class="text-2xl inline-block font-bold text-rose-900">${{ total.toFixed(2) }}</span>
        </div>
        <div
          class="text-rose-900 py-4 bg-rose-50 mb-6 rounded-lg flex items-center justify-center space-x-2.5"
        >
          <CarbonNeutral /> <span>This is a <strong>carbon-neutral</strong> delivery</span>
        </div>
        <Button type="button" @click="emit('confirm')"> Confirm Order </Button>
      </div>
    </div>
  </div>
</template>
