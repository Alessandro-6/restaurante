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
  <div
    class="bg-white rounded-lg py-6 px-5 box-border sm:min-w-100 sm:min-h-80 h-11/12 flex flex-col overflow-x-hidden relative backface-hidden transition-all duration-200 w-11/12"
  >
    <h1 class="text-red font-bold text-2xl mb-8 self-start">Your Cart({{ items.length }})</h1>
    <Transition name="list" mode="out-in">
      <div
        class="flex flex-col gap-2 min-h-56 transition-all items-center"
        v-if="items.length <= 0"
      >
        <EmptyCart class="mb-6" />
        <p class="text-rose-500 font-semibold">Your added items will appear here</p>
      </div>
      <div v-else>
        <TransitionGroup
          tag="ul"
          class="overflow-y-scroll overflow-x-hidden h-64 relative"
          name="item"
          appear
        >
          <CartItem
            v-for="item in items"
            :key="item.category"
            :item="item"
            @drop-item="onDropItem"
          />
        </TransitionGroup>
        <div class="mt-auto">
          <div class="flex justify-between items-center mb-6 mt-6">
            <h3 class="text-rose-900 font-medium">Order Total</h3>
            <span class="text-2xl inline-block font-bold text-rose-900"
              >${{ total.toFixed(2) }}</span
            >
          </div>
          <div
            class="text-rose-900 py-4 bg-rose-50 mb-6 rounded-lg flex items-center justify-center space-x-2.5"
          >
            <CarbonNeutral /> <span>This is a <strong>carbon-neutral</strong> delivery</span>
          </div>
          <Button type="button" @click="emit('confirm')"> Confirm Order </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease-out;
}

.list-enter-from,
.list-leave-to {
  translate: 2rem;
  opacity: 0;
}

.item-enter-active {
  transition: all 0.2s ease-out;
}

.item-leave-active {
  transition: all 0.2s ease-out;
  position: absolute;
}

.item-enter-from,
.item-leave-to {
  opacity: 0;
  translate: 2rem;
}

.item-move {
  transition: all 0.3s ease-out;
}
</style>
