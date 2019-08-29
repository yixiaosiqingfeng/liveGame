<template>
  <section class="page orderPage">
    <div class="result" >
      <div class="resultRow" v-for="item in RecordList" :key="item.id" 
        
      >
        <!-- 因为层叠问题 所以这样写 -->
        <div class="resultRowWhite">
          <div class="resultOne">
            <span>{{ item.game_name }}</span>
            <span>第{{ item.periods }}期</span>
          </div>
          <div class="resultTow">
            <span> <strong style="color:red;font-weight: 500;" :class="item.result_type == 0? 'atrBlue' : 'atrRed' ">{{ (item.result).split(/\,/g)[0] }}&nbsp;</strong>{{ (item.result).split(/\,/g).splice(1,).join('&nbsp;') }}</span>
            <span :class="item.result_type == 0? 'atrBlue' : 'atrRed' ">{{ item.result_type == 0 ? '双' : '单' }}</span>
          </div>
          <div class="resultThree">
            <span @click="getHistory(item.game_id)">查看往期</span>
            <router-link to="/bet-list" tag="span">
             投注记录
            </router-link> 
          </div>
        </div>
        
      </div>
    </div>
<!-- 查看往期  -->
  <mt-popup
    v-model="popupVisible"
    position="right"
    >
    <Seebefore  @SecarchFlag="getHistory" :visible='this.gameId'  ref="yeluosen"></Seebefore>

  </mt-popup>

  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import Tabbar from '@/components/Tabbar';
import Seebefore from '@/components/Seebefore';


export default {
    name: 'Order',
    components: {VHeader,Tabbar,Seebefore},

  data() {
    return {
      popupVisible:false,
      RecordList:'',//开奖结果列表
      gameId:'',//往期游戏id
      gamePage:1,//页数
      allResultList:[],//往期列表
      loading: true, // 开关
      page: 1,        // 页数
    }
  },
  created() {
    this.resultRecord();
  },
  mounted() {
    this.$indicator.open({text: '加载中...',spinnerType: 'fading-circle'});
  },
  methods: {
    
    // 查看往期开关
    getHistory(id){
      if(!isNaN(id) && id != false){
        this.gameId = id;
        this.gamePage = '';
        this.$refs.yeluosen.allResult(id); 
        // this.allResult();//获取往期结果
      }
      this.popupVisible = !this.popupVisible;
    },
    
    // 获取开奖结果
    resultRecord(){
        this.$api.resultRecord({}).then(res=>{
            this.RecordList= res.data;
            this.$indicator.close();
        })
    },
  },
}
</script>


<style lang='less' scoped>
@import '../../assets/css/app.less';
.atrRed{
    // color: rgb(189, 63, 78) !important;
}
.atrBlue{
    color: #0077ff !important;
}
.mint-indicator{
  z-index: 99999999999 !important;
  position: fixed;
}
.orderPage{
  margin-top: 6vh;
  height: 90vh;
  overflow: hidden;
  background: linear-gradient(to bottom right,rgb(209, 71, 184), rgb(131, 165, 226));
  .result{
    width: 91%;
    margin: 0 auto;
    text-align: left;
    height: 87vh;
    overflow-y: auto;
    .resultRow{
      overflow: hidden;
      margin-top: 3px;
      margin-bottom: 14px;
      background:rgb(244, 19, 134); 
      margin-top: 10px;
      // height: 126px;
      // z-index: 99999;
      position: relative;
      padding-bottom: 5px;
      border-radius: 3px 3px 5px 5px;
      .resultRowWhite{
        padding: 10px 15px 10px 15px;
        box-sizing: border-box;
        border-radius: 3px 3px 6px 6px;
        background: white;
        // height: 121px;
        overflow: hidden;
      }
     
      .resultOne{
        margin-bottom: 10px;
        font-size: 13px;
        span:nth-child(1){
           font-size: 13px;
           margin-right: 15px;
        }
        span:nth-child(2){
          color: rgb(143, 142, 142);
        }
      }
      .resultTow{
        margin-bottom: 8px;
        color: #919191;
        span:nth-child(1){
          display: inline-block;
          width: 80%;
          overflow: hidden;
          font-size: 20px;
          letter-spacing: 2px;
          margin-right: 15px;
          // white-space: nowrap;
          // text-overflow: ellipsis;
        }
        span:nth-child(2){
          float: right;
          font-size: 20px;
          color: rgb(239, 53, 53);
          margin-right: 3%;
          margin-top: -1px;
          // font-weight: 600;
        }
      }
     .resultThree{
       border-top:1px solid rgb(211, 211, 211); 
       font-size: 14px;
       span{
         height: 25px;
         line-height: 25px;
         margin-top: 8px;
         display: inline-block;
         text-align: center;
         letter-spacing: 1px;
       }
        span:nth-child(1){
          width: 50%;
          float: left;
          margin-right: 15px;
          box-sizing: border-box;
          border-right: 1px solid rgb(211, 211, 211); 
        }
        span:nth-child(2){
          width: 42%;
          float: left;
          box-sizing: border-box;
        }
     }
    }
    
  }
  // i5媒体查询
  @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
    .result {
      height: 85vh;
    }
  } 
  // i4媒体查询
  @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
    .result {
     height: 85vh;
    }
  }
  // 查看历史
  .v-modal{
    display: none;
  }
  .mint-popup{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom right,rgb(209, 71, 184), rgb(131, 165, 226));
    z-index: 9999999999999999 !important;
  } 


}
</style>