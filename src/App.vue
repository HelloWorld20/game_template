<template>
    <div id="app">
        <router-view></router-view>
        <div id="_storage"></div>
    </div>
</template>

<script>
    import './config/rem';

    export default {

    };

</script>

<style lang="scss">
@import './assets/scss/extend.scss';
* {
    padding: 0;
    margin:0;
}

html, body, #app{
    width: 100%;
    height: 100%;
}
#_storage{
    position: absolute;
    left: -1000000px;top: -1000000px;
    font-size: tw(100);
}
#app{
    overflow: hidden;
}

</style>
