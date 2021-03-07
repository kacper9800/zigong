<template>
    <div>
        <h1 class="page-header" style="color: #9e9e9e">
            Products categories
        </h1>
        <br />
        <!-- @toto - pagination -->
        <a-table
            :columns="columns"
            :data-source="categories"
            rowKey="name"
            bordered
            @change="handleTableChange"
            :pagination="{
                defaultPageSize: 5,
                page: 1,
                showLessItems: false,
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
                    Add new</a-button
                >
            </template>
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="nameCustomTitle">Category name</span>
            <a slot="coverImage" slot-scope="text">{{ text }}</a>
            <span slot="homePageDescriptionCustomTitle"
                >Description at home page</span
            >
            <a slot="actions" slot-scope="text, record">
                <img
                    src="@assets/images/flags/en.png"
                    @click="toggleEditModal(record.categoryId, 'en')"
                />
                <img
                    src="@assets/images/flags/pl.png"
                    @click="toggleEditModal(record.categoryId, 'pl')"
                />
                <img
                    src="@assets/images/flags/ru.png"
                    @click="toggleEditModal(record.categoryId, 'ru')"
                />
                <a-popconfirm
                    v-if="categories.length"
                    title="Are you sure to delete this item?"
                    @confirm="onDelete(record.categoryId)"
                >
                    <a-button type="danger">Delete</a-button>
                </a-popconfirm>
            </a>
            <span slot="actionsCustomTitle">Actions</span>
        </a-table>
        <categories-add-modal
            :isVisible="isAddModalVisible"
            @toggleAddModal="toggleAddModal"
        />
        <categories-edit-modal
            :isVisible="isEditModalVisible"
            :lng="lng"
            :categoryId="categoryId"
            @toggleEditModal="toggleEditModal"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CategoriesAddModal from '@components/modals/categoriesAddModal';
import CategoriesEditModal from '@components/modals/categoriesEditModal';

export default {
    components: {
        CategoriesAddModal,
        CategoriesEditModal
    },

    data() {
        return {
            isAddModalVisible: false,
            isEditModalVisible: false,
            categoryId: null,
            lng: 'en',
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

    async mounted() {
        await this.getAllCategories({
            order: 'desc',
            perPage: 5,
            page: 1
        });
    },

    computed: {
        ...mapGetters({
            categories: 'category/getCategories',
            category: 'category/getCategory',
            pagination: 'category/getPagination'
        })
    },

    methods: {
        ...mapActions({
            delete: 'category/deleteOne',
            getAllCategories: 'category/getAllCategories',
            getOneById: 'category/getOneById'
        }),

        async handleTableChange(pagination) {
            const { page } = pagination;
            await this.getAllCategories({ page, perPage: 5, order: 'desc' });
        },

        async onDelete(id) {
            try {
                await this.delete(id);
                await this.getAllCategories({ perPage: 5, order: 'desc' });
            } catch (e) {
                console.error(e);
            }
        },

        async toggleAddModal() {
            this.isAddModalVisible = !this.isAddModalVisible;
        },

        toggleEditModal(categoryId, lng) {
            this.isEditModalVisible = !this.isEditModalVisible;
            this.lng = lng;
            this.categoryId = categoryId;
        }
    }
};
</script>

<style scoped></style>
