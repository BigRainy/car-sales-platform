<template>
  <div class="customer">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getCustomerList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="customerlist" border stripe>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column
          label="客户编号"
          prop="customer_id"
          align="center"
          width="100px"
        ></el-table-column>
        <el-table-column label="姓名" prop="customer_name" align="center"></el-table-column>
        <el-table-column label="地址" prop="customer_address" align="center"></el-table-column>
        <el-table-column label="联系方式" prop="customer_phone" align="center"></el-table-column>
        <el-table-column label="业务联系记录" prop="customer_info" align="center"></el-table-column>
        <el-table-column label="操作" width="140px" align="center">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.customer_id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeCustomerById(scope.row.customer_id)"
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
      title="添加顾客"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="客户编号" prop="customer_id">
          <el-input v-model="addForm.customer_id"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="customer_name">
          <el-input v-model="addForm.customer_name"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="customer_address">
          <el-input v-model="addForm.customer_address"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="customer_phone">
          <el-input v-model="addForm.customer_phone"></el-input>
        </el-form-item>
        <el-form-item label="业务记录" prop="customer_info">
          <el-input v-model="addForm.customer_info" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomer">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改顾客信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="90px">
        <el-form-item label="客户编号" prop="customer_id">
          <el-input v-model="editForm.customer_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="customer_name">
          <el-input v-model="editForm.customer_name"></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="customer_address">
          <el-input v-model="editForm.customer_address"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="customer_phone">
          <el-input v-model="editForm.customer_phone"></el-input>
        </el-form-item>
        <el-form-item label="业务记录" prop="customer_info">
          <el-input v-model="editForm.customer_info" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCustomerInfo">确 定</el-button>
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
      customerlist: [],
      total: 4,
      // 控制添加员工信息对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改员工信息对话框的显示与隐藏
      editDialogVisible: false,
      // 添加员工的表单数据
      addForm: {
        customer_id: '',
        customer_name: '',
        customer_address: '',
        customer_phone: '',
        customer_info: ''
      },
      editForm: {
        customer_id: '',
        customer_name: '',
        customer_address: '',
        customer_phone: '',
        customer_info: ''
      },
      addFormRules: {
        customer_id: [{ required: true, message: '请输入客户编号', trigger: 'blur' }],
        customer_name: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
        customer_address: [{ required: true, message: '请输入客户住址', trigger: 'blur' }],
        customer_phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editFormRules: {
        customer_id: [{ required: true, message: '请输入客户编号', trigger: 'blur' }],
        customer_name: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
        customer_address: [{ required: true, message: '请输入客户住址', trigger: 'blur' }],
        customer_phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCustomerList()
  },
  methods: {
    async getCustomerList() {
      const data = await this.$http.get('customer', { params: this.queryInfo })
      const res = data.data
      if (data.status !== 200) {
        return this.$message.console.error('获取客户列表失败！')
      }
      this.customerlist = res.result.list
      this.total = res.result.total
      console.log(res)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getCustomerList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getCustomerList()
    },
    // 监听添加客户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新客户
    addCustomer() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        //  可以发起添加客户的网络请求
        const data = await this.$http.post('customer', this.addForm)
        const res = data.data
        console.log(res)
        if (data.status !== 200) {
          this.$message.error('添加用户失败！')
          return
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加客户的对话框
        this.addDialogVisible = false
        // // 重新获取客户列表数据
        this.getCustomerList()
      })
    },
    // 展示编辑客户的对话框
    async showEditDialog(customer_id) {
      const data = await this.$http.get('customer/one', { params: { customer_id } })

      const res = data.data
      console.log(data)
      if (data.status !== 200) {
        return this.$message.error('查询客户信息失败！')
      }
      this.editForm = res.result
      console.log(this.editForm)
      this.editDialogVisible = true
    },
    // 监听修改客户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editCustomerInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        //  发送修改客户信息的数据请求
        const data = await this.$http.put('customer/' + this.editForm.customer_id, this.editForm)
        const res = data.data
        console.log(res)
        if (data.status !== 200) {
          return this.$message.error('更新客户信息失败！')
        }

        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getCustomerList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    // 根据客户ID删除对应的客户信息
    async removeCustomerById(customer_id) {
      const confirmResult = await this.$confirm('此操作将永久删除客户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      // 如果客户确认删除，则返回值为字符串 confirm
      // 如果客户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const data = await this.$http.post(`customer/${customer_id}/off`)
      const res = data.data
      console.log(res)
      if (data.status !== 200) {
        return this.$message.error('删除客户失败！')
      }
      this.$message.success('删除客户成功！')
      this.getCustomerList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>