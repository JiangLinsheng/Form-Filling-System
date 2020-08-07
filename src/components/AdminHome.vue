<template>
    <div>
      <label>管理员页面</label>
      <el-button type="primary" @click="uploadExcel">上传表格</el-button>
      <el-button type="primary" @click="exportExcel">导出表格</el-button>
      <el-row>
        <el-col>
          <el-table
            :data="tableData"
            class="table-1"
            :header-cell-style="headerCellStyle">
            <el-table-column
              prop="name"
              label="姓名"
              width="300">
            </el-table-column>
            <el-table-column
              prop="jiraname"
              label="JIRA用户名"
              width="300">
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色"
              width="300">
            </el-table-column>
            <el-table-column
              prop="sysname"
              label="系统用户名">
            </el-table-column>
            <el-table-column
              label="操作"
              width="300">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改信息</el-button>
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog title="修改" :visible.sync="dialogFormVisible" :before-close="handleClose">
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      headerCellStyle: {background: '#eef1f6', color: '#606266'}
    }
  },
  methods: {
    uploadExcel () {
    },
    exportExcel () {
    },
    handleEdit (index, row) {
    },
    handleDelete (index, row) {
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
