import axios from 'axios';

export const state = {
    products: [],
    product: {}
};

export const getters = {
    getProducts: state => state.products,
    getProduct: state => state.product
};

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products.data;
    },

    SET_PRODUCT(state, data) {
        state.product = data;
    }
};

export const actions = {
    async getProducts({ commit }, { params }) {
        const { data } = await axios.get(`/products`, { params });

        commit('SET_PRODUCTS', data);

        return data;
    },

    async getOneById({ commit }, { params }) {
        const { lng, id } = params;

        const { data } = await axios.get(`/products/id/${id}`, {
            params: { lng }
        });

        commit('SET_PRODUCT', data);

        return data;
    },

    async getOneBySlug({ commit }, { params }) {
        const { lng, slug } = params;

        const { data } = await axios.get(`/products/${slug}`, {
            params: { lng }
        });

        commit('SET_PRODUCT', data);

        return data;
    },

    async createOne({ commit }, params) {
        const { data } = await axios.post('/products', params);

        return data;
    },

    async update({ commit }, params) {
        const { id } = params;

        const { data } = await axios.put(`/products/${id}`, params);

        return data;
    },

    async delete({ commit }, id) {
        await axios.delete(`/products/${id}`);
    }
};
