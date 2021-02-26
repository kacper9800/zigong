<template>
    <!-- @todo - fix this modal (now it doesnt work as expected) -->
    <a-modal
        :title="$t('categories.modal.editHeader' + languageCode)"
        :visible="isVisible"
        :confirm-loading="confirmLoading"
        @ok="save"
        @cancel="hideModal"
    >
        <a-form id="categories-form" :form="formData">
            <a-form-item :label="$t('categories.modal.name')">
                <a-input type="text" placeholder="Category name" v-model="formData.name" required />
            </a-form-item>
            <a-form-item :label="$t('categories.modal.homePageDescription')">
                <a-input
                    type="text"
                    placeholder="Description at home page"
                    v-model="formData.homePageDescription"
                    required
                />
            </a-form-item>
            <a-form-item :label="$t('categories.modal.description')">
                <!-- @todo change to tinymce -->
                <a-input
                    type="text"
                    placeholder="Article about sth"
                    v-model="formData.description"
                    required
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    layout: 'admin',

    props: {
        isVisible: {
            type: Boolean,
            default: true
        },
        languageCode: {
            type: String,
            default: 'En'
        },
        categoryId: {
            type: Number
        }
    },

    data() {
        return {
            formData: {
                coverImageId: null,
                homePageCoverImageId: null
            },
            confirmLoading: false
        };
    },

    methods: {
        ...mapActions({
            updateCategory: 'category/createOne',
            getAllCategories: 'category/getAllCategories'
        }),

        hideModal() {
            this.$emit('toggleEditModal');
        },

        save() {
            this.confirmLoading = true;
            setTimeout(() => {
                this.hideModal();

                this.formData.coverImageId = this.coverImage.shift();
                this.formData.homePageCoverImageId = this.homePageCoverImage.shift();

                try {
                    this.createCategory(this.formData);
                } catch (error) {
                    console.log(error);
                }
                this.confirmLoading = false;
            }, 1000);
        }
    }
};
</script>
