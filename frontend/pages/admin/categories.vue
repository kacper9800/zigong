<template>
    <div class="page" style="max-height: 40vh !important">
        <h1 class="page-header" style="color: #9e9e9e">
            {{ $t('categories.header') }}
        </h1>
        <br />
        <a-button
            class="editable-add-btn ant-btn-primary"
            icon="plus"
            @click="showModal()"
        >
            {{ $t('global.buttons.addNew') }}
        </a-button>
        <a-table :columns="columns" :data-source="categories" bordered>
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="nameCustomTitle">{{ $t(`categories.name`) }}</span>
            <a slot="homePageDescription" slot-scope="text">{{ text }}</a>
            <span slot="homePageDescriptionCustomTitle">{{
                $t(`categories.modal.homePageDescription`)
            }}</span>
            <a slot="actions" slot-scope="text">
                <img
                    :src="require('@/assets/images/flags/en.png')"
                    @click="openEditModalWithTranslations('en')"
                />
                <img
                    :src="require('@/assets/images/flags/ru.png')"
                    @click="openEditModalWithTranslations('ru')"
                />
                <img
                    :src="require('@/assets/images/flags/pl.png')"
                    @click="openEditModalWithTranslations('pl')"
                />
                <a-button type="danger">Delete</a-button>
            </a>
            <span slot="actionsCustomTitle">{{ $t(`global.actions`) }}</span>
        </a-table>

        <!--    Add new category modal-->
        <a-modal
            :title="$t('categories.modal.addNewHeader')"
            :visible="addModalVisible"
            :confirm-loading="confirmLoading"
            @ok="saveCategory"
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
                                v-bind:placeholder="
                                    $t('categories.modal.namePlaceholder')
                                "
                                required
                            />
                        </a-form-item>
                        <a-form-item
                            :label="$t('categories.modal.description')"
                        >
                            <a-input
                                type="text"
                                :placeholder="
                                    $t(
                                        'categories.modal.descriptionPlaceholder'
                                    )
                                "
                                required
                            />
                        </a-form-item>
                        <a-form-item
                            :label="$t('categories.modal.homePageDescription')"
                        >
                            <a-input
                                type="text"
                                v-bind:placeholder="
                                    $t(
                                        'categories.modal.homePageDescriptionPlaceholder'
                                    )
                                "
                                required
                            />
                        </a-form-item>
                    </a-form>
                </div>

                <div v-if="modalCurrentStep === 1">
                    <a-form id="categories-form">
                        <!--          <a-form id="categories-form" :form="form">-->
                        <a-form-item
                            :label="
                                $t(
                                    'categories.modal.photosDropdown.chooseOption'
                                )
                            "
                            has-feedback
                            required
                        >
                            <a-select
                                style="width: 200px"
                                @change="onDropdownValueChange"
                            >
                                <a-select-option
                                    v-for="item in dropdownOptions"
                                    :value="item.value"
                                    :key="item.label"
                                >
                                    <a>{{
                                        $t(
                                            'categories.modal.photosDropdown.' +
                                                item.label
                                        )
                                    }}</a>
                                </a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item v-if="selectedOption === 0">
                            <div
                                style="background-color: #ececec; padding: 20px"
                            >
                                <a-row :gutter="16">
                                    <a-col :span="8">
                                        <a-card
                                            title="Card title"
                                            :bordered="false"
                                        >
                                            <img
                                                slot="cover"
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a-card>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-card
                                            title="Card title"
                                            :bordered="false"
                                        >
                                            <img
                                                slot="cover"
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a-card>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-card
                                            title="Card title"
                                            :bordered="false"
                                        >
                                            <img
                                                slot="cover"
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a-card>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-form-item>

                        <a-form-item
                            v-if="selectedOption === 1"
                            :label="
                                $t('categories.modal.photoUpload.choosePhoto')
                            "
                        >
                            <div class="clearfix">
                                <a-upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    @preview="handlePreview"
                                    @change="handleChange"
                                >
                                    <div v-if="fileList.length < 1">
                                        <a-icon type="plus" />
                                        <div class="ant-upload-text">
                                            Upload
                                        </div>
                                    </div>
                                </a-upload>
                                <a-modal
                                    :visible="previewVisible"
                                    :footer="null"
                                    @cancel="handleCancel"
                                >
                                    <img
                                        alt="example"
                                        style="width: 100%"
                                        :src="previewImage"
                                    />
                                </a-modal>
                            </div>
                        </a-form-item>
                    </a-form>
                </div>
                <div v-if="modalCurrentStep === 2"></div>
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
    </div>
</template>

<script>
import AFormItem from 'ant-design-vue/es/form/FormItem';
import { mapGetters } from 'vuex';
import config from '@/config';

export default {
    components: { AFormItem },
    layout: 'admin',
    name: 'categories',
    async asyncData({ app, store }) {
        const { code } = app.i18n.localeProperties;
        try {
            await store.dispatch('category/getAllCategories', {
                lng: code
            });
        } catch (error) {
            console.log(error);
        }
    },
    data() {
        return {
            modalCurrentStep: 0,
            show: false,
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
            // title: Vue.prototype.$nuxt.$options.i18n.t('global.firstName'),
            isSaveButtonDisabled: true,
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
            selectedOption: null,
            dropdownOptions: [
                {
                    label: 'existingPhoto',
                    value: 0
                },
                {
                    label: 'newPhoto',
                    value: 1
                }
            ],
            ModalText: 'Content of the modal',
            addModalVisible: false,
            editModalVisible: false,
            confirmLoading: false,
            columns: [
                {
                    dataIndex: 'name',
                    key: 'name',
                    width: '30%',
                    slots: { title: 'nameCustomTitle' },
                    scopedSlots: { customRender: 'name' }
                },
                {
                    key: 'homePageDescription',
                    dataIndex: 'homePageDescription',
                    width: '50%',
                    slots: { title: 'homePageDescriptionCustomTitle' },
                    scopedSlots: { customRender: 'name' }
                },
                {
                    key: 'actions',
                    // title: 'actions',
                    dataIndex: 'actions',
                    slots: { title: 'actionsCustomTitle' },
                    scopedSlots: { customRender: 'actions' }
                    // slots: { customRender: "actions", title: "actions" }
                }
            ]
        };
    },

    computed: {
        ...mapGetters({
            categories: 'category/getCategories'
        }),
        baseUrl() {
            return config.mediaBaseUrl;
        },

        availableLocales() {
            return this.$i18n.locale;
        }
    },

    mounted() {
        this.show = true;
    },
    // Upload
    previewVisible: false,
    previewImage: '',
    fileList: [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url:
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
    ],
    methods: {
        showModal() {
            console.log(this.categories);
            this.addModalVisible = true;
        },
        openEditModalWithTranslations(code) {
            this.editModal = true;
        },
        saveCategory(e) {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.addModalVisible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        hideModal(e) {
            console.log('Clicked cancel button');
            this.addModalVisible = false;
        },
        next() {
            this.modalCurrentStep++;
        },
        prev() {
            this.modalCurrentStep--;
        },
        checkSaveButtonDisability() {
            return this.modalCurrentStep !== this.steps.length - 1;
        },
        onDropdownValueChange(value) {
            this.selectedOption = value;
        },

        handleCancel() {
            this.previewVisible = false;
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
        }
    }
};
</script>

<style scoped></style>
