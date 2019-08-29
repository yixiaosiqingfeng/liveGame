<template>
<div>
    <!-- 头部 -->
    <div class="livetitle">
        <span @click="goback"><i class="iconfont icon-fanhui"></i></span>
        <span>直播</span>
    </div>
    <!-- 视屏 -->
    <!--  video.js 点击事件问题 -->
    <div style="position: fixed;width: 100vw;height: 100vh;z-index:1000000;" :class="{'showlive':gameNext}" @click="getGame()" ></div>

    <video  id="my-video" class="video-js vjs-default-skin" :class="{'fiterTow':gameNext}"   loop="true" controls="controls" style=" object-fit: cover;"> 
    </video>
     <div v-if="liveMyMsg.status == 0" style="position: fixed;width: 100vw;height: 100vh;z-index: 999999;background: black;">
        <h1 style="position: fixed;top: 40%;left: 50%;transform: translate(-50%,-50%);width: 100%;color:white">主播暂时不在家, 游戏走一波~~</h1>
    </div>
    
    <!-- 头部 -->
    <div class="liveTop">
        <div :class="{'fiterTow':gameNext}" >
            <img :src="getImgURL(liveMyMsg.anchor_haed)" alt="">
            <span class="one-txt-cut">{{liveMyMsg.anchor}}</span>
            <span>{{liveMyMsg.total_number>=10000?(liveMyMsg.total_number-liveMyMsg.total_number%1000)/10000+'万':liveMyMsg.total_number}}人</span>
        </div>
        <span v-if="gameNext" class="liveOut" @click="getGame(1)"><i class="iconfont icon-quxiao"></i></span>
    </div>

    <!-- 中奖弹幕 -->
    <div class="liveTips">
        <ul ref="liveTipsLi" v-for="(item,index) in TipsList " :key="index" >
            <!-- class="animate" :style="{'animation-delay': parseInt(Math.random()*(7-1)+2) +'s'}"   -->
             <li class="liveTipsLi" :class="index%2 ==0?'tipsList':''">
                 <div >
                    <img :src='"../../assets/img/tips"+ randomlist[index] +".png"'  >
                        <span :class="'tipsBack'+randomlist[index]">{{item.text}} &nbsp;</span>
                    <img :src='"../../assets/img/tipsmin"+randomlist[index]+".png"' alt="">
                 </div>
            </li>
            
        </ul>
    </div>
  
    <div class="gameMain" v-if="gameNext && !gameNextTow"> 
        <ul
        v-infinite-scroll="gameList"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        >
            <li v-for="(item,index) in gameLists" :key="item.id"  @click="openGame(0,3,index,item.id)">
                <div :class="{'backRed':selectFlag==1}" @click.stop="openGame(0,0,index,item.id)" >单</div>
                <div>
                    <span>竞猜开奖首号</span>
                    <span>{{ item.interval>60?item.interval/60+'分钟':item.interval+'秒' }}/期 收益{{item.odds}}%</span>
                    <span>{{item.game_name}}</span>
                </div>
                <div :class="{'backBlue':selectFlag==0}" @click.stop="openGame(0,1,index,item.id)">双</div>
            </li>
        </ul>
    </div>
    <!-- 选择后div -->
    <!-- v-for="item in gameLists[nextGameId]" :key="item.id"  -->
    <div  class="gameMainNext" v-if="gameNext && gameNextTow ">
        <div class="gameNextHeader">
            <div :class="{'backRed':selectFlag==1}" @click="openGame(1,0)">单</div>
            <div >
                <span>竞猜开奖首号</span>
                <span>{{ gameLists[nextGameId].interval>60? gameLists[nextGameId].interval/60+'分钟':gameLists[nextGameId].interval+'秒' }}/期 收益{{gameLists[nextGameId].odds}}%</span>
                <span>{{gameLists[nextGameId].game_name}}</span>
            </div>
            <div :class="{'backBlue':selectFlag==0}" @click="openGame(1,1)">双</div>
        </div>
    <div class="gameNextMain">
        <div class="nextOne">
            <span class="nextOneTitle">历史开奖:</span>
            <div class="nextOneRight">
                <ul>
                    <li style="font-size: 12px;color: rgb(189, 63, 78);" v-if="gameLists[nextGameId].result[gameLists[nextGameId].result.length-1].msg != null"><span> {{ gameLists[nextGameId].result[gameLists[nextGameId].result.length-1].msg }} </span></li>
                    <li v-for="items in  gameLists[nextGameId].result.slice(0,5)" :key="items.id">
                        <span>
                            <i  :class="items.result_type == 0 ? 'atrBlue' : 'atrRed' "> {{ (items.result).split(/\,/g)[0] }} </i>
                            <i>{{ (items.result).split(/\,/g).splice(1,).join(' ') }} </i>
                        </span>
                        <span  :class="items.result_type == 0 ? 'atrBlue' : 'atrRed' ">{{ items.result_type == 0 ? '双' : '单' }}</span>
                        <span  :class="items.result_type == 0 ? 'backBlue' : 'backRed' ">&nbsp;</span>
                    </li>
                </ul>
                <span class="nextMore" @click="getHistory(gameLists[nextGameId].id)">更多 <i class="iconfont icon-gengduo"></i> </span>
            </div>
        </div>
        <div class="nextTow">
            <div class="nextTowLeft">
                <!-- <span>第{{  gameLists[nextGameId].canBuy.periods }}期截止</span> -->
                <span>第{{  gameLists[nextGameId].canBuy.periods }}期</span>
                <div>
                    {{ gameDate.hour }}:{{ gameDate.minute }}:{{ gameDate.second }}
                </div>
            </div>
            <div class="nextTowRight">
                <span>当前可用余额</span>
                <div>
                    {{  userInfo.user_money?userInfo.user_money:0 }}
                </div>
            </div>
        </div>
        <div class="nextTowMain">
                <span>单注{{ gameLists[nextGameId].amount}}元</span>
                <span @click="Calculation(0)"><i class="iconfont icon-minus" style="font-size:12px"></i></span>
                <span><input type="number" v-model="bet_number" @blur="bet_number==''?bet_number=10:''"></span>
                <span @click="Calculation(1)"><i class="iconfont icon-addTodo-nav" style="font-size:12px" ></i></span>
            </div>
        <div class="information">
            <span>您投注{{bet_number}}注, 共{{ (bet_number *  gameLists[nextGameId].amount) }}元</span>
            <span>中奖奖金{{ (bet_number *  gameLists[nextGameId].amount)+ (bet_number *  gameLists[nextGameId].amount) * (gameLists[nextGameId].odds/100) }}元, 可盈利{{(bet_number *  gameLists[nextGameId].amount) * (gameLists[nextGameId].odds/100)}}元</span>
        </div>
        <!-- 游戏id  单双 期号 注数  -->
        <p class='immediately' @click="immediately(gameLists[nextGameId].id,selectFlag,gameLists[nextGameId].canBuy.periods,bet_number)" :class="[{'showBtn':showBtnflag}]">立即投注</p>
        <!-- <br> -->
       </div>
    </div>

    <!-- 底部 -->
    <!-- 弹幕 -->
    <div class="Barrage"  :class="[{'fiterTow':gameNext},{'showZindex':gameNext}]" >
        <ul class="BarrageUl">  
            <li class="animated  fadeInLeft  " style=" animation-duration: 0.3s;" v-for="item in liveMsg " :key="item.id">
                <span class="Barragespan1" v-if="item.open_level == '1'">
                    <i class="iconfont icon-dengji-copy-copy "></i>{{item.level}}
                </span>
                <span class="Barragespan2">{{item.nickname}} :&nbsp;</span><span> {{item.content}}</span>
                <strong v-if="adminFlag && item.rebot_id  < 1" @click="outUserMsg(item.nickname,item.user_id)">禁言</strong>
            </li>
        </ul>
    </div>
    <!-- 机器人 -->
    <div class="Robot animated  bounceInUp " v-if="adminFlag && RobotFlag" :class="{'showZindex':gameNext}">
        <ul
        v-infinite-scroll="userAdmin"
        infinite-scroll-disabled="Robotloading"
        infinite-scroll-distance="10"
        >
            <li v-for=" item in rebotsList" :key="item.id" @click="setUserMsg(item.id,item.nickname)">
               <span> <i class="iconfont icon-jiqir"></i></span>
               <span class="one-txt-cut">{{ item.nickname }}</span>
            </li>
        </ul>
    </div>
    <div class="liveBtm" :class="[{'showZindex':gameNext}]" v-show="!openliveMag">
        <div :class="{'adminInput':adminFlag}">
            <!-- <input type="text" name="" placeholder="说点什么吧~~" v-model="liveMag"  @keyup.enter="longConnectSend()" @blur="towflag" @click=""> -->
            <input type="text" name="" placeholder="说点什么吧~~" v-model="liveMag"   @click="livemsgFlag">
        </div>
        <div :class="{'adminInputRight':adminFlag}" >
            <span v-if="adminFlag" class="liveBtmspan1"  @click="getRobot()">
                <img src="../../assets/img/game3.png" alt="" >
            </span>
            <span class="liveBtmspan2" @click="getGame()">
                <img src="../../assets/img/game1.png" alt="" >
            </span>
            <router-link to="/bet-list" tag="span"  class="liveBtmspan3 " :class="{'getI':PlaceFlag}" >
                <img src="../../assets/img/game2.png" alt=""  >
            </router-link>
        </div>
    </div>
    <!-- 发言  -->
   <div class="liveBtmOpen" v-show="openliveMag" >
        <div class="liveBtmOpenDiv" >
            <input type="text" name="" ref="liveBtmOpen" placeholder="说点什么吧~~" v-model="liveMag"  @keyup.enter="longConnectSend()" @blur="livemsgFalse" >
            <span @click.stop="longConnectSend()" ><i class="iconfont icon-fasong"></i>发送</span>
        </div>
    </div>
    <!-- 查看往期  -->
    <mt-popup
    v-model="popupVisible"
    position="right"
    >
    <Seebefore  @SecarchFlag="getHistory"  ref="yeluosen"></Seebefore>
    </mt-popup>
