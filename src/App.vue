<script setup lang="ts">
import { reactive } from 'vue';
import data from '../data.json';
import Card from './components/Card.vue';

const meals = reactive(data);
</script>

<template>
  <main class="p-20 w-full">
    <h1 class="text-3xl font-bold text-rose-900 mb-8">Desserts</h1>
    <div class="grid meals w-4/5 gap-5">
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
</template>

<style scoped>
.meals {
  grid-template-columns: repeat(3, 14.5rem);
}
</style>
