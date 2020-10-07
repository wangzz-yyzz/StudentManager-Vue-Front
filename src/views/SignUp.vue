<template>
    <div>
        <h1 style="margin-top: 100px">注册账号</h1>
        <h2>{{title[step]}}</h2>
        <div id="container">
            <el-input style="width: 50%;margin: 20px auto 0;" v-model="user_name" placeholder="请输入用户名" prefix-icon="el-icon-user" v-if="step===0"></el-input>
            <el-input style="width: 50%;margin: 20px auto 0;" v-model="password" show-password placeholder="请输入密码" prefix-icon="el-icon-coin" v-if="step===1"></el-input>
            <el-input style="width: 50%;margin: 20px auto 0;" v-model="password_confirm" show-password placeholder="请再次确认密码" prefix-icon="el-icon-coin" v-if="step===1"></el-input>

            <el-button style="width: 300px;margin: 0 auto" plain type="success" @click="next" icon="el-icon-position">{{button[step]}}</el-button>
        </div>
        <el-steps :active="step" finish-status="success" style="width: 50%;margin: 20px auto">
            <el-step title="输入用户名"></el-step>
            <el-step title="输入密码"></el-step>
            <el-step title="完成注册"></el-step>
        </el-steps>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "SignUp",
        data(){
            return{
                step: 0,
                title: [
                    "请输入您的用户名",
                    "请输入您的密码",
                    "您已完成注册"
                ],
                button: [
                  "下一步",
                  "立即注册",
                  "完成注册，去登录"
                ],
                user_name: null,
                password: null,
                password_confirm: null
            }
        },
        methods:{
            next:function () {
                if (this.step===0){
                    axios.get("http://localhost:8080/manager/check_if_has_same_name",{params:{"name":this.user_name}})
                    .then((res)=>{
                        console.log(res.data)
                        if (res.data === "ok"){
                            this.step++
                        } else {
                            this.$message("该用户名已存在！")
                        }
                    })
                }else if (this.step===1){
                    console.log(this.user_name)
                    console.log(this.password)
                    if (this.password===this.password_confirm){
                        axios.get("http://localhost:8080/manager/add"
                            ,{params:{"name":this.user_name,"password":this.password}}).then((res)=>{
                            console.log(res.data)
                            this.$message("成功注册！")
                        })
                        this.step++
                    } else {
                        this.$message("确认密码与密码不同，请检查并重新输入")
                    }

                }else if (this.step===2){
                    window.location.href="./sign_in"
                }
            }
        }
    }
</script>

<style scoped>
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
