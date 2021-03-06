<template>
    <div :class="{ 'error-border-containter': errorBorder }">
        <label v-if="label">{{ label }}</label>

        <!-- <editor
            :api-key="apiKey"
            :init="initEditorSettings"
            :value="value"
            @input="$emit('input', $event)"
        /> -->
    </div>
</template>

<script>
export default {
    components: {},

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
            apiKey: 'uoq4nhyq5wcnm46w7w3zwwg8th3ayc1suw6kztydz2ps1jej'
        };
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
                    bullist numlist outdent indent | removeformat | help image anchor | preview charmap autoresize
                `,
                table_appearance_options: false
            };
        }
    }
};
</script>
