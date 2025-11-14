<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Inc from '@/assets/images/icon-increment-quantity.svg';
import Dec from '@/assets/images/icon-decrement-quantity.svg';
import AddToCart from '../assets/images/icon-add-to-cart.svg';
import type { Item } from '@/types';

const { item: data } = defineProps<{ item: Item; quantity: number }>();

const emit = defineEmits<{ increment: [item: Item]; decrement: [item: Item] }>();

const icon = computed<string>((): string => new URL(item.img, import.meta.url).href);
const item = reactive<Item>(data);
const hovered = ref<boolean>(false);
</script>

<template>
  <div>
    <div class="relative">
      <img class="object-contain rounded-lg" :src="icon" :alt="item.name" />
      <Transition>
        <button
          @mouseleave="() => (hovered = false)"
          v-if="hovered"
          type="button"
          class="flex rounded-full h-9 items-center justify-between w-36 text-sm border border-rose-500 absolute z-10 bg-red font-semibold -bottom-4 left-1/2 -translate-x-1/2 px-1.5 text-white"
        >
          <button
            class="h-5.5 w-5.5 flex items-center justify-center rounded-full border border-white"
            @click="() => emit('decrement', item)"
          >
            <Dec />
          </button>
          <span>{{ quantity }}</span>
          <button
            class="h-5.5 w-5.5 flex items-center justify-center rounded-full border border-white"
            @click="emit('increment', item)"
          >
            <Inc />
          </button>
        </button>

        <button
          v-else
          @mouseenter="() => (hovered = true)"
          type="button"
          class="flex rounded-full h-9 items-center justify-center w-36 text-sm space-x-2 border border-rose-500 absolute z-10 bg-white font-semibold -bottom-4 left-1/2 -translate-x-1/2"
        >
          <AddToCart class="inline-block" />
          <span>Add to Cart</span>
        </button>
      </Transition>
    </div>
    <div class="mt-7">
      <p class="text-rose-400 text-sm font-medium">{{ item.category }}</p>
      <p class="font-semibold text-rose-900">{{ item.name }}</p>
      <p class="text-red font-medium">${{ item.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<style lang="scss"></style>
