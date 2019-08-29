<template>
  <div id="app">
    <v-header :title="title" :hideBack='hideBack' v-if='showHd'></v-header>
    <router-view :class='{"page-has-header": showHd,"page-has-tabbar": showTab}'/>
    <updata-popup :visible='upPopupVisible' :title = "'更新提示'" :html='tip' @cancel='cancelToast' @confirm='upToast'></updata-popup>

    <tabbar v-if='showTab'></tabbar>
  </div>
</template>

<script>
document.addEventListener('plusready', function() {
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener('backbutton', function() {
    webview.canBack(function(e) {
      if(e.canBack) {
        webview.back();
      } else {
        //webview.close(); //hide,quit
        //plus.runtime.quit();
        //首页返回键处理
        //处理逻辑：1秒内，连续两次按返回键，则退出应用；
        var first = null;
        plus.key.addEventListener('backbutton', function() {
          //首次按键，提示‘再按一次退出应用’
          if (!first) {
            first = new Date().getTime();
            Vue.$toast('再按一次退出应用');
            setTimeout(function() {
              first = null;
            }, 1000);
          } else {
            if (new Date().getTime() - first < 1500) {
              plus.runtime.quit();
            }
          }
        }, false);
      }
    })
  });
});

  import VHeader from '@/components/VHeader';
  import Tabbar from '@/components/Tabbar';
  import UpdataPopup from '@/components/UpdataPopup';
  import axios from '@/assets/js/http';
  import {mapState} from 'vuex';
  import CONFIG from '@@/config';


export default {
  name: 'App',
  components: {VHeader,Tabbar,UpdataPopup},
  computed: {
    showHd() {
      return this.$route.meta.showHd;
    },
    showTab() {
      return this.$route.meta.showTab;
    },
    title(){
      return this.$route.meta.title;
    },
    hideBack(){
      return this.$route.meta.hideBack;
    }
  },
  data(){
    return {
      upPopupVisible:false,
      tip:'更新啦',
      upUrl:'http://www.baidu.com',
      ws:''//ws 长链接
    }
  },
  created(){
    // 链接聊天的服务器
    this.getConnect();

    // 搭建：检查更新
      // this.checkAppUpdateInfo(); 

    // 搭建：系统配置
      // this.getConfig() 
      // .then(res => {
        this.initTitle();
      // })
      this.watchRouter();

    // 搭建：检查登录
      // if (window.localStorage.getItem('token')) { 
      //     this.getUserInfo();
      //   } else {
      //     this.goto({name: 'Login'});
      // }
  },
  mounted() {

  },
  methods:{
    // 
    getConnect(){
      // 聊天室的信息存vuex
      var ws = new WebSocket(CONFIG.baseURLWebSocket);
      ws.onopen = function() {
          // 这里给后端发送用户信息 房间id
          ws.send('{"type":"get_client_id"}');
      };
      ws.onclose = function() {
    	  console.log("连接关闭，定时重连");
          this.getConnect();
       };
       ws.onerror = function() {
     	  console.log("出现错误");
       };
      ws.onmessage = (e)=> {
          // 后端返回信息
          var data = JSON.parse(e.data);
          switch(data['type']){
            case 'get_client_id':
              this.$store.commit('clientId', JSON.parse(e.data).from_client_id);
            break;;
          }
      };
      this.$store.commit('wsObj', ws);
    },
    // 初始化title（进入或刷新）
    initTitle() {
      setTimeout(() => {
        document.title = this.$store.state.systemName + this.$route.meta.title;
      }, 100);
    },

    // 路由跳转时检测是否需要登录

    watchRouter() {
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.title) {
          document.title = this.$store.state.systemName + to.meta.title;
        }
        if (to.matched.some(record => record.meta.requireAuth)) {
          if (!this.$store.state.isLogin) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next();
          }
        } else {
          next();
        }
        // 每次路由跳转都会滚动到顶部
        window.scrollTo(0, 0);
      })
    },

    // 关闭弹框

    cancelToast() {
      this.upPopupVisible = false;
    },

    // 跳转更新

    upToast() {
      window.location.href = this.upUrl
    },
    
    // 检测APP升级信息

    // checkAppUpdateInfo() {
    //   this.$api.getAppUpdateInfo()
    //   .then(res => {
    //     if (res.code === '00') {
    //       if (this.$store.state.appVersion !== res.data.version) {
    //         this.tip = res.data.tip;
    //         this.upUrl = res.data.url;
    //         this.upPopupVisible = true;
    //       }
    //     }
    //   }).catch(err => {
    //     console.log('getAppUpdateInfo: ', err);
    //   })
    // },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}
body{
  margin: 0;
  /* height: 100vh; */
  background-color: #fff;
}

.mint-toast, .is-placemiddle{
    z-index: 9999999999 !important;
}
.mint-msgbox-wrapper, .mint-indicator-mask{
    z-index: 9999999999 !important;
}
</style>
