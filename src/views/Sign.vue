<template>
    <div>
        <h1 style="margin-top: 100px">学生管理系统</h1>
        <h2>登录</h2>
        <div id="container">
            <el-input style="width: 50%;margin: 20px auto 0;" v-model="name" placeholder="请输入账号"></el-input>
            <el-input style="width: 50%;margin: 20px auto 0;" v-model="password" show-password placeholder="请输入密码"></el-input>
            <el-button style="width: 300px;margin: 0 auto" plain type="success" @click="submit">登录</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Sign",
        data(){
            return{
                name: "",
                password: "",
                wrong:[
                    "密码错误",
                    "用户名错误"
                ]
            }
        },
        methods:{
            submit:function () {
                // eslint-disable-next-line no-undef
                axios.get("http://localhost:8080/manager/sign_in"
                ,{params:{"name":this.name,"password":this.password}}).then((res) =>{
                    console.log(res.data)
                    if (res.data==="ok"){
                        localStorage.setItem("user",this.name)
                        localStorage.setItem("status","ok")
                        window.location.href="./"
                    } else if (res.data==="wrong name"){
                        this.$message("用户名错误")
                    } else if (res.data==="wrong password"){
                        this.$message("密码错误")
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    #container{
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        width: 30%;
        height: 300px;

        margin: 0 auto 20px;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
</style>