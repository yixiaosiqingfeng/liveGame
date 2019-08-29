<template>
  <section class="page">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <div class="setting">
        <div class="setting-portrait">
            <span>头像</span><span @click="remImg()">
            <img v-if="userLiat.user_head" :src="getImgURL(userLiat.user_head)" alt="">
            <img v-else src="../../assets/img/timg (2).jpg" alt="">
            <i class="iconfont icon-youjiankuohao"></i></span>
        </div>
        <div class="setting-div"></div>
        <div class="setting-list">
            <div><span>称呢</span><span class="setting-list-span"><input type="text" v-model="userName" @focus="getUserName()" @blur="remUserName()" @keyup.enter="remUserName()"><i class="iconfont icon-youjiankuohao"></i></span></div>
            <div><span>手机号码</span><span class="setting-list-span">{{userInfo.user_phone}}<i class="iconfont icon-youjiankuohao"></i></span></div>
            <div><span>实名认证</span>
            <span v-if="userLiat.is_realname == 0" class="setting-list-span" @click="remPasswork()">点击认证<i class="iconfont icon-youjiankuohao"></i></span>
            <span v-else class="setting-list-span">已认证<i class="iconfont icon-youjiankuohao"></i></span>
            </div>
        </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="right">
      <div class="popupRight">
        <div class="popupRightDiv">
          <div class="popupRightHead"><i class="iconfont icon-fanhui" @click="popupVisiblec()"></i><span>实名认证</span></div>
          <div class="ForgetDiv">
            <input type="text" v-model="realName" placeholder="请输入真实姓名">
            <input type="text" v-model="realId" placeholder="请输入身份证号码">
            <p @click="editReal()">立即认证</p >
          </div>
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupImg"
      position="bottom"
    >
      <vue-core-image-upload :url='options.url' text='' :inputOfFile='options.paramName' compress='50' :isXhr='true' :credentials='false' :headers='options.headers' @imageuploading="imageuploading" @imageuploaded="imageuploaded" @errorhandle="errorhandle" inputAccept='image/*'>
        <div class="popupImgDiv">
        <img src="../../assets/img/suoyin.png" alt=""><span>点击选择上传照片</span>
      </div>
      </vue-core-image-upload>
    </mt-popup>
  </section>
</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Popup } from 'mint-ui';
import CONFIG from '@@/config';
import VueCoreImageUpload from 'vue-core-image-upload';
import { mapState } from "vuex";
Vue.component(Popup.name, Popup);
export default {
  name: '页面名称',
  components: { VueCoreImageUpload },
  computed:{
    // 搭建：计算属性
  },
  data() {
    return {
      // 搭建：赋值
      userName: '', //用户名
      userLiat: [], //用户信息
      popupVisible: false, //修改密码页面
      realName: '', //真实姓名
      realId: '', //身份证
      userInfo: '', //用户信息
      popupImg: false, //控制选择头像的
      options: {
        url: CONFIG.baseURL + '/user/editUserInfo ',
        paramName: 'file',
        headers: {
          'token': 'bearer ' + window.localStorage.getItem('token'),
        },
      }, //这是上传头像的
    }
  },
  computed: {
    // ...mapState({
    //   isLogin: state => state.isLogin,
    //   userInfo: state => state.userInfo
    // })
  },
  created(){

    //   this.userName = this.userInfo.user_nickname;
    // 搭建：进入页面时执行
    if (window.localStorage.getItem("token")) {
      this.$api.userMyInfo().then(res => {
        if(res.code == "00"){
          this.userLiat = res.data;
          if(!this.isLogin){
            this.userInfo = this.userLiat;
            this.userName = this.userInfo.user_nickname;
          }
        }
      });
    } else {
      this.goto({ name: "Login" });
    }
  },
  methods:{
    // 搭建：函数方法
    // 点击选中input
    getUserName(){
      this.userName = '';
    },
    // input失去焦点
    remUserName(){
      if(this.userName == ''){
        this.userName = this.userInfo.user_nickname;
        return;
      }
      MessageBox.confirm('', { 
         message: '是否修改用户名', 
         title: '提示', 
         confirmButtonText: '确定', 
         cancelButtonText: '取消' 
         }).then(action => { 
         if (action == 'confirm') {     //确认的回调
              this.eidtUserName();
         }
         }).catch(err => { 
         if (err == 'cancel') {     //取消的回调
            this.userName = this.userInfo.user_nickname;
         } 
      });
    },
    // 退出登录
    loginOut() {
      this.$api.getLogout().then(res => {
        if (res.code === "00") {
          window.localStorage.removeItem("token");
          this.$toast("退出登录成功");
          this.$store.commit("setLoginStatus", false);
          this.$store.commit("setUserInfo", {});
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.$toast(res.msg);
        }
      });
      this.$router.push({path:'/login'})
    },
    // 实名认证
    editReal(){
      if(this.newPassword == this.newPasswords){
        this.$api.userRealName({name:this.realName,idCard:this.realId}).then( res => {
          if(res.code == "00"){
            this.popupVisiblec();
            Toast("修改成功");
          }else{
            Toast(res.msg);
          }
        })
      }
    },
    // 实名认证
    remPasswork(){
      this.popupVisible = true;
    },
    // 关闭实名认证
    popupVisiblec(){
      this.popupVisible = false;
      this.realId = '';
      this.realName = '';
    //   this.newPasswords = '';
    },
    // 修改用户名
    eidtUserName(){
      this.$api.userEditUserInfo({nickname:this.userName}).then( res => {
          if(res.code == "00"){
            Toast("修改成功");
          }else{
            Toast(res.msg);
          }
      })
    },
    // 修改头像
    remImg(){
      this.popupImg = true;
    },
    // 开始上传
    imageuploading(res) {
      this.$indicator.open({
        text: '上传中...',
        spinnerType: 'fading-circle'
      });
    },
    // 上传完成
    imageuploaded(res) {
      this.$indicator.close();
      if (res.code === '00') {
        this.$toast(res.msg);
        this.popupImg = false;
        setTimeout(() => {
          this.$router.push('/person');
        }, 500);
      } else {
        this.$toast(res.msg);
      }
    },
    // 上传失败
    errorhandle(err) {
      this.$indicator.close();
      this.$toast('上传失败: ' + err);
    },
  }
}
</script>


