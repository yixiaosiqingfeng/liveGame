<template>
  <mt-header :title="title" class='bar-header'>
    <span class="bar-r" slot='left'><slot name='left'><mt-button v-show='!hideBack' icon="back" @click.native='goback()' slot='left'></mt-button></slot></span>
    <span class="bar-r" slot='right'><slot name='right'></slot></span>
  </mt-header>
</template>


<script>
export default {
  name: 'VHeader',
  props: ['title', 'hideBack'],
  data() {
    return {}
  },
  methods: {
    goback() {
      this.$router.back();
    }
  },
}
</script>


<style lang='less'>
    .bar-header{
      height: 6vh;
      line-height: 6vh;
      // background-color: #222125;
      position: fixed;
      top: 0%;
      width: 100vw;
      font-size: 16px;
      background: linear-gradient(to right, rgb(230, 133, 247), rgb(244, 19, 133));
      position: fixed;
      top: 0%;
      width: 100vw;
    }
    .mint-header-title{
      letter-spacing: 1px;

    }

</style>
