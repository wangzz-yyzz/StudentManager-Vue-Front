<template>
    <div id="container">
        <Title active-index="2"></Title>
        <el-card style="width: 300px;margin: 100px auto">
            <div slot="header">
                <span>用户信息</span>
                <el-button style="float: right;padding: 3px 0;margin: auto" type="text" @click="sign_out">退出登录</el-button>
            </div>
            <div>
                用户名：{{user.name}}
            </div>
            <div>
                密码：{{user.password}}
            </div>
        </el-card>
    </div>
</template>

<script>
    import Title from "../components/Title";
    export default {
        name: "User",
        components: {Title},
        data(){
            return{
                name: "",
                user: ""
            }
        },
        methods:{
            getDate:function () {
                // eslint-disable-next-line no-undef
                axios.get("http://localhost:8080/manager/get_all",{params:{"name":this.name}}).then((res)=>{
                    console.log(res.data)
                    this.user=res.data
                })
            },
            sign_out:function () {
                localStorage.setItem("status","not_ok")
                this.$message("成功退出登录")
                window.location.href="./sign_in"
            }
        },
        created() {
            this.name=localStorage.getItem("user")
            if (localStorage.getItem("status")==="ok"){
                this.getDate()
            }
        }
    }
</script>

<style scoped>

</style>