<template>
    <div>
        <h1 class="page-header" style="color: #9e9e9e">
            {{ $t('products.header') }}
        </h1>
        <br />

        <a-row type="flex">
            <div class="col-md-9" style="padding: 10px">
                <a-input placeholder="Product name" allow-clear />
                <br /><br />
                <text-editor v-model="form.article" label="Article" />
                <br />
                <h4 class="text-color">Sections</h4>

                <span v-for="(item, index) in form.sections" :key="`section-${index}`">
                    <div v-html="item.article" />
                </span>

                <a-button type="dashed" style="width: 100%" @click="toggleModal">
                    <a-icon type="plus" /> Add field
                </a-button>
            </div>

            <div class="col-md-3 align-self-start">
                <a-button type="primary" block> Publish </a-button><br /><br />
                <a-card title="Select cover image" hoverable>
                    <img slot="cover" alt="example" src="~/assets/images/default.png" />
                    <template slot="actions" class="ant-card-actions"> </template
                ></a-card>
                <br />

                <a-card title="Select resources PDF" hoverable>
                    <img slot="cover" alt="example" src="~/assets/images/default.png" />
                    <template slot="actions" class="ant-card-actions"> </template
                ></a-card>
            </div>
        </a-row>
        <products-add-modal
            :isVisible="modalIsVisible"
            @toggleModal="toggleModal"
            @sectionData="e => add(e)"
        />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import TextEditor from '~/components/elements/textEditor';
import ProductsAddModal from '../../../components/modals/productsAddModal';

export default {
    layout: 'admin',
    middleware: 'admin',

    components: {
        TextEditor,
        ProductsAddModal
    },

    data() {
        return {
            modalIsVisible: false,
            text: '',
            form: {
                name: '',
                article: '',
                sections: []
            },
            modalData: {},
            key: 1
        };
    },

    computed: {
        ...mapGetters({})
    },

    methods: {
        ...mapActions({}),

        add(data) {
            data.key = this.key;

            this.form.sections.push(data);

            this.key++;
        },

        remove(k) {},

        toggleModal() {
            this.modalIsVisible = !this.modalIsVisible;
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
