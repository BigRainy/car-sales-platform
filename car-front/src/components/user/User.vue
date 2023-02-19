<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column label="工号" prop="staff_id" align="center"></el-table-column>
        <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>
        <el-table-column label="性别" prop="staff_sex" align="center"></el-table-column>
        <el-table-column label="年龄" prop="staff_age" align="center"></el-table-column>
        <el-table-column label="电话" prop="staff_phone" align="center"></el-table-column>
        <el-table-column label="籍贯" prop="staff_native_place" align="center"></el-table-column>
        <el-table-column label="学历" prop="staff_education" align="center"></el-table-column>
        <el-table-column label="操作" width="140px" align="center">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.staff_id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.staff_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加员工"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="员工工号" prop="staff_id">
          <el-input v-model="addForm.staff_id"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="staff_name">
          <el-input v-model="addForm.staff_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="staff_sex">
          <el-radio-group v-model="addForm.staff_sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="staff_age">
          <el-input v-model="addForm.staff_age"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="staff_native_place">
          <el-input v-model="addForm.staff_native_place"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="staff_education">
          <el-select v-model="addForm.staff_education" placeholder="请选择员工学历">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="staff_phone">
          <el-input v-model="addForm.staff_phone"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改员工信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="90px">
        <el-form-item label="员工工号" prop="staff_id">
          <el-input v-model="editForm.staff_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="staff_name">
          <el-input v-model="editForm.staff_name"></el-input>
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
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      userlist: [],
      total: 4,
      // 控制添加员工信息对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改员工信息对话框的显示与隐藏
      editDialogVisible: false,
      // 添加员工的表单数据
      addForm: {
        staff_id: '',
        staff_name: '',
        staff_sex: '',
        staff_age: '',
        staff_native_place: '',
        staff_education: '',
        staff_phone: ''
      },
      editForm: {
        staff_id: '',
        staff_name: '',
        staff_sex: '',
        staff_age: '',
        staff_native_place: '',
        staff_education: '',
        staff_phone: ''
      },
      addFormRules: {
        staff_id: [
          { required: true, message: '请输入员工工号', trigger: 'blur' },
          { min: 12, max: 12, message: '请正确输入12位工号', trigger: 'blur' }
        ],
        staff_name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        staff_sex: [{ required: true, message: '请选择员工性别', trigger: 'change' }],
        staff_age: [{ required: true, message: '请输入员工年龄', trigger: 'blur' }],
        staff_phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editFormRules: {
        staff_id: [
          { required: true, message: '请输入员工工号', trigger: 'blur' },
          { min: 12, max: 12, message: '请正确输入12位工号', trigger: 'blur' }
        ],
        staff_name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        staff_sex: [{ required: true, message: '请选择员工性别', trigger: 'change' }],
        staff_age: [{ required: true, message: '请输入员工年龄', trigger: 'blur' }],
        staff_phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const data = await this.$http.get('staff', { params: this.queryInfo })
      const res = data.data
      if (data.status !== 200) {
        return this.$message.console.error('获取用户列表失败！')
      }
      this.userlist = res.result.list
      this.total = res.result.total
      console.log(res)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        //  可以发起添加用户的网络请求
        const data = await this.$http.post('staff', this.addForm)
        const res = data.data
        console.log(res)
        if (data.status !== 200) {
          this.$message.error('添加用户失败！')
          return
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // // 重新获取用户列表数据
        this.getUserList()
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog(staff_id) {
      const data = await this.$http.get(`staff/one?staff_id=${staff_id}`)
      const res = data.data
      console.log(data)
      if (data.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.result
      console.log(this.editForm)
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        //  发送修改用户信息的数据请求
        const data = await this.$http.put('staff/' + this.editForm.staff_id, this.editForm)
        const res = data.data
        console.log(res)
        if (data.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }

        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    // 根据员工ID删除对应的员工信息
    async removeUserById(staff_id) {
      const confirmResult = await this.$confirm('此操作将永久删除员工，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const data = await this.$http.post(`staff/${staff_id}/off`)
      const res = data.data
      console.log(res)
      if (data.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getUserList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>