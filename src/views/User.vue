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
            <br>
            <div>
                密码：{{user.password}}
                <span><el-button @click="changePassword">修改密码</el-button></span>
            </div>
        </el-card>

        <el-dialog :title="changePasswordTitle"
                   :visible.sync="ifChangePassword"
                   width="30%">
            <div>
                <el-input v-model="newPassword" placeholder="新密码"></el-input>
                <br>
                <el-input v-model="newPasswordConfirm" placeholder="确认新密码" style="margin-top: 20px"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ifChangePassword = false">取 消</el-button>
                <el-button type="primary" @click="submitChangePassword">确 定</el-button>
            </span>
        </el-dialog>

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
                user: "",
                ifChangePassword: false,
                changePasswordTitle: "修改密码",
                newPassword: "",
                newPasswordConfirm: ""
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
            },
            changePassword:function () {
                this.ifChangePassword = true
                // this.$message("重新注册吧！不提供改密码功能！")
            },
            submitChangePassword:function () {
                if (this.newPassword === this.newPasswordConfirm){
                    // eslint-disable-next-line no-undef
                    axios.get("http://localhost:8080/manager/update",{params:{
                        "name":this.name,"password":this.newPassword
                        }}).then((res) => {
                            console.log(res.data)
                            this.ifChangePassword = false
                            this.$message("成功修改密码")
                            this.getDate()
                    })
                }else {
                    this.$message("两次输入的密码不同")
                }
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
