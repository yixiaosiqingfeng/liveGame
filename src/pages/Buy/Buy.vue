<template>
  <section class="page page-has-header page-has-tabbar">
      <div class="buy" 
        v-infinite-scroll="getNoticeList"
        infinite-scroll-disabled="noticeOk"
        infinite-scroll-distance="15">
        <router-link :to="{path:'/proclamation', query:{id:item.id}}" tag="div" v-for="item in noticeList" :key="item.id" class="buy-list">
          <p>{{item.title}}</p><p>{{item.created_at.date.slice(0,19)}}</p>
        </router-link>
        <mt-spinner :type="2" v-if="spinner"></mt-spinner>
        <div v-show="noticeTotal">
            <p>数据加载完毕</p>
        </div>
        <div v-show="noticeNull" class="Null">
            <i class="iconfont icon-meiyoushuju"></i>
            <p>没有数据</p>
        </div>
      </div>
  </section>
</template>


<script>
import VHeader from '@/components/VHeader';
import Tabbar from '@/components/Tabbar';


export default {
    name: 'Buy',
    components: {VHeader,Tabbar},

  data() {
    return {
      spinner: false,
      noticePage: 1,
      noticeList: [], //公告列表
      noticeOk: false, //充值开关
      noticePage: 1, //充值page
      noticeNull: false, // 没有数据
      noticeTotal: false, // 加载完毕
    }
  },
  created(){
    this.getNoticeList();
  },
  methods:{
    getNoticeList(){
      if(this.noticeOk){
        return;
      }
      this.spinner = true;
      this.noticeOk = true;
      this.$api.recordNoticeList({page:this.noticePage,pageNum:15}).then(res => {
        if(res.code == '00'){
          // this.noticeList = res.data;
          this.noticeList = this.noticeList.concat(res.data);
                this.spinner = false;
                if(this.noticeList.length == 0){
                    this.noticeNull = true;
                }
                if(res.data.length == 15){
                    this.noticePage++;
                    this.noticeOk = false;
                }else{
                    this.noticeOk = true;
                }
                if(res.total == 0){
                    this.noticeNull = true;
                }else{
                    this.noticeNull = false;
                }
                if(this.noticeList.length == res.total && res.total !== 0){
                    this.noticeTotal = true
                }else{
                    this.noticeTotal = false;
                }
        }
      })
    },
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.page{
  margin-top: 6vh;
  .buy{
    height: 88vh;
    overflow: scroll;
  }
  .buy-list{
    width: 92vw;
    margin: 0 auto;
    border-bottom: 1px solid rgb(238, 238, 238);
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-overflow: ellipsis;
    white-space:nowrap;
    overflow:hidden;
    p{
      font-size: 16px;
    }
    p:nth-child(2){
      color: rgb(121, 121, 121);
      font-size: 14px;
    }
  }
}
</style>