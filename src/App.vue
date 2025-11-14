<script setup lang="ts">
import { reactive, ref } from 'vue';
import data from '../data.json';
import CardItem from './components/CardItem.vue';
import CartList from './components/CartList.vue';
import OrderList from './components/OrderList.vue';
import type { Item } from './types';

const meals = reactive<Array<Item>>(
  data.map((meal) => ({
    category: meal.category,
    price: meal.price,
    name: meal.name,
    quantity: 0,
    img: meal.image.desktop,
  })),
);

const items = reactive<Array<Item>>([]);

const hasConfirmed = ref(false);

function handleNewOrder(): void {
  items.splice(0);
  hasConfirmed.value = false;
}

function handleIncrement(item: Item): void {
  const mealIdx = meals.findIndex((el) => item.name === el.name);
  const itemIdx = items.findIndex((el) => item.name === el.name);

  if (itemIdx === -1) {
    meals[mealIdx].quantity++;
    items.push({ ...item, quantity: item.quantity });
  } else {
    meals[mealIdx].quantity++;
    items[itemIdx].quantity++;
  }
}

function handleDecrement(item: Item): void {
  const mealIdx = meals.findIndex((el) => item.name === el.name);
  const itemIdx = items.findIndex((el) => item.name === el.name);

  if (itemIdx === -1) return;
  if (item.quantity === 1) {
    meals[mealIdx].quantity = 0;
    items.splice(itemIdx, 1);
  } else if (items[itemIdx].quantity - 1 > 0) {
    items[itemIdx].quantity--;
    meals[mealIdx].quantity--;
  }
}

function handleDropItem(item: Item) {
  const mealIdx = meals.findIndex((el) => el.name === item.name);
  const itemIdx = items.findIndex((el) => el.name === item.name);
  if (itemIdx === -1) return;
  items.splice(itemIdx, 1);
  meals[mealIdx].quantity = 0;
}
</script>

<template>
  <div class="flex items-start py-20 px-28 gap-6 relative">
    <main>
      <h1 class="text-3xl font-bold text-rose-900 mb-8">Desserts</h1>
      <div class="grid meals gap-5 relative">
        <Suspense>
          <template #default>
            <CardItem
              v-for="meal in meals"
              :key="meal.name"
              :item="meal"
              :quantity="meal.quantity"
              @increment="handleIncrement"
              @decrement="handleDecrement"
            />
          </template>
          <template #fallback>
            <div
              class="absolute inline-block animate-spin top-40 left-1/2 -translate-x-1/2 border-r-8 border-b-8 border-l-8 border-t-8 border-l-transparent border-t-r-transparent border-red rounded-full h-40 w-40"
            ></div>
          </template>
        </Suspense>
      </div>
    </main>
    <CartList
      :items="items"
      :on-drop-item="handleDropItem"
      @confirm="() => (hasConfirmed = true)"
    />
    <Transition>
      <Teleport to="body">
        <template v-if="hasConfirmed">
          <div
            class="w-screen h-screen fixed top-0 left-0 bg-slate-900 brightness-0 grayscale opacity-50 z-20"
            @click="() => (hasConfirmed = false)"
          ></div>
          <OrderList :items="items" @new-order="handleNewOrder" />
        </template>
      </Teleport>
    </Transition>
  </div>
</template>

<style scoped>
.meals {
  grid-template-columns: repeat(3, 14.5rem);
}
</style>
