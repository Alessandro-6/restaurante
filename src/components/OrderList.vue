<script setup lang="ts">
import Confirmed from '@/assets/images/icon-order-confirmed.svg';
import Button from './ui/UiButton.vue';
import OrderItem from './OrderItem.vue';
import type { Item } from '@/types';
import { computed } from 'vue';

const { items } = defineProps<{ items: Array<Item> }>();
const emit = defineEmits<{ 'new-order': [] }>();

const total = computed<number>(() => {
  return items.reduce<number>(
    (prevVal, currItem) => prevVal + currItem.price * currItem.quantity,
    0,
  );
});
</script>

<template>
  <div
    class="rounded-lg min-w-114 p-8 fixed top-1/2 -translate-y-1/2 left-1/2 h-130 bg-white z-20 -translate-x-1/2 flex flex-col"
  >
    <Confirmed class="mb-5" />
    <h3 class="text-2xl capitalize mb-1 text-rose-900 font-bold">Order Confirmed!</h3>
    <p class="text-rose-500 mb-3 text-sm font-semibold">We hope you enjoy your food!</p>
    <ul class="bg-rose-100 px-4 py-3 rounded-lg overflow-y-scroll max-h-60">
      <OrderItem
        v-for="(item, idx) in items"
        :key="idx"
        :category="item.category"
        :img="item.img"
        :name="item.name"
        :price="item.price"
        :quantity="item.quantity"
      />
      <li class="flex text-rose-900 pt-5 pb-2 font-medium justify-between">
        <span>Order total</span>
        <h3 class="text-lg font-bold">${{ total.toFixed(2) }}</h3>
      </li>
    </ul>
    <Button class="mt-auto" @click="() => emit('new-order')">Start new order</Button>
  </div>
</template>
