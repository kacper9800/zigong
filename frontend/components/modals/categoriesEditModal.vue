<template>
    <a-modal
        :title="$t('categories.modal.editHeader' + languageCode)"
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
                    required
                />
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
import { mapActions, mapGetters } from 'vuex';
import { minLength, required } from 'vuelidate/lib/validators';

export default {
    layout: 'admin',

    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        isTranslationCreated: {
            type: Boolean,
            default: false
        },
        languageCode: {
            type: String,
            default: 'En'
        },
        categoryId: {
            type: Number
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
            formData: {
              categoryId: null,
              name: null,
              homePageDescription: null,
              description: null
            }
        };
    },
    watch: {
        isVisible() {
            this.$emit('input', this.isVisible);
        },

        async isVisible(data) {
            try {
                if (data && this.categoryId && this.languageCode) {
                    this.categoryToEdit = await this.getCategoryById({
                        params: { lng: this.languageCode, id: this.categoryId }
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
              this.formData = {
                categoryId: this.categoryToEdit ? this.categoryToEdit.categoryId : null,
                name: this.categoryToEdit ? this.categoryToEdit.name : null,
                homePageDescription: this.categoryToEdit ? this.categoryToEdit.homePageDescription : null,
                description: this.categoryToEdit ? this.categoryToEdit.description : null
              };
            }
        }
    },
    computed: {
        ...mapGetters({
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
            getCategoryById: 'category/getOneById',
            createCategory: 'category/createOne',
            updateCategory: 'category/updateOne'
        }),
        showModal() {
            console.log('showModal');
        },
        hideModal(e) {
            this.$emit('toggleEditModal');
        },
        save(e) {
            this.confirmLoading = true;
            setTimeout(() => {
                this.hideModal();
                try {
                    if(this.isTranslationCreated) {
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
