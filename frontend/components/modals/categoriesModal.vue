<template>
    <a-modal
        :title="$t('categories.modal.addNewHeader')"
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
            <a-step
                v-for="item in steps"
                :key="item.title"
                :title="item.title"
            />
        </a-steps>

        <div class="steps-content">
            <div v-if="modalCurrentStep === 0">
                <a-form id="categories-form" :form="form">
                    <a-form-item :label="$t('categories.modal.name')">
                        <a-input
                            type="text"
                            placeholder="Category name"
                            required
                        />
                    </a-form-item>
                    <a-form-item :label="$t('categories.modal.description')">
                        <a-input
                            type="text"
                            placeholder="Category description"
                            required
                        />
                    </a-form-item>
                    <a-form-item
                        :label="$t('categories.modal.homePageDescription')"
                    >
                        <!-- @todo change to tinymce -->
                        <a-input
                            type="text"
                            placeholder="Description at home page"
                            required
                        />
                    </a-form-item>
                </a-form>
            </div>

            <div v-if="modalCurrentStep === 1">
                <file-picker
                    :quantity="2"
                    :checkedItems="homePageCoverImage"
                    @input="e => (homePageCoverImage = e)"
                />
            </div>

            <div v-if="modalCurrentStep === 2">
                <file-picker
                    :quantity="1"
                    :checkedItems="coverImageId"
                    @input="e => (coverImageId = e)"
                />
            </div>
        </div>
        <div class="steps-action">
            <a-button
                v-if="modalCurrentStep > 0"
                style="margin-left: 8px"
                @click="prev"
            >
                Previous
            </a-button>
            <a-button
                v-if="modalCurrentStep < steps.length - 1"
                type="primary"
                @click="next"
            >
                Next
            </a-button>
        </div>
    </a-modal>
</template>

<script>
import { FilePicker } from '@/components/elements/filePicker';

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

    data() {
        return {
            modalCurrentStep: 0,
            selectedOption: null,
            form: this.$form.createForm(this, { name: 'coordinated' }),
            steps: [
                {
                    title: 'Basic data'
                },
                {
                    title: 'Photos'
                },
                {
                    title: 'Summary'
                }
            ],
            homePageCoverImage: [],
            coverImageId: [],
            confirmLoading: false
        };
    },

    computed: {},

    methods: {
        hideModal(e) {
            this.$emit('showOfHiddeModal');
        },

        save(e) {
            this.confirmLoading = true;
            setTimeout(() => {
                this.hideModal();
                this.confirmLoading = false;
            }, 2000);
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

<style scoped></style>
