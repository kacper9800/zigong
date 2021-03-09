<template>
    <div>
        <h1 class="page-header" style="color: #9e9e9e">
            {{ editMode ? 'Edit product - ' : 'Create product' }} {{ lng }}
        </h1>
        <div v-if="id && lng">
            <img
                src="@assets/images/flags/en.png"
                @click="$router.push(`/products/${id}/en/edit`)"
                class="px-2"
            />
            <img
                src="@assets/images/flags/pl.png"
                @click="$router.push(`/products/${id}/pl/edit`)"
            />
            <img
                src="@assets/images/flags/ru.png"
                @click="$router.push(`/products/${id}/ru/edit`)"
                class="px-2"
            />
        </div>
        <br />

        <a-row type="flex">
            <div class="col-md-9" style="padding: 10px">
                <a-input
                    v-model="formData.name"
                    placeholder="Product name"
                    allow-clear
                    :class="{
                        'is-invalid': $v.formData.name.$error
                    }"
                    @blur="$v.formData.name.$touch()"
                />
                <br /><br />
                <text-editor v-model="formData.value.article" label="Article" />
                <br />
                <h4 class="text-color">Sections</h4>

                <span
                    v-for="(item, index) in formData.value.sections"
                    :key="`section-${index}`"
                >
                    <div class="row">
                        <div class="card col-md-10">
                            <div v-html="item.article" />
                            <div class="row">
                                <div
                                    v-for="image in item.files"
                                    :key="image.id"
                                >
                                    <img
                                        loading="lazy"
                                        class="coverImage"
                                        :src="
                                            baseUrl +
                                                '/thumbnails/' +
                                                image.thumbnail
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <a-button
                                v-on:click="toggleEditModal(item)"
                                type="primary"
                                size="small"
                            >
                                Edit
                            </a-button>
                            <a-button
                                v-on:click="deleteSection(item)"
                                type="danger"
                                size="small"
                                style="margin-left:5px"
                            >
                                Delete
                            </a-button>
                        </div>
                    </div>
                    <br />
                </span>
                <br />

                <a-button
                    type="dashed"
                    style="width: 100%"
                    @click="toggleAddModal"
                >
                    <a-icon type="plus" /> Add section
                </a-button>
            </div>

            <div class="col-md-3 align-self-start">
                <a-button
                    type="primary"
                    v-on:click="editMode ? save() : create()"
                    style="width:100%; margin-bottom:8px"
                >
                    {{ editMode ? 'Save' : 'Publish' }}
                </a-button>
                <select
                    v-if="!editMode"
                    class="custom-select"
                    v-model="formData.categoryId"
                    value=""
                    selected="selected"
                    style="margin-top:8px; margin-bottom:15px"
                >
                    <option value="">Select category</option>
                    <option
                        v-for="category in categories"
                        :key="category.categoryId"
                        :value="category.categoryId"
                        >{{ category.name }}</option
                    >
                </select>

                <a-card
                    v-on:click="openFilePickerModal(false)"
                    title="Select cover image"
                    hoverable
                    :class="{
                        'bg-warning': $v.formData.coverImage.$invalid
                    }"
                >
                    <img
                        slot="cover"
                        alt="example"
                        :src="
                            formData.coverImage.thumbnail
                                ? baseUrl +
                                  '/thumbnails/' +
                                  formData.coverImage.thumbnail
                                : defaultImage
                        "/>
                    <template slot="actions" class="ant-card-actions">
                    </template
                ></a-card>
                <br />

                <a-card
                    v-on:click="openFilePickerModal(true)"
                    title="Select resources PDF"
                    hoverable
                    :class="{
                        'bg-warning': $v.formData.PDFfile.$invalid
                    }"
                >
                    <img
                        slot="cover"
                        alt="example"
                        :src="
                            formData.PDFfile.thumbnail
                                ? baseUrl +
                                  '/thumbnails/' +
                                  formData.PDFfile.thumbnail
                                : defaultImage
                        "/>
                    <template slot="actions" class="ant-card-actions">
                    </template
                ></a-card>
            </div>
        </a-row>
        <products-add-modal
            :isVisible="addModalIsVisible"
            @toggleModal="toggleAddModal"
            @sectionData="e => add(e)"
        />

        <products-edit-modal
            :isVisible="editModalIsVisible"
            :dataToEdit="formData.value.sections[indexOfEditedSection]"
            @toggleModal="toggleEditModal"
        />

        <file-picker-modal
            :isVisible="filePickerIsVisible"
            :dataToEdit="pdf ? formData.PDFfile : formData.coverImage"
            :pdfOnly="pdf"
            @toggleModal="toggleFilePickerModal"
        />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import TextEditor from '@components/elements/textEditor';
