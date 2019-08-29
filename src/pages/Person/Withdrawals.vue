<template>
  <section class="page withlocals">
    <v-header title='账户提现' ></v-header>

    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <!-- 用户标题 -->
    <div class="withlocalsTitle">
      <div class="TitleLeft">
        <img v-if="userInfo.user_head" :src="getImgURL(userInfo.user_head)" alt="">
        <img v-else class="" src="@/assets/img/user-default.png" >
      </div>
      <div class="TitleRight">
        <h3 class="">{{isLogin ? (userInfo ? userInfo.user_nickname : '请登录') : '请登录'}}</h3>
        <span class="">可提现资金: <span>{{userInfo.user_money}}</span>元</span>
      </div>
    </div>
    <!-- 用户标题 end -->
    <!-- 提现金额 -->
    <div class="cashWithdrawal">
        <div>
            <div @click="switchBankCard" class="cashWithdrawalDiv">
                <span >选择提现到账方式</span>
                <span ><i class="iconfont icon-youjiankuohao"></i></span>
                <span>{{this.card_number}}</span>
            </div>
           
        <!-- 选择银行卡 -->
          <mt-popup
            v-model="popupVisible"
            position="right"
            modal="false">
            <div class="BankCardS">
            <!-- 选择头部 -->
               <mt-header title="选择到账银行" >
                <span slot="left">
                    <mt-button icon="back" @click="switchBankCard">取消</mt-button>
                </span>
                <mt-button class="BankCardSRighty"  slot="right">
                    <router-link to="/bind-bankcard" tag="span">
                        <i class="iconfont icon-addTodo-nav"></i>
                    </router-link>
                </mt-button>
            
                </mt-header> 
            <!-- 选择头部 end -->
            <!--  银行卡选择-->
            <div class="ChoiceBankCard">
                <ul>
                    <h3 v-if="(userdata=='')" class="showBank">暂无银行卡,请添加银行卡 </h3>
                    <li v-for="(item,index) in userdata" :key="item.index" :class="{BankCardFocus:index==current}" @click="getArr(index,item.bank_name,item.card_number,item.id)">
                        <div>
                            <div class="choiceRight">
                                <span>{{ item.bank_name }}</span>
                                <span><i class="iconfont icon-icon--yes choiceRightColor" ></i></span>
                                <span>尾号 {{ item.card_number }} 储蓄卡</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--  银行卡选择 end-->
            </div>
            </mt-popup>
        <!-- 选择银行卡 end-->

        </div>
        <div class="CashAmount">
            <p>提现金额</p>
            <div class="CashAmountInput">
                <p>&yen;</p><input type="text"  @keyup="getinput($event)" v-model="userMonery">
            </div>
           
            <p>最小提现金额 {{withdrawOrigin.min_withdraw}}元</p>
            <p>提现将收取提现金额的{{withdrawOrigin.fee}}%作为佣金</p>
        </div>
        <!-- <input class="CashBtn" type="button" :value="getinputMsg" ref="CashBtn"  :disabled="flag" @click="cashWithdrawal"> -->
    </div>
    <p class="CashBtn"  :class='{"CashBtnFlag": flag}'  @click="cashWithdrawal"  ref="CashBtn" >{{getinputMsg}}</p>
    <!-- 提现金额 end -->
  </section>
</template>

<script>
import VHeader from '@/components/VHeader';
import {mapState} from 'vuex';

