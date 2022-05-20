<template>
  <StructureComponent title="Кошик">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Фото
          </th>
          <th scope="col" class="px-6 py-3">
            Товар
          </th>
          <th scope="col" class="px-6 py-3">
            Ціна
          </th>
          <th scope="col" class="px-6 py-3">
            Кількість
          </th>
          <th scope="col" class="px-6 py-3 w-[10%]">
            <span class="sr-only"></span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart_list" :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            <img :src="item.image" class="w-20 h-20 rounded-md" alt="">
          </th>
          <td class="px-6 py-4">
            {{ item.title }}
          </td>
          <td class="px-6 py-4">
            {{ item.price }}
          </td>
          <td class="px-6 py-4">
            {{ item.num }}
          </td>
          <td class="px-6 py-4 text-right">
            <a href="#" @click="removeCartItem(item)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Видалити</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </StructureComponent>
</template>

<script setup>
import StructureComponent from '../components/StructureComponent.vue';
import { computed } from "vue";
import store from "../store";

const cart_list = computed(() => store.state.cart_list.data);

function removeCartItem(item) {
  localStorage.removeItem(`CartItem_${item.id}`);
  store.dispatch('getCartList');
}
</script>

<style scoped>

</style>