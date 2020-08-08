<template>
  <div>
    <el-row type="flex" align="middle" class="row-1">
      <el-col>
        <label class="label-1">表单管理</label>
      </el-col>
    </el-row>
    <div class="div-1">
      <el-row>
        <el-col :span="2">
          <el-button class="button-1" type="primary">上传表格</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="button-1" type="primary">导出表格</el-button>
        </el-col>
      </el-row>
      <el-row class="row-2">
        <el-col>
          <el-table
            :data="tableData"
            class="table-1"
            :header-cell-style="headerCellStyle">
            <el-table-column
              prop=""
              label="序号">
            </el-table-column>
            <el-table-column
              prop=""
              label="员工编号">
            </el-table-column>
            <el-table-column
              prop=""
              label="姓名">
            </el-table-column>
            <el-table-column
              prop=""
              label="班组">
            </el-table-column>
            <el-table-column
              prop=""
              label="职位">
            </el-table-column>
            <el-table-column
              prop=""
              label="身份证">
            </el-table-column>
            <el-table-column
              prop=""
              label="开户行">
            </el-table-column>
            <el-table-column
              prop=""
              label="银行账户">
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
    </div>
    <el-dialog title="修改" width="30%" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-divider></el-divider>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="序号" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="员工编号" :label-width="formLabelWidth" prop="employeeId">
          <el-input v-model="form.employeeId" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="employeeName">
          <el-input v-model="form.employeeName" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="班组" :label-width="formLabelWidth" prop="group">
          <el-input v-model="form.group" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" prop="post">
          <el-input v-model="form.post" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth" prop="identityCard">
          <el-input v-model="form.identityCard" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="开户行" :label-width="formLabelWidth" prop="bank">
          <el-input v-model="form.bank" autocomplete="off" class="el-input-width"></el-input>
        </el-form-item>
        <el-form-item label="银行账户" :label-width="formLabelWidth" prop="bankAccount">
          <el-input v-model="form.bankAccount" autocomplete="off" class="el-input-width"></el-input>
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
      form: {
        id: '',
        employeeId: '',
        employeeName: '',
        group: '',
        post: '',
        identityCard: '',
        bank: '',
        bankAccount: ''
      },
      rules: {
        id: [
          {required: true, message: '请输入序号', trigger: 'blur'}
        ],
        employeeId: [
          {required: true, message: '请输入员工编号', trigger: 'blur'}
        ],
        employeeName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        group: [
          {required: true, message: '请输入班组', trigger: 'blur'}
        ],
        post: [
          {required: true, message: '请输入职位', trigger: 'blur'}
        ],
        identityCard: [
          {required: true, message: '请输入身份证号', trigger: 'blur'}
        ],
        bank: [
          {required: true, message: '请输入开户银行', trigger: 'blur'}
        ],
        bankAccount: [
          {required: true, message: '请输入银行账户', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
    },
    onSubmit () {
      this.dialogFormVisible = false
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
</style>
