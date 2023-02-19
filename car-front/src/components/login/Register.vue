<template>
  <div class="register">
    <i class="el-icon-arrow-left" @click="getBackLogin"></i>
    <h3>用户注册</h3>
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      :rules="registerFormRules"
      label-width="0px"
      class="register_form"
    >
      <el-form-item prop="user_name">
        <el-input
          v-model="registerForm.user_name"
          clearable
          placeholder="请输入员工工号"
          prefix-icon="iconfont icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          clearable
          placeholder="请输入密码"
          prefix-icon="iconfont icon-password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="is_password">
        <el-input
          v-model="registerForm.is_password"
          type="password"
          clearable
          placeholder="确认密码"
          prefix-icon="iconfont icon-password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="is_admin">
        <el-radio-group v-model="registerForm.is_admin" size="medium">
          <el-radio border :label="false">员工</el-radio>
          <el-radio border :label="true">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkPassword = (rule, value, cb) => {
      if (value === this.registerForm.password) {
        return cb()
      }
      cb(new Error('确认密码输入错误！！！'))
    }
    return {
      // 注册表单的数据绑定对象
      registerForm: {
        user_name: '',
        password: '',
        is_admin: false
      },
      // 确定密码的数据绑定对象
      is_password: '',

      // 表单验证的规则对象
      registerFormRules: {
        user_name: [{ require: true, message: '请输入员工工号', trigger: 'blur' }],
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        is_password: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    getBackLogin() {
      this.$router.push('/login')
    },
    register() {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return
        try {
          await this.$http.get(`staff/one?staff_id=${this.registerForm.user_name}`)
        } catch (err) {
          return this.$message.error('公司不存在此员工！！！')
        }
        try {
          const data = await this.$http.post('users/register', this.registerForm)
          const res = data.data
          console.log('注册：', res)
          if (data.status !== 200) return this.$message.error('注册失败！')
          this.$message.success('注册成功！')
          this.$router.push('/login')
        } catch (err) {
          return this.$message.error('此账号已存在')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  width: 240px;
  position: absolute;
  right: 20%;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba($color: #fff, $alpha: 0.1);
  padding: 0px 50px;
  border-radius: 20px;
  i {
    color: #fff;
    font-size: 32px;
    position: absolute;
    left: 0px;
    padding: 10px;
  }
  h3 {
    color: #fff;
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    margin: 20px;
  }
}

.btns {
  display: flex;
  justify-content: center;
  .el-button {
    height: 40px;
    width: 200px;
    border-radius: 20px;
  }
}
</style>

<style lang="scss">
.register_form {
  .el-input__inner {
    background-color: transparent;
    border-color: rgba($color: #1e90ff, $alpha: 0.6);
    &:hover {
      border-color: rgba($color: #1e90ff, $alpha: 1);
    }
    &:focus {
      border-color: rgba($color: #1e90ff, $alpha: 1);
    }
  }
}
</style>