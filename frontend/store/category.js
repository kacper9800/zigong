"use strict";

export const defaultState = () => {
  return {
    categories: {}
  };
};

export const state = () => defaultState();

export const getters = {
  getCategories: state => state.categories,
  getCategoryById: state => state.categoryById,
  getCategoryBySlug: state => state.categoryBySlug,
  getSavedCategory: state => state.savedCategory
};

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  SET_CATEGORY_BY_ID(state, categoryById) {
    state.categoryById = categoryById;
  },

  SET_CATEGORY_BY_SLUG(state, categoryBySlug) {
    state.categoryBySlug = categoryBySlug;
  },

  SET_SAVED_CATEGORY(state, savedCategory) {
    state.savedCategory = savedCategory
  }
};

export const actions = {
  async getAllCategories({ commit }, lng) {
    const { data } = await this.$axios.get(`/categories`, { params: lng });

    commit("SET_CATEGORIES", data);

    return data;
  },

  async getOneById({ commit }, id ) {
    const { data } = await this.$axios.get(`/categories/${id}`);

    commit("SET_CATEGORY_BY_ID", data);

    return data;
  },

  async getOneBySlug({ commit }, slug ) {
    const { data } = await this.$axios.get(`/categories/${slug}`);

    commit("SET_CATEGORY_BY_SLUG", data);

    return data;
  },

  async createOne({ commit }, { category }) {
    const { data } = await  this.$axios.post('categories', category);

    commit("SET_SAVED_CATEGORY", data);

    return data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
