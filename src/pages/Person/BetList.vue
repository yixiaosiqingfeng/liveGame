<template>
  <section class="page">
    <!-- vue页面模板 -->
    <div class="person-tab">
      <div class="gallery-thumbs">
        <div class="swiper-wrapper classification">
          <!-- <span> < </span> -->
          <span class="swiper-slide" >
            正在开奖
            <!-- <span></span> -->
          </span>
          <span class="swiper-slide" >
            投注记录
            <!-- <span></span> -->
          </span>
          <div class="classinfo" @click="goback()">
            <i class="iconfont icon-fanhui" ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="person-video">
      <div class="gallery-top">
        <div class="swiper-wrapper">
          <div class="swiper-slide galleryDiv">
            <!-- <Transpond v-bind:userId="$route.query.id" v-on:transpondTotal="transpondTotals"></Transpond> -->
            <div class="bet-list" v-for="(item, index) in recordbeList" :key="item.id" >
                    <!-- <div class="bet-list-div">
                        <p><span>用户名：</span><span>{{userInfo.user_nickname}}</span></p>
                        <p><span>游戏名：</span><span>{{item.game_name}}</span></p>
                    </div>
                    <p class="bet-list-p"><span>订单号：</span><span>{{item.order_number}}</span></p>
                    <div class="bet-list-divs">
                        <p><span>期号：</span><span>{{item.periods}}</span></p>
                        <p><span>单双：<span class="bet-list-odd">{{item.lottery_type  == 0? '双' : '单'}}</span></span></p>
                    </div>
                    <p class="bet-list-p"><span>投注金额：</span><span>{{item.bet_number}}</span></p>
                    <p class="bet-list-p"><span>购彩时间：</span><span>{{item.created_at}}</span></p>
                    <p class="bet-list-p"><span>状态：</span><span :class="item.status == 1 ? 'red' : (item.status == 2 ? 'green' : 'gray')">{{getStatus(item.status)}}</span></p>
                    <p class="bet-list-p bet-list-ps"><span>奖金：</span><span>{{item.winning_amount}}</span></p> -->
                    <div class="bet-list-div">
                      <div><img :src='"../../assets/img/tou"+ item.game_id +".png"' alt=""><span>{{item.game_name}}</span></div>
                      <div>
                        <p>订单号：{{item.order_number}}</p>
                        <p>期号：{{item.periods}}</p>
                      </div>
                    </div>
                    <div class="bet-list-time">
                      <p>购彩时间：{{item.created_at}}</p>
                      <p>单双：<span class="bet-list-odd">{{item.lottery_type  == 0? '双' : '单'}}</span></p>
                    </div>
                    <div class="bet-list-flex">
                      <div>
                        <p>{{item.bet_number}}</p>
                        <p>投注金额</p>
                      </div>
                      <div>
                        <p><span :class="item.status == 1 ? 'red' : (item.status == 2 ? 'green' : 'gray')">{{getStatus(item.status)}}</span></p>
                        <p>订单状态</p>
                      </div>
                      <div>
                        <p>{{item.winning_amount}}</p>
                        <p>中奖金额</p>
                      </div>
                    </div>
                    <!-- <p class="bet-list-span" v-if="item.status == 0"><span @click="cancel(item.id,index)">撤单</span></p> -->
                </div>
                <mt-spinner :type="2" v-if="spinnersbe"></mt-spinner>
                <div v-show="journalTotalbe">
                    <p>数据加载完毕</p>
                </div>
                <div v-show="journalNullbe" class="Null">
                    <i class="iconfont icon-meiyoushuju"></i>
                    <p>没有数据</p>
                </div>
          </div>
          <div class="swiper-slide galleryDiv2">
            <!-- <Pleased v-bind:userId="$route.query.id" v-on:likeTotal="likeTotals"></Pleased> -->
            <div class="bet"
              v-infinite-scroll="getRecord"
                infinite-scroll-disabled="journalOk"
                infinite-scroll-distance="15">
                <div class="bet-list" v-for="(item, index) in recordList" :key="item.id" >
                    <!-- <div class="bet-list-div">
                        <p><span>用户名：</span><span>{{userInfo.user_nickname}}</span></p>
                        <p><span>游戏名：</span><span>{{item.game_name}}</span></p>
                    </div>
                    <p class="bet-list-p"><span>订单号：</span><span>{{item.order_number}}</span></p>
                    <div class="bet-list-divs">
                        <p><span>期号：</span><span>{{item.periods}}</span></p>
                        <p><span>单双：<span class="bet-list-odd">{{item.lottery_type  == 0? '双' : '单'}}</span></span></p>
                    </div>
                    <p class="bet-list-p"><span>投注金额：</span><span>{{item.bet_number}}</span></p>
                    <p class="bet-list-p"><span>购彩时间：</span><span>{{item.created_at}}</span></p>
                    <p class="bet-list-p"><span>状态：</span><span :class="item.status == 1 ? 'red' : (item.status == 2 ? 'green' : 'gray')">{{getStatus(item.status)}}</span></p>
                    <p class="bet-list-p bet-list-ps"><span>奖金：</span><span>{{item.winning_amount}}</span></p> -->
                    <!-- <p class="bet-list-span" v-if="item.status == 0"><span @click="cancel(item.id,index)">撤单</span></p> -->
                    <div class="bet-list-div">
                      <div><img :src='"../../assets/img/tou"+ item.game_id +".png"' alt=""><span>{{item.game_name}}</span></div>
                      <div>
                        <p>订单号：{{item.order_number}}</p>
                        <p>期号：{{item.periods}}</p>
                      </div>
                    </div>
                    <div class="bet-list-time">
                      <p>购彩时间：{{item.created_at}}</p>
                      <p>单双：<span class="bet-list-odd">{{item.lottery_type  == 0? '双' : '单'}}</span></p>
                    </div>
                    <div class="bet-list-flex">
                      <div>
                        <p>{{item.bet_number}}</p>
                        <p>投注金额</p>
                      </div>
                      <div>
                        <p><span :class="item.status == 1 ? 'red' : (item.status == 2 ? 'green' : 'gray')">{{getStatus(item.status)}}</span></p>
                        <p>订单状态</p>
                      </div>
                      <div>
                        <p>{{item.winning_amount}}</p>
                        <p>中奖金额</p>
                      </div>
                    </div>
                </div>
                <mt-spinner :type="2" v-if="spinners"></mt-spinner>
                <div v-show="journalTotal">
                    <p>数据加载完毕</p>
                </div>
                <div v-show="journalNull" class="Null">
                    <i class="iconfont icon-meiyoushuju"></i>
                    <p>没有数据</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 搭建： src/router/index.js 注册路由 -->
    <!-- <div class="bet"
      v-infinite-scroll="getRecord"
        infinite-scroll-disabled="journalOk"
        infinite-scroll-distance="15">
        <div class="bet-list" v-for="(item, index) in recordList" :key="item.id" >
            <div class="bet-list-div">
                <p><span>用户名：</span><span>{{userInfo.user_nickname}}</span></p>
                <p><span>游戏名：</span><span>{{item.game_name}}</span></p>
            </div>
             <p class="bet-list-p"><span>订单号：</span><span>{{item.order_number}}</span></p>
            <div class="bet-list-divs">
                <p><span>期号：</span><span>{{item.periods}}</span></p>
                <p><span>单双：<span class="bet-list-odd">{{item.lottery_type  == 0? '双' : '单'}}</span></span></p>
            </div>
            <p class="bet-list-p"><span>投注金额：</span><span>{{item.bet_number}}</span></p>
            <p class="bet-list-p"><span>购彩时间：</span><span>{{item.created_at}}</span></p>
            <p class="bet-list-p"><span>状态：</span><span :class="item.status == 1 ? 'red' : (item.status == 2 ? 'green' : 'gray')">{{getStatus(item.status)}}</span></p>
            <p class="bet-list-p bet-list-ps"><span>奖金：</span><span>{{item.winning_amount}}</span></p>
            <p class="bet-list-span" v-if="item.status == 0"><span @click="cancel(item.id,index)">撤单</span></p>
        </div>
        <mt-spinner :type="2" v-if="spinners"></mt-spinner>
        <div v-show="journalTotal">
            <p>数据加载完毕</p>
        </div>
        <div v-show="journalNull" class="Null">
            <i class="iconfont icon-meiyoushuju"></i>
            <p>没有数据</p>
        </div>
    </div>-->
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "页面名称",
  components: {
    // 搭建：引入组件
  },
  computed: {
    // 搭建：计算属性
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.userInfo
    })
  },
  data() {
    return {
      // 搭建：赋值
      recordList: [], //投注记录列表
      spinners: false, //开关
      journalOk: false, //充值开关
      journalPage: 1, //充值page
      journalNull: false, // 没有数据
      journalTotal: false, // 加载完毕
      myVal: '',
      recordbeList: [], //投注记录列表
      spinnersbe: false, //开关
      journalNullbe: false, // 没有数据
      journalTotalbe: false, // 加载完毕
      activeIndexs: 0,
      recordLength: '',
    };
  },
  created() {
    // 搭建：进入页面时执行
      this.getRecordbe();
      this.getRecord();
  },
  mounted() {
    this.getBannerInit();
  },
  methods: {
    // 搭建：函数方法
    // 这是左右滑动吧
    getBannerInit() {
      var aaa;
      // console.log(Swiper);
      var galleryThumbs = new Swiper(".gallery-thumbs", {
        slidesPerView: "auto',",
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      });
      var galleryTop = new Swiper(".gallery-top", {
        thumbs: {
          swiper: galleryThumbs,
          freeMode: true
        },
      });
    },
    // 返回
    goback() {
      this.$router.back();
    },
    // 正在开奖
    getRecordbe(){
      this.$api.recordOrderRecord({ pageNum: 100, status: 1 })
          .then(res => { 
            if(res.code == '00'){
              console.log(res);
              this.recordbeList = res.data;
              this.recordLength = res.data.length;
              if(res.data.length == 0){
                this.journalNullbe = true;
              }else{
                this.journalTotalbe = true;
              }
            }
          })
      this.myVal = setInterval(() => {
        this.$api.recordOrderRecord({ pageNum: 100, status: 1 })
          .then(res => { 
            if(res.code == '00'){
              console.log(res);
              this.recordbeList = res.data;
              
              if(res.data.length !== this.recordLength){
                this.recordLength = res.data.length;
                if(res.data.length != 0){
                  console.log(res.data.length);
                  this.recordList = []; //投注记录列表
                  this.spinners = false; //开关
                  this.journalOk = false; //充值开关
                  this.journalPage = 1; //充值page
                  this.journalNull = false; // 没有数据
                  this.journalTotal = false; // 加载完毕
                  this.getRecord();
                }
                
              }
            }
          })
      },6000);
      
    },
    // 很明显这个是获取投注记录数据
    getRecord() {
      if (this.journalOk) {
        return;
      }
      this.spinners = true;
      this.journalOk = true;
      this.$api
        .recordOrderRecord({ page: this.journalPage, pageNum: 10, status: 0 })
        .then(res => {
          if (res.code == "00") {
            this.recordList = this.recordList.concat(res.data);
            this.spinners = false;
            this.journalTotal = false;
            if (res.data.length == 10) {
              this.journalPage++;
              this.journalOk = false;
            } else {
              this.journalTotal = true;
              this.journalOk = true;
            }
            if (this.recordList.length == 0) {
              this.journalNull = true;
              this.journalTotal = false;
            }
          }
        });
    },
    // 判断状态
    getStatus(status) {
      var myStatus;
      switch (status) {
        case 0:
          myStatus = "未开奖";
          break;
        case 1:
          myStatus = "已中奖";
          break;
        case 2:
          myStatus = "未中奖";
          break;
        // case 3:
        //   myStatus = "待开奖";
        //   break;
      }
      return myStatus;
    },
    // 撤单
    // cancel(id, index) {
    //   this.$api.orderCancelOrder({ order_id: id }).then(res => {
    //     if (res.code == "00") {
    //       this.$toast(res.msg);
    //       this.recordList[index].status = 3;
    //     } else {
    //       this.$toast(res.msg);
    //     }
    //   });
    // }
  },
  destroyed(){
    window.clearInterval(this.myVal);
  }
};
</script>


