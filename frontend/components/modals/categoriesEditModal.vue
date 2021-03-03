<template>
    <a-modal
        :title="$t(`categories.modal.editHeader-${lng}`)"
        :visible="isVisible"
        :confirm-loading="confirmLoading"
        @cancel="hideModal"
    >
        <a-form id="categories-form" :form="formData">
            <a-form-item :label="$t('categories.modal.name')">
                <a-input
                    value
                    type="text"
                    placeholder="Category name"
                    v-model="formData.name"
                    :class="{
                        'is-invalid': $v.formData.name.$error
                    }"
                    @blur="$v.formData.name.$touch()"
                />
            </a-form-item>
            <a-form-item :label="$t('categories.modal.homePageDescription')">
                <a-input
                    type="text"
                    placeholder="Description at home page"
                    v-model="formData.homePageDescription"
                    :class="{
                        'is-invalid': $v.formData.homePageDescription.$error
                    }"
                    @blur="$v.formData.homePageDescription.$touch()"
                />
            </a-form-item>
            <a-form-item :label="$t('categories.modal.description')">
                <!-- @todo change to tinymce -->
                <a-input
                    type="text"
                    placeholder="Article about sth"
                    v-model="formData.description"
                    :class="{
                        'is-invalid': $v.formData.description.$error
                    }"
                    @blur="$v.formData.description.$touch()"
                />
            </a-form-item>
        </a-form>
        <template slot="footer">
            <a-button key="back" @click="hideModal"> Return </a-button>
            <a-button
                key="submit"
                type="primary"
                :disabled="$v.$invalid"
                :loading="confirmLoading"
                @click="save"
            >
                Submit
            </a-button>
        </template>
    </a-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { minLength, required } from 'vuelidate/lib/validators';

export default {
    layout: 'admin',

    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        lng: {
            type: String,
            default: 'en'
        },
        categoryId: {
            type: Number,
            default: null
        }
    },

    validations: {
        formData: {
            name: { required, minLength: minLength(4) },
            homePageDescription: { required, minLength: minLength(4) },
            description: { required, minLength: minLength(4) }
        }
    },

    data() {
        return {
            confirmLoading: false,
            formData: {},
            categoryExist: false
        };
    },

    watch: {
        isVisible(e) {
            if (e) {
                this.checkIfCategoryExist();
            }
        }
    },

    computed: {
        ...mapGetters({
            category: 'category/getCategory'
        })
    },

    methods: {
        ...mapActions({
            getCategoryById: 'category/getOneById',
            createCategory: 'category/createOne',
            updateCategory: 'category/updateOne',
            getAllCategories: 'category/getAllCategories'
        }),

        async checkIfCategoryExist() {
            try {
                const data = await this.getCategoryById({
                    params: { lng: this.lng, id: this.categoryId }
                });

                this.formData = { ...data };
                this.formData.lng = this.formData.languageId;
                this.categoryExist = true;
            } catch (error) {
                this.formData = {
                    lng: this.lng,
                    categoryId: this.categoryId
                };
            }
        },

        hideModal() {
            this.$emit('toggleEditModal');
        },

        async save() {
            if (this.$v.$invalid) {
                this.hideModal();
                return 0;
            }

            this.confirmLoading = true;
            setTimeout(async () => {
                try {
                    if (this.categoryExist) {
                        await this.updateCategory(this.formData);
                    } else {
                        await this.createCategory(this.formData);
                    }
                } catch (error) {
                    console.error(error);
                }

                this.formData = {};
                this.categoryExist = false;
                this.confirmLoading = false;
            }, 1000);

            this.hideModal();
        }
    }
};
</script>
