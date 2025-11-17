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
    img: meal.image,
    selected: false,
  })),
);

const items = reactive<Array<Item>>([]);

const hasConfirmed = ref(false);

function handleNewOrder(): void {
  items.splice(0);
  hasConfirmed.value = false;
  meals.forEach((meal) => {
    meal.quantity = 0;
    meal.selected = false;
  });
}

function handleIncrement(item: Item): void {
  const mealIdx = meals.findIndex((el) => item.name === el.name);
  const itemIdx = items.findIndex((el) => item.name === el.name);

  if (itemIdx === -1) {
    if (meals[mealIdx]) {
      meals[mealIdx].quantity++;
      meals[mealIdx].selected = true;
    }
    items.push({ ...item, quantity: item.quantity });
  } else {
    if (meals[mealIdx]) meals[mealIdx].quantity++;
    if (items[itemIdx]) items[itemIdx].quantity++;
  }
}

function handleDecrement(item: Item): void {
  const mealIdx = meals.findIndex((el) => item.name === el.name);
  const itemIdx = items.findIndex((el) => item.name === el.name);

  if (itemIdx === -1) return;
  if (item.quantity === 1) {
    if (meals[mealIdx]) {
      meals[mealIdx].quantity = 0;
      meals[mealIdx].selected = false;
    }
    items.splice(itemIdx, 1);
  } else if (items[itemIdx] && items[itemIdx].quantity - 1 > 0) {
    if (items[itemIdx]) items[itemIdx].quantity--;
    if (meals[mealIdx]) meals[mealIdx].quantity--;
  }
}

function handleDropItem(item: Item) {
  const mealIdx = meals.findIndex((el) => el.name === item.name);
  const itemIdx = items.findIndex((el) => el.name === item.name);
  if (itemIdx === -1) return;
  items.splice(itemIdx, 1);
  if (meals[mealIdx]) meals[mealIdx].quantity = 0;
  if (meals[mealIdx]) meals[mealIdx].selected = false;
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-items-center lg:flex-row sm:items-start sm:py-20 py-10 sm:px-20 sm:gap-6 w-screen relative"
  >
    <main class="w-11/12 sm:w-full">
      <h1 class="md:text-3xl text-4xl font-bold text-rose-900 mb-8">Desserts</h1>
      <div class="grid w-full meals sm:mb-0 mb-6 gap-5 relative">
        <Suspense>
          <template #default>
            <CardItem
              v-for="meal in meals"
              :key="meal.name"
              :item="meal"
              :quantity="meal.quantity"
              :items="items"
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
    <Teleport to="body">
      <div
        class="w-full h-full fixed top-1/2 left-1/2 -translate-1/2 bg-slate-900 brightness-0 grayscale opacity-50 z-20"
        @click="() => (hasConfirmed = false)"
        v-if="hasConfirmed"
      ></div>
      <Transition name="modal" mode="in-out">
        <OrderList :items="items" @new-order="handleNewOrder" v-if="hasConfirmed" />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.meals {
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-enter-from {
  transform: translateY(-15rem);
  opacity: 0;
}

.modal-leave-to {
  transform: translateY(-15rem);
  opacity: 0;
}
</style>