import ProductsAddModal from '@components/modals/productsAddModal';
import ProductsEditModal from '@components/modals/productsEditModal';
import FilePickerModal from '@components/modals/filePickerModal';
import config from '@config';

export default {
    components: {
        TextEditor,
        ProductsAddModal,
        ProductsEditModal,
        FilePickerModal
    },

    validations: {
        formData: {
            name: { required, minLength: minLength(4) },
            PDFfile: { id: { required } },
            coverImage: { id: { required } }
        }
    },

    data() {
        return {
            defaultImage: require('@assets/images/default.png'),
            formData: {
                name: '',
                PDFfile: { id: null, thumbnail: null },
                coverImage: { id: null, thumbnail: null },
                value: { article: '', sections: [] },
                categoryId: ''
            },
            addModalIsVisible: false,
            editModalIsVisible: false,
            filePickerIsVisible: false,
            indexOfEditedSection: null,
            pdf: false,
            key: 1,
            editMode: false,
            lng: '',
            id: null
        };
    },

    async created() {
        await this.getAllCategories({
            order: 'desc',
            perPage: 10
        });

        const { id, lng } = this.$route.params;

        if (id && lng) {
            const data = await this.getProductById({
                params: { lng, id }
            });
            const product = JSON.parse(JSON.stringify(data));

            this.formData = {
                name: product.name,
                PDFfile: product.file,
                coverImage: product.coverImage,
                value: {
                    article: product.article,
                    sections: product.sections
                },
                lng,
                id
            };

            this.id = id;
            this.lng = lng;
            this.editMode = true;
        }
    },

    computed: {
        ...mapGetters({
            categories: 'category/getCategories'
        }),

        baseUrl() {
            return config.mediaBaseUrl;
        }
    },

    methods: {
        ...mapActions({
            getAllCategories: 'category/getAllCategories',
            createProduct: 'products/createOne',
            getProductById: 'products/getOneById',
            updateProduct: 'products/update'
        }),

        add(data) {
            const { value } = this.formData;

            data.key = this.key;
            value.sections.push(data);

            this.key++;
        },

        toggleAddModal() {
            this.addModalIsVisible = !this.addModalIsVisible;
        },

        toggleEditModal(item) {
            const { value } = this.formData;
            this.editModalIsVisible = !this.editModalIsVisible;

            if (item) {
                this.indexOfEditedSection = value.sections.indexOf(item);
            }
        },

        deleteSection(item) {
            const { value } = this.formData;
            const indexOdSection = value.sections.indexOf(item);
            value.sections.splice(indexOdSection, 1);
        },

        toggleFilePickerModal(e) {
            this.filePickerIsVisible = !this.filePickerIsVisible;
        },

        openFilePickerModal(pdf) {
            this.pdf = pdf;
            this.toggleFilePickerModal();
        },

        handleProvinceChange(value) {
            const index = this.categories.indexOf(value);
            this.formData.categoryId = this.categories[index];
        },

        async create() {
            const formData = Object.assign({}, this.formData);
            const { value } = formData;
            formData.file = this.formData.PDFfile.id;
            formData.coverImageId = this.formData.coverImage.id;
            formData.value = JSON.stringify(value);

            try {
                const data = await this.createProduct(formData);
                this.$toast.success('Product Created');
                this.$router.push(`/products/${data.productId}/en/edit`);
            } catch (error) {
                this.$toast.error(error);
            }
        },

        async save() {
            const formData = Object.assign({}, this.formData);
            const { value } = formData;
            formData.file = this.formData.PDFfile.id;
            formData.coverImageId = this.formData.coverImage.id;
            formData.value = JSON.stringify(value);

            try {
                await this.updateProduct(formData);
                this.$toast.success('Product successful updated');
            } catch (error) {
                this.$toast.error(error);
            }
        }
    }
};
</script>

<style>
.dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
}
.dynamic-delete-button:hover {
    color: #777;
}
.dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