</div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
import {mapState} from 'vuex';
import Seebefore from '@/components/Seebefore';
import CONFIG from '@@/config';


/* eslint-disable */
export default {
name: "TestTwo",
components: {Seebefore},

data() {
    return {
        myvideo:'',
        gameNext:false,//游戏下一步开关
        gameNextTow:false,//游戏选择开关
        game_id:'',//游戏id
        lottery_type:'',//单双
        periods:'',//期号
        bet_number:10,//注数
        originallist:'',//游戏信息
        gameDate:{'hour':'00','minute':'00','second':'00'},//倒计时
        selectFlag:'',//判断选择单双
        gameLists:[],//游戏列表
        adminFlag:false,//管理员开关
        nextGameId:'',//下一层的显示id
        rebotsList:[],//机器人id
        RobotFlag:false,//展开机器人开关
        mydaojishi:{},//倒计时
        mytime:{},//php系统倒计时
        player:[],//直播对象
        rid:'',//房间号id
        cid:'',//客户端id
        liveMag:'',//弹幕信息
        rebot_id:0,//机器人id
        liveMsg:[],//聊天数组
        liveMyMsg:[],//房间信息
        loading: true, // 开关
        page: 1,        // 页数
        Robotloading: true, // 开关
        Robotpage: 1,        // 页数
        popupVisible:false, //查看往期
        showBtnflag:false, // 按钮禁用
        btnflag:false,//开关
        towFlag:false,//第二次点击的开关
        PlaceFlag:false,//下单红点
        TipsList:[],//中间列表
        randomlist:[],//随机数
        mysetInter:{},//定时器
        setInterSum:0,//定时器计数器
        tipsInt:{},//定时器弹幕
        openliveMag:false,//发送信息开关
        liveMagTowFlag:false,//发送信息是否没有内容
        clickFlag:false,//判断没有在离开的时候点击
        outmsg:false,//离开点击屏幕如果同输入框离开一致还原输入框

    };
},
computed: {
    ...mapState({
        userInfo: state => state.userInfo,
        isLogin: state => state.isLogin,
        wsObj: state => state.ws,
        clientId: state => state.clientId,
        time: state => state.time,
    }),
},
created() {
    this.rid = this.$route.query.rid
    this.roomInfo();
    this.getUserInfo();
},
mounted() { 
    // 公告时间
    this.getTime();

   this.tipsInt =  setInterval(()=>{
       var maxlength =document.getElementsByClassName('liveTipsLi').length
       if( maxlength > this.setInterSum ){
           //    给当前的加上
            document.getElementsByClassName('liveTipsLi')[this.setInterSum].classList.add("animate")
            this.setInterSum++;
       }
   },2000)
    this.getlogin();
    this.wsObj.onmessage = (e)=> {
        // 后端返回信息
        var data = JSON.parse(e.data);
         switch(data['type']){
            // 登录 更新用户列表
            case 'login':
            //    加人数
            this.liveMyMsg.total_number++;
            break;
            // 发言
            case 'say':
                // 别人发言
                this.liveMsg = this.liveMsg.concat(JSON.parse(e.data));
                 setTimeout(()=>{
                    var div = document.getElementsByClassName('BarrageUl');
                    div[0].scrollTop = div[0].scrollHeight
                },1000)
                
            break;
            case 'push':
                this.TipsList = this.TipsList.concat({text:data.content});
                this.randomlist.push(parseInt(Math.random()*(4-1)+1));
                break;
            // 用户退出 更新用户列表
            case 'logout':
            // -1
            this.liveMyMsg.total_number--;
            
                break;
        }
    };
    this.gameList();
    this.userAdmin();
    // this.liveTips()
    // longConnectLogin 长连接登录
    // longConnectLogout 长连接退出房间
    // longConnectForbid 长连接管理员禁言
    // longConnectSend 长连接发送信息
},

methods: {
    getTime (){
      this.$api.systemTime({}).then(res=>{
        this.mytime = setInterval(() => {
            var mydate = res.data++;
            this.$store.commit('time',mydate );
        }, 1000);
      })
    },
    //
    towflag(){
        this.towFlag= true;
    },  
    // 查看往期
     getHistory(id){
      if(!isNaN(id) && id != false){
        this.gamePage = '';
        this.$refs.yeluosen.allResult(id); 
        // this.allResult();//获取往期结果
      }
      this.popupVisible = !this.popupVisible;
    },
     // 获取列表
    gameList(){
      this.loading = true;
      this.$indicator.open({text: '加载中...',spinnerType: 'fading-circle'});
      this.$api.gameList({page:this.page,pageNum:5}).then(res=>{
        if (res.data != "") {
          this.loading = false;
          this.gameLists = this.gameLists.concat(res.data);
          this.$indicator.close();

          this.page++
        } else {
            this.loading = true;
            this.$indicator.close();
        }
      })
    },
    // 机器人选择发芽
    setUserMsg(id,name){
        this.rebot_id = id;
        this.clickFlag = true;
        if(this.openliveMag == false){
            this.openliveMag = true;
            this.$nextTick(()=>{
                this.$refs.liveBtmOpen.focus()
            })
        }
        this.$refs.liveBtmOpen.placeholder = "当前为:"+name;
        this.$nextTick(()=>{
            this.$refs.liveBtmOpen.focus()
        })
    },
    //禁言
    outUserMsg(name,id){
        this.$messagebox.confirm('确定禁言'+name+'?').then(action => {
            this.$api.longConnectForbid({
                rid:this.rid,
                uid:id
            }).then(res=>{
                this.$toast(res.msg)
            })
        });
    },
    //获取房间信息
    roomInfo(){
        this.$api.roomInfo({
            rid:this.rid
        }).then(res=>{
            this.liveMyMsg = res.data;
            this.getlive()
        })
    },
    //长连接发送信息
    longConnectSend(){
    
        this.clickFlag = true;
        if(!this.isLogin){
            this.$toast("请登录");
            // this.$router.push({path: '/login'});
            return;
        }
        if(this.liveMag ==  ''){    
            this.$toast("输入内容不能为空");
            this.liveMagTowFlag = true;
            return;
        }
        this.$api.longConnectSend({
           rid:this.rid,
           client_id:this.clientId,
           rebot_id:this.rebot_id, //判断是不是机器人
           contents:this.liveMag
        }).then(res=>{
            if(res.code == '200119'){
                this.$toast(res.msg);
            }
             this.$nextTick(function(){//客服回复渲染完毕 将回复列表自动滑到最底下
                var div = document.getElementsByClassName('BarrageUl');
                div[0].scrollTop = div[0].scrollHeight ;
            })
        })
        this.liveMag = '';
        this.$refs.liveBtmOpen.placeholder = '说点什么吧~~';
        this.rebot_id = 0;
        this.livemsgFalse();
    },
    //长连接登录
    getlogin(){
        this.$api.longConnectLogin({
            rid:this.rid,
            client_id:this.clientId,
        }).then(res=>{
        })
    },
    // 初始化直播
    getlive(){
        if(this.liveMyMsg.status == 0){
            return;
        }
        this.player = videojs('my-video', {
            bigPlayButton: false,
            textTrackDisplay: false,
            posterImage: true,
            errorDisplay: false,
            controlBar: false,
            autoplay :true,
            // muted: true,
        }, ()=> {
            this.player.src({
                src: this.liveMyMsg.link,
                type:'application/x-mpegURL'
            });
            setTimeout(()=>{
                this.enableMute();
               this.player.play();
            },1000)
        })
    },
    // 解决 谷歌浏览器禁止自动播放问题
    enableMute(){
        if( this.player.el_ == null){
            return false;
        }else{
            this.player.el_.children[0].muted =false;
            // this.$refs.myVideo[myid].play();
        }
    },
     //判断是不是管理员
    userAdmin(){
        if(this.userInfo.admin_room.split(',').indexOf(this.rid.toString()) != '-1'){
            this.adminFlag= true;

            this.Robotloading = true;
            this.$indicator.open({text: '加载中...',spinnerType: 'fading-circle'});
            this.$api.rebotsList({
                rid:this.rid,
                pageNum:10,
                page:this.Robotpage
            }).then(res=>{
                if (res.data != "") {
                    this.Robotloading = false;
                    this.rebotsList = this.rebotsList.concat(res.data);
                    this.$indicator.close();
                    this.Robotpage++
                } else {
                    this.Robotloading = true;
                    this.$indicator.close();
                }
            })
        }else{
            this.adminFlag= false;
        }
    },
    //机器人开关
    getRobot(){
        this.RobotFlag = !this.RobotFlag;
    },
    // 打开游戏
    getGame(flag){
        // 如果离开了
        this.outmsg = true; 
        if(this.towFlag){
            this.towFlag = false;
            return;
        }
        this.selectFlag = 3;
        this.gameNext = !this.gameNext;
        this.gameNextTow =false; 
        // if(flag == 1){  this.gameNext = false;this.gameNextTow =false;  }
        if(this.gameNext ){
            document.getElementById('my-video').classList.add('fiter')
            return;
        }
        document.getElementById("my-video").classList.remove("fiter");
    },
   
    // 立即下注
    immediately(id,type,periods,bet){
        if(!this.isLogin){
           this.$toast("请登录");
        //    待定
           this.$router.push({path: '/login'});
            return;
        }
        if(this.showBtnflag){
            this.$toast("等待结算,请稍后哟~~")
            return;
        }
        if(type == 3){
            this.$toast('请选择单双哟~')
            return;
        }
        
    if(this.btnflag){
            return;
    }else{
        this.btnflag = true;
        this.$api.addOrder({
            game_id:id,
            lottery_type:type,
            periods:periods,
            bet_number:bet,
        }).then(res=>{
            this.btnflag =false;
            if(res.code == '00'){
                this.$toast("下注成功");
                this.getGame(1);
                this.getUserInfo();
                this.PlaceFlag= true;
            }else{
                this.$toast(res.msg);
            }
        })
    }
    },
    // 计算注数
    Calculation(flag){
        // 默认10注
        if(flag == 0){  
            this.bet_number <=10 ? this.bet_number=10:this.bet_number-=10;
        }else if(flag == 1){
            this.bet_number= parseInt(this.bet_number)+10;
        }
    },
     // 选择单双
    openGame(e,flag,index,id){
        // 参数1:判断选择第一个选择 参数2 判断选择单双
        flag == 0 ? this.selectFlag = 1 : flag == 3?this.selectFlag = 3:this.selectFlag = 0;
        if(e == 0){
            clearInterval(this.mydaojishi);
            this.nextGameId = index;
            this.gameIdNext = id;
            this.gameNextTow = !this.gameNextTow;
            this.bet_number = 10;
            this.outTime();
        }
    },
    // 获取下单初始化
    original(){
        this.mydaojishiApi = setInterval(()=>{
        this.$api.original({
            game_id:this.gameIdNext
        }).then(res=>{
            if(this.gameLists[this.nextGameId].canBuy.periods == res.data.canBuy.periods){
                clearInterval(this.mydaojishiApi); 
                this.gameLists[this.nextGameId].result = res.data.result;
            }else{

            }
        })
       },1000)
    },
    // 倒计时
    // 打开不同的玩法 清空倒计时 重新获取倒计时 ok
    // 倒计时结束后请求最新的一期,轮询开奖结果,提示正在开奖中ok
    // 请求游戏开奖的结果赋值给大的数组 
    outTime(){
        this.gameDate ={'hour':'00','minute':'00','second':'00'};
        this.mydaojishi = setInterval(()=>{
        // if((this.gameLists[this.nextGameId].canBuy.start_time) - (Date.parse(new Date())/1000)  >= 0){
        if((this.gameLists[this.nextGameId].canBuy.start_time) - this.time  >= 0){
            console.log(this.time);
         this.gameDate = this.getInterval( this.time,this.gameLists[this.nextGameId].canBuy.start_time)
        }else{
            clearInterval(this.mydaojishi); 
            this.gameDate  ={'hour':'00','minute':'00','second':'00'};
            this.showBtnflag = true;
            this.mysetInter = setInterval(()=>{
                this.$api.original({
                    game_id:this.gameIdNext
                }).then(res=>{
                    this.gameLists[this.nextGameId].result.push({'msg':'正在开奖中请稍后...'}) 
                    if(res.data.canBuy.periods !=  this.gameLists[this.nextGameId].canBuy.periods){
                        this.gameLists[this.nextGameId].canBuy.periods = res.data.canBuy.periods;
                        this.gameLists[this.nextGameId].canBuy.start_time = res.data.canBuy.start_time;
                        this.gameLists[this.nextGameId].result = res.data.result;

                        this.showBtnflag = false;
                        this.outTime();
                        this.original();
                        clearInterval(this.mysetInter); 
                    }
                })

            },1000)
        }
       },1000)
    },
    //  发言
    livemsgFlag(){
        this.openliveMag = !this.openliveMag   
        this.$nextTick(()=>{
            this.$refs.liveBtmOpen.focus()
        })
    },
    livemsgFalse(){
        console.log('离开');
        // 离开页面点击两次才可以打开游戏
        //如果什么都没有打开就关闭聊天框
        this.towflag()
        setTimeout(()=>{
            if(this.outmsg && this.clickFlag){
                this.outmsg = false;
                this.openliveMag = false;  
            }
            // 判断我又没有点击过
            if(this.clickFlag){
                this.clickFlag = false;
                console.log(this.clickFlag);
                return;
            }
            // 判断点击输入的内容是不是空
            if(this.liveMagTowFlag){    
                this.$toast("输入内容不能为空");
                this.liveMagTowFlag=false;
                this.towflag()
                this.$refs.liveBtmOpen.focus();
                return;
            }
            this.openliveMag = !this.openliveMag   
        },400)
           
    },
    // 返回
    goback() {
      this.$router.back();
    }
},
destroyed(){
    clearInterval(this.mytime);
    clearInterval(this.mydaojishi);
    clearInterval(this.mydaojishiApi);
    clearInterval(this.mysetInter); 
    clearInterval(this.tipsInt); 
    this.player.dispose();
    // 退出聊天室
    this.$api.longConnectLogout({
        rid:this.rid,
        client_id:this.clientId
    }).then(res=>{
       
    })
}
};
</script>

