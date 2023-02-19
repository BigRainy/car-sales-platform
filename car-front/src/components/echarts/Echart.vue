<template>
  <div class="echart">
    <header>
      <div>
        <span></span>
        <span></span>
      </div>
      <div>
        <span></span>
        <p>轿车销售信息管理系统</p>
        <span></span>
      </div>
      <span></span>
      <img src="../../assets/项链.png" alt="" />
    </header>
    <main>
      <section class="left-aside">
        <div id="first-echart"></div>
        <div id="second-echart"></div>
      </section>
      <section class="center-content">
        <!-- <ul class="top-content">
          <li>
            <i class="iconfont icon-faxian"></i>
            <div>
              <span>111</span>
              <p>顺序查找</p>
            </div>
          </li>
          <li>
            <i class="iconfont icon-paizhao"></i>
            <div>
              <span>11</span>
              <p>二分查找</p>
            </div>
          </li>
          <li>
            <i class="iconfont icon-huodong"></i>
            <div>
              <span>111</span>
              <p>三分查找</p>
            </div>
          </li>
          <li>
            <i class="iconfont icon-rili"></i>
            <div>
              <span>111</span>
              <p>插值查找</p>
            </div>
          </li>
        </ul> -->
        <div class="bottom-content">
          <img src="../../assets/center背景.png" alt="" />
          <img class="nuclear" src="../../assets/center.png" alt="" />
          <div class="small-cir">
            <img class="energy1" src="../../assets/能量球.png" alt="" />
            <img class="energy2" src="../../assets/能量球.png" alt="" />
          </div>
          <div class="big-cir">
            <img class="energy3" src="../../assets/能量球.png" alt="" />
          </div>
        </div>
      </section>
      <section class="right-aside">
        <div id="third-echart"></div>
        <div id="forth-echart"></div>
      </section>
    </main>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'echart',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    var myChart = echarts.init(document.querySelector('#first-echart'))
    var option
    option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: 'Gradient Stacked Area Chart'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    }
    myChart.setOption(option)
    window.addEventListener('resize', function () {
      myChart.resize()
    })
  }
}
</script>
<style lang="scss" scoped>
$line-color: rgb(5, 106, 177);
$tijiao-color: #faa755;
$shuru-color: #494cf8;
.echart {
  box-sizing: border-box;
  width: 1920px;
  background: url(../../assets/背景.jpg) no-repeat;
  background-position: left top;
  p {
    margin: 0px;
  }

  header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    div:nth-child(1) {
      width: 620px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 34px;
      span:nth-child(1) {
        width: 40px;
        height: 4px;
        transform: rotate(-45deg);
        background-color: $line-color;
      }
      span:nth-child(2) {
        width: 40px;
        height: 4px;
        transform: rotate(45deg);
        background-color: $line-color;
      }
    }
    div:nth-child(2) {
      width: 630px;
      display: flex;
      justify-content: space-between;
      align-items: start;
      position: relative;
      span:nth-child(1) {
        width: 72px;
        height: 4px;
        transform: rotate(45deg);
        background-color: $line-color;
      }
      p {
        text-align: center;
        color: rgb(87, 158, 215);
        font-size: 28px;
        font-weight: 800;
        position: relative;
        transform: translate(0, -30px);
      }
      span:nth-child(3) {
        width: 72px;
        height: 4px;
        transform: rotate(-45deg);
        background-color: $line-color;
      }
    }
    > span {
      position: relative;
      top: -12px;
      width: 510px;
      height: 4px;
      background-color: $line-color;
      box-shadow: 0 -10px 30px 4px rgba($color: #009ad6, $alpha: 0.6),
        0 4px 30px 4px rgba($color: #009ad6, $alpha: 0.6);
    }
    img {
      position: absolute;
      top: -12px;
    }
  }

  main {
    width: 1920px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 70px 0 0;
    .left-aside {
      margin: 0 0 0 40px;
      z-index: 5;
      width: 500px;
      height: 800px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border: 4px solid rgb(15, 155, 253);
      border-radius: 20px;
      padding: 20px 0px;
      box-shadow: 0 30px 40px rgba($color: #fff, $alpha: 0.2) inset, 0 0 #fff inset,
        0 -30px 40px rgba($color: #fff, $alpha: 0.2) inset, 0 0 #fff inset;
      #first-echart {
        width: 480px;
        height: 380px;
      }
      #second-echart {
        width: 480px;
        height: 380px;
      }
    }
    .center-content {
      width: 600px;
      height: 880px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .top-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        li {
          width: 190px;
          height: 80px;
          border-bottom: 8px solid rgb(3, 30, 77);
          border-top: 2px solid rgb(25, 114, 229);
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            margin: 4px;
            font-size: 30px;
            color: #2a5caa;
          }
          div {
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            span {
              font-size: 24px;
              font-weight: 600;
              color: rgb(8, 194, 249);
            }
            p {
              font-size: 12px;
              font-weight: 600;
              color: rgb(113, 119, 127);
            }
          }
        }
      }
      .bottom-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .nuclear {
          position: absolute;
          top: 170px;
          animation: nuclear 20s linear 0s infinite;
        }
        @keyframes nuclear {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .small-cir {
          position: absolute;
          top: 240px;
          left: 500px;
          // 650 490
          width: 620px;
          // 640 340
          display: flex;
          align-items: center;
          justify-content: space-between;
          // 15
          transform: rotate(17deg); //cubic-bezier(0, 0.2, 1, 0.8)
          animation: smallCir 10s linear 0s infinite;
          img {
            animation: small-spin 10s linear 0s infinite;
          }
          @keyframes small-spin {
            0% {
              transform: rotate(0deg) scaleY(2) scale(1);
            }
            100% {
              transform: rotate(360deg) scaleY(2) scale(1);
            }
          }
        }
        @keyframes smallCir {
          0% {
            transform: rotate(17deg) scaleY(0.5) rotate(0deg);
          }
          100% {
            transform: rotate(17deg) scaleY(0.5) rotate(-360deg);
          }
        }
        .big-cir {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: absolute;
          top: 250px;
          width: 790px;
          left: 410px;
          transform: rotate(17deg);
          animation: bigCir 20s linear 0s infinite;
          img {
            animation: big-spin 20s linear 0s infinite;
          }
          @keyframes big-spin {
            0% {
              transform: rotate(0deg) scaleY(2);
            }
            100% {
              transform: rotate(360deg) scaleY(2);
            }
          }
        }
        @keyframes bigCir {
          0% {
            transform: rotate(15deg) scaleY(0.5) rotate(0deg);
          }
          100% {
            transform: rotate(15deg) scaleY(0.5) rotate(-360deg);
          }
        }
      }
    }
    .right-aside {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 0 40px 0 0;
      z-index: 5;
      width: 500px;
      height: 800px;
      border: 4px solid rgb(15, 155, 253);
      border-radius: 20px;
      padding: 20px 0px;
      box-shadow: 0 30px 40px rgba($color: #fff, $alpha: 0.2) inset, 0 0 #fff inset,
        0 -30px 40px rgba($color: #fff, $alpha: 0.2) inset, 0 0 #fff inset;
      #third-echart {
        width: 480px;
        height: 380px;
      }
      #forth-echart {
        width: 480px;
        height: 380px;

        ul {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: flex-start;
          li {
            width: 100%;
            margin: 10px;
          }
          .random-value {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            input {
              margin: 0 20px;
              font-size: 16px;
              width: 100px;
              height: 32px;
              outline: none;
              border: 0px;
              border-radius: 8px;
              color: #fff;
              padding: 0 10px;
              background-color: rgba($color: #494cf8, $alpha: 0.4);
            }
            button {
              margin: 0 20px;
              padding: 0 10px;
              cursor: pointer;
              font-size: 16px;
              height: 30px;
              border-radius: 8px;
              outline: none;
              border: 0px;
              color: #fff;
              background-color: rgba($color: #faa755, $alpha: 0.8);
            }
          }
          .find-out {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            label {
              margin-left: 20px;
              font-size: 16px;
              color: #fff;
              cursor: pointer;
            }
            input {
              margin: 0 10px;
              border: 0px;
              outline: none;
              font-size: 16px;
              color: #fff;
              border-radius: 8px;
              width: 100px;
              height: 32px;
              padding: 0 10px;
              background-color: rgba($color: #494cf8, $alpha: 0.4);
            }
            button {
              margin: 0 10px;
              padding: 0 10px;
              height: 32px;
              border-radius: 8px;
              color: #fff;
              font-size: 16px;
              border: 0px;
              outline: none;
              cursor: pointer;
              background-color: rgba($color: #faa755, $alpha: 0.8);
            }
            span {
              width: 60px;
              border-radius: 8px;
              height: 32px;
              color: #fff;
              font-size: 16px;
              line-height: 32px;
              text-align: center;
              margin: 0 10px;
              padding: 0 10px;
              background-color: rgba($color: #f26522, $alpha: 0.8);
            }
          }
          .pro-echart3 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            button {
              background-color: rgba($color: $tijiao-color, $alpha: 0.8);
              color: #fff;
              margin: 0 10px;
              padding: 0 10px;
              height: 32px;
              border-radius: 8px;
              font-size: 16px;
              cursor: pointer;
              outline: none;
              border: 0px;
            }
            input {
              margin: 0 20px;
              border: 0px;
              outline: none;
              font-size: 16px;
              color: #fff;
              border-radius: 8px;
              width: 100px;
              height: 32px;
              line-height: 32px;
              padding: 0 10px;
              background-color: rgba($color: #494cf8, $alpha: 0.4);
            }
            span {
              width: 50px;
              height: 32px;
              line-height: 32px;
              padding: 0 10px;
              color: #fff;
              border-radius: 8px;
              background-color: rgba($color: #f26522, $alpha: 0.8);
            }
          }
          .list-array {
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: flex-start;
            i {
              margin: 10px 20px 10px;
              color: rgba($color: green, $alpha: 0.6);
              font-size: 16px;
            }
            .print-array {
              label {
                color: #fff;
                font-size: 16px;
                margin-left: 20px;
              }
              input {
                outline: none;
                border: 0px;
                height: 32px;
                width: 240px;
                border-radius: 8px;
                background-color: rgba($color: $shuru-color, $alpha: 0.4);
                margin: 0 10px;
                padding: 0 10px;
                color: #fff;
              }
            }
            .print-value {
              display: flex;
              align-items: start;
              flex-direction: column;
              justify-content: flex-start;
              div {
                margin: 10px;
                display: flex;
                align-items: center;
                span {
                  font-size: 16px;
                  margin: 0 10px;
                  color: #fff;
                }
                p {
                  font-size: 16px;
                  color: #fff;
                  padding: 0 10px;
                  border-radius: 8px;
                  background-color: rgba($color: #596032, $alpha: 1);
                }
              }
            }
          }
          .min-k {
            div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              label {
                color: #fff;
                font-size: 16px;
                margin-left: 20px;
              }
              input {
                margin: 0 10px;
                color: #fff;
                padding: 0 10px;
                width: 100px;
                outline: none;
                border: 0px;
                height: 32px;
                border-radius: 8px;
                background-color: rgba($color: $shuru-color, $alpha: 0.4);
              }
              button {
                cursor: pointer;
                margin: 0 10px;
                font-size: 16px;
                padding: 0 10px;
                color: #fff;
                height: 32px;
                border-radius: 8px;
                outline: none;
                border: 0px;
                background-color: rgba($color: $tijiao-color, $alpha: 1);
              }
            }
            div:nth-child(2) {
              margin: 10px 0;
              display: flex;
              span {
                color: #fff;
                font-size: 16px;
              }
              p {
                color: #fff;
                font-size: 16px;
                padding: 0 10px;
                border-radius: 8px;
                background-color: rgba($color: #596032, $alpha: 1);
              }
              span:nth-child(2n-1) {
                margin-left: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>