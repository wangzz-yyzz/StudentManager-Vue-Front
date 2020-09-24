<template>
    <div id="container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect" background-color="#F2F6FC" text-color="#606266"
                 active-text-color="#303133" id="menu">
            <el-menu-item index="1" @click="goto(1)">主页</el-menu-item>
            <el-menu-item index="2" @click="goto(2)">管理者中心</el-menu-item>
            <el-menu-item index="3" @click="goto(3)">消息中心</el-menu-item>
            <el-menu-item index="4" @click="goto(4)">关于</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Title",
        props:["ActiveIndex"],
        data(){
            return{
                activeIndex: "1",
                handleSelect: "1"
            }
        },
        methods:{
            goto:function (index) {
                if (index===1){
                    window.location.href="./"
                } else if (index===4){
                    this.handleSelect="4"
                    window.location.href="./about"
                } else if (index===2){
                    window.location.href="./user"
                }
            }
        },
        created() {
            this.activeIndex=this.ActiveIndex
        }
    }
</script>

<style scoped lang="scss">
    
</style>