<style lang='less' scoped>
@import "../../assets/css/_variable.less";
.page {
  height: 100vh;
  overflow: scroll;
  background: linear-gradient(
    to bottom right,
    rgb(209, 71, 184),
    rgb(131, 165, 226)
  );
}
.person-tab {
  height: 6vh;
  background: linear-gradient(to right, rgb(230, 133, 247), rgb(244, 19, 133));
  text-align: center;
  span {
    display: inline-block;
    height: 6vh;
    width: 20vw;
    line-height: 6vh;
    font-size: 14px;
    text-align: center;
    color: rgb(228, 228, 228);
  }
  span:nth-child(1){
    margin-left: 29vw;
  }
  span:nth-child(2){
    margin-left: 5vw;
  }
  .swiper-slide-thumb-active {
    color: rgb(255, 255, 255);
    font-size: 16px;
    border-bottom: 2px solid rgb(255, 255, 255);
  }
  .classinfo{
    width: 40px;
    height: 40px;
    i{
      position: absolute;
      top: 50%;
      left: 3%;
      transform: translate(0,-50%);
      color: rgb(253, 253, 253);
    }
  }
}
.person-video {
  // margin-top: 1px;
  .gallery-top {
    margin-top: 2px;
  }
  .galleryDiv {
    height: 93vh;
    overflow-y: scroll;
  }
  .galleryDiv2 {
    height: 93vh;
    overflow-y: scroll;
  }
}
.bet {
  padding-top: 2px;
  color: rgb(59, 59, 59);
}
.bet-list {
  width: 94vw;
  margin: 13px auto;
  padding: 13px 0;
  background-color: #fff;
  border-radius: 6px;
  text-align: left;
  font-size: 15px;
  color: rgb(97, 97, 97);
  .bet-list-div{
    display: flex;
    flex-flow:  row nowrap;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid rgb(223, 223, 223);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    div:nth-child(1){
      img{
        width: 46px;
        height: 46px;
        margin-left: 8px;
        border-radius: 50%;
        vertical-align: middle;
      }
      span{
        margin-left: 5px;
        vertical-align: middle;
        font-size: 18px;
      }
    }
    div:nth-child(2){
      font-size: 12px;
      margin-right: 7px;
      p{
        // margin: 0.6vh;
        margin: 0;
        margin-top: 1px;
      }
      p:nth-child(2){
        font-size: 14px;
        margin-top: 9px;
      }
    }
  }
  .bet-list-time{
    width: 86%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(223, 223, 223);
    p{
      display: inline-block;
      color: rgb(94, 94, 94);
      margin: 1.8vh 0;
      font-size: 14px;
      // width: 200px;
      // max-width: 170px;
      
    }
    p:nth-child(1){
      width: 55vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-child(2){
      float:right;
      // margin-left: 18px;
      font-size: 19px;
      margin: 1.2vh 0;
      color: rgb(36, 36, 36);
      .bet-list-odd{
          color: rgb(231, 42, 42);
        }
    }
  }
  .bet-list-flex{
    // width: 86%;
    margin: 2vh auto 3vh;
    display: flex;
    flex-wrap:warp;
    justify-content:center;
    overflow: hidden;
    div{
      width:33%;
      text-align: center;
      p{
        margin: 0;
      }
      p:nth-child(1){
        font-size: 20px;
        height: 22px;
        line-height: 22px;
        margin-bottom: 1vh;
        color: rgb(22, 22, 22);
      }
      p:nth-child(2){
        font-size: 14px;
      }
    }
    div:nth-child(1){
      border-right: 1px solid rgb(219, 219, 219);
    }
    div:nth-child(2){
      border-right: 1px solid rgb(219, 219, 219);
      p:nth-child(1){
        color: rgb(231, 42, 42);
        font-size: 18px;
      }
    }
    div:nth-child(3){
      p:nth-child(1){
        color: rgb(231, 42, 42);
      }
    }
    .red {
      color: rgb(231, 42, 42);
    }
    .green {
      color: rgb(54, 217, 163);
    }
    .gray {
      color: rgb(59, 101, 134);
    }
  }
  .Null{
    z-index: 99999;
  }
  // p {
  //   margin: 7px 0;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   overflow: hidden;
  // }
  // .bet-list-div {
  //   display: flex;
  //   width: 86vw;
  //   margin: 0 auto;
  //   p {
  //     width: 50%;
  //     overflow: hidden;
  //     span:nth-child(1) {
  //       display: inline-block;
  //       width: 80px;
  //     }
  //   }
  //   .bet-list-odd {
  //     display: inline !important;
  //     color: rgb(221, 48, 48);
  //   }
  // }
  // .bet-list-divs {
  //   display: flex;
  //   width: 86vw;
  //   margin: 0 auto;
  //   p:nth-child(1) {
  //     width: 65%;
  //     overflow: hidden;
  //     span:nth-child(1) {
  //       display: inline-block;
  //       width: 80px;
  //     }
  //   }
  //   p:nth-child(2) {
  //     width: 35%;
  //     overflow: hidden;
  //     span:nth-child(1) {
  //       display: inline-block;
  //       width: 80px;
  //     }
  //   }
  //   .bet-list-odd {
  //     display: inline !important;
  //     color: rgb(221, 48, 48);
  //   }
  // }
  // .bet-list-div:nth-child(1) {
  //   color: #000;
  // }
  // .bet-list-p {
  //   width: 86vw;
  //   margin: 0 auto;
  //   height: 35px;
  //   line-height: 35px;
  //   span:nth-child(1) {
  //     display: inline-block;
  //     width: 80px;
  //   }
  //   .red {
  //     color: rgb(221, 48, 48);
  //   }
  //   .green {
  //     color: rgb(1, 121, 1);
  //   }
  //   .gray {
  //     color: rgb(59, 101, 134);
  //   }
  // }
  // .bet-list-ps {
  //   height: 28px;
  //   line-height: 28px;
  // }
  // .bet-list-span {
  //   text-align: right;
  //   margin: 0;
  //   span {
  //     display: inline-block;
  //     margin-right: 15px;
  //     width: 80px;
  //     height: 30px;
  //     line-height: 30px;
  //     text-align: center;
  //     color: rgb(250, 250, 250);
  //     background-color: rgb(181, 181, 181);
  //     border-radius: 5px;
  //   }
  // }
}
</style>