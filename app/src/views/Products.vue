<template>
  <StructureComponent title="Каталог">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <div v-for="product in products" :key="product.id" class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[400px]">
        <img :src="product.image" alt="" class="w-full h-48 object-cover">
        <h4 class="my-4 text-sm font-bold">{{ product.title }}</h4>
        <h4 class="my-4">{{ product.price }} грн</h4>
        <p class="text-sm">Залишок: {{ product.in_stock }} шт</p>
        <div class="flex justify-between items-center mt-2">
          <button type="button" @click="addToHeartList(product)">
            <HeartIcon :class="[heart_list_id.includes(product.id) ? 'text-yellow-500' : '']" class="w-8 h-8"/>
          </button>
          <button type="button" @click="addToCart(product)" class="h-10 w-18 rounded-md py-2 px-8 flex items-center justify-center bg-green-500 border text-sm text-white focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Купити
          </button>
        </div>
      </div>
    </div>
  </StructureComponent>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import StructureComponent from '../components/StructureComponent.vue';
import { MenuIcon, HeartIcon, ShoppingBagIcon, XIcon } from '@heroicons/vue/outline';

const products = computed(() => store.state.products.data);
const heart_list_id = computed(() => store.state.heart_list.data_id);
const cart_list = computed(() => store.state.cart_list.data);



store.dispatch('getProducts');
store.dispatch('getHeartList');
store.dispatch('getCartList');

function addToHeartList(product) {
  if (localStorage.getItem(`HeartItem_${product.id}`) === null) {
      localStorage.setItem(`HeartItem_${product.id}`, JSON.stringify(product));
  } else {
    localStorage.removeItem(`HeartItem_${product.id}`);
  }
  store.dispatch('getHeartList');
}

function addToCart(product) {
  const item = localStorage.getItem(`CartItem_${product.id}`);

  if (item === null) {
      product.num = 1;
      localStorage.setItem(`CartItem_${product.id}`, JSON.stringify(product));
  } else if (product.num < Number(product.in_stock)) {
      product.num++;
      localStorage.setItem(`CartItem_${product.id}`, JSON.stringify(product));
  }
  store.dispatch('getCartList');
}

</script>
