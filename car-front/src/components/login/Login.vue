<template>
  <div class="login">
    <h3>用户登录</h3>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginFormRules"
      label-width="0px"
      class="login_form"
    >
      <el-form-item prop="user_name">
        <el-input
          v-model="loginForm.user_name"
          clearable
          placeholder="请输入账号..."
          prefix-icon="iconfont icon-user"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="password_input">
        <el-input
          v-model="loginForm.password"
          type="password"
          clearable
          placeholder="请输入密码..."
          prefix-icon="iconfont icon-password"
        ></el-input>
      </el-form-item>
      <el-form-item class="password_check">
        <el-checkbox-group v-model="savePassword">
          <el-checkbox label="记住密码" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="register" @click="toRegister">无账号？申请账号</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        user_name: '',
        password: ''
      },
      savePassword: '',
      loginFormRules: {
        // 验证用户名是否合法
        user_name: [{ required: true, message: '请输入登录名称', trigger: 'blur' }],
        // 验证密码是否合法
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const data = await this.$http.post('users/login', this.loginForm)
        const res = data.data
        console.log(res)
        if (data.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.result.token)
        window.sessionStorage.setItem('user_name', this.loginForm.user_name)
        window.sessionStorage.setItem('is_admin', res.result.is_admin)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    },
    toRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 240px;
  position: absolute;
  right: 20%;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba($color: #fff, $alpha: 0.1);
  padding: 0px 50px 30px;
  border-radius: 20px;
  h3 {
    color: #fff;
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    margin: 20px;
  }
  .password_input,
  .password_check {
    margin-bottom: 10px;
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
  .register {
    width: 100%;
    text-align: center;
    color: #008080;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

<style lang="scss">
.login_form {
  .el-input__inner {
    background-color: transparent;
    color: #fff;
    letter-spacing: 2px;
    border-color: rgba($color: #1e90ff, $alpha: 0.6);
    &:hover {
      border-color: rgba($color: #1e90ff, $alpha: 1);
    }
    &:focus {
      border-color: rgba($color: #1e90ff, $alpha: 1);
    }
  }
  .el-checkbox {
    .el-checkbox__inner {
      border-color: #1e90ff;
      background-color: transparent;
    }
    .el-checkbox__label {
      color: #fff;
    }
  }
}
</style>
