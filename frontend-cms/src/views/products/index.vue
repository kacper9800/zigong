<template>
    <div>
        <h1 class="page-header" style="color: #9e9e9e">
            Products
        </h1>
        <br />
        <a-table
            :columns="columns"
            :data-source="products"
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
                    @click="$router.push('/products/add')"
                >
                    Add new
                </a-button>
            </template>
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="nameCustomTitle">Product name</span>
            <a slot="homePageDescription" slot-scope="text">{{ text }}</a>
            <span slot="homePageDescriptionCustomTitle"
                >Description at home page</span
            >
            <a slot="actions" slot-scope="text, record">
                <img
                    src="@assets/images/flags/en.png"
                    @click="
                        $router.push(`/products/${record.productId}/en/edit`)
                    "
                    class="px-2"
                />
                <img
                    src="@assets/images/flags/pl.png"
                    @click="
                        $router.push(`/products/${record.productId}/pl/edit`)
                    "
                />
                <img
                    src="@assets/images/flags/ru.png"
                    @click="
                        $router.push(`/products/${record.productId}/ru/edit`)
                    "
                    class="px-2"
                />
                <a-popconfirm
                    v-if="products.length"
                    title="Are you sure to delete this item?"
                    @confirm="onDelete(record.productId)"
                >
                    <a-button type="danger">Delete</a-button>
                </a-popconfirm>
            </a>
            <span slot="actionsCustomTitle">Actions</span>
        </a-table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            columns: [
                {
                    dataIndex: 'name',
                    key: 'name',
                    width: '30%',
                    slots: { title: 'nameCustomTitle' },
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
        await this.getAllProducts({
            order: 'desc',
            perPage: 5,
            page: 1
        });
    },

    computed: {
        ...mapGetters({
            products: 'products/getProducts',
            product: 'products/getProduct'
        })
    },

    methods: {
        ...mapActions({
            delete: 'products/delete',
            getAllProducts: 'products/getProducts',
            getOneById: 'products/getOneById'
        }),

        async onDelete(id) {
            try {
                this.delete(id);
                await this.getAllProducts({
                    order: 'desc',
                    perPage: 5,
                    page: 1
                });
                this.$toast.success('Deleted');
            } catch (error) {
                this.$toast.error(error);
            }
        }
    }
};
</script>