<style lang='less' scoped>
@import '../../assets/css/app.less';
.tipsBack1{
 background: rgb(161, 68, 230) !important;
}
.tipsBack2{
 background: rgb(242, 107, 65) !important;
}
.tipsBack3{
 background: rgb(99, 130, 233) !important;
}
.tipsBack4{
 background: rgb(212, 58, 124) !important;
}
.tipsList{
    margin-top:40px;margin-left:60px
}
.adminInput{
    width: 42% !important;
}
.adminInputRight{
    width: 52% !important;
}
.showZindex{
    z-index: 999999 !important;
}
.showlive{
    background: #2c2c2c;
    opacity: 0.7;
}
.showBtn{
    background: #A9A9A9 !important;
    opacity: 0.6;
}

.mint-indicator{
  z-index: 99999999999 !important;
  position: fixed;
}

// 中奖提示
.liveTips{
    position: fixed;
    width: 150%;
    top: 10%;
    z-index: 999999;

    ul{
        li{
            width: 110%;
            text-align: left;
            display: inline-block;
            margin-bottom: 20px;
            opacity: 0;
            position: absolute;
            font-size: 12px;
            div{
                display: inline-block;
                position: relative;
                img:nth-child(1){  
                    position: absolute;
                    top: 50%;
                    transform: translate(0,-50%); 
                    vertical-align: middle;
                    width: 35px;
                    height: 35px;
                }
                span:nth-child(2){
                    margin-left: 30px;
                    height: 24px;
                    line-height: 24px;
                    display: inline-block;
                    background: rgb(161, 68, 230);
                    text-indent: 10px;
                    color: white;
                }
                img:nth-child(3){
                    vertical-align: middle;
                    width: 20px;
                    height: 17px;
                    position: absolute;
                    top: 50%;
                    margin-top:3px;
                    right: -15px;
                    transform: translate(0,-50%); 
                }
            }
            
        }
    }
}
.animate {
  font-size: 18px;
  color: #000;
  display: inline-block;
  animation: 14s wordsLoop linear 1 normal;
}
@keyframes wordsLoop {
  0% {
      transform: translateX(150%);
      -webkit-transform: translateX(150%);
      opacity: 1;
  }
  100% {
      transform: translateX(-150%);
      -webkit-transform: translateX(-150%);
      opacity: 1;
  }
}

