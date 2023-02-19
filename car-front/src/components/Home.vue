<template>
  <div class="home">
    <el-container class="home-container">
      <el-header height="80px">
        <div>
          <img src="../assets/轿车.png" alt="" />
          <span>轿车销售信息管理系统</span>
        </div>
        <el-dropdown class="image-user" trigger="click" @command="handleCommand">
          <el-avatar :size="60" src="http://localhost:3000/pic1.jpg" fit="contain"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="" command="userMessage">个人信息</el-dropdown-item>
            <el-dropdown-item icon="" command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 侧边栏菜单区域 -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#333744"
            :collapse="isCollapse"
            :unique-opened="true"
            text-color="#fff"
            active-text-color="#409eff"
            :collapse-transition="false"
            :router="true"
            :default-active="activePath"
          >
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <el-avatar
        class="edit-image"
        :size="80"
        src="http://localhost:3000/pic1.jpg"
        fit="contain"
      ></el-avatar>
      <div class="administrator-icon" :style="{ display: is_admin == 'true' ? 'flex' : 'none' }">
        <i class="el-icon-star-on"></i>
        <span>超级管理员</span>
      </div>

      <el-form :model="editForm" ref="editFormRef" label-width="90px">
        <el-form-item label="员工工号" prop="staff_id">
          <el-input v-model="editForm.staff_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="staff_name">
          <el-input v-model="editForm.staff_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="staff_sex">
          <el-radio-group v-model="editForm.staff_sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="staff_age">
          <el-input v-model="editForm.staff_age"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="staff_native_place">
          <el-input v-model="editForm.staff_native_place"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="staff_education">
          <el-select v-model="editForm.staff_education" placeholder="请选择员工学历">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="staff_phone">
          <el-input v-model="editForm.staff_phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMyselfInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      editDialogVisible: false,
      is_admin: '',
      iconsObj: {
        111: 'iconfont icon-user',
        222: 'iconfont icon-tijikongjian',
        333: 'iconfont icon-shangpin',
        // 444: 'iconfont icon-danju',
        444: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: '',
      editForm: {
        staff_id: '',
        staff_name: '',
        staff_sex: '',
        staff_age: '',
        staff_native_place: '',
        staff_education: '',
        staff_phone: ''
      }
    }
  },
  created() {
    this.is_admin = window.sessionStorage.getItem('is_admin')
    this.activePath = window.sessionStorage.getItem('activePath')
    this.getMenuList()
  },

  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message.success('退出登录成功！！！')
    },
    async handleCommand(command) {
      if (command === 'logout') {
        this.logout()
      } else if (command === 'userMessage') {
        const userID = window.sessionStorage.getItem('user_name')
        // console.log(userID)
        const data = await this.$http.get(`staff/one?staff_id=${userID}`)
        const res = data.data
        console.log(res)
        this.editForm = res.result
        this.editDialogVisible = true
      }
    },
    // 获取所有的菜单
    async getMenuList() {
      let data
      console.log(this.is_admin)
      if (this.is_admin === 'true') {
        data = await this.$http.get('menus')
      } else {
        data = await this.$http.get('menus/common')
      }

      const res = data.data
      if (data.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    },
    async editMyselfInfo() {
      //  发送修改用户信息的数据请求
      const data = await this.$http.put('staff/' + this.editForm.staff_id, this.editForm)
      const res = data.data
      console.log(res)
      if (data.status !== 200) {
        return this.$message.error('更新个人信息失败！')
      }

      // 关闭对话框
      this.editDialogVisible = false
      // 刷新数据列表
      this.getUserList()
      // 提示修改成功
      this.$message.success('更新个人信息成功！')
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #373d41;
  padding: 0;
  align-items: center;

  div {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      margin: 0 20px;
    }

    span {
      color: #fff;
      font-size: 24px;
      letter-spacing: 2px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.image-user {
  margin-right: 100px;
}
</style>

<style lang="scss">
.home {
  .edit-image {
    margin: 0 auto;
    display: block;
    margin-bottom: 16px;
  }
  .administrator-icon {
    align-items: center;
    justify-content: center;
    .el-icon-star-on {
      font-size: 20px;
      color: rgba($color: #102b6a, $alpha: 1);
    }
    span {
      color: rgba($color: #2a5caa, $alpha: 1);
    }
  }
}
</style>
