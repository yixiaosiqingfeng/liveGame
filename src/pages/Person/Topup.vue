<template>
  <section class="">
    <div class="topup-name">
      <p>充值账户：{{ userInfo ? (userInfo.user_nickname  ?  userInfo.user_nickname : userInfo.user_phone ) : '请登录'}}</p>
    </div>
    <div class="topup-money">
      <p>充值金额</p>
      <div class="select-area">
        <div class='price-container' v-for='(price,index) in prices' :key="index">
          <mt-button :class="['btn-price', {'selected': index == count}]" @click.native="choicemenoy(price,index)">{{price}}</mt-button>
        </div>
      </div>
      <input type="number" v-model="topupMenoy" v-show="isInput = 1" @input="inputFocus">
      <div v-for="(item, index) in payWays" :key="index">
        <div class="topup-payment"  @click="payment(index)">
          <img :src="item.icon" alt="">
          <span>{{item.name}}</span>
          <span class="mint-radio-core " :class="{'payment-red': index == paymentcount}"></span>
        </div>
      </div>
      
    </div>
    <div class="topup-list-buttom">
      <p v-if="paymentcount >= 0" @click="allPay()">确定充值</p>
      <p v-else>请选择支付渠道</p>
    </div>
    <div class="topup-list-kefu">
      <span @click="popupVisible = true">联系客服<i class="iconfont icon-youjiankuohao"></i></span>
    </div>
    <mt-popup
      v-model="popupVisible"
      class="popupVisible"
      >
      <img :src="customer" alt="">
      <!-- <img src="http:\\lg.com\upload\20190430110738_custom_qrcode_5cc7bbfabc3b8.png" alt=""> -->
      
    </mt-popup>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: '页面名称',
  components: {
    // 搭建：引入组件
  },
  computed:{
    // 搭建：计算属性
    ...mapState({
      userInfo: state => state.userInfo,
      config: state => state.config,
    })
  },
  data() {
    return {
      // 搭建：赋值
      prices: {
        1: 100,
        2: 200,
        3: 300,
        4: 500,
        5: 1000,
        6: 2000,
        7: 5000,
        8: 10000,
      },
      topupMenoy: '', //绑定输入框的金额
      count: -1, //判断金额选中状态
      paymentcount: -1, //判断支付渠道选中
      payWays: [], //存放获取到的支付列表
      //提交的支付金额以及支付渠道
      list: {
        value: '',
        order_amount: ''
      },
      isInput: '',
      value: '',
      popupVisible: false,
      customer: '',
    }
  },
  created() {
    this.payList();
    this.getCustomerService();
  },
  methods:{
    // 搭建：函数方法
    choicemenoy(menoy,index){
      this.topupMenoy = menoy;
      this.count = index;
    },
    // 获取客服二维码
    getCustomerService(){
      this.$api.userCustomerService().then(res => {
        if(res.code == '00'){
          console.log(res);
          this.customer = res.data;
          console.log(this.customer);
        }
      })
    },
    payment(index){
      this.paymentcount = index;
      this.prices = this.payWays[index].money;
      this.count = 0;
      this.topupMenoy = this.payWays[index].money[0];
      this.isInput = this.payWays[index].isInput;
      this.value = this.payWays[index].value;
    },
    payList() {
      var type = this.isWeChat() ? 'weChat' : 'h5';
      this.$api.payPayOption({type: type})
        .then(res => {
          if (res.code === '00') {
            this.payWays =this.payWays.concat(res.data) ;
            // console.log(this.payWays);
            this.$emit('getPayWays', this.payWays);
            // if (this.payWays.length > 0 ) {
            //   this.form.payType=this.payWays[this.selectedIndex].value;
            // }
          } else {
            this.$toast(res.msg);
          }
        })
    },
    allPay(){
      if(this.paymentcount >= 0){
        if(this.topupMenoy > 0){
          this.list.value = this.value;
          this.list.order_amount = this.topupMenoy * 100;
          // console.log(this.list);
          this.$api.payPay(this.list).then(res => {
            if(res.code == '00'){
                // if (this.isApp()) {
                //   console.log("这是app");
                this.goto({name: 'ConfirmPay', query: {src: res.data}});
                // } else {
                //   console.log("这是浏览器");
                //   window.location.href=  res.data;
                // }
              // this.goto({name: 'ConfirmPay', query: {src: res.data}});
            }
          })
        }else{
          this.$toast("请设置充值金额");
        }
      }else{
        this.$toast("请选择支付渠道");
      }
      this.topupMenoy = '';
    },
    inputFocus(){
      this.count = -1;
    }
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.topup-name{
  margin-top: 7vh!important;
  border-bottom: 1px solid rgb(228, 228, 228);
  p{
    margin: 12px 0;
    margin-left: 5vw;
    text-align: left;
  }
}
.topup-money{
  text-align: left;
  p{
    margin: 12px 0 20px;
    margin-left: 5vw;
    color: rgb(250, 44, 180);
  }
  input{
    width: 85.8vw;
    height: 5.5vh;
    margin-left: 5vw;
    background-color: rgb(245, 245, 245);
    border: none;
    padding-left: 2vw;
    font-size: 15px;
    border-radius: 5px; 
    color: rgb(32, 32, 32);
    border: 1px solid #f3f3f3;
  }
  input:focus { 
    outline: none; 
    border: 1px solid #d6d6d6; 
  }
  .select-area {
    padding-bottom: 1vh;
    width: 90vw;
    margin-left: 3.8vw;
    margin-top: 1vh;
    .price-container {
      width: 22%;
      display: inline-block;
      margin:1.2% 1.5%;
      .btn-price{
        width: 100%;
        background: none;
        border: 1px solid rgb(212, 212, 212);
        font-size: 14px;
        height: 5vh;
      }
      .btn-price.selected{
        color: rgb(250, 44, 180);
        border: 1px solid rgba(250, 44, 180);
      }
    }
  }
  .topup-payment{
    width: 87%;
    margin: auto;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid rgb(241, 241, 241);
    position: relative;
    img{
      width: 28px;
      margin:0 5px;
      vertical-align: middle;
    }
    span{
      font-size: 15px;
      vertical-align: middle;
    }
    .mint-radio-core{
      position: absolute;
      top: 38%;
      right: 3%;
    }
    .payment-red::after{
      background-color: rgb(0, 159, 233);
      transform: scale(1);
    }
  }
  .topup-payment2{
    border-bottom: 1px solid #F5F5F5;
  }
}
.topup-list-buttom{
    p{
      width: 90%;
      height:42px;
      margin: 20px auto;
      text-align: center;
      border-radius: 3px;
      background: linear-gradient(to right, rgb(250, 44, 180), rgb(255, 53, 130));
      line-height: 42px;
      color: #fff;
      font-size: 15px;
    }
}
.topup-list-kefu{
  text-align: right;
  span{
    // text-align: right;
    margin-right: 4vw;
    font-size: 14px;
    color: rgb(65, 65, 65);
    i{
      font-size: 14px;
      // margin-top: 2px;
    }
  }
}
.popupVisible{
  width: 50vw;
    height: 50vw;
  img{
    width: 50vw;
    height: 50vw;
    background:#000;
    border:1px solid rgb(238, 238, 238);
    border-width:5px 5px 5px 5px;
    box-shadow:1px 1px 5px #333;
    -webkit-box-shadow:1px 1px 5px #333;
    -moz-box-shadow:1px 1px 5px #333;
  }
}
</style>