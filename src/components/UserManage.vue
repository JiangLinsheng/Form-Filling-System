<template>
  <div>
    <el-row type="flex" align="middle" class="row-1">
      <el-col>
        <label class="label-1">用户管理</label>
      </el-col>
    </el-row>
    <div class="div-1">
      <el-row>
        <el-col :span="2">
          <el-button class="button-1" type="primary" @click="handleAdd">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row class="row-2">
        <el-col>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            class="table-1"
            :header-cell-style="headerCellStyle">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="password"
              label="密码">
            </el-table-column>
            <el-table-column
              prop="identity"
              label="身份">
            </el-table-column>
            <el-table-column
              prop="employeeId"
              label="员工编号">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="div-2">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button type="primary" @click="sendForm()">发送表单</el-button>
      </div>
    </div>
    <el-dialog :title="dialogTitle" width="30%" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-divider></el-divider>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="identity">
          <el-select v-model="form.identity" placeholder="请选择">
            <el-option label="普通用户" value="user"></el-option>
            <el-option label='管理员' value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工编号" :label-width="formLabelWidth" prop="employeeId">
          <el-input v-model="form.employeeId" disabled="true" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FormManage',
  data () {
    return {
      tableData: [{
        userName: '示例',
        password: '示例',
        identity: 'admin',
        employeeId: '示例'
      }],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      headerCellStyle: {background: '#eef1f6', color: '#606266'},
      dialogTitle: '',
      multipleSelection: [],
      form: {
        userName: '',
        password: '',
        identity: '',
        employeeId: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ],
        identity: [
          {required: true, message: '请选择角色', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    handleAdd () {
      this.dialogFormVisible = true
      this.dialogTitle = '添加用户'
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.dialogTitle = '修改用户'
      this.form.userName = row.userName
      this.form.password = row.password
      this.form.identity = row.identity
      this.form.employeeId = row.employeeId
    },
    handleDelete (index, row) {
      // apiurl为接口地址
      this.$axios.post('apiurl', {employeeId: row.employeeId}).then(res => {
        console.log(res.data)
        if (res.data.data.success === true) {
          this.getUserInfo()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    onSubmit (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          if (this.dialogTitle === '添加用户') {
            // apiurl为接口地址
            this.$axios.post('apiurl', {
              userName: this.form.userName,
              password: this.form.password,
              identity: this.form.identity
            }).then(res => {
              console.log(res.data)
              if (res.data.data.success === true) {
                this.getUserInfo()
                this.$message({
                  message: '添加用户成功',
                  type: 'success'
                })
              } else {
                this.$message.error('添加用户失败')
              }
            })
          } else if (this.dialogTitle === '修改用户') {
            // apiurl为接口地址
            this.$axios.put('apiurl', this.form
            ).then(res => {
              console.log(res.data)
              if (res.data.data.success === true) {
                this.getUserInfo()
                this.$message({
                  message: '修改用户成功',
                  type: 'success'
                })
              } else {
                this.$message.error('修改用户失败')
              }
            })
          }
          this.clearForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose () {
      this.dialogFormVisible = false
      this.clearForm()
    },
    clearForm () {
      this.form.userName = ''
      this.form.password = ''
      this.form.identity = ''
      this.form.employeeId = ''
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    sendForm () {
      let params = new URLSearchParams()
      for (let i = 0; i < this.multipleSelection.length; i++) {
        params.append('employeeId', this.multipleSelection[i].employeeId)
      }
      console.log(params.get('employeeId'))
      // apiurl为接口地址
      this.$axios.post('apiurl', params).then(res => {
        console.log(res.data)
        if (res.data.data.success === true) {
          this.$message({
            message: '发送表单成功',
            type: 'success'
          })
        } else {
          this.$message.error('发送表单失败')
        }
      })
    },
    getUserInfo () {
      // apiurl为接口地址
      this.$axios.get('apiurl').then(res => {
        console.log(res.data)
        // this.tableData = res.data.data.students
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .row-1{background-color: white;margin-top: -20px;height: 50px}
  .label-1{font-family: 微软雅黑;font-size: large;margin-left: 20px}
  .div-1{background-color: white;margin-top: 20px;margin-left: 20px;margin-right: 20px}
  .row-2{margin-top: 20px;margin-left: 20px;margin-right: 20px}
  .table-1{width: 100%}
  .button-1{margin-left: 20px;margin-top: 20px}
  .el-input-width{width: 300px}
  .div-2{margin-top: 20px;margin-left: 20px}
</style>
