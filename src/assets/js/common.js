/**
 * 一些自己写的公共方法，作为Vue的插件形式来使用
 * 在main.js使用Vue.use(..)调用后即可使用
 */

export default {
  install(Vue, opts) {
    // 路由跳转
    Vue.prototype.goto = function(routeObj) {
      if (!routeObj || typeof routeObj !== 'object') {
        return;
      }
      this.$router.push(routeObj);
    };

    // 获取用户信息 如果已经登录
    Vue.prototype.getUserInfo = function() {
      return this.$api.userMyInfo()
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('setLoginStatus', true);
          this.$store.commit('setUserInfo', res.data);
        } else {
          this.$store.commit('setLoginStatus', false);
          this.$store.commit('setUserInfo', {});
        }
        return res;
      }).catch(err => {
        this.$toast(err);
      })
    },

    // 获取系统配置信息
    Vue.prototype.getConfig = function() {
      return this.$api.getConfig()
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('setConfig', res.data);
          this.$store.commit('setSystemName', res.data.webName);
        }
        return res;
      }).catch(err => {
        this.$toast(err);
      })
    }


    // 表单验证
    Vue.prototype.validate = function(form) {
      // 手机号码
      if (form.hasOwnProperty('phone')) {
        if (!form.phone) {
          this.$toast('手机号码不能为空');
          return false;
        }
        if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(form.phone))) {
          this.$toast('手机号码不正确');
          return false;
        }
      }
     // 密码
          if (form.hasOwnProperty('password')) {
            if (!form.password) {
              this.$toast('密码不能为空');
              return false;
            }
            if (form.password.length < 6 || form.password.length > 12) {
              this.$toast('密码长度必须是6~12位');
              return false;
            }
            if (!(/^\w{6,12}$/.test(form.password))) {
              this.$toast('密码格式不正确');
              return false;
            }
          }
          // 确认密码
          if (form.hasOwnProperty('passwordAgain')) {
            if (!form.passwordAgain) {
              this.$toast('确认密码不能为空');
              return false;
            }
            if (form.passwordAgain != form.password) {
              this.$toast('两次输入的密码不一致');
              return false;
            }
          }
          //修改密码
          if(form.hasOwnProperty('newPassword')){
            if(!this.form.newPassword){
              this.$toast('请输入新密码');
              return false;
            }
          }

           // 短信验证码
          if (form.hasOwnProperty('smsCode')) {
            if (!form.smsCode) {
              this.$toast('验证码不能为空');
              return false;
            }
          }

      // 标题 - 发布帖子
      if (form.hasOwnProperty('title')) {
        if (!form.title) {
          this.$toast('标题不能为空');
          return false;
        }
      }

      // 内容 - 发布帖子
      if (form.hasOwnProperty('contents')) {
        if (!form.contents) {
          this.$toast('内容不能为空');
          return false;
        }
      }

      // 版块id - 发布帖子
      if (form.hasOwnProperty('blockId')) {
        if (!form.blockId) {
          this.$toast('版块ID不能为空');
          return false;
        }
      }

      // 帖子id - 帖子详情
      if (form.hasOwnProperty('postId')) {
        if (!form.postId) {
          this.$toast('帖子ID不能为空');
          return false;
        }
      }
      // 银行名称
      if (form.hasOwnProperty('bankId')) {
        if (!form.bankId) {
          this.$toast('选择银行不能为空');
          return false;
        }
      }
      // 银行卡持卡人姓名
      if (form.hasOwnProperty('realName')) {
        if (!form.realName) {
          this.$toast('持卡人姓名不能为空');
          return false;
        }
      }
      // 银行开户行名称
      if (form.hasOwnProperty('bankName')) {
        if (!form.bankName) {
          this.$toast('银行开户行名称不能为空');
          return false;
        }
      }
      // 银行卡号
      if (form.hasOwnProperty('bankCode')) {
        if (!form.bankCode) {
          this.$toast('银行卡号不能为空');
          return false;
        }
      }


      return true;
    }

    // 手机号码
    Vue.prototype.validatePhone = function(phone) {
      if (!phone) {
        this.$toast('手机号码不能为空');
        return false;
      }
      if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone))) {
        this.$toast('手机号码不正确');
        return false;
      }
      return true;
    },

    // 格式化数据 保留两位
    Vue.prototype.format = function(value, keep) {
      keep = keep || 2;
      if (typeof value == 'undefined' || value == null || isNaN(value)) {
        return;
      }
      return Number(value).toFixed(keep);
    },

    // 判断是否大于9 小于9 前面加0
    Vue.prototype.formatTime = function(value) {
      return value > 9 ? value : '0' + value;
    }

    // 判断是否大于9 小于9 前面加0
    Vue.prototype.formatPHPTime = function(value, opt) {
      if (!value) { return; }
      opt = opt || {};
      var time = Number(value) * 1000;
      var date = new Date(time);
      var year = date.getFullYear();
      var month = this.formatTime(date.getMonth() + 1);
      var day = this.formatTime(date.getDate());
      var hour = this.formatTime(date.getHours());
      var minute = this.formatTime(date.getMinutes());
      var second = this.formatTime(date.getSeconds());
      if (opt.hideDate) {
        return hour + ':' + minute + ':' + second;
      } else if (opt.hideTime) {
        return year + '-' + month + '-' + day;
      } else if (opt.showDay) {
        return month + '-' + day;
      } else {
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      }
    }

    // 天数转换
    Vue.prototype.formatDay = function (time) {
      var day = parseInt(time / 24);
      var hour = parseInt(time % 24);
      var str = '';
      if (day > 0) {
        str = day + "天";
      }
      if (hour > 0) {
        str += hour + "小时";
      }
      return str;
    }

    // 判断路径是否是绝对路径
    Vue.prototype.getImgURL = function(url) {
      if (url && (url.includes('http') || url.includes('https'))) {
        return url;
      } else {
        return this.$store.state.baseImgURL + url;
      }
    }

    // 判断路径是否是绝对路径
    Vue.prototype.getVideoURL = function(url) {
      if (url && (url.includes('http') || url.includes('https'))) {
        return url;
      } else {
        return this.$store.state.baseVideoURL + url;
      }
    }

    // 判断是否是微信浏览器
    Vue.prototype.isWeChat = function() {
      return /micromessenger/.test(navigator.userAgent.toLowerCase());
    }

    // 处理用户名 只显示第一个和最后一个字
    Vue.prototype.hideName = function(name) {
      return name && name.replace(/^(.).*(.)$/, "$1***$2");
    }

    // 处理手机号
    Vue.prototype.hidePhone = function(phone) {
      return phone && phone.replace(/^(.{4}).*(.{4})$/, "$1****$2");
    }

    // 判断是否是App
    Vue.prototype.isApp = function() {
      return !window.location.host;
    }

    // 获取iframe src下的name的值
    Vue.prototype.getQueryParam = function(name, src) {
        var reg = new RegExp(name + '=([^&]*)(&|$)', 'i');
        var r = src.match(reg);
        if (r != null) {
            return unescape(r[1]);
        }
        return null;
    }
    // 获取倒计时  通过时间戳转换
    Vue.prototype.getInterval = function(start, end) {
      var day, hour, minute, second, interval;
        interval = end - start;
        // interval /= 1000;  如果是毫秒级 请开启
        if( (interval / 60 /60 / 24) < 1 ){
          day = 0;
        }else{
          day = parseInt(interval / 60 /60 / 24);
        }

        hour = parseInt(interval / 60 /60 % 24);
        minute =parseInt(interval / 60 % 60);
        second = parseInt(interval % 60);
        return {
          day: day<=9?'0'+day:day,
          hour: hour<=9?'0'+hour:hour,
          minute: minute<=9?'0'+minute:minute,
          second: second<=9?'0'+second:second
        }
      }
    
    //时间戳转为日期格式
    Vue.prototype.formatDate=function(now) {
      var year=now.getFullYear();
      var month=now.getMonth()+1;
      var date=now.getDate();
      var hour=now.getHours();
      var minute=now.getMinutes();
      var second=now.getSeconds();
      return ""+year+"-"+month+"-"+date+''+hour+":"+minute+":"+second;
    }
    // 公共计时器 到达startTime后调用startMethod, 到达endTime后调用endMethod
    // Vue.prototype.vInterval = function(opt) {
    //   opt = opt || {};
    //   if (!opt.startTime || !opt.endTime) { return; }
    //   var timer = setInterval(() => {
    //     var now = new Date();
    //     var nowTime = now.getTime();
    //     var year = now.getFullYear();
    //     var month = now.getMonth() + 1;
    //     var day = now.getDate();
    //     var startTime = new Date(`${year}/${month}/${day} ${opt.startTime}`).getTime();
    //     var endTime = new Date(`${year}/${month}/${day} ${opt.endTime}`).getTime();
    //     if (startTime <= nowTime && nowTime < endTime) {
    //       opt.startMethod && opt.startMethod();
    //     } else {
    //       opt.endMethod && opt.endMethod();
    //     }
    //   }, 1000);

    //   return timer;
    // }


  }
}