<style lang='less' scoped>
.setting{
  margin-top: 6vh;
  font-size: 15px;
  color: #616161;
    .setting-div{
        width: 100vw;
        height: 10px;
        background-color: rgb(243, 243, 243);
    }
    .setting-portrait{
        width: 92vw;
        height: 9.5vh;
        min-height: 80px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-flow:  row nowrap;
        justify-content: space-between;
        span{
            img{
                width: 13vw;
                height: 13vw;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 8px;
            }
            i{
                font-size: 13px;
                color: rgb(116, 116, 116);
                vertical-align: middle;
            }
        }
    }
    .setting-list{
        margin-top: 12px;
        height: 24vh;
        min-height: 220px;
        width: 100vw;
        background-color: #fff;
        text-align: left;
        div{
            width: 92vw;
            margin: 0 auto;
            padding: 2.3vh 0;
            .setting-list-span{
                float: right;
                text-align: right;
                input{
                    // margin-right: 4px;
                    font-size: 15px;
                    border:none;
                    outline:medium;
                    text-align: right;
                    color: #616161;
                    // margin-right: 10px;
                }
                // span{
                //     margin-right: 10px;
                // }
            }
            i{  
                margin-left: 12px;
                font-size: 13px;
                margin-top: 5px;
            }
        }
    }
    .setting-btn{
        margin-top: 14vh;
        button{
            border: none;
            width: 92vw;
            height: 6vh;
            min-height: 38px;
            border-radius: 5px;
            background: linear-gradient(to right, rgb(250, 44, 180), rgb(255, 53, 130));
            font-size: 16px;
            color: white;
        }
        button:focus{outline:none;}
    }
}
.popupRight{
  width: 100vw;
  height: 100vh;
  .popupRightHead{
    height: 7vh;
    line-height: 7vh;
    // border-bottom: #f0f0f0 1px solid;
    position: fixed;
    top: 0;
    z-index: 1000;
    i{
      position: absolute;
      padding-left: 4vw;
    }
    span{
      display: inline-block;
      width: 100vw;
      margin: 0 auto;
    }
  }
  .ForgetDiv{
    width: 92vw;
    margin: 0 auto;
    padding-top: 15vh;
    input{
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background: rgb(246, 246, 246);
    text-indent: 10px;
    outline: none;
    border: none;
    margin-top: 20px;
    }
    input:nth-child(1){
    margin-top: 0px;
    }
    div:nth-child(2){
    margin-top: 20px;
    position: relative;
    span{
    position: absolute;
    display: block;
    width: 25%;
    height: 30px;
    line-height: 30px;
    background: #cccccc;
    color: white;
    font-size: 14px;
    border-radius:5px; 
    right: 10px;
    top:50%;
    transform: translate(0,-50%);
    }
    }
    p{
    margin-top: 23%;
    overflow: hidden;
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-radius: 5px;
    background: linear-gradient(to right, rgb(250, 44, 180), rgb(255, 53, 130));
    color: #eeeeee;
    }

  }
}
.popupImgDiv{
  height: 100px;
  width: 100vw;
  background-color: #fff;
  text-align: left;
  img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 20px;
    margin-top: 15px;
  }
  span{
    display: inline-block;
    margin-left: 20px;
    margin-top: 15px;
    vertical-align: middle;
    font-size: 18px;
  }
}
</style>