<template>
  <section class="page">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <div class="profit">
        <div class="profit-div">
            <div class="profit-div-top">
                <div>
                    <span>用户名：</span>
                    <span>{{userInfo.user_nickname}}</span>
                </div>
                <div>
                    <span>日期：</span>
                    <span @click="popup()">{{dateQuery(xuans)}}<i class="iconfont icon-xia"></i></span>
                </div>
            </div>
            <div class="profit-div-pro">
              <p>总盈亏</p>
              <p :class="plossList.ploss < 0 ? 'lvlvlv' : ''">{{plossList.ploss}}<span>元</span></p>
            </div>
            <div class="profit-div-four">
              <div>
                <p>总投注</p>
                <p>{{plossList.lottery_amount}}<span>元</span></p>
              </div>
              <div>
                <p>总中奖</p>
                <p>{{plossList.winning_amount}}<span>元</span></p>
              </div>
              <div>
                <p>总提现</p>
                <p>{{plossList.withdraw}}<span>元</span></p>
              </div>
              <div>
                <p>总充值</p>
                <p>{{plossList.recharge}}<span>元</span></p>
              </div>
            </div>
            <!-- <div  class="profit-div-cent"> -->
                <!-- <p><span>总充值：</span><span>{{plossList.recharge}}</span></p>
                <p><span>总提现：</span><span>{{plossList.withdraw}}</span></p>
                <p><span>总投注值：</span><span>{{plossList.lottery_amount}}</span></p>
                <p><span>中奖金额：</span><span>{{plossList.winning_amount}}</span></p>
                <p><span>总盈亏：</span><span>{{plossList.ploss}}</span></p> -->
                <!-- <p><span>总充值：</span><span>155455414</span></p> -->
            <!-- </div> -->
        </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      class="popup">
      <!-- <mt-header title="盈亏报表" class='bar-header'>
        <span class="bar-r" slot='left'><slot name='left'><mt-button v-show='!hideBack' icon="back" @click.native='popup()' slot='left'></mt-button></slot></span>
        <span class="bar-r" slot='right'><slot name='right'></slot></span>
      </mt-header> -->
      <p>选择时间：</p>
      <div class="divspan">
        <span @click="xuanze(0)" :class="xuan == 0 ? 'spanAtre' : ''">全部</span>
        <span @click="xuanze(1)" :class="xuan == 1 ? 'spanAtre' : ''">今天</span>
        <span @click="xuanze(7)" :class="xuan == 7 ? 'spanAtre' : ''">本周</span>
        <span @click="xuanze(30)" :class="xuan == 30 ? 'spanAtre' : ''">本月</span>
      </div>
      <div class="divbtn" @click="plossQuery()">查询</div>
    </mt-popup>
  </section>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: '页面名称',
  components: {
    // 搭建：引入组件
  },
  computed:{
    // 搭建：计算属性
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.userInfo,
    })
  },
  data() {
    return {
      // 搭建：赋值
      popupVisible: false, //日期开关
      xuan: 0, //日期
      xuans: 0, //日期
      plossList: [], //盈亏列表
    }
  },
  created(){
    // 搭建：进入页面时执行
    this.getPloss();
  },
  methods:{
    // 搭建：函数方法
    // 日期开关
    popup(){
      this.popupVisible = !this.popupVisible;
    },
    // 选择时间
    xuanze(index){
      this.xuan = index;
    },
    // 查询
    plossQuery(){
      this.getPloss();
      this.xuans = this.xuan;
      this.popupVisible = !this.popupVisible;
    },
    // 获取盈亏报表
    getPloss(){
      this.$api.recordPlossResult({day:this.xuan}).then(res => {
        if(res.code == '00'){
          this.plossList = res.data;
        }
      })
    },
    // 判断时间
    dateQuery(status){
      var myDate;
      switch(status){
        case 0:
        myDate = '全部';
        break;
        case 1:
        myDate = '今天';
        break;
        case 7:
        myDate = '本周';
        break;
        case 30:
        myDate = '本月';
        break;
      }
      return myDate;
    }
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.page{
    height: 94vh;
    margin-top: 6vh;
    background: rgb(236, 236, 236);
}
.profit{
    padding-top: 2vh;
    .profit-div{
        height: 75vh;
        width: 94vw;
        margin: 0 auto;
        border-radius: 5px;
        background-color: #fff;
        font-size: 15px;
        color: rgb(97, 97, 97);
        .profit-div-top{
            color: rgb(73, 73, 73);
            font-size: 16px;
            text-align: left;
            display: flex;
            // width: 90%;
            // margin: 0 auto;
            padding: 12px 4vw;
            border-bottom: 1px solid rgb(238, 238, 238);
            div{
              text-overflow: ellipsis;
              white-space:nowrap;
              overflow:hidden;
              width: 50%;
              font-size: 17px;
              color: #000;
                span:nth-child(1){
                    display: inline-block;
                    width: 80px;
                }
            }
            div:nth-child(2){
              font-size: 15px;
              color: rgb(73, 73, 73);
                text-align: right;
                .icon-xia{
                    margin-left: 4vw;
                    color: rgb(255, 102, 133);
                }
            }
        }
        .profit-div-pro{
          // width: ;
          margin: 6vh auto 5vh;
          p:nth-child(1){
            font-size: 18px;
            margin: 0;
            padding: 0;
          }
          p:nth-child(2){
            font-size: 26px;
            color: rgb(255, 102, 133);
            // padding: 1px;
            margin: 2vh 0 0.5vh;
            position: relative;
            span{
              display: inline-block;
              position: absolute;
              top: 28px;
              // margin-top: 55px;
              color: rgb(143, 143, 143);
              font-size: 15px;
            }
          }
          .lvlvlv{
              color: rgb(54, 217, 163)!important;
          }
        }
        .profit-div-four{
          width: 94vw;
          margin: 9vh auto 0;
          // display: flex;
          div{
            float: left;
            width: 42.5vw;
            
            // border: #ce3838 1px solid;
            border-radius: 6px;
            height: 15.5vh;
            min-height: 100px;
            p{
              margin: 2vw;
              position: relative;
              span{
                display: inline-block;
                position: absolute;
                top: 28px;
                // margin-top: 55px;
                color: rgb(255, 255, 255);
                font-size: 15px;
              }
            }
            p:nth-child(1){
              text-align: left;
              font-size: 16px;
              color: rgb(255, 255, 255);
            }
            p:nth-child(2){
              margin-top: 2.7vh;
              text-align: center;
              font-size: 20px;
              color: rgb(255, 255, 255);
            }
          }
          div:nth-child(1){
            background: url('../../assets/img/84.png') no-repeat center center;
            background-size: cover;
            // background-size: cover;
            margin: 2vw 1.5vw 1.5vw 3vw;
          }
          div:nth-child(2){
            background: url('../../assets/img/84(3).png') no-repeat center center;
            background-size: cover;
            margin: 2vw 3vw 1.5vw 1.5vw;
          }
          div:nth-child(3){
            background: url('../../assets/img/84(1).png') no-repeat center center;
            background-size: cover;
            margin: 1.5vw 1.5vw 2vw 3vw;
          }
          div:nth-child(4){
            background: url('../../assets/img/84(2).png') no-repeat center center;
            background-size: cover;
            margin: 1.5vw 3vw 2vw 1.5vw;
          }
        }
        // .profit-div-cent{
        //     text-align: left;
        //     padding: 0 4vw;
        //     span:nth-child(1){
        //         display: inline-block;
        //         width: 85px;
        //     }
        // }
    }
}
.popup{
  // margin-top: 14vh;
  height: 30vh;
  width: 92vw;
  text-align: left;
  padding: 0 4vw; 
  p{
    margin-top: 4.5vh;

  }
  .divspan{
    margin: 3.8vh 0;
    span{
      display: inline-block;
      width: 17vw;
      text-align: center;
      height: 4vh;
      line-height: 4vh;
      border: 1px solid #a1a0a0;
      margin: 0 2.8vw;
      font-size: 14px;
      border-radius: 4px;
    }
    span:nth-child(1){
      margin-left: 0;
    }
    span:nth-child(4){
      margin-right: 0;
    }
    .spanAtre{
      color: #e75454;
      border: 1px solid #ce3838;
    }
  }
  .divbtn{
    width: 92vw;
    margin: 0 auto;
    height: 5vh;
    text-align: center;
    line-height: 5vh;
    margin-top: 3vh;
    color: rgb(240, 240, 240);
    font-size: 14px;
    border-radius: 4px;
    background: linear-gradient(to right, rgb(250, 44, 180), rgb(255, 53, 130));
  }
}
</style>