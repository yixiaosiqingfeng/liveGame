<template>
  <section class="page backCards">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
     <v-header title='银行卡管理' ></v-header>
     <div class="backCardsDiv">
       <ul>
         <li v-for="(item ,index) in userdata" :key="item.index" ref="bankCardLi" > 
           <div class="backCardsLi" >
             <div class="backCardsLiTop">
               <span class="backCardsLiTopSpan" @click="delBankCard(index,item.id,item.card_number.substring(item.card_number.length-4))"><i class="iconfont icon-quxiao01" ></i></span>
               <!-- <img src="@/assets/img/bankcard.png" alt=""> -->
               
               <div class="backCardsLiRight">
                  <span>{{item.bank_name}}</span>
                  <span>{{item.branch}}</span>
                  <span>**** **** **** <sup>{{item.card_number.substring(item.card_number.length-4)}}</sup></span>
               </div>
             </div>
           </div>
         </li>  
       </ul>
       <h3 class="showBank" v-if="(userdata=='')">暂无银行卡,请添加银行卡</h3>
        <router-link to="/bind-bankcard" tag="div" class="addCards">
        <span><i class="iconfont icon-addTodo-nav"></i></span>
          添加银行卡
        <span><i class="iconfont icon-youjiankuohao"></i></span>
        </router-link>
     </div>
  </section>
</template>

<script>
import VHeader from '@/components/VHeader';
export default {
  name: '页面名称',
  components: {
    // 搭建：引入组件
    VHeader
  },
  computed:{
    // 搭建：计算属性
  },
  data() {
    return {
      // 搭建：赋值
      userdata:[],//银行卡信息
      BankcardId:'',//卡号id
    }
  },
  created(){
    // 搭建：进入页面时执行
    this.getbankcard();
    this.$indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
  },
  mounted(){
    // 曲线救国解决当前页面因html基数过大 rem比例变大的问题
    document.getElementsByTagName("HTML")[0].style.fontSize=16+"px"
   },
  methods:{
    //  获取银行卡信息  
   getbankcard(){
     this.$api.userBankcardList()
    .then(res => {
      if (res.code === '00') {
        this.$indicator.close();
        this.userdata=res.data
        // 拼接第一个银行卡
        this.card_number=(res.data[0].bank_name +"("+ res.data[0].card_number.substring(res.data[0].card_number.length-4)+")")
        this.Bankcard=res.data[0].card_number;//kaid
        this.BankcardId=res.data[0].id;
        this.userdata=res.data
        // 拼接第一个银行卡
        this.BankcardId=res.data[0].id;
      } else {
        this.$toast(res.msg);
      }
    })
   },
   delBankCard(index,userid,bankcard){
    this.$messagebox.confirm("确定删除尾号"+bankcard+"的银行吗?").then(action => {
        this.$api.userDelBankcard(
          {bid:userid}
        )
        .then(res => {
          if (res.code === '00') {
            this.$toast("删除成功");
            this.userdata.splice(index,1);  
          } else {
            this.$toast(res.msg);
          }
        })
    });
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


<style lang='less' scoped>
@import '../../assets/css/_variable.less';

.backCards{
  // margin-top: 6vh;
  text-align: left;
  .backCardsDiv{
    padding-top: 6vh;;
    ul{
      margin: 0;
      padding: 0;
      li{
        width: 96%;
        margin: 3px auto;
        height: 6.6rem;
        // border: 1px solid red;
        border-radius: 3px;
        background: rgb(50, 145, 223);
        list-style: none;
        .backCardsLi{
          position: relative;
           height: 5rem;
           padding-top: 0.7rem;
          .backCardsLiTop{
              img{
                width: 2.0rem;
                height: 2.0rem;
                margin-left: 15px;
                // border-radius: 50%;
                vertical-align: top;
              }
          }
          .backCardsLiTopSpan{
            position: absolute;
            top: 11px;
            right:11px;
            i{
              color: rgb(233, 232, 232);
              opacity: .7;
              font-size: 18px;
            }
          }
          .backCardsLiRight{
              display: inline-block;
              position: relative;
              margin-left: 5%;
              color: rgb(243, 242, 242);
              span:nth-child(1){
                display: block;
                font-size: 14px;
                color: white;
                font-weight: 600;
              }
              span:nth-child(2){
                display: block;
                line-height: 2;
                font-size: 12px;
                color: #e4e3e3;
              }
              span:nth-child(3){
                display: block;
                margin-top: 5px;
                letter-spacing: 1px;
                font-size: 28px;
                color:white;
              }
              
          }
        }  
      }
      .lired{
        background: rgb(199, 79, 88)
      }
      .liViolet{
        background: rgb(142, 90, 201)
      }
      .liRreen{
        background: #0FC497;
      }
    }
    .addCards{
      width: 100vw;
      height: 35px;
      line-height: 35px;
      background: rgb(245, 243, 243);
      margin-top: 5px;
      font-size: 15px;
      span:nth-child(1){
        margin-left: 3.5%;
        color: rgb(128, 126, 126);
        font-weight: 600;
      }
      span:nth-child(2){
        margin-right: 4%;
        float: right;
        font-size: 14px;
      }
      span:nth-child(3){
        float:right;
        margin-right: 2%;
        color: rgb(128, 126, 126);


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
}
</style>