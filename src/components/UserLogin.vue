
<template>
  <div class="login_container">
    <el-row class="el-row" type="flex" justify="space-around" align="middle">
      <el-col :span="10" class="left">
        <div class="icon_box">
          <img src="../assets/u18.svg" alt />
        </div>
      </el-col>
      <el-col :span="6" class="right">
        <el-row>
          <el-col class="subtitle" :span="10">
            <label class="lable1">登录/Login</label>
          </el-col>
          <el-col :span="10">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-radio v-model="radio" label="admin">管理员</el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio v-model="radio" label="user">用户</el-radio>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login_form">
              <el-form-item label="账号" prop="username">
                <el-input
                  v-model="loginForm.username"
                  prefix-icon="el-icon-user"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  prefix-icon="el-icon-key"
                  type="password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item class="btns">
                <el-button type="info" size="middle" round @click="resetLoginForm">重置</el-button>
                <el-button type="success" size="middle" round @click="Login">登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data() {
    return {
      radio: "admin",
      loginForm: {
        password: "",
        username: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入正确用户名", trigger: "blur" },
          { max: 20, message: "长度在20个字符以内", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入正确密码", trigger: "blur" },
          { max: 20, message: "长度在20个字符以内", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    Login () {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.$axios.post('http://121.41.228.122:8081/admin/loginInAccount', {
            userName: this.loginForm.username,
            password: this.loginForm.password,
            identity: this.radio
          }).then(res => {
            console.log(res.data)
            if (res.data.success === true) {
              if (this.radio === 'user') {
                this.$router.push({ path: '/UserHome' })
              } else if (this.radio === 'admin') {
                this.$router.push({ path: '/AdminHome' })
              }
            } else {
              this.$message.error('用户身份信息有误')
            }
          })
        } else {
          return false
        }
      })
    },

    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>

<style scoped>
/* eslint-disable */
.login_container {
  height: 100%;
  background: url("../assets/u17.png");
  background-size: 100%;
}

.el-row {
  height: 100%;
  display: flex;
  align-items: center;
}


.right {
  background-color: #fff;
  opacity: 0.85;
  border-radius: 3%;
}

img {
  width: 100%;
  height: 100%;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}

.lable1 {
  font-family: 微软雅黑;
  font-size: large;
  margin-left: 20px;
}

.subtitle {
  margin: 10px 0;
}
</style>
