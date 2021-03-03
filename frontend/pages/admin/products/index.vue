<template>
    <div>
        <h1 class="page-header" style="color: #9e9e9e">
            {{ $t('products.header') }}
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
                    @click="toggleAddModal()"
                >
                    {{ $t('global.buttons.addNew') }}
                </a-button>
            </template>
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="nameCustomTitle">{{ $t(`products.name`) }}</span>
            <a slot="homePageDescription" slot-scope="text">{{ text }}</a>
            <span slot="homePageDescriptionCustomTitle">{{
                $t(`products.modal.homePageDescription`)
            }}</span>
            <a slot="actions" slot-scope="text, record">
                <img
                    :src="require('../../assets/images/flags/en.png')"
                    @click="toggleEditModal(record.productId, 'En')"
                />
                <img
                    :src="require('../../assets/images/flags/ru.png')"
                    @click="toggleEditModal(record.productId, 'Ru')"
                />
                <img
                    :src="require('../../assets/images/flags/pl.png')"
                    @click="toggleEditModal(record.productId, 'Pl')"
                />
                <a-popconfirm
                    v-if="prodcuts.length"
                    :title="$t('global.deleteActionQuestion')"
                    @confirm="() => onDelete(record.productId)"
                >
                    <a-button type="danger">Delete</a-button>
                </a-popconfirm>
            </a>
            <span slot="actionsCustomTitle">{{ $t(`global.actions`) }}</span>
        </a-table>
        <products-add-modal :isVisible="isAddModalVisible" @toggleAddModal="toggleAddModal" />
        <products-edit-modal
            :isVisible="isEditModalVisible"
            :languageCode="languageCode"
            :productId="productIdToEdit"
            @toggleEditModal="toggleEditModal"
        />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import config from '~/config';
import ProductsAddModal from '~/components/modals/productsAddModal';
import ProductsEditModal from '~/components/modals/productsEditModal';

export default {
    layout: 'admin',
    middleware: 'admin',

    components: {
        ProductsAddModal,
        ProductsEditModal
    },

    // async asyncData({ app, store }) {
    //     const { code } = app.i18n.localeProperties;
    //     console.log(code);
    //     try {
    //         await store.dispatch('products/getProducts', {
    //             lng: code
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },

    data() {
        return {
            isAddModalVisible: false,
            isEditModalVisible: false,
            isTranslationCreated: false,
            productIdToEdit: null,
            productToEdit: null,
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
            products: 'products/getProducts',
            product: 'products/getProduct'
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
            delete: 'products/deleteOne',
            getAllProducts: 'products/getAllProducts',
            getOneById: 'products/getOneById'
        }),
        async onDelete(id) {
            try {
                await this.delete(id);
                await this.getAllProducts('En');
            } catch (e) {
                console.error(e);
            }
        },
        async toggleAddModal() {
            this.isAddModalVisible = !this.isAddModalVisible;
            await this.getAllProducts('En');
        },
        toggleEditModal(id, code) {
            this.isEditModalVisible = !this.isEditModalVisible;
            this.languageCode = code;
            this.productIdToEdit = id;
            this.$emit('showModal');
        }
    }
};
</script>
