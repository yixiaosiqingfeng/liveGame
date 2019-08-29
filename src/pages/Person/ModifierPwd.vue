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
        <div class="modifier-pwd">
            <div><label for="">当前密码：</label><input type="password" v-model="oldPassword" placeholder="请输入当前密码"></div>
            <div><label for="">新密码：</label><input type="password" v-model="newPassword" placeholder="请输入当前密码"></div>
            <div><label for="">确认密码：</label><input type="password" v-model="newPasswords" placeholder="请输入当前密码"></div>
        </div>
        <div class="modifier-null"></div>
        <div class="modifier-btn">
            <p @click="editPsw()">确认提交</p>
        </div>
        <div class="modifier-tips">
            <p>温馨提示：</p>
            <p>1：建议您是要字母和数字的组合，混合大小写，在组合加入下划线等符合</p>
            <p>2：由6-16个字符组成，不能和资金密码相同</p>
            <p>3：请妥善保管好您的登录密码，如遗忘可通过忘记密码找回</p>
        </div>
    </div>

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
      oldPassword: '', //旧密码
      newPassword: '', //新密码
      newPasswords: '', //确认密码
    }
  },
  created(){
    // 搭建：进入页面时执行
  },
  methods:{
    // 搭建：函数方法
    // 修改密码userEditPassword
    editPsw(){
      if(this.newPassword == this.newPasswords){
        this.$api.userEditPassword({oldPassword:this.oldPassword,password:this.newPassword}).then( res => {
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
    // background-color: rgb(244, 244, 244);
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
// i5媒体查询
    @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
      .login-logo{
        height: 174px;
        width: 100vw;
        div{
          padding-top: 60px;
          img{
            width: 20vw;
          }
        }
      }
    } 
    // i4媒体查询
    @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
      .login-logo{
        height: 174px;
        width: 100vw;
        div{
          padding-top: 60px;
          img{
            width: 20vw;
          }
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
        height: 45px;
        line-height: 45px;
        color: rgb(240, 240, 240);
        font-size: 14px;
        border-radius: 4px;
        background: linear-gradient(to right, rgb(250, 44, 180), rgb(255, 53, 130));
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