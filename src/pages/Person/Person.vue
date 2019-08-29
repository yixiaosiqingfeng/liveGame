<template>
  <section class="page page-has-header page-has-tabbar">
      <div class="person-header">
        <div class="person-header-top" v-cloak>
          <!-- <img src="../../assets/img/timg (2).jpg" alt=""> -->
          <router-link to="/modify-user" tag="div">
            <img v-if="userInfo.user_head != 'http://lg.com/upload/' && userInfo.user_head" :src="getImgURL(userInfo.user_head)" alt="没有用户头像">
            <img v-else src="../../assets/img/timg (2).jpg" alt="系统默认头像" >
          </router-link>
          
          <span >{{isLogin ? (userInfo ? (userInfo.user_nickname ? userInfo.user_nickname : userInfo.phone) : '未登录') : '未登录'}}</span>
          <router-link to="/modify-user" tag="i" class="iconfont icon-shezhi1"></router-link>
        </div>
        <div class="person-header-cent">
          <p>总资产</p>
          <p>{{userInfo ? (userInfo.user_money ? userInfo.user_money : '00.00') : '未登录'}}</p>
        </div>
        <div class="person-header-moneyDiv"></div>
        <div class="person-header-money">
          <!-- <div class="person-header-moneyDiv"></div> -->
          <router-link to="/topup" tag="div"><i class="iconfont icon-chongzhi"></i><span>充值</span></router-link>
          <router-link to="/withdrawals" tag="div"><i class="iconfont icon-tixian"></i><span>提现</span></router-link>
        </div>
      </div>
      <div class="person-list">
        <router-link to="/bet-list" tag="div" class="person-list-line">
          <i class="iconfont icon-touzhujilu1"></i><span>投注记录</span><i class="iconfont icon-you"></i>
        </router-link>
        <router-link to="/fund-list" tag="div" class="person-list-line">
          <i class="iconfont icon-zijin"></i><span>资金记录</span><i class="iconfont icon-you"></i>
        </router-link>
        <router-link to="/profit-report" tag="div" class="person-list-line">
          <i class="iconfont icon-baobiao"></i><span>盈亏报表</span><i class="iconfont icon-you"></i>
        </router-link>
      </div>
      <div class="person-null">
      </div>
      <div class="person-list">
        <router-link to="/bank-cards" tag="div" class="person-list-line">
          <i class="iconfont icon-weibiaoti-"></i><span>银行卡管理</span><i class="iconfont icon-you"></i>
        </router-link>
        <router-link to="/modifier-pwd" tag="div" class="person-list-line">
          <i class="iconfont icon-denglumima"></i><span>登录密码</span><i class="iconfont icon-you"></i>
        </router-link>
        <router-link to="/capital-pwd" tag="div" class="person-list-line">
          <i class="iconfont icon-security"></i><span>资金密码</span><i class="iconfont icon-you"></i>
        </router-link>
      </div>
      <div class="person-null">
      </div>
      <div class="person-list person-listse">
        <router-link to="/system-msg" tag="div" class="person-list-line">
          <i class="iconfont icon-tongzhi"></i><span>系统通知</span><i class="iconfont icon-you"></i>
        </router-link>
      </div>
      <div class="person-outLogin" >
        <div @click="loginOut()" v-if="isLogin">
          退出登录
        </div>
      </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import Tabbar from '@/components/Tabbar';
import { mapState } from "vuex";