// 查看历史
  .v-modal{
    display: none;
  }
  .mint-popup{
    z-index: 99999999999999 !important;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom right,rgb(209, 71, 184), rgb(131, 165, 226));
    // position: fixed;
    // top: 0;
  } 
// 头部
.livetitle{
    background: linear-gradient(to right, rgb(230, 133, 247), rgb(244, 19, 133));
    height:6vh;
    line-height: 6vh;
    position: fixed;
    top: 0;
    width: 100vw;
    color:white;
    z-index: 10000000;
    span:nth-child(1){
        float: left;
        padding-left: 3%;
        width: 30px;
    }
    span:nth-child(2){
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
video::-webkit-media-controls{
    display:none !important;
}
.my-video{
    width: 100vw !important;
    height: 100vh !important;
    overflow: hidden;
       

}
.video-js{
     width: 100vw !important;
    height: 100vh !important;
    object-fit: cover !important;
    position: fixed;
}
/* .vjs-user-active{
    display:none !important;
} */
.liveTop{
    position: fixed;
    top: 7vh;
    width: 92%;
    height: 40px;
    line-height: 40px;
    left: 4%;
    color: white;
    text-align: left;
    div:nth-child(1){
        overflow: hidden;
        width: 35%;
        height: 36px;
        display: inline-block;
        position: relative;
        border-radius: 17px;
        background-color:rgba(58, 58, 58, 0.4);
        img{
            position: absolute;
            top: 50%;
            left: 6%;
            transform: translate(0,-50%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
        span{
            position: absolute;
            left: 60%;
            transform: translate(-50%);
            font-size: 12px;
            width: 100%;
            text-align: center;
            color: white;
            
        }
        span:nth-child(2),span:nth-child(3){
            display: inline-block;
            width: 60%;
            top: -10px;
            margin-left: 5px;
            // border: 1px solid red;
        }
        span:nth-child(3){
            top: 7px;
        }
        
    }
    
   
    .liveOut{
        float: right;
        color:white;
    }   
}
.Barrage{
    position:fixed;
    width: 100%;
    left: 4%;
    bottom: 7.2%;
    color:white;
    z-index: 1000000;
    text-align: left;
    ul{
        max-height: 25vh;
        width: 68%;
        overflow-y: auto;
      li{
          overflow: hidden;
          display: block;
          margin-bottom: 4%;
          font-size: 14px;
          line-height: 20px;
          span{
              display: inline-block;
          }
          .Barragespan1{
              width: 43px;
              height: 18px;
              line-height: 18px;
              background: rgb(85, 235, 212);
              border-radius: 3px;
              font-size: 12px;
              text-align: center;
              i{
                font-size: 14px;
                margin-right:5px; 
              }
          }
         .Barragespan12{
              margin-left: 5px;
          }
         .Barragespan3{
              margin-left: 4px;
          }
          .Barragespan4{
          }
          strong{
              display:inline-block;
              width: 8vw;
              height: 10px;
              line-height: 10px;
              border: 1px solid red;
              padding: 3px;
              background: red;
              margin-left: 5px;
              font-size: 12px;
              text-align: center;
          }
      }
    }
}
.Robot{
    position:fixed;
    width: 100%;
    right: 0;
    bottom: 7.2%;
    text-align: right;
    color:white;
    width: 24%;
    z-index: 1000000;
    ul{
        max-height: 55vh;
        overflow-y: auto;
        li{
            width: 90%;
            height: 30px;
            border-radius: 6px;
            line-height: 30px;
            background: rgb(157, 213, 0);
            text-align: left;
            padding-left: 5px;
            box-sizing: border-box;
            font-size: 12px;
            margin-bottom: 10px;
            overflow: hidden;
            i{
                font-size: 18px;
                vertical-align: middle;
                background: #aaaaaa;
                border-radius: 50%;
                padding: 2px;
            }
            span{
                display: inline-block;
                float: left;
            }
            span:last-child{
                float: right;
                width: 65%;
                font-size: 12px;
            }
        }
    }
}
.liveBtmOpen{
    position:fixed;
    width: 100%;
    bottom: 0;
    color: white;
    z-index: 1000000;
    div:nth-child(1){
        width: 100%;
        float: left;
        font-size: 13px;    
        input{
            width: 100%;
            float: left;
            height: 42px;
            outline: none;
            border: none;
            background-color: rgba(16, 16, 16, 0.6);
            text-indent: 15px;
            color: white;
            font-size: 14px;
        }
        input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color:    white 
        }
        input::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:    white 
        }
        input:-moz-placeholder { /* Mozilla Firefox 19+ */
            color:    white 
        }
        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
            color:    white 
        }
        span{
            width: 20%;
            position: absolute;
            top: 50%;
            transform: translate(0,-50%);
            right: 5px;
            i{
                font-size: 18px;
                margin-right: 5px;
            }
        }
    }
}
.liveBtm{
    position:fixed;
    width: 100%;
    bottom: 5px;
    color: white;
    height: 50px;
    z-index: 1000000;
    
    div:nth-child(1){
        width: 50%;
        float: left;
        margin-left: 3%;
        font-size: 13px;
        input,p{
            width: 100%;
            float: left;
            height: 32px;
            outline: none;
            border: none;
            border-radius: 30px;
            background-color: rgba(16, 16, 16, 0.3);
            text-indent: 10px;
            color: white;
        }
       
        input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color:    white 
        }
        input::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:    white 
        }
        input:-moz-placeholder { /* Mozilla Firefox 19+ */
            color:    white 
        }
        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
            color:    white 
        }
        span{
            width: 10%;

        }
    }
   
    div:nth-child(2){
        width: 44%;
        // border: 1px solid red;
        overflow: hidden;
        float: left;
        margin-top: -5px;
        span{
            display: inline-block;
            box-sizing: border-box;
            float: right;
            background-color: rgba(16, 16, 16, 0.3);
            height: 40px;
            width: 40px;
            line-height: 40px;
            border-radius: 50%;
            margin-left: 6%;
            position: relative;
            img{
                position: absolute;
                top:50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 25px;
                // height: 25px;
            }
        }
        i{
            font-size: 24px;
            color: white;
        }
        .liveBtmspan1{}
        .liveBtmspan2{
            // background: rgba(255, 181, 54);
            img{
                top: 47%;
                width:28px !important;
            }
            i{
                font-size: 24px !important;
            }
        }
        .liveBtmspan3{
            // background: rgb(93, 201, 126);
            position: relative;

            i{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                font-size: 38px !important;
            }
        }
        .getI{
            position: relative;
            // width: 100%;
            // height: 100%;
        }
        .getI::after {
            content: " ";
            position: absolute;
            display: inline-block;
            top: 15%;
            right:16%;
            width: 6px;
            height: 6px;
            border-radius:50%; 
            background: rgb(255, 66, 0);    
        }
        
    }
}

