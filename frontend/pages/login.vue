<template>
    <a-form-model ref="ruleForm" :model="formData" v-bind="layout">
        <a-form-model-item has-feedback label="Email" prop="email">
            <a-input v-model="formData.email" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Password" prop="pass">
            <a-input
                v-model="formData.password"
                type="password"
                autocomplete="off"
            />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submitForm('ruleForm')">
                Submit
            </a-button>
            <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
                Reset
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 }
            }
        };
    },
    methods: {
        async submitForm(formName) {
            try {
                const { data: user } = await this.$auth.loginWith('local', {
                    data: {
                        email: this.formData.email,
                        password: this.formData.password
                    }
                });
            } catch (e) {
                console.error(e);
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
