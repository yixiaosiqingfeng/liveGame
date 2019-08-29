<template>
  <!--  因需求 重写tab 适应结构 -->
<div class="MusicDiv">

    <router-link to="/" exact  tag="div" class="tab-item">
      <!-- <i class=" iconfonticon-icon-me-copy"></i> -->
      <img  src="@/assets/img/zhibo.png" class="tab-icon">
      <img  src="@/assets/img/zhibo1.png" class="tab-icon">
      <span>直播</span>
    </router-link >

    <router-link to="/order" tag="div" class="tab-item ">
      <img  src="@/assets/img/meterRecords.png" class="tab-icon">
      <img  src="@/assets/img/meterRecords1.png" class="tab-icon">
      <span>记录</span>
    </router-link>

    <router-link to="/buy" tag="div" class="tab-item ">
      <img  src="@/assets/img/gonggao.png" class="tab-icon">
      <img  src="@/assets/img/gonggao1.png" class="tab-icon">
      <span>公告</span>
    </router-link>

    <router-link to="/person" tag="div" class="tab-item ">
      <img  src="@/assets/img/icon-me-copy.png" class="tab-icon">
      <img  src="@/assets/img/icon-me-copy1.png" class="tab-icon">
      <span>个人</span>
    </router-link>
</div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "Tabbar",
  data() {
    return {
      showHd:false,
    };
  },
   computed: {
  
  },
  created() {
    
  },
  methods: {
  
  },
};
</script>


<style lang='less'  >
@import "../assets/css/_variable.less";
 
.MusicDiv {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  background-color: rgb(255, 255, 255);
  font-size: 11px;
  // color: rgb(56, 49, 49);
  border-top: none;
  background-image: none;
  display: flex;
  justify-content: center;
  align-items: center;
  // 点击效果
  .router-link-active{
  img:nth-child(1){
    display: none !important;
  }
  span{
      color: rgb(255, 53, 130) !important;
  }
  img:nth-child(2){
    display: block !important;
  }
} 
  div {
    span {
      color: rgb(81, 81, 81);
      display: inline-block;
      margin-top: 3px;
    }
    color: rgb(81, 81, 81);
    // border: 1px solid red;
  }
  .openMusicP {
    position: relative;
  }
  .openMusic {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: -9px;
    margin-top: -20px;
    img {
      width: 49px;
      height:43px;
      border-radius: 50%;
      animation: imgx 6s linear infinite;
      animation-play-state:paused;
    }
    i{
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: 20px;
      color: white;
      transform: translate(-38%,-30%);
    }
  }
  .TpersonImg{
    img{
      width: 18px;
    }
  }
  
  .tab-item {
    align-items: center;
    flex: 1;
    display: inline-block;
    text-align: center;
    color: #fff;
    outline: none;
    &.tab-item-actived {
      color: #AFAFAF;
      .mint-tab-item-label {
        color: #AFAFAF;
      }
    }
    img:nth-child(2){
      display: none;
    }
  }

  .mint-tab-item-icon {
    margin-top: 2px;
  }
  .tab-icon {
    display: table;
    margin: 0 auto;
    width: 23px;
    height: 23px;
    /* font-size: 24px; */
  }
  &.mint-tabbar > .mint-tab-item.is-selected {
    background-color: @tab-bgc;
    background-color: transparent;
    color: @tab-c;
  }
  .mint-tab-item-label {
    color: rgb(127, 127, 127);
    margin-top: -2px;
  }
}
//x,xs
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .MusicDiv {
    padding-bottom: 1.7vh;
  }
}
  // xr
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  .MusicDiv {
    padding-bottom: 1.7vh;
  }
}
  
  // xs max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .MusicDiv {
  padding-bottom: 1.7vh;
  }
}

</style>
