<template>
  <div class="content_page">
    <div class="content_page_main">
      <a-button type="primary" @click="getList">早盘</a-button>
      <a-button type="primary" style="margin-left: 10px" @click="getTodayList"
        >比赛开始前后5分钟</a-button
      >
      <a-button type="primary" style="margin-left: 10px" @click="getTodayList2"
        >当天30分钟</a-button
      >
      <a-button
        type="primary"
        style="margin-left: 10px"
        @click="getBaseBallList"
        >篮球</a-button
      >
      <a-button type="primary" style="margin-left: 10px" @click="getScoreList"
        >获取得分</a-button
      >
       <a-button type="primary" style="margin-left: 10px" @click="getAllData_ok">澳客</a-button>
       <a-button type="primary" style="margin-left: 10px" @click="getDcAllData_ok">99数据</a-button> 
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      rq1: "",
      rq2: "",
    };
  },
  methods: {
    
    handleMatch(data) {
      let matchName = data.lg.na; //赛事名称
      let zhu_name = data.ts[0].na; //主队名称
      let ke_name = data.ts[1].na; //客队名称
      let arrOdds = data.mg;
      let matchTime = data.bt;
      let matchId =data.id;
  
      //"进球-大/小","单/双","进球-大/小-上半场","进球-大/小-下半场","进球-大/小","进球-大/小-上半场","进球-大/小-下半场"
      // const arrName =["让球","让球-上半场","大/小","大/小-上半场","大/小-下半场","平局退款","平局退款-上半场","平局退款-下半场","单/双",
      // "两队均有进球","两队均有进球-上半场","两队均有进球-下半场","第1粒进球"
      // ,"半场/全场","让球胜平负","让球胜平负-上半场","让球胜平负-下半场","最多进球半场"]

      let arrName2 = ["独赢", "独赢-上半场", "独赢-下半场"];
      let arrName3 = [
        "让球",
        "两队均有进球",
        "两队均有进球-上半场",
        "两队均有进球-下半场",
        "最多进球半场",
        "第1粒进球",
        "大/小",
        "大/小-上半场",
        "角球:大/小",
        "角球:大/小-上半场"
      ];
      let arrName4 = [
        zhu_name + " 进球-大/小",
        zhu_name + " 进球-大/小-上半场",
        zhu_name + " 进球-大/小-下半场",
      ];
      let arrName5 = [
        ke_name + " 进球-大/小",
        ke_name + " 进球-大/小-上半场",
        ke_name + " 进球-大/小-下半场",
      ];
      let json = [];
      arrOdds.forEach((element) => {
        if (arrName2.indexOf(element.nm) >= 0) {
          var m6 = {
            saishi: matchName,
            zhuName: zhu_name,
            keName: ke_name,
            type: element.nm,
            zhu: element.mks[0].op[0].od,
            ke: element.mks[0].op[2].od,
            avg: element.mks[0].op[1].od,
            matchTime: matchTime.toString(),
            bocai: "1",
            pingRangValue: matchId,
            matchId: matchId
          };
          json.push(m6);
          //this.$api.oddsApi.insert_mq(m6)
        }

        if (arrName3.indexOf(element.nm) >= 0) {
          for(var i=0;i<element.mks.length;i++){
          var m6 = {
            saishi: matchName,
            zhuName: zhu_name,
            keName: ke_name,
            type: element.nm,
            zhuRangValue: element.mks[i].op[0].nm,
            keRangValue: element.mks[i].op[1].nm,
            zhu: element.mks[i].op[0].od,
            ke: element.mks[i].op[1].od,
            avg: i,
            matchTime: matchTime.toString(),
            bocai: "1",
            pingRangValue: matchId,
            matchId: matchId
          };
          json.push(m6);
          }
          // this.$api.oddsApi.insert_mq(m6)
        }
        if (arrName4.indexOf(element.nm) >= 0) {
           for(var i=0;i<element.mks.length;i++){
          var m6 = {
            saishi: matchName,
            zhuName: zhu_name,
            keName: ke_name,
            type: element.nm.replace(zhu_name, "").trim(),
            zhuRangValue: zhu_name,
            keRangValue: element.mks[i].op[1].nm,
            zhu: element.mks[i].op[0].od,
            ke: element.mks[i].op[1].od,
            avg: i,
            matchTime: matchTime.toString(),
            bocai: "1",
            pingRangValue: matchId,
            matchId: matchId
          };
          json.push(m6);
           }
          // this.$api.oddsApi.insert_mq(m6)
        }
        if (arrName5.indexOf(element.nm) >= 0) {
          var m6 = {
            saishi: matchName,
            zhuName: zhu_name,
            keName: ke_name,
            type: element.nm.replace(ke_name, "").trim(),
            zhuRangValue: ke_name,
            keRangValue: element.mks[0].op[1].nm,
            zhu: element.mks[0].op[0].od,
            ke: element.mks[0].op[1].od,
            matchTime: matchTime.toString(),
            bocai: "1",
            pingRangValue: matchId,
            matchId: matchId
          };
          json.push(m6);
          // this.$api.oddsApi.insert_mq(m6)
        }
      });
      this.$api.oddsApi.insert_mq({ listObj: JSON.stringify(json) });
    },
    handleBaseBallMatch(data) {
      let matchName = data.lg.na; //赛事名称
      let zhu_name = data.ts[0].na; //主队名称
      let ke_name = data.ts[1].na; //客队名称
      let arrOdds = data.mg;
      let matchTime = data.bt;

      //"进球-大/小","单/双","进球-大/小-上半场","进球-大/小-下半场","进球-大/小","进球-大/小-上半场","进球-大/小-下半场"
      // const arrName =["让球","让球-上半场","大/小","大/小-上半场","大/小-下半场","平局退款","平局退款-上半场","平局退款-下半场","单/双",
      // "两队均有进球","两队均有进球-上半场","两队均有进球-下半场","第1粒进球"
      // ,"半场/全场","让球胜平负","让球胜平负-上半场","让球胜平负-下半场","最多进球半场"]

      //  let arrName2 = ["让分","独赢-上半场","独赢-下半场"]
      let arrName3 = [
        "让分",
        "总分大小",
        "胜负",
        "让分-上半场",
        "总分大小-上半场",
        "大/小",
      ];
      let json = [];
      arrOdds.forEach((element) => {
        if (arrName3.indexOf(element.nm) >= 0) {
          var m6 = {
            saishi: matchName,
            zhuName: zhu_name,
            keName: ke_name,
            type: element.nm,
            zhuRangValue: element.mks[0].op[0].nm,
            keRangValue: element.mks[0].op[1].nm,
            zhu: element.mks[0].op[0].od,
            ke: element.mks[0].op[1].od,
            matchTime: matchTime.toString(),
            bocai: "2",
          };
          json.push(m6);
          // this.$api.oddsApi.insert_mq(m6)
        }
      });
      this.$api.oddsApi.insert_mq({ listObj: JSON.stringify(json) });
    },
    getById(matchId) {
      this.$api.oddsApi
        .m6({ languageType: "CMN", matchId: matchId })
        .then((res) => {
          this.handleMatch(res.data);
          console.info(res);
        });
    },
    getBaseBallById(matchId) {
      this.$api.oddsApi
        .m6({ languageType: "CMN", matchId: matchId })
        .then((res) => {
          this.handleBaseBallMatch(res.data);
          console.info(res);
        });
    },
    handleList(matchData) {
      // matchData.forEach((element) => {
      //   this.getById(element.id);
      // });
      for(let k=0;k<matchData.length;k++){
        setTimeout(()=>{
          this.getById(matchData[k].id);
        },500*k)
      }
    },
    handleBaseBallList(matchData) {
      matchData.forEach((element) => {
        this.getBaseBallById(element.id);
      });
    },
    getList() {
      this.requireData(4, 1);
      // setTimeout(() => {
      //   this.requireData(4, 2);
      // }, 200000);
      // setTimeout(() => {
      //   this.requireData(4, 3);
      // }, 4000);
      // setTimeout(() => {
      //   this.requireData(4, 4);
      // }, 4000 * 2);
      // setTimeout(() => {
      //   this.requireData(4, 5);
      // }, 4000 * 3);
      // setTimeout(() => {
      //   this.requireData(4, 6);
      // }, 4000 * 4);
      // setTimeout(() => {
      //   this.requireData(4, 7);
      // }, 4000 * 5);
      // setTimeout(() => {
      //   this.requireData(4, 8);
      // }, 4000 * 6);
      // setTimeout(() => {
      //   this.requireData(4, 9);
      // }, 4000 * 7);
      // setTimeout(() => {
      //   this.requireData(4, 10);
      // }, 4000 * 8);
    },
    getTodayList() { //计算比赛开始5分钟和比赛前5分钟的赔率
      this.$api.oddsApi.insertFive()
    },
    getTodayList2() {
      this.requireData(3, 1);
      // setTimeout(() => {
      //   this.requireData(3, 2);
      // }, 10000);
      // setTimeout(() => {
      //   this.requireData(3, 3);
      // }, 20000);
      setInterval(() => {
        this.requireData(3, 1);
        // setTimeout(()=>{
        //   this.requireData(3,2)
        // },10000);
        //  setTimeout(()=>{
        //   this.requireData(3,3)
        // },20000);
      }, 10000 * 60 * 6);
    },
    getBaseBallList() {
      this.requireBaseBallData(4, 1);
      setTimeout(() => {
        this.requireBaseBallData(4, 2);
      }, 2000);
      setTimeout(() => {
        this.requireBaseBallData(4, 3);
      }, 4000);
      setTimeout(() => {
        this.requireBaseBallData(4, 4);
      }, 4000 * 2);
      setTimeout(() => {
        this.requireBaseBallData(4, 5);
      }, 4000 * 3);
      setTimeout(() => {
        this.requireBaseBallData(4, 6);
      }, 4000 * 4);
      setTimeout(() => {
        this.requirerequireBaseBallDataData(4, 7);
      }, 4000 * 5);
      setTimeout(() => {
        this.requireBaseBallData(4, 8);
      }, 4000 * 6);
      setTimeout(() => {
        this.requireBaseBallData(4, 9);
      }, 4000 * 7);
      setTimeout(() => {
        this.requireBaseBallData(4, 10);
      }, 4000 * 8);
    },
    requireBaseBallData(type, current) {
      this.$api.oddsApi
        .m6List({
          current: current,
          isPC: true,
          languageType: "CMN",
          orderBy: 0,
          sportId: 3,
          type: type,
        })
        .then((res) => {
          // console.info(res.data.records);
          this.handleBaseBallList(res.data.records);
        });
    },
    requireData(type, current) {
      this.$api.oddsApi
        .m6List({
          current: current,
          isPC: true,
          languageType: "CMN",
          leagueIds: [11140, 10661, 10308, 16025, 10392, 10706, 10712, 10785, 10847, 11616, 10628, 10640, 10489, 10320, 10403, 16819, 16818, 16820,
          10815, 10840, 11006, 11018,11030,10807,11460,11015,10983,10528,10744,10584,11016, 12273, 16797, 16799, 16800, 16798,
          11024,11091,11064,11062,10583,10604,  10519, 16684, 10740, 11085, 10552, 10691,
          10446, 10444, 10580, 16959, 10509, 10937, 10901, 11035, 11002, 10483, 11610, 11861, 10407, 10534, 10432, 10522
          ,11128, 10746, 10596, 11162, 10495, 10864, 11031, 11188, 11121, 10698],
          orderBy: 0,
          sportId: 1,
          type: type,
        })
        .then((res) => {
          // console.info(res.data.records);
          this.handleList(res.data.records);
        });
    },
    // getResultData(beginTime,endTime){
    //   this.$api.testApi.m6Result({
    //       beginTime: beginTime,
    //       endTime: endTime,
    //       languageType: "CMN",
    //       sportId: 1
    //     })
    //     .then((res) => {
    //       // console.info(res.data.records);
    //       this.handleResultList(res.data)
    //     });
    // },
    getScoreList() {
      //更新比分
      var startDate = (new Date()).setHours(0,0,0,0)-24*60*60*1000;
      var endDate = (new Date()).setHours(23,59,59,0)-24*60*60*1000;
      var that = this;
       that.getInter(startDate, endDate);
      // var int = setInterval(function () {
      //   that.getInter(startDate, endDate);
      //   startDate = startDate + 86400000;
      //   endDate = endDate + 86400000;
      //   if (startDate > 1648310400000) {
      //     clearInterval(int);
      //   }
      // }, 10000*2);
    },
    getInter(rq1, rq2) {
      this.$api.oddsApi
        .getOddsByKeName({
          beginTime: rq1,
          endTime: rq2,
          languageType: "CMN",
          sportId: 1,
        })
        .then((res) => {
          console.info(res);
          this.handleResultList(res.data);
        });
    },
    handleResultList(data) {
      let json = [];
      data.forEach((element) => {
        let matchTime = element.bt;
        let zhu_name = element.ts[0].na;
        let ke_name = element.ts[1].na;
        let nsg = element.nsg;
        let score_full = "0:0";
        let score_half = "0:0";

        nsg.forEach((el) => {
          if (el.pe == 1001 && el.tyg == 5) {
            score_full = el.sc[0] + ":" + el.sc[1];
          }
          if (el.pe == 1002 && el.tyg == 5) {
            score_half = el.sc[0] + ":" + el.sc[1];
          }
        });
        var m6 = {
          zhuName: zhu_name,
          keName: ke_name,
          matchTime: matchTime.toString(),
          bifenFull: score_full,
          bifenHalf: score_half,
        };
        json.push(m6);
      });

      this.$api.oddsApi.insert({ listObj: JSON.stringify(json) });
    },
    reqiureOBData(){
      this.$api.oddsApi
        .ob({
          cos: 0,
          cuid: "497796411690623759",
          euid: "3020101",
          mids: "2033788,2033791,2073210",
          orpt: "0",
          pids: "",
          sort: 1
        })
        .then((res) => {
           console.info(res);
         this.$api.oddsApi.insert_ob({ gzipStr: res.data });
        });
    },
    //获取单场的赔率
    getAllData_ok() { //存入ob 表中
      //console.info("hshshshsjsjssss");
       let json = [];
       let saishi_arr= [];
      // console.info(this.getHistoryList)
      $("tr[id^=match_detail]").each(function () {
        let $match = $(this);
        var t_id = $(this).attr("matchid"); // 比赛ID
        var is_start= $(this).attr("state"); //是否开赛

       // if(t_id!=undefined && t_id!='' && t_id!=null && is_start=='Not'){
        if(t_id!=undefined && t_id!='' && t_id!=null ){
          
          let saishi=  $match.attr("type");
        //  let url= $match.find(".ls").find("a").attr("href");

         // let monthDay= $.trim($match.find("td").eq(2).html()).substring(0,5);
        //  if(monthDay>='08-30'){
       
          let matchTime=(new Date()).getFullYear()+"-" + $.trim($match.find("td").eq(2).html())+":00";
         // console.info($match.find(".dzname:first").find("a").html());
          let zhuName= $.trim($match.find(".dzname:first").find("a").html());
          let keName= $.trim($match.find(".dzname:last").find("a").html());
          let bifenFull= $.trim($match.find(".show_score").find("b").eq(0).html())
          +":"+ $.trim($match.find(".show_score").find("b").eq(2).html())
          ;
          let bifenHalf =$.trim($match.find("td").eq(7).find(".font_red").html())
          let zhu =$.trim($match.find("td").eq(9).find("span").eq(0).html());
          let avg =$.trim($match.find("td").eq(9).find("span").eq(1).html());
          let ke =$.trim($match.find("td").eq(9).find("span").eq(2).html());

          let rangValue= $.trim($match.find(".dzname:first").find(".ctrl_rq").html());
       
          let m6= {
            saishi: saishi,
            matchId: t_id,
            zhuName: zhuName,
            keName: keName,
            matchTime: matchTime,
            bifenHalf,
            bifenFull,
            zhu,
            avg,
            ke,
            rangValue,
            bocai: '1',
            type: '独赢'
          }
          
            json.push(m6);
         // }
         }
        
       
      });
     // console.info(json)
      this.$api.oddsApi.insert_mq({ listObj: JSON.stringify(json),bocai: '1' });
    },
     //获取单场的赔率
    getJingCaiData_ok() {
      //console.info("hshshshsjsjssss");
       let json = [];
       let saishi_arr= [];
      // console.info(this.getHistoryList)
      $("tr[id^=match_detail]").each(function () {
        let $match = $(this);
        var t_id = $(this).attr("matchid"); // 比赛ID
       // var is_start= $(this).attr("state"); //是否开赛

        if(t_id!=undefined && t_id!='' && t_id!=null ){
       //  if(t_id!=undefined && t_id!='' && t_id!=null ){
          
          let saishi=  $match.attr("type");
        //  let url= $match.find(".ls").find("a").attr("href");

         // let monthDay= $.trim($match.find("td").eq(2).html()).substring(0,5);
        //  if(monthDay>='08-30'){
       
          let matchTime=(new Date()).getFullYear()+"-" + $.trim($match.find("td").eq(2).html())+":00";
         // console.info($match.find(".dzname:first").find("a").html());
          let zhuName= $.trim($match.find(".dzname:first").find("a").html());
          let keName= $.trim($match.find(".dzname:last").find("a").html());
          let bifenFull= $.trim($match.find(".show_score").find("b").eq(0).html())
          +":"+ $.trim($match.find(".show_score").find("b").eq(2).html())
          ;
          let bifenHalf =$.trim($match.find("td").eq(7).find(".font_red").html())

          if($match.find("td").eq(9).find("span")){

          let zhu =$.trim($match.find("td").eq(9).find("span").eq(0).html());
          let avg =$.trim($match.find("td").eq(9).find("span").eq(1).html());
          let ke =$.trim($match.find("td").eq(9).find("span").eq(2).html());
          

          let rangValue= $.trim($match.find(".dzname:first").find(".ctrl_rq").html());
       
          let m6= {
            saishi: saishi,
            matchId: t_id,
            zhuName: zhuName,
            keName: keName,
            matchTime: matchTime,
            bifenHalf,
            bifenFull,
            zhu,
            avg,
            ke,
            rangValue,
            bocai: '1',
            type: '独赢'
          }
          
            json.push(m6);
         // }
         }
        }
        
       
      });
     // console.info(json)
      this.$api.oddsApi.insert_mq({ listObj: JSON.stringify(json),bocai: '1' });
    },
//获取99家
     getDcAllData_ok() {
      //console.info("hshshshsjsjssss");
      
       let json = [];
       let saishi_arr= [];
      // console.info(this.getHistoryList)
      $("tr[id^=match_detail]").each(function () {
        let $match = $(this);
        var t_id = $(this).attr("matchid"); // 比赛ID
        var is_start= $(this).attr("state"); //是否开赛 Not ,End

        if(t_id!=undefined && t_id!='' && t_id!=null && is_start=='Not'){
       //  if(t_id!=undefined && t_id!='' && t_id!=null ){
          
          let saishi=  $match.attr("type");
        //  let url= $match.find(".ls").find("a").attr("href");

         // let monthDay= $.trim($match.find("td").eq(2).html()).substring(0,5);
        //  if(monthDay>='08-30'){
       
          let matchTime=(new Date()).getFullYear()+"-" + $.trim($match.find("td").eq(2).html())+":00";
          console.info($match.find(".dzname:first").find("a").html());
          let zhuName= $.trim($match.find(".dzname:first").find("a").html());
          let keName= $.trim($match.find(".dzname:last").find("a").html());
          //let zhu =$.trim($match.find(".ctrl_self_betopt").find("span")[0].html());
          //let avg =$.trim($match.find(".ctrl_self_betopt").find("span")[0].html());
          //let zhu =$.trim($match.find(".ctrl_self_betopt").find("span")[0].html());

          // let oddUrl= $.trim($match.find(".linebgdata").find("a")[0].attr("href"));
       
          let m6= {
            saishi: saishi,
            matchId: t_id,
            zhuName: zhuName,
            keName: keName,
            matchTime: matchTime
          }
          
            json.push(m6);
         // }
         }
        
       
      });
      //console.info(saishi_arr)
      this.$api.oddsApi.insert_mq({ listObj: JSON.stringify(json),bocai: '0' });
    }
  },
};
</script>

<style lang="less" scoped>
.content_page {
  height: 50px;
  overflow-y: auto;
  width: 200px;
  text-align: left;
  background: #fff;
  box-shadow: 0 0 5px #999;
  padding: 10px;
  //color: red;
  position: fixed;
  z-index: 100001;
  right: 40%;
  top: 0;
}

.plTitle {
  width: 100px;
  color: green;
  margin-top: 3px;
}
.plBocai {
  width: 40px;
  padding: 3px;
  color: orange;
}
.ant-btn {
  font-size: 9px;
  height: 15px;
}
</style>


