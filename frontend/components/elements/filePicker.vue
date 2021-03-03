<template>
    <div class="clearfix">
        <br />

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

        <br />

        <div class="box-efect">
            <li v-for="item in files" :key="item.id">
                <input
                    type="checkbox"
                    :id="item.id"
                    :value="returnObject ? item : item.id"
                    v-model="checkedItemsCoppy"
                    :disabled="returnObject ? checkbox(item.id) : disabledCheckbox(item.id)"
                />
                <label :for="item.id"
                    ><img loading="lazy" :src="baseUrl + '/thumbnails/' + item.thumbnail"
                /></label>
            </li>

            <infinite-loading class="spiner" pinner="spiral" @infinite="infiniteScroll">
                <span slot="no-more"></span>
                <span slot="no-results"></span>
            </infinite-loading>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import FormData from 'form-data';
import config from '@/config';

export default {
    props: {
        quantity: {
            type: Number,
            default: 1
        },

        checkedItems: {
            type: Array,
            default: () => []
        },

        returnObject: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            limit: 2,
            loading: false,
            params: {
                page: 1
            },
            checkedItemsCoppy: []
        };
    },

    watch: {
        checkedItemsCoppy() {
            this.$emit('input', this.checkedItemsCoppy);
        },

        checkedItems(data) {
            this.checkedItemsCoppy = data;
        }
    },

    async fetch() {
        const params = this.params;

        await this.getFiles({ params });
    },

    computed: {
        ...mapGetters({
            files: 'file/getFiles',
            totalPages: 'file/getTotalPages'
        }),

        baseUrl() {
            return config.mediaBaseUrl;
        },

        updateCheckedItems(data) {
            this.checkedItemsCoppy = data;
        }
    },

    methods: {
        ...mapActions({
            getFiles: 'file/getFiles',
            uploadFiles: 'file/uploadFiles'
        }),

        disabledCheckbox(id) {
            if (this.checkedItemsCoppy.includes(id)) {
                return false;
            } else if (this.checkedItemsCoppy.length >= this.quantity) {
                return true;
            }
        },

        checkbox(id) {
            const found = this.checkedItemsCoppy.find(element => element.id == id);

            if (found) {
                return false;
            } else if (this.checkedItemsCoppy.length >= this.quantity) {
                return true;
            }
        },

        infiniteScroll($state) {
            setTimeout(() => {
                $state.loaded();
                if (this.params.page <= this.totalPages) {
                    this.params.page++;
                    const params = this.params;
                    this.getFiles({ params });
                }
                $state.complete();
            }, 100);
        },

        async handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;

                return;
            }
            if (info.file.status === 'done') {
                this.loading = false;

                const data = new FormData();
                data.append('filesInput', info.file.originFileObj);

                try {
                    await this.uploadFiles(data);
                } catch (e) {
                    console.error(e);
                }
            }
        },

        beforeUpload(file) {
            const isAcceptedFile =
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'application/pdf';
            if (!isAcceptedFile) {
                this.$message.error('You can only upload JPG file!');
            }
            const isToBig = file.size / 1024 / 1024 < 4;

            if (!isToBig) {
                this.$message.error('Image must smaller than 2MB!');
            }

            return isAcceptedFile && isToBig;
        }
    }
};
</script>
