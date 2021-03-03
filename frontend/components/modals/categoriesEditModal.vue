<template>
    <a-modal
        :title="$t(`categories.modal.editHeader-${lng}`)"
        :visible="isVisible"
        :confirm-loading="confirmLoading"
        @ok="save"
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
            updateCategory: 'category/updateOne'
        }),

        async checkIfCategoryExist() {
            try {
                this.formData = await this.getCategoryById({
                    params: { lng: this.lng, id: this.categoryId }
                });

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

        save() {
            if (this.$v.$invalid) {
                this.hideModal();
                return 0;
            }

            this.confirmLoading = true;
            setTimeout(() => {
                this.hideModal();
                console.log(this.formData);
                try {
                    if (this.categoryExist) {
                        this.updateCategory(this.formData);
                    } else {
                        this.createCategory(this.formData);
                    }
                } catch (error) {
                    console.error(error);
                }
                this.confirmLoading = false;
            }, 1000);
        }
    }
};
</script>
