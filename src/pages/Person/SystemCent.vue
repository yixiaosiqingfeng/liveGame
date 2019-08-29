<template>
  <section class="page">
    <!-- vue页面模板 -->
    <!-- 搭建： src/router/index.js 注册路由 -->
    <h3>{{systemInfo.title}}</h3>
    <p>{{systemInfo.content}}</p>
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
      systemInfo: []
    }
  },
  created(){
    // 搭建：进入页面时执行
    this.getSystemAction();
    this.getSystemInfo();
  },
  methods:{
    // 搭建：函数方法
    getSystemAction(){
      // console.log(this.$route.query.id);
      this.$api.recordNoticeSystemAction({sid: this.$route.query.id}).then(res => {
        if(res.code == '00'){
          // console.log(res);
        }
      })
    },
    // 详情
    getSystemInfo(){
      this.$api.recordNoticeSystemInfo({nsid: this.$route.query.id}).then(res => {
        if(res.code == '00'){
          this.systemInfo = res.data;
          // console.log(res);
        }
      })
    }
  }
}
</script>


<style lang='less' scoped>
@import '../../assets/css/_variable.less';
.page{
    margin-top: 8vh;
}
</style>