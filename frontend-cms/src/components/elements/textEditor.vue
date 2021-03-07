<template>
    <div :class="{ 'error-border-containter': errorBorder }">
        <label v-if="label">{{ label }}</label>

        <editor
            v-if="isVisible"
            :api-key="apiKey"
            :init="initEditorSettings"
            :value="value"
            @input="$emit('input', $event)"
        />
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import config from '@config';

export default {
    components: {
        Editor
    },

    props: {
        value: {
            required: false,
            default: '',
            type: String
        },
        label: {
            required: false,
            default: '',
            type: String
        },
        errorBorder: {
            required: false,
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            apiKey: config.tinyApiKey,
            isVisible: false
        };
    },

    mounted() {
        this.isVisible = true;
    },

    computed: {
        initEditorSettings() {
            return {
                height: 400,
                menubar: 'table',
                relative_urls: false,
                remove_script_host: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'directionality textarea'
                ],
                toolbar: `
                    undo redo | formatselect | bold italic backcolor forecolor|
                    alignleft aligncenter alignright alignjustify |
                    bullist numlist outdent indent | removeformat |  charmap  code
                `,
                table_appearance_options: false
            };
        }
    },

    beforeDestroy: function() {
        this.isVisible = false;
    }
};
</script>
