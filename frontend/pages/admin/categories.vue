<template>
    <div class="page" style="max-height: 40vh !important">
        <h1 class="page-header" style="color: #9e9e9e">
            {{ $t('categories.header') }}
        </h1>
        <br />

        <div
            :style="{
                padding: '26px 16px 16px'
            }"
        >
            <a-button
                class="editable-add-btn ant-btn-primary"
                icon="plus"
                @click="showOfHiddeModal()"
            >
                {{ $t('global.buttons.addNew') }}
            </a-button>
        </div>

        <a-table
            :columns="columns"
            :data-source="categories"
            rowKey="name"
            bordered
        >
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="nameCustomTitle">{{ $t(`categories.name`) }}</span>
            <a slot="homePageDescription" slot-scope="text">{{ text }}</a>
            <span slot="homePageDescriptionCustomTitle">{{
                $t(`categories.modal.homePageDescription`)
            }}</span>
            <a slot="actions" slot-scope="">
                <img
                    :src="require('@/assets/images/flags/en.png')"
                    @click="openEditModalWithTranslations('en')"
                />
                <img
                    :src="require('@/assets/images/flags/ru.png')"
                    @click="openEditModalWithTranslations('ru')"
                />
                <img
                    :src="require('@/assets/images/flags/pl.png')"
                    @click="openEditModalWithTranslations('pl')"
                />
                <a-button type="danger">Delete</a-button>
            </a>
            <span slot="actionsCustomTitle">{{ $t(`global.actions`) }}</span>
        </a-table>

        <categories-modal
            :isVisible="isVisible"
            @showOfHiddeModal="showOfHiddeModal"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import config from '@/config';
import { CategoriesModal } from '../../components/modals/categoriesModal';

export default {
    layout: 'admin',

    components: {
        CategoriesModal
    },

    async asyncData({ app, store }) {
        const { code } = app.i18n.localeProperties;
        try {
            await store.dispatch('category/getAllCategories', {
                lng: code
            });
        } catch (error) {
            console.log(error);
        }
    },

    data() {
        return {
            isVisible: false,
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
        showOfHiddeModal() {
            this.isVisible = !this.isVisible;
        },

        openEditModalWithTranslations(code) {
            this.editModal = true;
        }
    }
};
</script>

<style scoped></style>
