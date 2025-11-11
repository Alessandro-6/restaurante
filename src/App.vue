<script setup lang="ts">
import { reactive } from 'vue';
import data from '../data.json';
import Card from './components/Card.vue';
import Cart from './components/Cart.vue';

const meals = reactive(data);
</script>

<template>
  <div class="flex items-start py-20 px-28 gap-20">
    <main>
      <h1 class="text-3xl font-bold text-rose-900 mb-8">Desserts</h1>
      <div class="grid meals gap-5">
        <Suspense>
          <template #default>
            <Card
              v-for="meal in meals"
              :key="meal.name"
              :img="meal.image.desktop"
              :name="meal.name"
              :price="meal.price"
              :category="meal.category"
            />
          </template>
          <template #fallback> loading... </template>
        </Suspense>
      </div>
    </main>
    <Cart />
  </div>
</template>

<style scoped>
.meals {
  grid-template-columns: repeat(3, 14.5rem);
}
</style>
