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
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            name="excelFile"
            :on-success="uploadSuccess"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <el-button class="button-1" slot="trigger" type="primary">上传文件</el-button>
            <!-- action为向后端传输文件的接口 -->
          </el-upload>
        </el-col>
        <el-col :span="2">
          <el-button class="button-1" type="primary" @click="handleBtn">导出表格</el-button>
        </el-col>
      </el-row>
      <el-row class="row-2">
        <el-col>
          <el-table
            :data="tableData"
            class="table-1"
            :header-cell-style="headerCellStyle">
            <el-table-column
              prop="id"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="employeeId"
              label="员工编号">
            </el-table-column>
            <el-table-column
              prop="employeeName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="group"
              label="班组">
            </el-table-column>
            <el-table-column
              prop="post"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="identityCard"
              label="身份证">
            </el-table-column>
            <el-table-column
              prop="bank"
              label="开户行">
            </el-table-column>
            <el-table-column
              prop="bankAccount"
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
          <el-input v-model="form.id" disabled="true" autocomplete="off" class="el-input-width"></el-input>
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
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

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
          {required: true, message: '请输入员工编号', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ],
        employeeName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          { max: 10, message: '长度应小于10字符', trigger: 'blur' }
        ],
        group: [
          {required: true, message: '请输入班组', trigger: 'blur'},
          { max: 10, message: '长度应小于10字符', trigger: 'blur' }
        ],
        post: [
          {required: true, message: '请输入职位', trigger: 'blur'},
          { max: 10, message: '长度应小于10字符', trigger: 'blur' }
        ],
        identityCard: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ],
        bank: [
          {required: true, message: '请输入开户银行', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ],
        bankAccount: [
          {required: true, message: '请输入银行账户', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    uploadSuccess (response, file, fileList) {
      if (response.status) {
        alert('文件导入成功')
      } else {
        alert('文件导入失败')
      }
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload (file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const extension3 = file.name.split('.')[1] === 'doc'
      const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4) {
        alert('上传模板只能是 xls、xlsx、doc、docx 格式!')
      }
      if (!isLt2M) {
        alert('上传模板大小不能超过 10MB!')
      }
      return extension || extension2 || extension3 || (extension4 && isLt2M)
    },
    submitUpload () {
      if (this.businessType != null) {
        // 触发组件的action
        this.$refs.upload.submit()
      }
      if (this.businessType == null) {
        this.businessType = 'businessType不能为空'
      }
    },
    handleBtn () {
      // 根据后台返回地址直接下载excel文件
      this.$axios.post('http://121.41.228.122:8081/admin/getExcelFile').then(res => {
        console.log(res.data)
        window.open(res.data.data.downLoadPath)
      })
      // 根据数据在前端生成excel文件并下载
      // require.ensure([], () => {
      //   const { export_json_to_excel } = require('@/excel/export2Excel')
      //   const list = this.tableData
      //   const filterVal = ['id', 'employeeId', 'employeeName', 'group', 'post', 'identityCard', 'bank', 'bankAccount']// 取出要下载的表头字段
      //   const tHeader = ['序号', '员工编号', '姓名', '班组', '职位', '身份证', '开户行', '银行账户']// 把表头字段定义成想要的中文或英文
      //   const data = this.formatJson(filterVal, list)
      //   export_json_to_excel(tHeader, data, '员工信息')// 定义excel下载成功的表名
      // })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.form.id = row.id
      this.form.employeeId = row.employeeId
      this.form.employeeName = row.employeeName
      this.form.group = row.group
      this.form.post = row.post
      this.form.identityCard = row.identityCard
      this.form.bank = row.bank
      this.form.bankAccount = row.bankAccount
    },
    handleDelete (index, row) {
      // apiurl为接口地址
      this.$axios.post('apiurl', {id: row.id}).then(res => {
        console.log(res.data)
        if (res.data.data.success === true) {
          this.getFormInfo()
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
          // apiurl为接口地址
          this.$axios.put('apiurl', this.form).then(res => {
            console.log(res.data)
            if (res.data.data.success === true) {
              this.getFormInfo()
              this.$message({
                message: '修改表单成功',
                type: 'success'
              })
            } else {
              this.$message.error('修改表单失败')
            }
          })
          this.clearForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose (done) {
      this.dialogFormVisible = false
      this.clearForm()
    },
    clearForm () {
      this.form.id = ''
      this.form.employeeId = ''
      this.form.employeeName = ''
      this.form.group = ''
      this.form.post = ''
      this.form.identityCard = ''
      this.form.bank = ''
      this.form.bankAccount = ''
    },
    getFormInfo () {
      // apiurl为接口地址
      this.$axios.post('http://121.41.228.122:8081/admin/getAllEmployee').then(res => {
        console.log(res.data)
        this.tableData = res.data.data.employeeList
      })
    }
  },
  created () {
    this.getFormInfo()
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
