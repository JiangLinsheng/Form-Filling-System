<template>
  <div class="userHome">
    <div class="userBox">
      <!-- 头像区域 -->
      <div class="avatarBox">
        <!-- <img src="../assets/logo.png" alt=""> -->
        <label class="label-1">表单填写系统</label>
      </div>
      <!-- 表单填写区域 -->
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="userForm">
        <!-- 员工编号 -->
        <el-form-item label="员工编号" prop="employeeId">
          <el-input v-model="userForm.employeeId" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item label="姓名" prop="employeeName">
          <el-input v-model="userForm.employeeName"></el-input>
        </el-form-item>
        <!-- 班组 -->
        <el-form-item label="班组" prop="group">
          <el-input v-model="userForm.group"></el-input>
        </el-form-item>
        <!-- 职位 -->
        <el-form-item label="职位" prop="post">
          <el-input v-model="userForm.post"></el-input>
        </el-form-item>
        <!-- 身份证 -->
        <el-form-item label="身份证" prop="identityCard">
          <el-input v-model="userForm.identityCard"></el-input>
        </el-form-item>
        <!-- 开户行 -->
        <el-form-item label="开户行" prop="bank">
          <el-input v-model="userForm.bank"></el-input>
        </el-form-item>
        <!-- 银行账户 -->
        <el-form-item label="银行账户" prop="bankAccount">
          <el-input v-model="userForm.bankAccount" prefix-icon="el-icon-bank-card"></el-input>
        </el-form-item>
        <!-- 按键区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="danger" @click="resetUserForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  data () {
    return {
      // 这是表单填写界面的数据绑定对象
      userForm: {
        employeeId: '',
        employeeName: '',
        group: '',
        post: '',
        identityCard: '',
        bank: '',
        bankAccount: ''
      },
      // 这是表单填写的验证规则对象
      userFormRules: {
        // 验证员工编号是否合法
        employeeId: [
          { required: true, message: '请输入员工编号', trigger: 'blur' },
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ],
        // 验证姓名是否合法
        employeeName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          { max: 10, message: '长度应小于10字符', trigger: 'blur' }
        ],
        // 验证班组是否合法
        group: [
          {required: true, message: '请输入班组', trigger: 'blur'},
          { max: 10, message: '长度应小于10字符', trigger: 'blur' }
        ],
        // 验证职位是否合法
        post: [
          {required: true, message: '请输入职位', trigger: 'blur'},
          { max: 10, message: '长度应小于10字符', trigger: 'blur' }
        ],
        // 验证身份证是否合法
        identityCard: [
          {required: true, message: '请输入身份证', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ],
        // 验证开户行是否合法
        bank: [
          {required: true, message: '请输入开户银行', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ],
        // 验证银行账户是否合法
        bankAccount: [
          {required: true, message: '请输入银行账户', trigger: 'blur'},
          { max: 20, message: '长度应小于20字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置用户填写表单
    resetUserForm () {
      // console.log(this);
      this.$refs.userFormRef.resetFields()
    },
    submit () {
      this.$refs.userFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        const {data: res} = await this.$http.post('submit', this.userForm)
        // console.log(res)
        if (res.meta.status !== 200) return console.log('登录失败')
        console.log('登录成功')
      })
    }
  }
}
</script>

<style scoped>
.userHome {
  background-color: cornflowerblue;
  height: 100%;
}
.userBox {
  width: 450px;
  height: 600px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatarBox {
  height: 130px;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.userForm {
  position: absolute;
  margin-top: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.label-1{
  font-family: 微软雅黑;
  font-size: xx-large;
  margin-left:130px ;
}
</style>
