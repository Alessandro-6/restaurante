<script setup lang="ts">
import EmptyCart from '../assets/images/illustration-empty-cart.svg';
</script>

<template>
  <aside class="bg-white rounded-lg py-6 px-5">
    <h1 class="text-red font-bold text-xl mb-8">Your Cart(0)</h1>
    <div class="flex flex-col gap-2 items-center">
      <EmptyCart />
      <p class="text-rose-500 font-semibold">Your added items will appear here</p>
    </div>
  </aside>
</template>
