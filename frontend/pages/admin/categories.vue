<template>
    <div style="overflow: hidden; height: 81vh">
        <h1 class="page-header" style="color: #9e9e9e">
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
            <template slot="title">
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
                    src="~/assets/images/flags/en.png"
                    @click="toggleEditModal(record.categoryId, 'En')"
                />
                <img
                    src="~/assets/images/flags/ru.png"
                    @click="toggleEditModal(record.categoryId, 'Ru')"
                />
                <img
                    src="~/assets/images/flags/pl.png"
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

    data() {
        return {
            isAddModalVisible: false,
            isEditModalVisible: false,
            categoryIdToEdit: null,
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
            categories: 'category/getCategories'
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
            allCategories: 'category/getAllCategories'
        }),
        async onDelete(id) {
            try {
                await this.delete(id);
                await this.allCategories('En');
            } catch (e) {
                console.error(e);
            }
        },
        toggleAddModal() {
            this.isAddModalVisible = !this.isAddModalVisible;
        },
        toggleEditModal(id, code) {
            this.isEditModalVisible = !this.isEditModalVisible;
            this.categoryIdToEdit = id;
            this.languageCode = code;
        }

        // openEditModalWithTranslations(code) {
        //     this.editModal = true;
        // }
    }
};
</script>

<style scoped></style>
