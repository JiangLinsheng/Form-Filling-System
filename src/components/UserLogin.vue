<template>
  <div>
    <label>登录页面</label>
    <el-radio v-model="role" label="user">普通用户</el-radio>
    <el-radio v-model="role" label="admin">管理员</el-radio>
    <el-button type="primary" @click="userLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      role: ''
    }
  },
  methods: {
    userLogin () {
      if (this.role === 'user') {
        this.$router.push({path: '/UserHome'})
      } else if (this.role === 'admin') {
        this.$router.push({path: '/AdminHome'})
      }
    }
  }
}
</script>

<style scoped>

</style>
