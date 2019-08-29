<template>
  <section class="page">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <div class="msg"
      v-infinite-scroll="getNoticeSystemList"
      infinite-scroll-disabled="systemOk"
      infinite-scroll-distance="15">
      <router-link :to="{path:'/system-cent', query:{id:item.id}}" tag="div" class="msg-list" v-for="(item,index) in systemList" :key="item.id">
        <div class="msg-listDiv">
          <p><span>主题：</span><span>{{item.title}}</span></p>
          <p><span>{{item.created_at.date.slice(0,10)}}</span><i class="iconfont icon-youjiankuohao"></i></p>
        </div>
        <div class="msg-listDiv">
          <p><span>内容：</span><span>{{item.content}}</span></p>
          <p @click.stop="delSysten(item.id,index)">删除</p>
        </div>
      </router-link>
      <mt-spinner :type="2" v-if="spinner"></mt-spinner>
        <div v-show="systemTotal">
            <p>数据加载完毕</p>
        </div>
        <div v-show="systemNull" class="Null">
            <i class="iconfont icon-meiyoushuju"></i>
            <p>没有数据</p>
        </div>
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
      systemList: [], //系统消息列表
      systemOk: false, //充值开关
      systemPage: 1, //充值page
      systemNull: false, // 没有数据
      systemTotal: false, // 加载完毕
      spinner: false,
    }
  },
  created(){
    // 搭建：进入页面时执行
    this.getNoticeSystemList();
  },
  methods:{
    // 搭建：函数方法
    // 获取系统消息
    getNoticeSystemList(){
      if(this.systemOk){
            return;
      }
      this.spinner = true;
      this.systemOk = true;
      this.$api.recordNoticeSystemList({page:this.systemPage,pageNum:15}).then(res => {
        if(res.code == '00'){
          // console.log(res);
          // this.systemList = res.data;
          this.systemList = this.systemList.concat(res.data);
          this.spinner = false;
          if(this.systemList.length == 0){
            this.systemNull = true;
          }
          if(res.data.length == 15){
            this.systemPage++;
            this.systemOk = false;
          }else{
            this.systemOk = true;
          }
          if(res.total == 0){
            this.systemNull = true;
          }else{
            this.systemNull = false;
          }
          if(this.systemList.length == res.total && res.total !== 0){
            this.systemTotal = true
          }else{
            this.systemTotal = false;
          }
        }
      })
    },
    // 删除系统消息recordDeleteNoticeSystem
    delSysten(id,index){
      this.$api.recordDeleteNoticeSystem({sid:id}).then(res => {
        if(res.code == '00'){
          // this.systemList.reverse(index);
          this.systemList.splice(index,1);
          this.$toast("删除成功");
        }else{
          this.$toast(res.msg);
        }
      })
    }
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.page{
  margin-top: 6vh;
  .msg-list{
    // display: flex;
    text-align: left;
    border-bottom: 1px solid rgb(240, 240, 240);
    width: 92vw;
    padding-left: 4vw;
    padding-right: 4vw;
    font-size: 14px;
    color: rgb(39, 39, 39);
    .msg-listDiv{
      display: flex;
      align-items: center;
      justify-content: space-between;
      p{
        margin: 10px;
        text-overflow: ellipsis;
          white-space:nowrap;
          overflow:hidden;
      }
      p:nth-child(1){
        span:nth-child(1){
          display: inline-block;
          color: rgb(116, 116, 116);
          vertical-align: middle;
        }
        span:nth-child(2){
          // color: rgb(116, 116, 116);
          display: inline-block;
          width: 180px;
          text-overflow: ellipsis;
          white-space:nowrap;
          overflow:hidden;
          vertical-align: middle;
        }
      }
      p:nth-child(2){
        span{
          // display: inline-block;
          // width: 110px;
          color: rgb(116, 116, 116);
        }
        i{
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
    .msg-listDiv:nth-child(2){
      p:nth-child(1){
        span:nth-child(1){
          vertical-align: text-bottom	;
        }
        span:nth-child(2){
          // overflow: hidden;
          display: inline-block;
          width: 57vw;
          vertical-align: text-bottom	;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap
        }
      }
      p:nth-child(2){
        text-decoration: underline;
      }
    }
  }
}
</style>