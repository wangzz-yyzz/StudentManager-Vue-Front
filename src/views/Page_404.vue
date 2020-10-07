<template>
    <div>
        <h1 style="margin: 300px auto 20px;">404 not found</h1>
        <i class="el-icon-loading" style="margin-top: 0"></i>
        <el-button @click="back" style="margin-top: 0">点击返回主页</el-button>
    </div>
</template>

<script>
    export default {
        name: "404",

        methods:{
            back:function () {
                window.location.href="./"
            }
        }
    }
</script>

<style scoped>

</style>
