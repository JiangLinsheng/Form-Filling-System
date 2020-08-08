<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="black"
        text-color="#fff"
        active-text-color="#409EFF"
        :router=true>
        <el-row type="flex" justify="start" align="middle">
          <el-col :span="2"><img src="../assets/logo.png"></el-col>
          <el-col :span="2"><label class="label-1">表单上传系统</label></el-col>
          <el-col :span="2">
            <el-menu-item :index=homeRouter[0]>用户管理</el-menu-item>
          </el-col>
          <el-col :span="2">
            <el-menu-item :index=homeRouter[1]>表单管理</el-menu-item>
          </el-col>
        </el-row>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      homeRouter: [
        '/UserManage',
        '/FormManage'
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .label-1{color: white;font-size: large}
</style>
