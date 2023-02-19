<template>
  <div class="customerView">
    <div class="carModels">
      <p>品牌车型</p>
      <i class="el-icon-right"></i>
    </div>
    <el-tabs v-model="activeCarType" @tab-click="handleClick">
      <el-tab-pane v-for="item in carType" :key="item.name" :label="item.label" :name="item.name">
        <el-carousel
          :interval="4000"
          :autoplay="false"
          type="card"
          height="240px"
          @change="carChange"
        >
          <el-carousel-item v-for="childItem in item.car" :key="childItem.id">
            <div class="car-message">
              <el-image
                style="width: 400px"
                :src="'http://localhost:3000/' + childItem.imageName"
              ></el-image>
              <h3>
                {{ childItem.carName }}
              </h3>
              <p>{{ childItem.carPrice }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
    </el-tabs>
    <div class="car-operate-btn">
      <el-button round @click="clickCarMessage">车辆详情</el-button>
      <el-button type="primary" round @click="addDialogVisible = true">预约品鉴</el-button>
    </div>
    <div class="car-server">
      <img src="http://localhost:3000/shouhou.webp" alt="" />
      <div class="shouhou-server server-style">
        <div>
          <p>售后服务</p>
          <i class="el-icon-right"></i>
        </div>
        <p>便捷专业的售后保障，用心为你分忧</p>
      </div>
      <div class="other-server">
        <img src="http://localhost:3000/zengzhi.webp" alt="" />
        <div class="zengzhi-server server-style">
          <div>
            <p>增值服务</p>
            <i class="el-icon-right"></i>
          </div>
          <p>多项贴心的服务政策，款款为你定制</p>
        </div>
        <img src="http://localhost:3000/chongdian.webp" alt="" />
        <div class="chongdian-server server-style">
          <div>
            <p>充电服务</p>
            <i class="el-icon-right"></i>
          </div>
          <p>智能系统的高效组合，告别充电焦虑</p>
        </div>
      </div>
    </div>
    <el-dialog
      title="添加顾客"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
        <el-form-item label="日期" prop="customer_id">
          <el-input v-model="addForm.customer_id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="customer_name">
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
  </div>
</template>

<script>
export default {
  data() {
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
      activeCarType: 'IDElectricity',
      addDialogVisible: false,
      addForm: {
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
      carType: [
        {
          label: 'ID纯电',
          name: 'IDElectricity',
          car: [
            {
              id: 1,
              carName: 'ID.3',
              carPrice: '综合补贴后售价159,888元起',
              imageName: 'id3.webp'
            },
            {
              id: 2,
              carName: 'ID.6X',
              carPrice: '用户价格239,888元起',
              imageName: 'id6x.webp'
            },
            {
              id: 3,
              carName: 'ID.4X',
              carPrice: '综合补贴后售价199,888元起',
              imageName: 'id4x.webp'
            }
          ]
        },
        {
          label: '轿车',
          name: 'saloonCar',
          car: [
            {
              id: 1,
              carName: '朗逸',
              carPrice: '建议零售价112,900元起',
              imageName: '轿车-朗逸.webp'
            },
            {
              id: 2,
              carName: '桑塔纳',
              carPrice: '建议零售价86,900元起',
              imageName: '轿车-桑塔纳.webp'
            },
            {
              id: 3,
              carName: '新帕萨特',
              carPrice: '建议零售价179,900元起',
              imageName: '轿车-新帕萨特.webp'
            },
            {
              id: 4,
              carName: 'Polo Plus',
              carPrice: '建议零售价89,900元起',
              imageName: '轿车-poloplus.webp'
            }
          ]
        },
        {
          label: 'SUV',
          name: 'suv',
          car: [
            {
              id: 1,
              carName: '途昂',
              carPrice: '建议零售价292,000元起',
              imageName: 'SUV-途昂.webp'
            },
            {
              id: 2,
              carName: '途观',
              carPrice: '建议零售价222,000元起',
              imageName: 'SUV-途观.webp'
            },
            {
              id: 3,
              carName: '途岳',
              carPrice: '建议零售价212,000元起',
              imageName: 'SUV-途岳.webp'
            }
          ]
        },
        {
          label: 'MPV',
          name: 'mpv',
          car: [
            {
              id: 1,
              carName: '途安L',
              carPrice: '综合补贴后售价259,888元起',
              imageName: 'MPV-途安L.webp'
            },
            {
              id: 2,
              carName: '威然',
              carPrice: '用户价格189,888元起',
              imageName: 'MPV-威然.webp'
            }
          ]
        },
        {
          label: '新能源',
          name: 'newEnery',
          car: [
            {
              id: 1,
              carName: '新途观L PHEV',
              carPrice: '建议零售价257,800元起',
              imageName: '新能源-新途观LPHEV.webp'
            },
            {
              id: 2,
              carName: '新帕萨特PHEV',
              carPrice: '建议零售价229,900元起',
              imageName: '新能源-新帕萨特PHEV.webp'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.label, tab.name)
    },
    carChange(index, key) {
      console.log(index, key)
    },
    clickCarMessage() {
      this.$router.push('/carMessage')
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addCustomer() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        //  可以发起添加客户的网络请求
        const data = await this.$http.post('customer', this.addForm)
        const res = data.data
        console.log(res)
        if (data.status !== 200) {
          this.$message.error('预约失败！')
          return
        }
        this.$message.success('预约成功！')
        // 隐藏添加客户的对话框
        this.addDialogVisible = false
        // // 重新获取客户列表数据
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.customerView {
  .carModels {
    margin-top: 50px;
    margin-left: 20%;
    display: flex;
    align-items: center;
    font-size: 32px;
    color: #333;
  }
  .car-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      margin-bottom: 10px;
    }
  }
  .car-operate-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    .el-button--default {
      border-color: rgba(64, 158, 255, 1);

      color: rgba(64, 158, 255, 1);
    }
  }
  .car-server {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px;
    position: relative;
    cursor: pointer;
    > img {
      width: 50%;
    }
    .shouhou-server {
      position: absolute;
      top: 8%;
      left: 8%;
    }
    .server-style {
      color: #fff;
      div {
        display: flex;
        align-items: center;
        font-size: 32px;
        p {
          margin-right: 30px;
        }
      }

      > p {
        font-size: 16px;
        margin: 10px 0;
      }
    }
    .other-server {
      width: 50%;
      display: flex;
      flex-direction: column;
      position: relative;
      .zengzhi-server {
        position: absolute;
        top: 8%;
        left: 8%;
      }
      .chongdian-server {
        position: absolute;
        top: 58%;
        left: 8%;
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>
<style lang="scss">
.customerView {
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }
}
</style>