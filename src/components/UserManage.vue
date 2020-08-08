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
              prop=""
              label="用户名">
            </el-table-column>
            <el-table-column
              prop=""
              label="密码">
            </el-table-column>
            <el-table-column
              prop=""
              label="身份">
            </el-table-column>
            <el-table-column
              prop=""
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
    <el-dialog title="dialogTitle" width="30%" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-divider></el-divider>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="identity">
          <el-radio v-model="form.identity" label="user">普通用户</el-radio>
          <el-radio v-model="form.identity" label="admin">管理员</el-radio>
        </el-form-item>
        <el-form-item label="员工编号" :label-width="formLabelWidth" prop="employeeId">
          <el-input v-model="form.employeeId" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      tableData: [],
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
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        identity: [
          {required: true, message: '请输入角色', trigger: 'blur'}
        ],
        employeeId: [
          {required: true, message: '请输入员工编号', trigger: 'blur'}
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
    },
    handleDelete (index, row) {
    },
    onSubmit () {
      this.dialogFormVisible = false
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
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  created () {
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