export default {
    name: 'Person',
    components: {VHeader,Tabbar},

  data() {
    return {
      userInfo: [], //用户信息
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.userInfo
    })
  },
  created(){
    // if(this.isLogin){
      this.$api.userMyInfo().then(res => {
        if(res.code == "00"){
          this.userInfo = res.data;
          this.$store.commit('setLoginStatus', true);
          this.$store.commit('setUserInfo', res.data);
        }
      })
    // }
    
  },
  methods:{
    // 退出登录
    loginOut() {
      if(this.isLogin){
        this.$api.userLoginOut().then(res => {
          if (res.code === "00") {
            window.localStorage.removeItem("token");
            this.$toast("退出登录成功");
            this.$store.commit("setLoginStatus", false);
            this.$store.commit("setUserInfo", {});
            this.$router.push({path:'/login'});
          } else {
            this.$toast(res.msg);
          }
        });
      }else{
        this.$router.push({path:'/login'});
      }
      // this.$api.userLoginOut().then(res => {
      //   if (res.code === "00") {
      //     window.localStorage.removeItem("token");
      //     this.$toast("退出登录成功");
      //     this.$store.commit("setLoginStatus", false);
      //     this.$store.commit("setUserInfo", {});
      //     this.$router.push({path:'/login'});
      //   } else {
      //     this.$toast(res.msg);
      //   }
      // });
    },
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
[v-cloak] {
  display:none!important;
}
.person-header{
  width: 100vw;
  height: 195px;
  margin-top: 6vh;
  background: linear-gradient(to bottom right, rgb(61, 159, 250),rgb(125, 124, 227),rgb(172, 99, 211),rgb(250, 57, 183), rgb(249, 57, 183));
  .person-header-top{
    padding-top: 10px;
    text-align: left;
    width: 84vw;
    margin: 0 auto;
    position: relative;
    div{
      display: inline-block;
    }
    img{
      width: 56px;
      height: 56px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span{
      display: inline-block;
      vertical-align: middle;
      color: rgb(255, 255, 255);
      font-size: 15px;
      width: 40vw;
      max-width: 40vw;
      margin-left: 16px;
      text-overflow: ellipsis;
      white-space:nowrap;
      overflow:hidden;
    }
    i{
      position: absolute;
      top: 20%;
      right: -2%;
      font-size: 24px;
      color: rgb(248, 248, 248);
    }
  }
  .person-header-cent{
    p{
      margin: 5px;
      color: rgb(241, 202, 85);
    }
    p:nth-child(1){
      font-size: 14px;
    }
    p:nth-child(2){
      font-size: 18px;
    }
  }
  .person-header-moneyDiv{
    background-color: rgb(187, 187, 187);
    width: 86vw;
    margin: 16px auto 0;
    height: 1px;
  }
  .person-header-money{
    width: 100vw;
    // margin: 0 auto;
    margin-top: 1px;
    // border-top: 1px solid rgb(187, 187, 187);
    display: flex;
    height: 52px;
    div{
      margin-top: 10px;
      width: 50%;
      line-height: 35px;
      color: rgb(255, 255, 255);
      i{
        margin-right: 15px;
        font-size: 22px;
        vertical-align: middle;
      }
      span{
        font-size: 16px;
        vertical-align: middle;
      }
    }
    div:nth-child(1){
      border-right: 1px solid rgb(187, 187, 187);
    }
  }
}
.person-list{
  text-align: left;
  .person-list-line{
    width: 84vw;
    margin: 3vh auto;
    position: relative;
    i{
      font-size: 22px;
      margin-right: 20px;
      vertical-align: middle;
    }
    span{
      font-size: 15px;
      color: rgb(97, 97, 97);
      vertical-align: middle;
    }
    .icon-you{
      margin:0;
      position: absolute;
      top: 50%;
      right: 0;
      font-size: 14px;
      transform: translate(0,-50%)
    }
    .icon-touzhujilu1{
      color: rgb(212, 35, 122);
    }
    .icon-zijin{
      color: rgb(255, 142, 35);
    }
    .icon-baobiao{
      color: rgb(255, 201, 131);
    }
    .icon-weibiaoti-{
      color: rgb(47, 138, 208);
    }
    .icon-denglumima{
      color: rgb(109, 224, 253);
    }
    .icon-security{
      color: rgb(53, 140, 237);
    }
    .icon-tongzhi{
      color: rgb(91, 145, 248);
    }
  }
}
.person-listse{
  .person-list-line{
    margin: 2.5vh auto!important;
  }
}
.person-null{
  height: 1.3vh;
  width: 100vw;
  background-color: rgb(241, 241, 241);
}
.person-nulls{
  height: 1vh;
  width: 100vw;
  background-color: rgb(241, 241, 241);
}
.person-outLogin{
  height: 8vh;
  width: 100vw;
  padding-top: 3vh;
  background-color: rgb(241, 241, 241);
  margin-bottom: 50px;
  div{
    width: 90vw;
    margin: 0 auto;
    background-color: rgb(128, 73, 73);
    height: 6vh;
    line-height: 6vh;
    color: rgb(240, 240, 240);
    font-size: 14px;
    border-radius: 4px;
    background: linear-gradient(to right, rgb(250, 44, 180), rgb(255, 53, 130));
  }
}
</style>