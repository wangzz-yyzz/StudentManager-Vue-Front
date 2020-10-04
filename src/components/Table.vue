<template>
    <div>
        <el-table :data="list" style="width: 100%" ref="table" height="600"
                  @selection-change="handleSelectionChange" @row-click="sel" v-loading="loading">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="college" label="学院"></el-table-column>
            <el-table-column prop="major" label="专业"></el-table-column>
            <el-table-column prop="grade" label="年级"></el-table-column>
            <el-table-column label="操作">
                <i class="el-icon-edit" @click="edit"></i>
                <i class="el-icon-delete" @click="del"></i>
            </el-table-column>
        </el-table>

        <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="30%"
                id="dialog">
            <span class="el-dialog__body">学号<el-input v-model="current_sel.id" :disabled="if_edit" maxlength="11" show-word-limit></el-input></span>
            <br>
            <span class="el-dialog__body">姓名<el-input v-model="current_sel.name"></el-input></span>
            <br>
            <span class="el-dialog__body">性别<br>
                <el-select v-model="current_sel.sex" placeholder="请选择性别">
                    <el-option
                            v-for="item in sex"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <br>
            <span class="el-dialog__body">学院<el-input v-model="current_sel.college"></el-input></span>
            <br>
            <span class="el-dialog__body">专业<el-input v-model="current_sel.major"></el-input></span>
            <br>
            <span class="el-dialog__body">年级<el-input v-model="current_sel.grade"></el-input></span>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="删除信息"
                :visible.sync="dialogDel"
                width="30%">
            <span>确认删除相关学生信息？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogDel = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
        </el-dialog>

        <el-button @click="add" plain icon="el-icon-plus">新增</el-button>
        <el-button @click="delAll" plain icon="el-icon-plus">删除</el-button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Table",
        data(){
            return{
                list: null,
                // 当前选择的行
                current_sel: {
                    id: null,
                    name: null,
                    sex: null,
                    college: null,
                    major: null,
                    grade: null
                },
                def_current_sel: {
                    id: null,
                    name: null,
                    sex: null,
                    college: null,
                    major: null,
                    grade: null
                },
                dialogVisible: false,
                if_edit: true,
                // 状态 1为查看 2为修改 3为删除 4为新增
                status: 1,
                dialogDel: false,
                dialogTitle: "修改信息",
                sex:[{
                    value: "男",
                    label: "男"
                },
                {
                    value: "女",
                    label: "女"
                }],
                loading: true,
                all_sel: null
            }
        },
        methods:{
            getData:function () {
                axios.get("http://localhost:8080/student/selStudentAll").then((res) =>{
                    console.log(res.data)
                    this.list=res.data
                    this.loading=false
                })
            },
            handleSelectionChange:function (res) {
                this.all_sel = res
                console.log(res)
            },
            edit:function () {
                this.dialogVisible=true
                this.dialogTitle="修改信息"
                this.status=2
                this.if_edit=true
                console.log("edit"+this.current_sel.id)
            },
            sel:function (row) {
                this.current_sel=row
                // console.log(row)
            },
            del:function () {
                this.dialogDel=true
                this.status=3
                console.log("delete"+this.current_sel.id)
            },
            add:function () {
                this.dialogTitle="新增信息"
                this.dialogVisible=true
                this.current_sel=this.def_current_sel
                this.status=4
                this.if_edit=false
                console.log("edit"+this.current_sel.id)
            },
            // 提交
            submit: function () {
                if (this.status===2){
                    axios.get("http://localhost:8080/student/update"
                    ,{params:{"id":this.current_sel.id,
                                    "name":this.current_sel.name,
                                    "sex":this.current_sel.sex,
                                    "college":this.current_sel.college,
                                    "major":this.current_sel.major,
                                    "grade":this.current_sel.grade}}
                    ).then((res) =>{
                        console.log(res.data)
                        this.getData()
                        this.$message("成功更新数据")
                    })
                } else if (this.status===3){
                    axios.get("http://localhost:8080/student/delete",{params:{"id":this.current_sel.id}}).then(
                        (res) =>{
                            console.log(res.data)
                            this.getData()
                            this.$message("成功删除数据")
                        }
                    )
                } else if (this.status===4){
                    axios.get("http://localhost:8080/student/add"
                        ,{params:{"id":this.current_sel.id,
                                "name":this.current_sel.name,
                                "sex":this.current_sel.sex,
                                "college":this.current_sel.college,
                                "major":this.current_sel.major,
                                "grade":this.current_sel.grade}}
                    ).then((res) =>{
                        console.log(res.data)
                        this.getData()
                        this.$message("成功添加数据")
                    })
                }
                this.dialogDel=false
                this.dialogVisible=false
                this.status=1
            },
            delAll:function () {
                let len = this.all_sel.length
                function my_del(my_id) {
                    axios.get("http://localhost:8080/student/delete",{params:{"id":my_id}}).then(
                        (res) =>{
                            console.log(res.data)
                        }
                    )
                }
                for (let i = 0; i<len; i++){
                    my_del(this.all_sel[i].id)
                }
                this.getData()
                this.$message("成功删除数据")
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped>
    .el-icon-edit:hover{
        color: orangered;
    }

    .el-icon-delete:hover{
        color: orangered;
    }

</style>
