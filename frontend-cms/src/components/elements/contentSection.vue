<template>
    <div class="row">
        <div class="card col-md-9 ml-3">
            <div v-if="editMode">
                <a-input
                    v-model="data.title"
                    placeholder="Title"
                    allow-clear
                    class="mb-3"
                />

                <text-editor v-model="data.html" />
            </div>
            <div v-else>
                <h3>{{ data.title }}</h3>
                <div v-html="data.html" />
            </div>
        </div>
        <div class="col-md-2">
            <a-button type="primary" size="small" v-on:click="editTogle">
                {{ editMode ? 'Save' : 'Edit' }}
            </a-button>
        </div>
    </div>
</template>
<script>
import TextEditor from '../elements/textEditor';

export default {
    components: {
        TextEditor
    },

    props: {
        data: {
            type: Object
        }
    },

    data() {
        return {
            editMode: false
        };
    },

    methods: {
        editTogle() {
            this.editMode = !this.editMode;
        }
    }
};
</script>
