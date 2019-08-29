<!-- 银行支行名称选择器 -->
<template>
  <div class="bank-picker">
    <mt-popup v-model="visible" position='bottom' class='popup-container' :closeOnClickModal='false'>
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </div>

      <mt-picker :slots="slots" @change='change'></mt-picker>
    </mt-popup>
  </div>
</template>


<script>
export default {
  name: 'DataPicker',
  props: ['visible'],
  data() {
    return {
      selectTimes: '',
      slots: [{
        flex: 1,
        values: ['今日', '昨日', '本周', '上周', '本月','上月','今年','去年'],
      }],
    }
  },
  methods: {
    // 隐藏pciker
    cancel() {
      this.$emit('cancel');
    },
    change(picker, values) {
      // 初始化时未滚动直接点击确定
      if (typeof values[0] == 'undefined') {
        this.selectTimes = '中国工商银行';
        this.$nextTick(function() {
          // picker.setSlotValues(0, area.provinces);
          picker.setSlotValue(0, this.selectTimes);
        })
        return;
      }

      if (values[0] != this.selectTimes) {
        this.selectTimes = values[0];
      }
    },
    confirm() {
      this.$emit('confirm', {selectTimes: this.selectTimes});
    }
  },
}
</script>


<style lang='less'>
.bank-picker {
  .popup-container {
    width: 101%;
  }
  .picker-item {
    font-size: .16rem;
    text-align: center;
  }
}

</style>
