<template>
    <a-modal
        width="60%"
        title="Edit product section"
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
            <div v-if="modalCurrentStep === 0 && mounted">
                <file-picker
                    :quantity="2"
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
        },
        dataToEdit: {
            type: Object
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
            files: [],
            article: '',
            returnObject: true,
            mounted: false
        };
    },

    watch: {
        isVisible(e) {
            if (!e) {
                this.modalCurrentStep = 0;
                this.confirmLoading = false;
            }
        },

        dataToEdit(e) {
            this.files = e ? e.files : [];
            this.article = e ? e.article : '';
        }
    },

    mounted() {
        this.mounted = true;
    },

    methods: {
        hideModal() {
            this.$emit('toggleModal');
        },

        save() {
            this.confirmLoading = true;
            setTimeout(async () => {
                this.dataToEdit.files = this.files;
                this.dataToEdit.article = this.article;
                this.hideModal();
            }, 500);
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
