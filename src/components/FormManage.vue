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
          <el-button class="button-1" type="primary" @click="exportExcel">导出表格</el-button>
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
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'FormManage',
  data () {
    return {
      tableData: [{
        id: 1,
        employeeId: '10001',
        employeeName: '张三',
        group: 'group 1',
        post: '前端工程师',
        identityCard: '130183',
        bank: '中行',
        bankAccount: '62226'
      }],
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
    //  uploadUrl: function() {
    //   return (
    //     "/fanxing/import/batchInsertShops" +
    //     "?businessName=" +
    //     this.businessName +
    //     "&businessStatus=" +
    //     this.businessStatus +
    //     "&businessType=" +
    //     this.businessType
    //   );
    // },
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
    exportExcel () {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('.table-1'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },

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
