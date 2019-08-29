  /*搭建：所有后端请求方法*/
  import axios from '@/assets/js/http';


  export default {
    // 接口模板
  //  FuncName (params) {
  //     return axios.post('apiUrl', params)
  //     .then(res => res.data);
  //   },
    //  登录
    userLogin  (params) {
      return axios.post('/user/login', params)
      .then(res => res.data);
    },
    //  注册
    userRegister  (params) {
      return axios.post('/user/register ', params)
      .then(res => res.data);
    },
    //  忘记密码
    userForgetPassword  (params) {
      return axios.post('/user/forgetPassword ', params)
      .then(res => res.data);
    },
    //  发送验证码
    sms (params) {
      return axios.post('/sms ', params)
      .then(res => res.data); 
    },
    //  修改密码
    userEditPassword  (params) {
      return axios.post('/user/editPassword ', params)
      .then(res => res.data);
    },
    //  退出登录
    userLoginOut  (params) {
      return axios.post('/user/loginOut ', params)
      .then(res => res.data);
    },
    // 用户信息
    userMyInfo(params) {
      return axios.post('/user/myInfo', params)
      .then(res => res.data);
    },
    // 实名认证
    userRealName  (params) {
      return axios.post('/user/realName ', params)
      .then(res => res.data);
    },
    // 修改用户信息 
    userEditUserInfo(params) {
      return axios.post('/user/editUserInfo ', params)
      .then(res => res.data);
    },
    // 添加银行卡
    userAddBankcard(params) {
      return axios.post('/user/addBankcard ', params)
      .then(res => res.data);
    },
    // 查询银行卡
    userBankcardList(params) {
      return axios.post('/user/bankcardList', params)
      .then(res => res.data);
    },
    //  删除银行卡
    userDelBankcard(params) {
      return axios.post('/user/delBankcard', params)
      .then(res => res.data);
    },
    // 设置资金密码
    userSetMPassword(params) {
      return axios.post('/user/setMPassword', params)
      .then(res => res.data);
    },
    // 修改资金密码
    userEditMPassword(params) {
      return axios.post('/user/editMPassword', params)
      .then(res => res.data);
    }, 
    // 提现记录
    recordWithdrawalList(params) {
      return axios.post('/record/withdrawalList ', params)
      .then(res => res.data);
    }, 
    // 充值记录 
    recordRechargeList(params) {
      return axios.post('/record/rechargeList', params)
      .then(res => res.data);
    }, 
    // 资金流水
    recordJournalResult(params) {
      return axios.post('/record/journalResult', params)
      .then(res => res.data);
    },
    // 系统公告 
    recordNoticeList(params) {
      return axios.post('/record/noticeList', params)
      .then(res => res.data);
    }, 
    // 系统消息 
    recordNoticeSystemList(params) {
      return axios.post('/record/noticeSystemList', params)
      .then(res => res.data);
    }, 
    // 系统公告详情 
    recordNoticeInfo(params) {
      return axios.post('/record/noticeInfo', params)
      .then(res => res.data);
    },
    // 系统消息详情
    recordNoticeSystemInfo(params) {
      return axios.post('/record/noticeSystemInfo', params)
      .then(res => res.data);
    },
    // 系统消息已读
    recordNoticeSystemAction(params) {
      return axios.post('/record/noticeSystemAction', params)
      .then(res => res.data);
    },  
    // 开奖结果
    resultRecord(params) {
      return axios.post('/record/resultRecord', params)
      .then(res => res.data);
    },  
    // 查看往期开奖
    allResult (params) {
      return axios.post('/record/allResult', params)
      .then(res => res.data);
    },  
    // 下单初始化
    original (params) {
      return axios.post('/order/original', params)
      .then(res => res.data);
    },  
    // 添加订单
    addOrder (params) {
      return axios.post('/order/addOrder ', params)
      .then(res => res.data);
    },  
    // 游戏列表
    gameList (params) {
      return axios.post('/room/gameList ', params)
      .then(res => res.data);
    },
    //机器人
    rebotsList (params) {
      return axios.post('/room/rebotsList', params)
      .then(res => res.data);
    },
    // 首页
    Homeindex (params) {
      return axios.post('/home/index', params)
      .then(res => res.data);
    },
    //长连接登录
    longConnectLogin (params) {
      return axios.post('/room/longConnectLogin', params)
      .then(res => res.data);
    },
    // 长连接退出房间
    longConnectLogout  (params) {
      return axios.post('/room/longConnectLogout ', params)
      .then(res => res.data);
    },
    // 长连接管理员禁言
    longConnectForbid (params) {
      return axios.post('/room/longConnectForbid ', params)
      .then(res => res.data);
    },
    // 长连接发送信息
    longConnectSend (params) {
      return axios.post('/room/longConnectSend ', params)
      .then(res => res.data);
    },
    // 房间信息
    roomInfo (params) {
      return axios.post('/room/roomInfo', params)
      .then(res => res.data);
    },
    
    // 删除系统消息
    recordDeleteNoticeSystem(params) {
      return axios.post('/record/deleteNoticeSystem', params)
      .then(res => res.data);
    }, 
    // 盈亏报表
    recordPlossResult(params) {
      return axios.post('/record/plossResult ', params)
      .then(res => res.data);
    }, 
    // 充值信息
    payPayOption(params) {
      return axios.post('/pay/payOption ', params)
      .then(res => res.data);
    }, 
    // 开始充值
    payPay(params) {
      return axios.post('/pay/pay', params)
      .then(res => res.data);
    }, 
    // 提现初始化pay/withdrawOrigin
    payWithdrawOrigin(params) {
      return axios.post('/pay/withdrawOrigin', params)
      .then(res => res.data);
    },
    // 提现信息
    payWithdraw(params) {
      return axios.post('/pay/withdraw', params)
      .then(res => res.data);
    }, 
    // 投注记录
    recordOrderRecord(params) {
      return axios.post('/record/orderRecord ', params)
      .then(res => res.data);
    }, 
    // 撤单order/cancelOrder
    orderCancelOrder(params) {
      return axios.post('/order/cancelOrder', params)
      .then(res => res.data);
    }, 
    // 获取客服二维码user/customerService
    userCustomerService(params) {
      return axios.post('/user/customerService', params)
      .then(res => res.data);
    }, 
    // 找回资金密码
    userForgetMPassword(params) {
      return axios.post('/user/forgetMPassword', params)
      .then(res => res.data);
    }, 
    // 找回资金密码
    systemTime(params) {
      return axios.post('/home/systemTime', params)
      .then(res => res.data);
    }, 
  }
  
