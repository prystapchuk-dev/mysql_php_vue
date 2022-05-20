import {createStore} from "vuex";


const store = createStore({
    state: {
        products: {
            data: [],
        },
        heart_list: {
            data: [],
            data_id: [],
        },
        cart_list:{
            data: [],
            data_id: [],
        }
    },
    getters: {},
    actions: {
        getProducts({ commit }) {
            return fetch(`http://localhost:8888/shop/api/product/read.php`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                method: 'POST',
            })
                .then((res) => res.json())
                .then((res) => {
                    commit('setProducts', res.records);

                    return res.records;
                })
        },
        getHeartList({commit}) {
            let list = [];
            let list_id = [];

            for (let i = 0, length = localStorage.length; i < length; i++) {
                const key = localStorage.key(i);
                const key_number = localStorage.key(i).split('_').pop();

                const value = JSON.parse(localStorage[key]);
                if (key.includes('HeartItem_')) {
                    list.push(value);
                    list_id.push(key_number);
                }
            }
            commit('setHeartList', list);
            commit('setHeartListId', list_id);
        },

        getCartList({commit}) {
            let cartList = [];
            let cartlist_id = [];

            for (let i = 0, length = localStorage.length; i < length; i++) {
                const key = localStorage.key(i);
                const key_number = localStorage.key(i).split('_').pop();
                const value = JSON.parse(localStorage[key]);
                if (key.includes('CartItem_')) {
                    cartList.push(value);
                    cartlist_id.push(key_number, value.num);
                }
            }
            commit('setCartList', cartList);
            commit('setCartListId', cartlist_id);
        },


    },
    mutations: {
        setProducts: (state, products) => {
            state.products.data = products;
        },
        setHeartList: (state, list) => {
            state.heart_list.data = list;
        },
        setHeartListId: (state, list) => {
            state.heart_list.data_id = list;
        },
        setCartList: (state, list_id) => {
            state.cart_list.data = list_id;
        },
        setCartListId: (state, list_id) => {
            state.cart_list.data_id = list_id;
        },
    },
    modules: {},
});



export default store;