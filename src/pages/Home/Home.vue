<template>
  <section class="page homePage">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in rotation" :key="item.id"><img :src="getImgURL(item.src)" alt=""></mt-swipe-item>
    </mt-swipe>
    <!-- 公告 -->
    <div class="homeNotice">
        <span>动态消息 :</span>
        <transition name="slide" >
          <router-link to="/buy" tag="p" class="text"  :key="text.id">
            {{ text.val.title }}
          </router-link>
        </transition>
    </div>
    <!-- 直播间 -->
    <div class="liveList" 
        v-infinite-scroll="getHomes"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <!-- 单行 -->
      <!--  房间号id 主播名字 直播人数  直播链接 -->
      <router-link :to="{path:'/live', query: {rid:item.rid}}"  tag="div" class="liveRow" v-for="item in homeList" :key="item.rid">
        <img :src="getImgURL(item.covers)" alt="" class="liveRowImg">
        <span class="liveRowSum"> <span></span> {{item.total_number>=10000?(item.total_number-item.total_number%1000)/10000+'万':item.total_number}}人 在线</span>
        <div class="atrGo">
          <i class="iconfont icon-bofang "></i>
        </div>
        <div class="liveRowBtm"> 
          <div class="RowBtmSon">
            <img :src="getImgURL(item.anchor_haed)" alt="">
            <span class="one-txt-cut">{{ item.anchor }}</span>
            <span class="one-txt-cut">{{item.room_name}}</span>
            <span :class="{'showLive':item.status != 1}">{{ item.status == 1? '正在直播': '未开播'}}</span>
          </div>
        </div>
      </router-link>
    </div>

  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import Tabbar from '@/components/Tabbar';


export default {
    name: 'Home',
    components: {VHeader,Tabbar},

  data() {
    return {
      bannerlist:[1,2,3,4],
      textArr: [{'title':''}], // 公告
      number: 0,
      homeList:[],//首页数据
      rotation:[],//焦点图
      loading: true, // 开关
      page: 1,       // 页数
    }
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.textArr[this.number],
      }
    }
  },
  mounted () {
    this.startMove();
    this.getHome();
    this.getHomes();
  },
  methods: {
    
    startMove () {
      // eslint-disable-next-line
      let timer = setTimeout(() => {
        if (this.number === 2) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
    },
    getHome(){
      this.$api.Homeindex({
        page:1,
        pageNum:10,
      }).then(res=>{
        // this.homeList = res.data.roomList;
        this.textArr = res.data.notice;//公告
        this.rotation = res.data.rotation;//焦点图
      })
    },
     // 获取游戏列表
    getHomes(){
      this.loading = true;
      this.$indicator.open({text: '加载中...',spinnerType: 'fading-circle'});
      this.$api.Homeindex({page:this.page,pageNum:10}).then(res=>{
        if (res.data.roomList != "") {
          this.loading = false;

          this.homeList = this.homeList.concat(res.data.roomList);
          this.$indicator.close();

          this.page++
        } else {
            this.loading = true;
            this.$indicator.close();
        }
      })
    },
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/app.less';
.mint-header {
  z-index: 999999999 !important;
}
.atrGo{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    color: white;
    display: inline-block;
    border: 1px solid rgb(218, 74, 110);
    text-indent: 2px;
    overflow: hidden;
    background-color:rgba(58, 58, 58, 0.4);
    i{
      font-size: 18px;
    }
}
.showLive{
  background: #cccccc !important;
}
.homePage{
  margin-top: 6vh;
  height: 90vh;
  overflow-y: auto;
  .mint-swipe{
    width: 100vw;
    height: 110px;
    .mint-swipe-item{
      height: 100%;
      img{
        height: 100%;
        width: 100%;
      }
    }
  }
}
// 公告
  .homeNotice {
    height: 34px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    text-align: left;
    z-index: 999;
    span{
      position: absolute;
      top: 50%;
      left: 3%;
      transform: translate(0,-50%);
      font-size: 12px;
      color: rgb(107, 107, 107);
    }
    .text {
      overflow: hidden;
      width: 63%;
      position: absolute;
      top: 50%;
      margin-left: 19%;
      height: 34px;
      line-height: 34px;
      transform: translate(0,-50%);
      font-size: 12px;
      color: rgb(107, 107, 107);
      font-weight: 400;
    }
    // i5媒体查询
    @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
      .text {
          margin-left: 24%;
      }
    } 
    // i4媒体查询
    @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
      .text {
        margin-left: 24%;
      }
    }
    .slide-enter-active, .slide-leave-active {
      transition: all 0.5s linear;
    }
    .slide-enter{
      transform: translateY(40px);
      opacity: 1;
    }
    .slide-leave-to {
      transform: translateY(-50px) ;
      opacity: 0;
    }
  }
  // 直播列表
  .liveList{
    // margin-top: 35px;
    margin-bottom: 7.5vh;
    .liveRow{
      position: relative;
      height: 182px;
      margin-bottom: 4px;
      .liveRowSum{
        position: absolute;
        right: 3%;
        top: 3%;
        color: white;
        font-size: 12px;
        span{
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #19BFC9;
          position: absolute;
          top: 50%;
          left: -15%;
          border-radius: 50%;
          transform: translate(0,-50%);

        }
      }
      .liveRowImg{
        width: 100%;
        height: 100%;
      }
      .liveRowBtm{
        position: absolute;
        bottom:0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        // background: #cccccc;
        background-color:rgba(58, 58, 58, 0.4);
        color: white;
        .RowBtmSon{
          position: relative;
          text-align: left;
          font-size: 12px;
          height: 50px;
          img{
            position: absolute;
            top: 50%;
            left: 4%;
            border-radius: 50%;
            border: 1px solid #CF3E6E;
            transform: translate(0,-50%);
            width: 36px;
            height: 36px;
          }
          span{
            display: inline-block;
            overflow: hidden;
          }
          span:nth-child(2){
            margin-left: 19%;
            // margin-right: 4%;
            width: 14%;
            float: left;
            // border: 1px solid red;
          }span:nth-child(3){
            width: 40%;
            // float: left;
            // left
            // position: absolute;
            // left: 35%;
            // border: 1px solid red;
          }
          span:nth-child(4){
            text-align: center;
            position: absolute;
            top: 50%;
            right: 5%;
            transform: translate(0,-50%);
            width: 19%;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            letter-spacing: 1px;
            float:right;
            border-radius: 12px;
            background: -webkit-linear-gradient(left, #EE1E81 , #19BFC9); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #EE1E81, #19BFC9); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #EE1E81, #19BFC9); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #EE1E81 , #19BFC9); /* 标准的语法（必须放在最后） */
          }
        }
       
      }
    }
  }

 
</style>