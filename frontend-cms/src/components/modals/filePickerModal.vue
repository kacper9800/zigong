<template>
    <a-modal
        width="60%"
        :visible="isVisible"
        title="File Picker"
        @cancel="hideModal"
        @ok="handleOk"
    >
        <div class="clearfix">
            <br />
            <div class="box-efect">
                <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :multiple="true"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                    <div>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <li v-for="item in files" :key="item.id">
                    <input
                        type="checkbox"
                        :id="`filePicker-${item.id}`"
                        :value="returnObject ? item : item.id"
                        v-model="checkedItems"
                        :disabled="
                            returnObject
                                ? checkbox(item.id)
                                : disabledCheckbox(item.id)
                        "
                    />
                    <label :for="`filePicker-${item.id}`"
                        ><img
                            loading="lazy"
                            :src="baseUrl + '/thumbnails/' + item.thumbnail"
                    /></label>
                </li>

                <infinite-loading
                    v-if="isVisible"
                    class="spiner"
                    pinner="spiral"
                    @infinite="infiniteScroll"
                >
                    <span slot="no-more"></span>
                    <span slot="no-results"></span>
                </infinite-loading>
            </div></div
    ></a-modal>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import config from '../../config';

export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },

        dataToEdit: {
            type: Object
        },

        pdfOnly: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            checkedItems: [],
            quantity: 1,
            returnObject: true,
            loading: false,
            params: {
                page: 1
            }
        };
    },

    watch: {
        isVisible(e) {
            if (e) {
                this.checkedItems = [];
                this.params = {};
                this.params.page = 1;
                this.loading = false;
                this.clear();
                this.fetchData();
            }
        }
    },

    computed: {
        ...mapGetters({
            files: 'file/getFiles',
            totalPages: 'file/getTotalPages'
        }),

        baseUrl() {
            return config.mediaBaseUrl;
        }
    },

    methods: {
        ...mapActions({
            getFiles: 'file/getFiles',
            uploadFiles: 'file/uploadFiles'
        }),

        ...mapMutations({
            clear: 'file/CLEAR'
        }),

        async fetchData() {
            const params = this.params;

            if (this.pdfOnly) {
                params.mimetype = 'pdf';
            }

            await this.getFiles({ params });
        },

        disabledCheckbox(id) {
            if (this.checkedItems.includes(id)) {
                return false;
            } else if (this.checkedItems.length >= this.quantity) {
                return true;
            }
        },

        checkbox(id) {
            const found = this.checkedItems.find(element => element.id == id);

            if (!!found) {
                return false;
            } else if (this.checkedItems.length >= this.quantity) {
                return true;
            }
        },

        infiniteScroll($state) {
            setTimeout(() => {
                $state.loaded();

                if (this.totalPages > this.params.page) {
                    this.params.page += 1;
                    const params = this.params;
                    this.getFiles({ params });
                } else {
                    $state.complete();
                }
            }, 100);
        },

        async handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }

            const data = new FormData();
            data.append('filesInput', info.file.originFileObj);

            try {
                await this.uploadFiles(data);
            } catch (e) {
                console.error(e);
            }

            this.loading = false;
        },

        beforeUpload(file) {
            const acceptedFile =
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'application/pdf';

            const onlyPDF = file.type === 'application/pdf';

            const isAcceptedFile = this.pdfOnly ? onlyPDF : acceptedFile;

            if (!isAcceptedFile) {
                this.$message.error('You can only upload JPG file!');
            }
            let isToBig = file.size / 1024 / 1024 < 4;

            if (file.type === 'application/pdf') {
                isToBig = file.size / 1024 / 1024 < 10;
            }

            if (!isToBig) {
                this.$message.error('Image must smaller than 4MB!');
            }

            return isAcceptedFile && isToBig;
        },

        handleOk() {
            const file = this.checkedItems.shift();

            if (file) {
                this.dataToEdit.id = file.id;
                this.dataToEdit.thumbnail = file.thumbnail;
            }

            this.$emit('toggleModal');
        },

        hideModal() {
            this.$emit('toggleModal');
        }
    }
};
</script>
