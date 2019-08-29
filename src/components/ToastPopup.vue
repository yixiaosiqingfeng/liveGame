<template>
  <div class="toast-popup">
    <mt-popup v-model="visible"  class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">{{title}}</div>
      <div class="popup-bd" v-html="html">
      </div>

      <div class="btn-area flex">
        <mt-button class="flex-item btn-cancel" type='danger' size='large' plain @click.native='cancel'>关闭</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'ToastPopup',
  props: ['visible', 'html','title'],
  data() {
    return {
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
  }
}

</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.toast-popup {
  color: #fff;
  .popup-container {
    z-index: 10;
    width: 90%;
    border-radius:10px;
    background-color: @popup-bgc;
    border: @popup-bgc .03rem solid;
  }
  .picker-toolbar {
    line-height: .8rem;
    font-size: 16px;
    text-align: center;
    background-size: 55% ;
    margin-top: -.3rem;
    padding-top:0.85rem;
    height: 8px;
  }

  .popup-bd {
    padding: .25rem 2rem;
    background: @popup-bgc;
    font-size: 14px;
    text-align: left;

  }

  .btn-area {
    width: 90%;
    border-top: 0.05rem solid #fff;
    padding: 5px 0 0 0;
    margin: 1rem auto 0.2rem;
    .mint-button {
      border-radius: 0;
      width: 49%;
      display: inline-block;
      font-size: 15px;
      background-color:@popup-bgc;
    }
    .btn-cancel {
      border: none;
      color: #fff;
      letter-spacing: 10px;
      transform: translateX(5px);
    }
    .btn-danger {
      margin: 0;
      height: .41rem;
      line-height: .41rem;
    }

  }
}

</style>
