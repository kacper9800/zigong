<template>
    <a-modal
        :title="$t('products.modal.addNewHeader')"
        :visible="isVisible"
        :confirm-loading="confirmLoading"
        @ok="save"
        :ok-button-props="{
            props: { disabled: checkSaveButtonDisability() }
        }"
        @cancel="hideModal"
    >
        <br />

        <a-steps :current="modalCurrentStep">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>

        <div class="steps-content">
            <div v-if="modalCurrentStep === 0">
                <a-form id="categories-form" :form="formData">
                    <a-form-item :label="$t('categories.modal.name')">
                        <a-input
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
            </div>

            <div v-if="modalCurrentStep === 1">
                <file-picker
                    :quantity="1"
                    :checkedItems="homePageCoverImage"
                    @input="e => (homePageCoverImage = e)"
                />
            </div>

            <div v-if="modalCurrentStep === 2">
                <file-picker
                    :quantity="1"
                    :checkedItems="coverImage"
                    @input="e => (coverImage = e)"
                />
            </div>
        </div>
        <div class="steps-action" style="margin: 20px;">
            <a-button v-if="modalCurrentStep > 0" style="margin-left: 8px;" @click="prev">
                Previous
            </a-button>
            <a-button
                v-if="modalCurrentStep < steps.length - 1"
                type="primary"
                :disabled="this.$v.$invalid"
                @click="next"
            >
                Next
            </a-button>
        </div>
        <template slot="footer">
            <a-button key="back" @click="hideModal">
                {{ $t('global.buttons.cancel') }}
            </a-button>
            <a-button
                key="submit"
                type="primary"
                :loading="confirmLoading"
                @click="save"
                :disabled="modalCurrentStep !== 2"
            >
                {{ $t('global.buttons.save') }}
            </a-button>
        </template>
    </a-modal>
</template>

<script>
import { mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import FilePicker from '~/components/elements/filePicker';

export default {
    layout: 'admin',

    components: {
        FilePicker
    },

    props: {
        isVisible: {
            type: Boolean,
            default: true
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
      modalCurrentStep: 0,
      formData: {
        coverImageId: null,
        homePageCoverImageId: null
      },
      steps: [
        {
          title: 'Basic data'
        },
        {
          title: 'Home Page Cover Image'
        },
        {
          title: 'Cover Image'
        }
      ],
      confirmLoading: false
    };
  },

  computed: {},
    methods: {
        ...mapActions({
            createProduct: 'products/createOne',
        }),

        hideModal() {
            this.$emit('toggleAddModal');
        },

        save() {
            // this.confirmLoading = true;
            // setTimeout(() => {
            //     this.hideModal();
            //
            //     this.formData.coverImageId = this.coverImage.shift();
            //     this.formData.homePageCoverImageId = this.homePageCoverImage.shift();
            //     try {
            //         this.createCategory(this.formData);
            //     } catch (error) {
            //         console.erroe(error);
            //     }
            //     this.$emit('fetchData');
            //     this.confirmLoading = false;
            // }, 1000);
        },

        next() {
            this.modalCurrentStep++;
        },

        prev() {
            this.modalCurrentStep--;
        },

        checkSaveButtonDisability() {
            return this.modalCurrentStep !== this.steps.length - 1;
        }
    }
};
</script>