export default {
  name: '页面名称',
  components: {
    // 搭建：引入组件
    VHeader
  },
  computed:{
    // 搭建：计算属性
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.userInfo,
    }),
   
  },
  data() {
    return {
      // 搭建：赋值
      popupVisible:false,
      userMonery:'',//金额
      userBid:'',//银行卡id
      userdata:[],//银行卡信息,
      card_number:'',//截取四位小数
      current:0,//焦点判断
      flag:true,//按钮判断
      getinputMsg:'预计到账时间为1个工作期内',
      ServiceCharge:"",
      username:"",//用户名字
      BankcardId:"",//卡号
      withdrawOrigin: [], //提现信息
      witType: false, //提现状态
    }
  },
  created(){
    // 搭建：检查登录
    // this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});

    // if (window.localStorage.getItem('token')) {
    //     this.getUserInfo();
    // } else {
    //     this.goto({name: 'Login'}); 
    // };
    //获取银行卡
    this.getbankcard();
    this.getOrigin();
    // // 获取提现金额
    // this.getConfig()
    // .then(res => {
    //     this.ServiceCharge = res.data;
    //     this.getinputMsg =  '预计到账时间为'+res.data.withdraw_day+'天后';
    // })payWithdrawOrigin

 
},
mounted(){
    // 曲线救国解决当前页面因html基数过大 rem比例变大的问题
    document.getElementsByTagName("HTML")[0].style.fontSize=16+"px"
},
methods:{
    //  选择银行卡开关
   switchBankCard(){
       this.popupVisible=!this.popupVisible;
   },
    //  选择银行卡焦点
   getArr(index,name,card_number,bankid){
    this.current=index;
    this.card_number=name+"("+card_number.substring(card_number.length-4)+")";
    this.BankcardId=bankid;//kaid
    this.switchBankCard();
   },
    //  获取银行卡信息  
   getbankcard(){
     this.$api.userBankcardList()
    .then(res => {
        if (res.code === '00') {
            this.$indicator.close();
            this.userdata=res.data
            // console.log(this.userdata);
            // 拼接第一个银行卡
            this.card_number=(res.data[0].bank_name +"("+ res.data[0].card_number.substring(res.data[0].card_number.length-4)+")")
            this.Bankcard=res.data[0].card_number;//kaid
            this.BankcardId=res.data[0].id; 
        } else {
            this.$toast(res.msg);
        }
    })
   },
    // 初始化提现信息
    getOrigin(){
        this.$api.payWithdrawOrigin().then(res => {
            if(res.code == '00'){
                // console.log(res);
                this.withdrawOrigin = res.data;
            }
        })
    },
    //    提现
   cashWithdrawal(){
       if(this.witType){
           return;
       }
       this.witType = true;
    if(Number(this.userMonery) < Number(this.withdrawOrigin.min_withdraw)){
        this.userMonery=""
        this.flag = true;
        this.getinputMsg =  '预计到账时间为1个工作期内';
        this.$toast("提现金额不能少于"+this.withdrawOrigin.min_withdraw);
    } else{
        this.flag = true;
        this.$api.payWithdraw(
            {
                order_amount:this.userMonery * 100,
                bank_id:this.BankcardId
            }
        )
        .then(res => {
            this.witType = false;
            if (res.code === '00') {
                this.$toast('提现成功');
                // 绑定成功后更新用户信息
                this.getUserInfo()
                .then(res => {
                    this.flag = true;
                    this.goto({name: 'Person'});
                })
            } else {
                this.$toast(res.msg);
            }
        })
       }
     
   },
    // 按钮检查
   getinput(event){
       if(isNaN(event.target.value)){
        event.target.value=""
        this.$toast("请输入数字");
       } else if (!event.target.value == "" ) {
        this.flag = false;
        this.getinputMsg = '立即提现'
       } else {
        this.flag = true;
        // this.getinputMsg =  '预计到账时间为'+this.ServiceCharge.withdraw_day+'天后';
        this.getinputMsg =  '预计到账时间为1个工作期内';
       }  
   }
  },
  destroyed: function () {
    //离开页面清除html当前影响
    document.getElementsByTagName("HTML")[0].style.fontSize=""
  },
  beforeRouteLeave (to, from, next) {
    this.$indicator.close();
    next();
  },
}
</script>


<style lang='less' >
@import '../../assets/css/_variable.less';

