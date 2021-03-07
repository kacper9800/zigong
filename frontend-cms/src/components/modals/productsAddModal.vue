<template>
    <a-modal
        width="60%"
        title="Adding new category"
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
        <br />
        <div class="steps-content">
            <div v-if="modalCurrentStep === 0">
                <file-picker
                    :quantity="quantity"
                    :checkedItems="files"
                    :returnObject="returnObject"
                    @input="e => (files = e)"
                />
            </div>

            <div v-if="modalCurrentStep === 1">
                <text-editor v-model="article" />
            </div>
        </div>
        <div class="steps-action" style="margin: 20px">
            <a-button v-if="modalCurrentStep > 0" @click="prev">
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
        <template slot="footer">
            <a-button key="back" @click="hideModal">
                Cancel
            </a-button>
            <a-button
                key="submit"
                type="primary"
                :loading="confirmLoading"
                @click="save"
                :disabled="modalCurrentStep !== 1"
            >
                Save
            </a-button>
        </template>
    </a-modal>
</template>
<script>
import { mapActions } from 'vuex';
import TextEditor from '../elements/textEditor';
import FilePicker from '../elements/filePicker';

export default {
    components: {
        FilePicker,
        TextEditor
    },

    props: {
        isVisible: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            confirmLoading: false,
            modalCurrentStep: 0,
            steps: [
                {
                    title: 'Chose PDF'
                },
                {
                    title: 'Article'
                }
            ],
            returnObject: true,
            files: [],
            article: '',
            quantity: 2
        };
    },

    watch: {
        isVisible(e) {
            if (e) {
                this.quantity = 2;
                this.files = [];
                this.article = '';
                this.modalCurrentStep = 0;
                this.confirmLoading = false;
            }
        }
    },

    methods: {
        ...mapActions({}),

        hideModal() {
            this.$emit('toggleModal');
        },

        save() {
            this.confirmLoading = true;
            setTimeout(async () => {
                const data = {
                    article: this.article,
                    files: this.files
                };

                this.$emit('sectionData', data);

                this.hideModal();
            }, 1000);
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
