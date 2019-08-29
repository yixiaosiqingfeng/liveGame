<template>
  <section class="page">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <div class="modifier">
        <div class="modifier-top">
            <p><span>上次登录IP：</span><span>{{userInfo.ip ? userInfo.ip : '192.168.1.1'}}</span></p>
            <p><span>登录时间：</span><span>{{userInfo.login_time ? userInfo.login_time : '默认登陆时间'}}</span></p>
        </div>
        <div class="modifier-null"></div>
        <div class="modifier-pwd" v-if="userInfo.is_m_password == 1">
            <div><label for="">当前密码：</label><input type="password" v-model="oldPassword" placeholder="请输入当前密码"></div>
            <div><label for="">新密码：</label><input type="password" v-model="newPassword" placeholder="请输入当前密码"></div>
            <div><label for="">确认密码：</label><input type="password" v-model="newsPassword" placeholder="请输入当前密码"></div>
        </div>
        <div class="modifier-pwd" v-else>
            <!-- <div><label for="">当前密码：</label><input type="text" placeholder="请输入当前密码"></div> -->
            <div><label for="">设置密码：</label><input type="password" v-model="password1" placeholder="请输入当前密码"></div>
            <div><label for="">确认密码：</label><input type="password" v-model="password2" placeholder="请输入当前密码"></div>
        </div>
        <div class="modifier-null"></div>
        <div class="modifier-btn">
            <p v-if="userInfo.is_m_password == 1" @click="editPsw()">确认提交</p>
            <p v-else @click="newWord()">立即设置</p>
        </div>
        <div class="modifier-wj">
          <router-link to="/forgetCapot-pwd" tag="span">忘记密码？</router-link>
        </div>
        <div class="modifier-tips">
            <p>温馨提示：</p>
            <p>1：在进行银行卡绑定，转账的资金操作是需要进行资金密码确认</p>
            <p>2：由6-16个字符组成，不能和登录密码相同</p>
            <p>3：请妥善保管好您的资金密码，如遗忘请联系在线客服处理</p>
        </div>
    </div>

  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: '页面名称',
  components: {
    // 搭建：引入组件
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.userInfo
    })
  },
  data() {
    return {
      // 搭建：赋值
      oldPassword: '', //旧密码
      newPassword: '', //新密码
      newsPassword: '', //确认密码

      password1: '', //设置密码
      password2: '', //重复密码
    }
  },
  created(){
    // 搭建：进入页面时执行
  },
  methods:{
    // 搭建：函数方法
    // 修改资金密码userEditMPassword
    editPsw(){
      if(this.newPassword == this.newsPassword){
        this.$api.userEditMPassword({oldPassword:this.oldPassword,password1:this.newPassword,password2:this.newsPassword}).then( res => {
          if(res.code == "00"){
            this.$toast("修改成功");
            this.$router.go(-1);
          }else{
            this.$toast(res.msg);
          }
        })
      }else{
          this.$toast('请正确输入密码')
      }
    },
    // 设置资金密码userSetMPassword
    newWord(){
      if(this.password1 == this.password2){
        this.$api.userSetMPassword({password1:this.password1,password2:this.password2}).then( res => {
          if(res.code == "00"){
            this.$toast("设置成功");
            this.$router.go(-1);
          }else{
            this.$toast(res.msg);
          }
        })
      }else{
          this.$toast('请正确输入密码')
      }
    }
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.page{
    margin-top: 6vh;
    text-align: left;
    height: 94vh;
    // overflow: hidden;
    background-color: rgb(240, 240, 240);
}
.modifier{
    padding-top: 5px;
    font-size: 14px;
    color: rgb(97, 97, 97);
    background-color: #fff;
}
.modifier-top{
    width: 92vw;
    margin: 0 auto;
    p{
        margin: 18px 0;
        span:nth-child(1){
            display: inline-block;
            width: 110px;
        }
    }
}
.modifier-null{
    width: 100vw;
    height: 15px;
    background-color: rgb(240, 240, 240);
}
.modifier-pwd{
    padding: 8px 0;
    div{
        margin: 25px 4vw;
        label{
            font-size: 14px;
            display: inline-block;
            width: 110px;
        }
        input{
            font-size: 14px;
            border: none;
            outline:none;
            width: 50vw;
        }
    }
}
.modifier-btn{
    padding: 20px 0;
    background-color: rgb(240, 240, 240);
    p{
        width: 92vw;
        text-align: center;
        margin: 0 auto;
        height: 50px;
        line-height: 50px;
        color: rgb(240, 240, 240);
        font-size: 14px;
        border-radius: 4px;
        background: linear-gradient(to right, rgb(250, 44, 180), rgb(255, 53, 130));
    }
}
.modifier-wj{
  background-color: rgb(240, 240, 240);
  width: 96vw;
  // padding: 4vw auto;
  padding-right: 4vw;
  text-align: right;
  span{
    margin: 0;
  }
}
.modifier-tips{
    // padding-bottom: 27.9vh;
    // height: 44.4vh;
    background-color: rgb(240, 240, 240);
    p{
        margin: 0 4vw;
        font-size: 14px;
        color: rgb(252, 124, 124);
    }
    p:nth-child(1){
        padding: 10px 0;
    }
}
</style>