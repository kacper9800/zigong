require('dotenv').config();

module.exports = {
    apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
    mediaBaseUrl: process.env.VUE_APP_MEDIA_BASE_URL,
    frontendUrl: process.env.VUE_APP_FRONTEND_URL,
    baseUrl: process.env.VUE_APP_MEDIA_BASE_URL,
    publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
    tinyApiKey: process.env.VUE_APP_TINYMCE || ''
};
