<template>
  <section class="bind-bankcard-page page" :class='{"page-has-header": showHeader}'>
    <!-- <v-header title='添加银行卡' v-if='showHeader'></v-header> -->

      <mt-field @click.native='bankPopupVisible = !bankPopupVisible' class='cell-common cell-region' label="选择银行" type='text' v-model='form.bankcard_name' placeholder='点击选择银行' readonly><i class="iconfont icon-youjiankuohao"></i></mt-field>
      <mt-field @click.native='popupVisible = !popupVisible' class='cell-common cell-region' label="省份城市" type='text' v-model='form.address' placeholder='点击选择地址' readonly><i class="iconfont icon-youjiankuohao"></i></mt-field>
      <mt-field class='cell-common' label="支行名称" type='text' v-model='form.branch' placeholder='例：广州滨江东支行'></mt-field>
      <mt-field class='cell-common' label="卡号" type='tel' v-model='form.card_no' placeholder='请输入银行卡号'></mt-field>
    
      <div class="btn-area">
        <p  class="bindBackBtn" @click="bindBankcard">立即添加</p>
      </div>

    <!-- 省市选择器 -->
    <v-picker :visible='popupVisible' v-on:confirm='selectAddress' v-on:cancel='cancel'></v-picker>
    <bank-picker :visible='bankPopupVisible' v-on:confirm='selectBankName' v-on:cancel='cancelBankPopup'></bank-picker>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import VPicker from '@/components/VPicker';
import BankPicker from '@/components/BankPicker';
import {mapState} from 'vuex';

export default {
  name: 'Withdrawals',
  components: { VHeader, VPicker, BankPicker },
  data() {
    return {
      form: {
        bankcard_name: '', //银行名称
        address: '', //地址
        province: '', //省份
        city: '', //城市
        branch: '', //支行名称
        card_no: '', // 卡号
      },
      popupVisible: false,
      bankPopupVisible: false,
      lastRoute:'',//上一个路由地址
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      config: state => state.config,
    }),
    showHeader(){return true;},    // { return !(this.isWeChat()); },
  },
  created() {
    this.RealName()

  },
  mounted(){
    // 曲线救国解决当前页面因html基数过大 rem比例变大的问题
    document.getElementsByTagName("HTML")[0].style.fontSize=16+"px"
   },
  methods: {
    RealName(){
      // console.log(this.$router.to);
      if(this.userInfo.real_name == ""){
        this.$toast("请实名验证后绑定银行卡")
        this.goto({name: 'Authentication'});

      }
    },
    // 表单提交
    bindBankcard() {
      if (this.validate(this.form)) {
        this.$api.userAddBankcard({
          bankcard_name:this.form.bankcard_name,
          card_no:this.form.card_no,
          province:this.form.province,
          city:this.form.city,
          branch:this.form.branch
        })
        .then(res => {
          if (res.code === '00') {
            this.$toast('绑定银行卡成功');
            // 绑定成功后更新用户信息
            this.getUserInfo()
            .then(res => {
               this.$router.go(-1)
            })
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },
    cancel() {
      this.popupVisible = false;
    },
    cancelBankPopup() {
      this.bankPopupVisible = false;
    },
    // 选择地址
    selectAddress(value) {
      if (value) {
        this.form.province = value.selectedProvince;
        this.form.city = value.selectedCity;
        this.form.address = value.selectedProvince + ' ' + value.selectedCity;
      }
      this.popupVisible = false;
    },
    // 选择银行名称
    selectBankName(value) {
      if (value) {
        this.form.bankcard_name = value.selectedBankName;
      }
      this.bankPopupVisible = false;
    },
  },
  destroyed: function () {
    //离开页面清除html当前影响
    document.getElementsByTagName("HTML")[0].style.fontSize=""
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.page{
  text-align: left;
  margin-top: 6vh;
}
.picker-item{
    font-size: 16px;
    text-align: center;
}
.bind-bankcard-page {
  font-size: 16px;
  .mint-cell-wrapper{
    height: 35px;
    padding: 15px 10px;
    .mint-cell-title{
      text-align: left;
      margin-left: 5px;
    }

   
  }
  .mint-cell {
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: inherit;
    min-height: 45px;
    display: block;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    font-size: 14px;
  }
  .mint-field-core{
    font-size: 14px;
  }
  .mint-cell-value{
    font-size: 14px;
    i{
      float: right;
      margin-right: 2px;
    }
  }
  .mint-cell-text{
    font-size: 14px;
  }
  .bindBackBtn{
    width: 94%;
    margin: 0 auto;
    margin-top: 15%;
    height: 2.6rem;
    line-height: 2.6rem;
    border-radius:5px;
    background: linear-gradient(to right, rgb(250, 44, 180), rgb(255, 53, 130));
    border: none;
    outline: none;
    color: white;
    font-size: 15px;
    letter-spacing: 1px;
    text-align: center;

  }
  @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
        .bindBackBtn{
          top: 55vh;
        }
    }
}

</style>