// 游戏
.gameMain{
    position: absolute;
    top: 49%;
    left: 50%;
    transform:translate(-50%,-50%);
    color: white;
    width: 84%;
    height: 65vh;
    overflow-y: auto;
    z-index: 19999999;
    ul{
        text-align: left;
        li{
            border-radius: 10px;
            margin-bottom: 15px;
            background-color:rgba(200, 198, 198, 0.13);
            height: 82px;
            overflow: hidden;
            display: block;
            position: relative;
            div{
                display:inline-block;
                position: absolute;
                top: 50%;
                transform: translate(0,-50%);
                color: #dbdada;
            }
            div:nth-child(1),div:nth-child(3){
                width: 40px;
                background: rgb(149, 149, 149);
                height: 40px;
                border-radius: 50%;
                line-height: 40px;
                text-align: center;
                overflow: hidden;
                font-size: 13px;
                color: white;
            
            }
            div:nth-child(1){
                left: 8%;
            }
            div:nth-child(2){
                left: 50%;
                transform: translate(-50%,-50%);
                text-align: center;
                span{
                    display: block;
                    margin-top: 2px;
                }
                span:nth-child(1){
                    font-size: 13px;
                }
                span:nth-child(2){
                    font-size: 12px;
                    color: #aaaaaa;
                }
                span:nth-child(3){
                    font-size: 13px;
                }
            }
            div:nth-child(3){
                right: 7%;
            }
        }
    }
}
// i4媒体查询
@media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
    .gameMainNext {
        height: 80vh;
    }
}
.gameMainNext{
    position: absolute;
    top: 52%;
    left: 50%;
    transform:translate(-50%,-50%);
    color: white;
    // border: 1px solid red;
    width: 84%;
    z-index: 9999999;
    // height: vh;
    overflow-y: auto;
    .gameNextHeader{
        border-radius: 5px;
        margin-bottom: 10px;
        background-color:rgba(200, 198, 198, 0.13);
        height: 82px;
        overflow: hidden;
        display: block;
        position: relative;
        div{
            display:inline-block;
            position: absolute;
            top: 50%;
            transform: translate(0,-50%);
            color: #dbdada;
        }
        div:nth-child(1),div:nth-child(3){
            width: 40px;
            background: rgb(149, 149, 149);
            height: 40px;
            border-radius: 50%;
            line-height: 40px;
            text-align: center;
            overflow: hidden;
            font-size: 13px;
            color: white;
        
        }
        div:nth-child(1){
            left: 8%;
        }
      
        div:nth-child(2){
            left: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            span{
                display: block;
                margin-top: 2px;
            }
            span:nth-child(1){
                font-size: 13px;
            }
            span:nth-child(2){
                font-size: 12px;
                color: #aaaaaa;
            }
            span:nth-child(3){
                font-size: 13px;
                color: #f3e300;
            }
        }
        div:nth-child(3){
            right: 7%;
        }
    }
    .gameNextMain{
        overflow-y: auto;
        border-radius: 5px;
        background-color:rgba(200, 198, 198, 0.13);
        .nextOne{
            padding-top: 6%;
            padding-bottom: 6%;
            overflow: hidden;
            .nextOneTitle{
                float: left;
                margin-left: 8%;
                color: #d3d3d3;
            }
            // i5媒体查询
            @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
               .nextOneRight{
                     ul{
                        li{
                            span:nth-child(2){
                                position: absolute;
                                right: 14% !important;
                            }
                        }
                    }   
                }
            } 
            // i4媒体查询
            @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2){
                .nextOneRight{
                    ul{
                        li{
                            span:nth-child(2){
                                position: absolute;
                                right: 14% !important;
                            }
                        }
                    }   
                }
            }
            .nextOneRight{
                float: left;
                padding-left: 3%;
                width: 63%;
                font-size: 13px;
                overflow: hidden;
                text-align: left;
                margin-top: 3px;
                ul{
                    li{
                        width: 90%;
                        margin-bottom: 5px;
                        span:nth-child(1){
                            display: inline-block;
                            width: 75%;
                            font-size: 14px;
                            i:nth-child(1){
                            }
                            i:nth-child(2){
                                font-size: 13px;
                                color: #dbdada;
                            }
                        }
                        span:nth-child(2){
                            position: absolute;
                            right: 20%;
                        }
                        span:nth-child(3){
                            float: right;
                            margin-left: 10px;
                            display: inline-block;
                            width: 13px;
                            height: 13px;
                            margin-top: 2px;
                            border-radius: 50%;
                        }
                    }
                }
                .nextMore{
                    float: right;
                    color: #aaaaaa;
                    font-size: 12px;
                    margin-top: 1%;
                    margin-right: 10%;
                    i{
                        font-size: 12px;
                    }
                }
               
            }
        }
        .nextTow{
            // border: 1px solid red;
            // height: 150px;
            font-size: 14px;
            overflow: hidden;
            .nextTowLeft,.nextTowRight{
                width: 40.8%;
                overflow: hidden;
                color: rgb(243, 227, 0);
                span{
                    display: inline-block;
                    // margin-bottom: 5px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                div{
                    background-color:rgba(186, 186, 186, 0.35);
                    height: 50px;
                    line-height: 50px;
                    font-size: 17px;
                    width: 100%;
                    border-radius: 5px;
                }
            }
            .nextTowLeft{
                float: left;
                margin-left: 7%;
                font-size: 13px;
            }
            .nextTowRight{
                float:right;
                margin-right: 7%;
                font-size: 13px;
            }
            
        }
        .nextTowMain{
            width: 85%;
            margin: 4% auto;
            height: 50px;
            line-height: 50px;
            display: block;
            border-radius: 5px;
            background-color:rgba(186, 186, 186, 0.35);
            margin-bottom: 5px;
            position: relative;
            span{
                position: absolute;
                font-size: 14px;
                letter-spacing: 1px;
            }
            span:nth-child(1){
                left: 10%;
            }
            span:nth-child(2){
                right:34%;
                width: 30px;
                // border: 1px solid red;
                i{
                    font-size: 15px !important;
                }
            }
            span:nth-child(3){
                // border: 1px solid red;
                width: 50px;
                right: 16%;
                overflow: hidden;
                input{
                    width: 100%;
                    background-color:rgba(197, 197, 197, 0);
                    text-align: center;
                    color: white;
                    outline: none;
                    border: none;
                    font-size: 15px;
                }
            }
            span:nth-child(4){
                // border: 1px solid red;
                right: 5%;
                width: 30px;
                i{
                    font-size: 15px !important;
                }
                // text-align: left;
            }
            
        }
        .information{
            margin: 3% auto;
            width: 100%;
            color: #cccccc;
            font-size: 12px;
            letter-spacing: 1px;
            span{
                display: block;
            }
        }
        .immediately{
            margin: 5% auto ;
            width: 86%;
            height: 50px;
            line-height: 50px;
            border-radius: 3px;
            font-size: 15px;
            letter-spacing: 1px;
            background: rgb(186, 63, 189);
        }
    }
} 
.atrRed{
    color: rgb(189, 63, 78);
}
.atrBlue{
    color: rgb(51, 137, 236);
}
.backRed{
    background: rgb(188, 70, 84) !important;
}
.backBlue{
    background: rgb(51, 137, 236) !important;
}
// 模糊
.fiter{
    filter: blur(5px);
}
.fiterTow{
    filter: blur(1px);
}
</style>