.userAtr{
    // background: rgb(173, 170, 170);
}
.withlocals{
    width: 100vw;
    height: vh;
    padding-top: 7vh;
    overflow: hidden;
    background: rgb(245, 245, 245);
    text-align: left;
    // 头像
    .withlocalsTitle{
        height: 3rem;
        text-align: left;
        padding-top: .4rem;
        background: white;
        .TitleLeft{
            float: left;
            margin-left: 15px;
            width: 2.5rem;
            height: 2.5rem;
            img{
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                border: 1px solid rgb(226, 226, 226);
            }
        }
        .TitleRight{
            float: left;
            margin-left: 10px;
            letter-spacing: 0px;
            h3{
                margin: 0;
                padding: 0;
                font-weight: 500;
                line-height: normal;
                color:#000;
                margin-bottom: 2px;
                font-size: 15px;
            }
            span{
                font-size: 12px;
            }
            
          
        }

    }
    // 提现金额
    .cashWithdrawal{
        // margin-top: 3px;
        background: white;
        position: relative;
        .cashWithdrawalDiv{
            height: 2.4rem;
            line-height: 2.4rem;
            padding-left: 1rem;
            border-top: 15px solid #f1f0f0; 
            border-bottom: 1px solid #f1f0f0;
            font-size: 14px;
            span{
                display: inline-block;
            }
            span:nth-child(2){
               float:right;
               margin-right: 1rem;
               vertical-align: middle;
               margin-top: 1px;
           }
           span:nth-child(3){
               float:right;
           }
        }
        .CashAmount{
            margin-top: 5px;
            // border: 1px solid red;
            p{
                margin: 0;
                padding: 0;
                margin-left: 1rem;
            }
           
            p:nth-child(1){
                margin-top: 0.5rem;
                font-size: 15px;
                color: #5a5656;
            }
            p:nth-child(3){
                margin-top: 5px;;
            }
            p:nth-child(4){
                padding-bottom: 2px;
            }
            p:nth-child(3),p:nth-child(4){
                font-size: 15px;
                color: #969494;
                font-size: 12px;
                line-height: 1.2rem;
                
            }
            .CashAmountInput{
                input{
                    margin: 0;
                    padding: 0;
                    width: 96%;
                    height: 3rem;
                    border: none;
                    border-bottom: 1px solid rgb(236, 236, 236);
                    outline: none;
                    font-size: 28px;
                    margin-left: 1rem;
                    margin-right: 0.5rem;
                    text-indent: 1.2rem;
                }
                 p{
                    position: absolute;
                    font-size: 28px;
                    color: #000000;
                }
            }
           
        }
        .v-modal{
            background-color: rgb(245, 244, 249);
        }
        
    }
 
    .BankCardS{
        width: 100vw;
        height: 100vh;
        color: #000;
        font-size: 16px;
        background-color: rgb(245, 244, 249);
   
      .mint-header {
        background: linear-gradient(to right, rgb(230, 133, 247), rgb(244, 19, 133));
        color: rgb(255, 255, 255);
        font-size: 16px;
        height: 6vh;
      }  
      .BankCardSRighty{
          margin-right: 0.5rem;
          font-weight: 600;
          color: #ffffff;
      }
    }
    .ChoiceBankCard{
        ul{
            height: 92vh;
            background: white;
            padding: 0;
            margin: 0;
            overflow-y: auto;
            li{
                height: 3.8rem;
                list-style: none;
                border-bottom: 1px solid rgb(236, 236, 236);
                .choiceLeft{
                    width: 20%;
                    float: left;
                    img{
                        width: 2.7rem;
                        height: 2.7rem;
                        margin-left: 15px;
                        border-radius: 50%;
                        border: 1px solid rgb(226, 226, 226);
                        margin-top: .5rem;
                    }
                }
            
                .choiceRight{
                    margin: 0;
                    padding: 0;
                    float: left;
                    width:95%;
                    display: block;
                    margin-top: 10px;
                    margin-left: 1rem;
                    span:nth-child(1){
                        display: block;
                        font-size: 15px
                    }
                     span:nth-child(2){
                        margin-top: -5px;
                        float: right;
                        margin-right: 1rem;;
                    }
                     span:nth-child(3){
                        display: inline-block;
                        font-size: 12px;
                        color: #535353;
                    }
                }
            }
            .choiceRightColor{
                color: #aaa;
            }
            .BankCardFocus{
                background: #f1f0f0;
                i{
                    color: red;
                }
            }
        }
    }
    .CashBtn{
        width: 94%;
        text-align: center;
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
    }
    .CashBtnFlag{
        opacity:0.4;
    }
    @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
        .CashBtn{
            margin-top: 15%;
        }
    }
    .showBank{
      height: 30px;
      line-height: 30px;
      color: rgb(32, 34, 34);
      text-align: center;
      font-size: 14px;
    }
}

</style>