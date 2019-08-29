<template>
  <section class="page">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <div class="login">
        <div class="login-logo">
          <div>
            <img src="../../assets/img/logo.png" alt="">
          </div>
        </div>
        <div class="login-input">
            <div><label for=""><i class="iconfont icon-yonghu"></i><input v-model='form.phone' type='tel' placeholder="请输入手机号码"></label></div>
            <div><label for=""><i class="iconfont icon-mima"></i><input v-model="form.password" type="password" placeholder="请输入登录密码"></label></div>
        </div>
        <div class="login-btn" @click="login()">
            登录
        </div>
        <router-link to="/forget-pwd" tag="div" class="login-pwd">
            <span>忘记密码</span>
        </router-link>
        <router-link to="/register" tag="div" class="login-res">
            <span>立即注册</span>
        </router-link>
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
        form: {
            phone: '',
            password: '',
        },
    }
  },
  created(){
    // 搭建：进入页面时执行
  },
  methods:{
    // 搭建：函数方法
    //  登录
    login() {
        if (this.validate(this.form)) {
            this.$api.userLogin(this.form)
              .then(res => {
                if (res.code === '00') {
                // console.log(res);
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
    .login-logo{
        height: 244px;
        width: 100vw;
        div{
          padding-top: 80px;
          img{
            width: 20vw;
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
    .login-input{
        width: 92vw;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 5px;
        text-align: left;
        div{
            width: 80vw;
            margin: 0 auto;
            padding: 22px 10px;
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
        }
        @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
          div{
            padding: 16px 16px;
            span{
              padding: 5px;
              font-size: 12px;
              margin-top: -2px;
            }
          }
        } 
        @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
          div{
            padding: 14px 14px;
            span{
              padding: 5px;
              font-size: 12px;
              margin-top: -2px;
            }
          }
        }
    }
    .login-btn{
        width: 92vw;
        margin: 0 auto;
        height: 52px;
        line-height: 52px;
        background-color: #fff;
        border-radius: 5px;
        margin-top: 22px;
        color: #BA3FBD;
    }
    @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
      .login-btn{
       height: 48px;
       line-height: 48px;
       font-size: 15px;
       }
       } 
    @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
     .login-btn{
       height: 42px;
       line-height: 42px;
       font-size: 14px;
       }
       }
    .login-pwd{
        text-align: right;
        margin: 10px 0;
        span{
            // text-align: right;
            margin-right: 40px;
            color: rgb(243, 243, 243);
        }
    }
    .login-res{
        // text-align: right;
        margin: 10px 0;
        span{
            // text-align: right;
            // margin-right: 40px;
            color: rgb(247, 247, 247);
        }
    }
}
</style>