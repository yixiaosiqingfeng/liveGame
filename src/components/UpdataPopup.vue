<template>
  <div class="updata-popup">
    <mt-popup v-model="visible"  class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">{{title}}</div>
      <div class="popup-bd" v-html="html">
      </div>

      <div class="btn-area flex">
        <mt-button class="flex-item btn-cancel" type='danger' size='large' plain @click.native='cancel'>稍后再说</mt-button>
        <mt-button class="flex-item btn-confirm" type='danger' size='large' @click.native='confirm'>立即更新</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'UpdataPopup',
  props: ['visible', 'html','title'],
  data() {
    return {
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      this.$emit('confirm');
    },
  }
}

</script>


<style lang='less'>
@import '../assets/css/_variable.less';

.updata-popup {
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
    // background: url('../assets/img/home/popup-top.png') center top no-repeat;
    background-size: 55% ;
    margin-top: -.3rem;
    padding-top:1.85rem;
  }

  .popup-bd {
    padding: .25rem 1rem;
    background: @popup-bgc;
    font-size: .12rem;
    text-align: center;

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
    }
    .btn-confirm {
      color: #fff ;
      border-left: .01rem solid  #fff;
    }
    .btn-danger {
      margin: 0;
      height: .41rem;
      line-height: .41rem;
    }

  }
}

</style>
