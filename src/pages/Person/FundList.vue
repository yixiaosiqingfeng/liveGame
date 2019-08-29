<template>
  <section class="page">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <div class="fund-header">
        <div>
            <p :class="status == 0 ? 'fund-header-active' : ''" @click="getStatus(0)">充值记录</p>
        </div>
        <div>
            <p :class="status == 1 ? 'fund-header-active' : ''" @click="getStatus(1)">提现记录</p>
        </div>  
        <div>
            <p :class="status == 2 ? 'fund-header-active' : ''" @click="getStatus(2)">资金明细</p>
        </div> 
    </div>
    <div class="fund-list" v-show="status == 0"
        v-infinite-scroll="getrecordList"
        infinite-scroll-disabled="recordOk"
        infinite-scroll-distance="15">
        <div class="fund-list-cent" v-for="item in recordList" :key="item.id">
            <div class="fund-list-div">
                <p class="fund-list-div-name">{{item.pay_name}}</p>
                <p class="fund-list-div-money">{{judge(item.status)}}：{{item.money}}</p>
            </div>
            <div class="fund-list-div">
                <p>{{item.order_id}}</p>
                <p>{{item.updated_at.date.slice(0,19)}}</p>
            </div>
        </div>
        <mt-spinner :type="2" v-if="spinner"></mt-spinner>
        <div v-show="recordTotal">
            <p>数据加载完毕</p>
        </div>
        <div v-show="recordNull" class="Null">
            <i class="iconfont icon-meiyoushuju"></i>
            <p>没有数据</p>
        </div>
    </div>
    <div class="fund-list" v-show="status == 1"
        v-infinite-scroll="getWithdrawalList"
        infinite-scroll-disabled="withdrawalOk"
        infinite-scroll-distance="15">
        <div class="fund-list-cent" v-for="item in withdrawalList" :key="item.id">
            <div class="fund-list-div">
                <p class="fund-list-div-name">{{item.bank_name}}({{item.card_number.substring(item.card_number.length-4)}})</p>
                <!-- <p>{{item.created_at.date.slice(0,19)}}</p> -->
                <p>提现金额：{{item.money}}</p>
            </div>
            <div class="fund-list-div">
                <!-- <p>{{item.order_id}}</p> -->
                <p>{{item.created_at.date.slice(0,19)}}</p>
                <p class="fund-list-div-money">{{judge(item.status)}}</p>
            </div>
        </div>
        <mt-spinner :type="2" v-if="spinnera"></mt-spinner>
        <div v-show="withdrawalTotal">
            <p>数据加载完毕</p>
        </div>
        <div v-show="withdrawalNull" class="Null">
            <i class="iconfont icon-meiyoushuju"></i>
            <p>没有数据</p>
        </div>
    </div>
    <div class="fund-list" v-show="status == 2"
        v-infinite-scroll="getJournallList"
        infinite-scroll-disabled="journalOk"
        infinite-scroll-distance="10">
        <div class="fund-list-cent" v-for="item in journallList" :key="item.id">
            <div class="fund-list-div">
                <p class="fund-list-div-name">收支详情：{{item.money}}</p>
                <p class="fund-list-div-money">账户余额：{{item.balance}}</p>
            </div>
            <div class="fund-list-div">
                <p>交易类型：{{senseType(item.type)}}</p>
                <p>{{formatPHPTime(item.time)}}</p>
            </div>
        </div>
        <mt-spinner :type="2" v-if="spinners"></mt-spinner>
        <div v-show="withdrawalTotal">
            <p>数据加载完毕</p>
        </div>
        <div v-show="withdrawalNull" class="Null">
            <i class="iconfont icon-meiyoushuju"></i>
            <p>没有数据</p>
        </div>
    </div>
  </section>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);
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
      spinner: false, //状态
      spinnera: false, //状态
      spinners: false, //状态
      status: 0, //判断状态
      recordList: [], // 充值记录
      withdrawalList: [], //提现记录
      journallList: [], //资金流水
      recordOk: false, //充值开关
      recordPage: 1, //充值page
      recordNull: false, // 没有数据
      recordTotal: false, // 加载完毕
      withdrawalOk: true, //充值开关
      withdrawalPage: 1, //充值page
      withdrawalNull: false, // 没有数据
      withdrawalTotal: false, // 加载完毕
      journalOk: true, //充值开关
      journalPage: 1, //充值page
      journalNull: false, // 没有数据
      journalTotal: false, // 加载完毕
    }
  },
  created(){
    // 搭建：进入页面时执行
    this.getrecordList();
    // this.getWithdrawalList();
    // this.getJournallList();
  },
  methods:{
    // 搭建：函数方法
    // 切换状态
    getStatus(index){
        this.status = index;
        if(index == 1){
            this.withdrawalOk = false;
        }
        if(index == 2){
            this.journalOk = false;
        }
    },
    // 状态
    senseType(status){
        var myStatus;
        switch(status){
            case 0:
            myStatus = '充值';
            break;
            case 1:
            myStatus = '提现';
            break;
            case 2:
            myStatus = '下注';
            break;
            case 3:
            myStatus = '中奖';
            break;
            case 4:
            myStatus = '撤单';
            break;
            case 5:
            myStatus = '提现拒绝';
            break;
            case 6:
            myStatus = '手动充值';
            break;
        }
        return myStatus;
    },
    // 获取充值记录
    getrecordList(){
        if(this.recordOk){
            return;
        }
        this.spinner = true;
        this.recordOk = true;
        this.$api.recordRechargeList({page:this.recordPage,pageNum:15}).then(res => {
            // console.log(res);
            if(res.code == '00'){
                this.recordList = this.recordList.concat(res.data);
                this.spinner = false;
                if(this.recordList.length == 0){
                    this.recordNull = true;
                }
                if(res.data.length == 15){
                    this.recordPage++;
                    this.recordOk = false;
                }else{
                    this.recordOk = true;
                }
                if(res.total == 0){
                    this.recordNull = true;
                }else{
                    this.recordNull = false;
                }
                if(this.recordList.length == res.total && res.total !== 0){
                    this.recordTotal = true
                }else{
                    this.recordTotal = false;
                }
            }
        })
    },
    // 获取提现记录
    getWithdrawalList(){
        // console.log(this.withdrawalOk);
        if(this.withdrawalOk){
            return;
        }
        this.spinnera = true;
        this.withdrawalOk = true;
        this.$api.recordWithdrawalList({page:this.withdrawalPage,pageNum:15}).then(res => {
            if(res.code == '00'){
                // this.withdrawalList = res.data;
                // console.log(this.withdrawalList);
                this.withdrawalList = this.withdrawalList.concat(res.data);
                this.spinnera = false;
                if(this.withdrawalList.length == 0){
                    this.withdrawalNull = true;
                }
                if(res.data.length == 15){
                    this.withdrawalPage++;
                    this.withdrawalOk = false;
                }else{
                    this.withdrawalOk = true;
                }
                if(res.total == 0){
                    this.withdrawalNull = true;
                }else{
                    this.withdrawalNull = false;
                }
                if(this.withdrawalList.length == res.total && res.total !== 0){
                    this.withdrawalTotal = true
                }else{
                    this.withdrawalTotal = false;
                }
            }
        })
    },
    // 获取资金流水
    getJournallList(){
        if(this.journalOk){
            return;
        }
        this.spinners = true;
        this.journalOk = true;
        this.$api.recordJournalResult({page:this.journalPage,pageNum:10}).then(res => {
            if(res.code == '00'){
                // this.journallList = res.data;
                // console.log(this.journallList);
                this.journallList = this.journallList.concat(res.data);
                this.spinners = false;
                if(this.journallList.length == 0){
                    this.journalNull = true;
                }
                if(res.data.length == 10){
                    this.journalPage++;
                    this.journalOk = false;
                }else{
                    this.journalOk = true;
                }
                if(res.total == 0){
                    this.journalNull = true;
                }else{
                    this.journalNull = false;
                }
                if(this.journallList.length == res.total && res.total !== 0){
                    this.journalTotal = true
                }else{
                    this.journalTotal = false;
                }
            }
        })
    },
    // 判断状态
    judge(index){
        var status;
        if(index == 0){
            status = '待审核';
        }else if(index == 1){
            status = '通过审核';
        }else{
            status = '不通过审核';
        }
        return status;
    }
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.page{
    margin-top: 6vh;
    // height: 94vh;
}
.fund-header{
    position: fixed;
    top: 6%;
    width: 100vw;  
    height: 5vh;
    border-bottom: 1px solid rgb(231, 231, 231);
    display: flex;
    background-color: #fff;
    p{
        margin: 0;
        line-height: 5vh;
        width: 78px;
        margin: 0 auto;
    }
    div{
        width: 50%;
    }
    .fund-header-active{
        color: rgb(242, 107, 177);
        border-bottom:1px solid rgb(242, 107, 177);
    }
}
.fund-list{
    margin-top: 11vh;
    height: 89vh;
    overflow: scroll;
    .fund-list-cent{
        text-align: left;
        width: 94vw;
        height: 71px;
        padding-left: 3vw;
        padding-right: 3vw;
        border-bottom: 1px solid rgb(231, 231, 231);
        .fund-list-div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            p{
                margin: 11px 0 0 0;
                color: rgb(97, 97, 97);
                font-size: 14px;
            }
            .fund-list-div-name{
                color: #000;
                font-size: 14px;
            }
            .fund-list-div-money{
                // font-weight: 600;
                font-size: 14px;
                color: rgb(242, 107, 177);
            }
        }
    }
}
</style>