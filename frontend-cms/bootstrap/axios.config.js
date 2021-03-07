import axios from 'axios';
import config from '../src/config';

axios.defaults.baseURL = config.apiBaseUrl;

if (localStorage.token) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + JSON.parse(localStorage.token);
}

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const err = error.response.request.responseURL;
        console.log(err);
        const fromUrl = err.split('/').pop();
        const nonRedirectUrls = ['login', 'forgot-password', 'reset-password'];

        if (
            error.response.status === 401 &&
            !nonRedirectUrls.includes(fromUrl)
        ) {
            location.href = config.publicPath + 'login';
            localStorage.clear();
        }

        throw error;
    }
);

export default axios;
