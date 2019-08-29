import Vue from 'vue'
import Router from 'vue-router'

// 一级页面
import Home from '@/pages/Home/Home'
import Live from '@/pages/Home/Live'
import Buy from '@/pages/Buy/Buy'
import Order from '@/pages/Order/Order'
import Person from '@/pages/Person/Person'

// 二级页面
// const 。。。 = () => import('@/pages/。。。/。。。');
const BetList = () => import('@/pages/Person/BetList');
const FundList = () => import('@/pages/Person/FundList');
const ProfitReport = () => import('@/pages/Person/ProfitReport');
const ModifierPwd = () => import('@/pages/Person/ModifierPwd');
const BankCards = () => import('@/pages/Person/BankCards');
const BindBankcard = () => import('@/pages/Person/BindBankcard');
const CapitalPwd = () => import('@/pages/Person/CapitalPwd');
const ModifyUser = () => import('@/pages/Person/ModifyUser');
const Topup = () => import('@/pages/Person/Topup');
const Withdrawals = () => import('@/pages/Person/Withdrawals');
const Login = () => import('@/pages/Person/Login');
const Register = () => import('@/pages/Person/Register');
const ForgetPwd = () => import('@/pages/Person/ForgetPwd');
const Proclamation = () => import('@/pages/Buy/Proclamation');
const SystemMsg = () => import('@/pages/Person/SystemMsg');
const SystemCent = () => import('@/pages/Person/SystemCent');
const ConfirmPay = () => import('@/pages/Person/ConfirmPay');
const ForgetCapotPwd = () => import('@/pages/Person/ForgetCapotPwd');

Vue.use(Router)

export default new Router({
  routes: [
    // 搭建：路由模板
    // {
    //   path: '/',
    //   name: '',
    //   component: ,
    //   meta: {
    //     title: '首页',//页面title
    //     requireAuth: false, //检查登录
    //     showHd: true, // 显示头部
    //     showTab: true, // 显示tab
    //     hideBack: true, //隐藏返回按钮
    //   }
    // },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '直播',//页面title
        requireAuth: false, //检查登录
        showHd: true, // 显示头部
        showTab:true, // 显示tab
        hideBack: true, //隐藏返回按钮
      }
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy,
      meta: {
        title: '公告',//页面title
        requireAuth: false, //检查登录
        showHd: true, // 显示头部
        showTab:true, // 显示tab
        hideBack: true, //隐藏返回按钮
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        title: '开奖结果',//页面title
        requireAuth: false, //检查登录
        showHd: true, // 显示头部
        showTab:true, // 显示tab
        hideBack: true, //隐藏返回按钮
      }
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: {
        title: '个人',//页面title
        requireAuth: false, //检查登录
        showHd: true, // 显示头部
        showTab:true, // 显示tab
        hideBack: true, //隐藏返回按钮
      }
    },
    {
      path: '/live',
      name: 'Live',
      component: Live,
      meta: {
        title: '直播',//页面title
        requireAuth: false, //检查登录
        showHd: false, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',//页面title
        requireAuth: false, //检查登录
        showHd: false, // 显示头部
        showTab:false, // 显示tab
        hideBack: true, //隐藏返回按钮
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册',//页面title
        requireAuth: false, //检查登录
        showHd: false, // 显示头部
        showTab:false, // 显示tab
        hideBack: true, //隐藏返回按钮
      }
    },
    {
      path: '/forget-pwd',
      name: 'ForgetPwd',
      component: ForgetPwd,
      meta: {
        title: '找回密码',//页面title
        requireAuth: false, //检查登录
        showHd: false, // 显示头部
        showTab:false, // 显示tab
        hideBack: true, //隐藏返回按钮
      }
    },
    {
      path: '/proclamation',
      name: 'Proclamation',
      component: Proclamation,
      meta: {
        title: '公告详情',//页面title
        requireAuth: false, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/bet-list',
      name: 'BetList',
      component: BetList,
      meta: {
        title: '投注记录',//页面title
        requireAuth: false, //检查登录
        showHd: false, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/fund-list',
      name: 'FundList',
      component: FundList,
      meta: {
        title: '资金记录',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/profit-report',
      name: 'ProfitReport',
      component: ProfitReport,
      meta: {
        title: '盈亏报表',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/modifier-pwd',
      name: 'ModifierPwd',
      component: ModifierPwd,
      meta: {
        title: '修改登录密码',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/bank-cards',
      name: 'BankCards',
      component: BankCards,
      meta: {
        title: '银行卡管理',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/bind-bankcard',
      name: 'BindBankcard',
      component: BindBankcard,
      meta: {
        title: '添加银行卡',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/capital-pwd',
      name: 'CapitalPwd',
      component: CapitalPwd,
      meta: {
        title: '设置资金密码',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/forgetCapot-pwd',
      name: 'ForgetCapotPwd',
      component: ForgetCapotPwd,
      meta: {
        title: '忘记资金密码',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/modify-user',
      name: 'ModifyUser',
      component: ModifyUser,
      meta: {
        title: '修改用户资料',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/topup',
      name: 'Topup',
      component: Topup,
      meta: {
        title: '充值',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/confirm-pay',
      name: 'ConfirmPay',
      component: ConfirmPay,
      meta: {
        title: '确认充值',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/withdrawals',
      name: 'Withdrawals',
      component: Withdrawals,
      meta: {
        title: '提现',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/system-msg',
      name: 'SystemMsg',
      component: SystemMsg,
      meta: {
        title: '系统消息',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    {
      path: '/system-cent',
      name: 'SystemCent',
      component: SystemCent,
      meta: {
        title: '系统消息详情',//页面title
        requireAuth: true, //检查登录
        showHd: true, // 显示头部
        showTab:false, // 显示tab
        hideBack: false, //隐藏返回按钮
      }
    },
    
    //搭建：必须作为数组的最后一项
    {
      path: '*',
      redirect: '/'
    },
  ]
})
