<template>
  <div class="car">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>汽车管理</el-breadcrumb-item>
      <el-breadcrumb-item>汽车信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getCarList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加汽车</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="carlist" border stripe>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column type="expand" align="center">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="汽车介绍">
                <span>{{ props.row.car_info }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="汽车图片" width="120px" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://localhost:3000/' + scope.row.car_image"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="汽车编号" prop="car_id" align="center"> </el-table-column>
        <el-table-column label="型号" prop="car_name" align="center"> </el-table-column>
        <el-table-column label="颜色" align="center">
          <template slot-scope="scope">
            <el-color-picker v-model="scope.row.car_color" size="medium"></el-color-picker>
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">
            <el-tag type="danger">{{ scope.row.car_price + ' 万元' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="生产厂家" prop="car_manufacturer" align="center"> </el-table-column>
        <el-table-column label="生产日期" prop="car_produce_date" align="center"> </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.car_id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeCarById(scope.row.car_id)"
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
      title="添加汽车"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="汽车编号" prop="car_id">
          <el-input v-model="addForm.car_id"></el-input>
        </el-form-item>
        <el-form-item label="汽车型号" prop="car_name">
          <el-input v-model="addForm.car_name"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="car_color">
          <el-color-picker v-model="addForm.car_color"></el-color-picker>
        </el-form-item>
        <el-form-item label="价格" prop="car_price">
          <el-input v-model="addForm.car_price"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="car_image">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/car/upload/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="addForm.car_image"
              :src="'http://localhost:3000/' + addForm.car_image"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="生产厂家" prop="car_manufacturer">
          <el-input v-model="addForm.car_manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" prop="car_produce_date">
          <el-date-picker v-model="addForm.car_produce_date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="汽车介绍" prop="car_info">
          <el-input type="textarea" v-model="addForm.car_info"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCar">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改汽车信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="90px">
        <el-form-item label="汽车编号" prop="car_id">
          <el-input v-model="editForm.car_id"></el-input>
        </el-form-item>
        <el-form-item label="汽车型号" prop="car_name">
          <el-input v-model="editForm.car_name"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="car_color">
          <el-color-picker v-model="editForm.car_color"></el-color-picker>
        </el-form-item>
        <el-form-item label="价格" prop="car_price">
          <el-input v-model="editForm.car_price"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="car_image">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/car/upload/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="editForm.car_image"
              :src="'http://localhost:3000/' + editForm.car_image"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="生产厂家" prop="car_manufacturer">
          <el-input v-model="editForm.car_manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" prop="car_produce_date">
          <el-date-picker v-model="editForm.car_produce_date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="汽车介绍" prop="car_info">
          <el-input type="textarea" v-model="editForm.car_info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCarInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      carlist: [],
      total: 4,
      // 控制添加员工信息对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改员工信息对话框的显示与隐藏
      editDialogVisible: false,
      // 添加员工的表单数据
      addForm: {
        car_id: '',
        car_name: '',
        car_color: '#ffffff',
        car_price: '',
        car_image: '',
        car_manufacturer: '',
        car_produce_date: '',
        car_info: ''
      },
      editForm: {
        car_id: '',
        car_name: '',
        car_color: '',
        car_price: '',
        car_image: '',
        car_manufacturer: '',
        car_produce_date: '',
        car_info: ''
      },
      addFormRules: {
        car_id: [{ required: true, message: '请输入汽车编号', trigger: 'blur' }],
        car_name: [{ required: true, message: '请输入汽车型号', trigger: 'blur' }],
        car_color: [{ required: true, message: '请选择汽车颜色', trigger: 'blur' }],
        car_produce_date: [{ required: true, message: '请输入汽车型号', trigger: 'blur' }],
        car_image: [{ required: true, message: '选择要上传的汽车图片', trigger: 'blue' }],
        car_price: [{ required: true, message: '请输入汽车价格', trigger: 'blue' }],
        car_manufacturer: [{ required: true, message: '请输入汽车生产厂家', trigger: 'blur' }]
      },
      editFormRules: {
        car_id: [{ required: true, message: '请输入汽车编号', trigger: 'blur' }],
        car_name: [{ required: true, message: '请输入汽车型号', trigger: 'blur' }],
        car_color: [{ required: true, message: '请选择汽车颜色', trigger: 'blur' }],
        car_produce_date: [{ required: true, message: '请输入汽车型号', trigger: 'blur' }],
        car_image: [{ required: true, message: '选择要上传的汽车图片', trigger: 'blue' }],
        car_price: [{ required: true, message: '请输入汽车价格', trigger: 'blue' }],
        car_manufacturer: [{ required: true, message: '请输入汽车生产厂家', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCarList()
  },
  methods: {
    async getCarList() {
      const data = await this.$http.get('car', { params: this.queryInfo })
      const res = data.data
      if (data.status !== 200) {
        return this.$message.console.error('获取汽车列表失败！')
      }
      this.carlist = res.result.list
      this.total = res.result.total
      console.log(res)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getCarList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getCarList()
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addCar() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        //  可以发起添加用户的网络请求
        const data = await this.$http.post('car', this.addForm)
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
        this.getCarList()
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog(car_id) {
      const data = await this.$http.get(`car/one?car_id=${car_id}`)
      const res = data.data
      if (data.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.result
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editCarInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        //  发送修改用户信息的数据请求
        const data = await this.$http.put('car/' + this.editForm.car_id, this.editForm)
        const res = data.data
        console.log(res)
        if (data.status !== 200) {
          return this.$message.error('更新汽车信息失败！')
        }

        // 关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新汽车信息成功！')
      })
    },
    // 根据汽车ID删除对应的汽车信息
    async removeCarById(car_id) {
      const confirmResult = await this.$confirm('此操作将永久删除汽车，是否继续？', '提示', {
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

      const data = await this.$http.post(`car/${car_id}/off`)
      const res = data.data
      console.log(res)
      if (data.status !== 200) {
        return this.$message.error('删除汽车失败！')
      }
      this.$message.success('删除汽车成功！')
      this.getCarList()
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.addForm.car_image = res.result.goods_img
      console.log(this.addForm.car_image)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.car {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px !important;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>