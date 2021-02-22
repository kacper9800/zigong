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
            <li v-for="item in data" :key="item.id">
                <input type="checkbox" :id="item.id" />
                <label :for="item.id"
                    ><img :src="baseUrl + '/thumbnails/' + item.thumbnail"
                /></label>
            </li>

            <infinite-loading
                class="spiner"
                pinner="spiral"
                @infinite="infiniteScroll"
            >
                <span slot="no-more"></span>
                <span slot="no-results"></span>
            </infinite-loading>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import config from '@/config';

export default {
    data() {
        return {
            limit: 2,
            loading: false,
            data: [
                {
                    id: 1,
                    thumbnail: 'G1ASjM2JelgQhfROKB6yJTkNj.png',
                    name: 'zigong-texas-1.png',
                    description: null,
                    file: 'seya9EDRNFuyrMfid1TQ7ZsuS.png',
                    mimetype: 'png'
                },
                {
                    id: 2,
                    thumbnail: '4tI5bBvirPi15hcRwKpoJfKF2.png',
                    name: 'SLIDE5.jpg',
                    description: null,
                    file: 'iZm3ChAxVq4dEH9HxEsOBYpHo.jpeg',
                    mimetype: 'jpeg'
                },
                {
                    id: 3,
                    thumbnail: 'M6DxaUDNZiAvcvepMIC6iSiw5.png',
                    name: 'Slider-wmo.jpg',
                    description: null,
                    file: 'spDudw8tKWKzapw9XUPPbEJaI.jpeg',
                    mimetype: 'jpeg'
                },
                {
                    id: 4,
                    thumbnail: 'zzXU0U8vaFNaWi2LALV0oGbHX.png',
                    name: 'SLIDE1.jpg',
                    description: null,
                    file: 'bj1o1314i7LPDJInsXxpfQ6Tj.jpeg',
                    mimetype: 'jpeg'
                },
                {
                    id: 5,
                    thumbnail: 'DS2BbhpV7CJrqeNz1DK25lQPq.png',
                    name: 'SLIDE2.jpg',
                    description: null,
                    file: '6u60MeTjB8Mf1XPGVahQrkEoS.jpeg',
                    mimetype: 'jpeg'
                }
            ]
        };
    },

    computed: {
        ...mapGetters({}),

        baseUrl() {
            return config.mediaBaseUrl;
        }
    },

    methods: {
        infiniteScroll($state) {
            // setTimeout(() => {
            //     if (this.next_page_url) {
            //         this.featchData();
            //         $state.loaded();
            //     }
            //     $state.complete();
            // }, 500);
        },

        // @toto - remove this method
        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                /[xy]/g,
                function (c) {
                    var r = (Math.random() * 16) | 0,
                        v = c == 'x' ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
        },

        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                console.log(info.file.originFileObj);
                this.loading = false;

                this.data.push({
                    id: this.uuidv4(),
                    thumbnail: 'DS2BbhpV7CJrqeNz1DK25lQPq.png',
                    name: 'SLIDE2.jpg',
                    description: null,
                    file: '6u60MeTjB8Mf1XPGVahQrkEoS.jpeg',
                    mimetype: 'jpeg'
                });
            }
        },

        beforeUpload(file) {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        }
    }
};
</script>

// @todo - move it to assets
<style scoped>
.box-efect {
    height: 300px;
    width: auto;
    overflow: auto;
}

ul {
    list-style-type: none;
}

li {
    display: inline-block;
}

input[type='checkbox'][id^='cb'] {
    display: none;
}

label {
    border: 1px solid #fff;
    padding: 3px;
    display: block;
    position: relative;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

label::before {
    background-color: white;
    color: white;
    content: ' ';
    display: block;
    border-radius: 50%;
    border: 1px solid grey;
    position: absolute;
    top: -5px;
    left: -5px;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 28px;
    transition-duration: 0.4s;
    transform: scale(0);
}

label img {
    object-fit: cover;
    height: 100px;
    width: 100px;
    transition-duration: 0.2s;
}

:checked + label {
    border-color: #ddd;
}

:checked + label::before {
    content: '✓';
    background-color: rgb(27, 113, 234);
    transform: scale(0.7);
    z-index: 99;
}

:checked + label img {
    transform: scale(0.9);
    box-shadow: 0 0 5px #333;
    z-index: -99;
}
</style>
