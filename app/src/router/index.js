import {createRouter, createWebHistory} from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import Products from '../views/Products.vue';
import Heart from '../views/Heart.vue';
import Cart from '../views/Card.vue';

const routes = [
    {  path: '/',
       redirect: '/products',
       component: DefaultLayout,
       children: [
           { path: '/products', name: 'Products', component: Products },
           { path: '/heart', name: 'Heart', component: Heart },
           { path: '/cart', name: 'Cart', component: Cart },
       ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;