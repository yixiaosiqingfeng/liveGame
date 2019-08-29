<!-- 银行支行名称选择器 -->
<template>
  <div class="bank-picker">
   <div class="HistoryTitle">
      <span @click="getHistory"><i class="iconfont icon-fanhui"></i></span>
        <span>查看往期</span>
    </div>

    <div class="Historymain"
      v-infinite-scroll="allResult"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="HistorymainRow" v-for="item in allResultList" :key="item.id">
        <span class="HRowSpan">第{{ item.periods }}期</span>
        <div class="HRowDiv">
          <span> <strong style="color:red;font-weight: 500;" :class="item.result_type == 0? 'atrBlue' : 'atrRed' ">{{ (item.result).split(/\,/g)[0] }}&nbsp;</strong>{{ (item.result).split(/\,/g).splice(1,).join('&nbsp;') }}</span>
          <span :class="item.result_type == 0? 'atrBlue' : 'atrRed' ">{{ item.result_type == 0 ? '双' : '单' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Seebefore',
  props: ['visible'],
  data() {
    return {
      loading: true, // 开关
      gamePage:1,//页数
      allResultList:[],//历史列表
      gameid:'',//游戏id
    }
  },
  mounted() {
    this.allResult()
  },
  methods: {
    getHistory(id){
    // 子组件传值给父组件
    this.$emit('SecarchFlag', false)
    this.allResultList = [];
    this.gamePage = 1;
    this.gameid= '';
    },
   allResult(id){
    if(!isNaN(id)){
      this.gameid = id;
    }
      this.loading = true;
      this.$indicator.open({text: '加载中...',spinnerType: 'fading-circle'});
      this.$api.allResult({
        game_id:this.gameid,
        page:this.gamePage,
    }).then(res=>{
        if (res.data != "") {
          this.loading = false;
          this.allResultList = this.allResultList.concat(res.data);
          this.$indicator.close();

          this.gamePage++
        } else {
            this.loading = true;
            this.$indicator.close();
        }
      })
    },
  },
}
</script>


<style lang='less' scoped>
.atrRed{
    // color: rgb(189, 63, 78) !important;
}
.atrBlue{
    color: #0077ff  !important;
}
.HistoryTitle{
    z-index: 99999999999 !important;

    height: 6vh;
    line-height: 6vh;
    // background-color: #222125;
    background: linear-gradient(to right, rgb(230, 133, 247), rgb(244, 19, 133));
    position: fixed;
    top: 0%;
    width: 100vw;
    span:nth-child(1){
      float: left;
      margin-left: 3%;
      color: white;
      font-size: 12px;
    }
    span:nth-child(2){
      position:absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: white;
      font-size: 14px;
      letter-spacing: 1px;
      
    }
  }
  .Historymain{
    background: white;
     text-align: left;
     width: 91%;
     height: 92vh;
     margin: 7vh auto;
     border-radius: 5px;
     overflow-y: auto;
     .HistorymainRow{
      padding: 9px 15px 0px 15px;
        .HRowSpan{
          display: inline-block;
          color:#918f8f;
          font-size: 13px;
          margin-bottom: 10px;
        }
        div{
          // margin-bottom: 8px;
          padding-bottom:9px; 
          border-bottom: 1px solid #d6d6d6;
            color: #919191;
            span:nth-child(1){
              letter-spacing: 2px;
              font-size: 20px;
            //   margin-right: 15px;
              display: inline-block;
              width: 86%;
              overflow: hidden;
            //   white-space: nowrap;
            //   text-overflow: ellipsis;
            }
            span:nth-child(2){
              float: right;
              font-size: 20px;
              color: rgb(239, 53, 53);
              margin-right: 3%;
              margin-top: -1px
            }
        }
     }
     
  }
</style>
