<template>
    <div style="overflow: hidden; height: 81vh;">
        <h1 class="page-header" style="color: #9e9e9e;">
            {{ $t('categories.header') }}
        </h1>
        <br />
        <a-table
            :columns="columns"
            :data-source="categories"
            rowKey="name"
            bordered
            :pagination="{
                defaultPageSize: 10,
                showLessItems: true,
                showSizeChanger: true,
                showTitle: true
            }"
        >
            <template slot="title" slot-scope="currentPageData">
                <a-button
                    class="editable-add-btn ant-btn-primary"
                    icon="plus"
                    @click="toggleAddModal()"
                >
                    {{ $t('global.buttons.addNew') }}
                </a-button>
            </template>
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="nameCustomTitle">{{ $t(`categories.name`) }}</span>
            <a slot="homePageDescription" slot-scope="text">{{ text }}</a>
            <span slot="homePageDescriptionCustomTitle">{{
                $t(`categories.modal.homePageDescription`)
            }}</span>
            <a slot="actions" slot-scope="text, record">
                <img
                    :src="require('../../assets/images/flags/en.png')"
                    @click="toggleEditModal(record.categoryId, 'En')"
                />
                <img
                    :src="require('../../assets/images/flags/ru.png')"
                    @click="toggleEditModal(record.categoryId, 'Ru')"
                />
                <img
                    :src="require('../../assets/images/flags/pl.png')"
                    @click="toggleEditModal(record.categoryId, 'Pl')"
                />
                <a-popconfirm
                    v-if="categories.length"
                    :title="$t('global.deleteActionQuestion')"
                    @confirm="() => onDelete(record.categoryId)"
                >
                    <a-button type="danger">Delete</a-button>
                </a-popconfirm>
            </a>
            <span slot="actionsCustomTitle">{{ $t(`global.actions`) }}</span>
        </a-table>
        <categories-add-modal :isVisible="isAddModalVisible" @toggleAddModal="toggleAddModal" />
        <categories-edit-modal
            :isVisible="isEditModalVisible"
            :isTranslationCreated="isTranslationCreated"
            :languageCode="languageCode"
            :categoryId="categoryIdToEdit"
            @toggleEditModal="toggleEditModal"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import config from '~/config';
import CategoriesAddModal from '~/components/modals/categoriesAddModal.vue';
import CategoriesEditModal from '~/components/modals/categoriesEditModal';

export default {
    layout: 'admin',
    middleware: 'admin',

    components: {
        CategoriesAddModal,
        CategoriesEditModal
    },

    async asyncData({ app, store }) {
        const { code } = app.i18n.localeProperties;
        try {
            await store.dispatch('category/getAllCategories', {
                lng: code
            });
        } catch (error) {
            console.error(error);
        }
    },
    async fetch({ app, store }) {
        const { code } = app.i18n.localeProperties;
        try {
            await store.dispatch('category/getAllCategories', {
                lng: code
            });
        } catch (error) {
            console.error(error);
        }
    },
    data() {
        return {
            isAddModalVisible: false,
            isEditModalVisible: false,
            isTranslationCreated: false,
            categoryIdToEdit: null,
            categoryToEdit: null,
            languageCode: 'En',
            columns: [
                {
                    dataIndex: 'name',
                    key: 'name',
                    width: '30%',
                    slots: { title: 'nameCustomTitle' },
                    scopedSlots: { customRender: 'name' }
                },
                {
                    key: 'homePageDescription',
                    dataIndex: 'homePageDescription',
                    width: '50%',
                    slots: { title: 'homePageDescriptionCustomTitle' },
                    scopedSlots: { customRender: 'name' }
                },
                {
                    key: 'actions',
                    dataIndex: 'actions',
                    slots: { title: 'actionsCustomTitle' },
                    scopedSlots: { customRender: 'actions' }
                }
            ]
        };
    },

    computed: {
        ...mapGetters({
            categories: 'category/getCategories',
            category: 'category/getCategory'
        }),

        baseUrl() {
            return config.mediaBaseUrl;
        },

        availableLocales() {
            return this.$i18n.locale;
        }
    },

    methods: {
        ...mapActions({
            delete: 'category/deleteOne',
            getAllCategories: 'category/getAllCategories',
            getOneById: 'category/getOneById'
        }),
        async onDelete(id) {
            try {
                await this.delete(id);
                await this.getAllCategories('En');
            } catch (e) {
                console.error(e);
            }
        },
        toggleAddModal() {
            this.isAddModalVisible = !this.isAddModalVisible;
            if (!this.isAddModalVisible) {
                this.$fetch;
            }
        },
        toggleEditModal(id, code) {
            this.isEditModalVisible = !this.isEditModalVisible;
            if (this.isEditModalVisible) {
                // this.categoryToEdit = this.getCategoryById({ lng: code, id: id });
                this.categoryToEdit
                    ? (this.isTranslationCreated = true)
                    : (this.isTranslationCreated = false);
            }
            this.languageCode = code;
            this.categoryIdToEdit = id;
            this.$emit('showModal');
        }
    }
};
</script>

<style scoped></style>
