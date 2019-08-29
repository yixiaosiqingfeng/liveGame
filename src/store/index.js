import Vue from 'vue';
import Vuex from 'vuex';

import CONFIG from '@@/config';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    baseURL: CONFIG.baseURL, //api请求地址
    baseImgURL: CONFIG.baseImgURL, //图片请求地址前缀
    appVersion: 'v1.0.0', // app版本号
    isLogin: false, //登录状态
    userInfo: {}, //用户信息
    weChatShareInfo: {}, //微信分享参数
    config: {}, //配置信息
    systemName: '', // 网站名字
    payForm: '', // 支付表单
    shopcart: '', // 购物车
    ws:{},//聊天室对象
    clientId:{},//聊天室di
    time:{},//系统时间
  },
  mutations,
  actions,
})
