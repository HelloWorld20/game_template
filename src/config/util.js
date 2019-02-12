import Vue from 'vue';

export const  isWeixinBrowser = () => /micromessenger/i.test(navigator.userAgent);

export const  bus = new Vue({
    data() {
        return{
            musicList: {}
        }
    }
});
