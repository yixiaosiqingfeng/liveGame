<template>
  <section class="page">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <div class="register">
        <div class="register-logo">
          <div>
            <img src="../../assets/img/logo.png" alt="">
          </div>
        </div>
        <div class="register-input">
            <div><label for=""><i class="iconfont icon-yonghu"></i><input type="text" v-model="form.phone" placeholder="请输入手机号码"></label></div>
            <div>
                <label for=""><i class="iconfont icon-yanzhengma1"></i><input type="text" v-model="form.code" placeholder="请输入验证码" class="yanzhengma"></label>
                <span v-if='leftTime <= 0'  @click='getSms()'>获取验证码</span>
                <span v-else>{{leftTime}}s后重新获取</span>
            </div>
            <div><label for=""><i class="iconfont icon-mima"></i><input type="password" v-model="form.password" placeholder="请输入密码"></label></div>
            <div><label for=""><i class="iconfont icon-mima"></i><input type="password" v-model="form.repassword" placeholder="再次输入密码"></label></div>
            <div><label for=""><i class="iconfont icon-yaoqingren1"></i><input type="text" v-model="form.inviter" placeholder="请输入邀请人ID"></label></div>
        </div>
        <div class="register-btn" @click="register()">
            立即注册
        </div>
        <div class="register-fanhui" @click="goback()">
            返回
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '页面名称',
  components: {
    // 搭建：引入组件
  },
  computed:{
    // 搭建：计算属性
  },
  data() {
    return {
      // 搭建：赋值
      form:{
        phone:'',
        code:'',
        password:'',
        repassword:'',
        inviter: '',
      },
      leftTime:0,//验证码倒计时
      timer: '', //定时器
    }
  },
  created(){
    // 搭建：进入页面时执行
  },
  methods:{
    // 搭建：函数方法
    // 返回
    goback() {
      this.$router.back();
    },
    //  获取短信验证码
    getSms() {
      if (this.validatePhone(this.form.phone)) {
        this.$api.sms({
          phone: this.form.phone,
          type: '0',
        }).then(res => {
          if (res.code === '00') {
            this.leftTime = 60;
            this.timer = setInterval(() => {
              if (this.leftTime <= 0) {
                clearInterval(this.timer);
                return;
              } else {
                this.leftTime--;
              }
            }, 1000);
          } else if (res.code === '03') {
            this.$toast({message: (res.data.msg || res.msg), duration: 3000});
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },
    //  注册
    register() {
      if (this.validate(this.form)) {
        this.$api.userRegister({
          phone:this.form.phone,
          password:this.form.password,
          repassword:this.form.repassword,
          smsCode:this.form.code,
        })
          .then(res => {
            if (res.code === '00') {
              this.$toast('注册成功');
              // 注册成功 自动登录
              this.login()
              // setTimeout(() => {
              //   this.$router.push({name: 'Login'});
              // }, 1500);
            } else {
              this.$toast(res.msg);
            }
          }).catch(err => {
          this.$toast(err);
        })
      }
    },
    //  登录
    login() {
      if (this.validate(this.form)) {
        this.$api.userLogin(this.form)
          .then(res => {
            if (res.code === '00') {
              // 保存token
              window.localStorage.setItem('token', res.data.token);
              this.$toast('登录成功');
              this.$store.commit('setLoginStatus', true);
              
              // if (this.$route.query.redirect) {
              //   this.$router.push(this.$route.query.redirect);
              // } else {
                this.$router.push({name: 'Home'});
              // }

              setTimeout(() => {
                window.location.reload();
              }, 500);
              
            } else {
              this.$toast(res.msg);
            }
          }).catch(err => {
          this.$toast((err || '未知错误'));
        })
      }
    },
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.page{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom right,rgb(209, 71, 184), rgb(131, 165, 226));
    overflow: scroll;
    .register-logo{
        height: 204px;
        width: 100vw;
        div{
          padding-top: 70px;
          img{
            width: 20vw;
          }
        }
    }
    // i5媒体查询
    @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
      .register-logo{
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
      .register-logo{
        height: 134px;
        width: 100vw;
        div{
          padding-top: 30px;
          img{
            width: 20vw;
          }
        }
      }
    }
    .register-input{
        width: 92vw;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 5px;
        text-align: left;
        div{
            width: 80vw;
            margin: 0 auto;
            padding: 18px 10px;
            border-bottom: 1px solid rgb(235, 235, 235);
            label{
                i{
                    // width: 22px;
                    font-size: 22px;
                    color: rgb(128, 128, 128);
                    vertical-align: middle;
                    margin: 0 30px 0 5px;
                }
            }
            input{
                width: 60vw;
                vertical-align: middle;
                border: none;
                outline:none;
            }
            .yanzhengma{
                width: 32vw;
            }
            span{
                display: inline-block;
                background: linear-gradient(150deg,rgb(209, 71, 184), rgb(131, 165, 226));
                float: right;
                padding: 10px;
                margin-top: -8px;
                border-radius: 5px;
                color: rgb(238, 238, 238);
                font-size: 14px;
            }
        }
        @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
          div{
            padding: 13px 13px;
            span{
              padding: 5px;
              font-size: 12px;
              margin-top: -2px;
            }
          }
        } 
        @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
          div{
            padding: 10px 10px;
            span{
              padding: 5px;
              font-size: 12px;
              margin-top: -2px;
            }
          }
        }
    }
    .register-btn{
        width: 92vw;
        margin: 20px auto;
        height: 52px;
        line-height: 52px;
        margin-top: 20px;
        background-color: #fff;
        border-radius: 5px;
        color: #BA3FBD;
    }
    @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
      .register-btn{
       height: 42px;
       line-height: 42px;
       font-size: 15px;
       }
       } 
    @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
     .register-btn{
       height: 38px;
       line-height: 38px;
       font-size: 14px;
       }
       }
    .register-fanhui{
        margin-bottom: 30px;
        color: rgb(243, 242, 242);
    }
    @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
      .register-fanhui{
        margin-bottom: 20px;
        color: rgb(243, 242, 242);
      }
    }
}
</style>