<template>
  <div class="content_page">
    <div class="content_page_main">
      <a-button type="primary" @click="getList">早盘</a-button>
      <a-button type="primary" style="margin-left: 10px" @click="getTodayList"
        >当天5分钟</a-button
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
      <a-input :value="rq1"></a-input><a-input :value="rq2"></a-input>
      <a-button type="primary" style="margin-left: 10px" @click="getScoreList"
        >获取得分</a-button
      >
    </div>
  </div>
</template>

<script>
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

      //"进球-大/小","单/双","进球-大/小-上半场","进球-大/小-下半场","进球-大/小","进球-大/小-上半场","进球-大/小-下半场"
      // const arrName =["让球","让球-上半场","大/小","大/小-上半场","大/小-下半场","平局退款","平局退款-上半场","平局退款-下半场","单/双",
      // "两队均有进球","两队均有进球-上半场","两队均有进球-下半场","第1粒进球"
      // ,"半场/全场","让球胜平负","让球胜平负-上半场","让球胜平负-下半场","最多进球半场"]

      let arrName2 = ["独赢", "独赢-上半场", "独赢-下半场"];
      let arrName3 = [
        "两队均有进球",
        "两队均有进球-上半场",
        "两队均有进球-下半场",
        "最多进球半场",
        "第1粒进球",
        "大/小",
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
          };
          json.push(m6);
          //this.$api.oddsApi.insert_mq(m6)
        }

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
            bocai: "1",
          };
          json.push(m6);
          // this.$api.oddsApi.insert_mq(m6)
        }
        if (arrName4.indexOf(element.nm) >= 0) {
          var m6 = {
            saishi: matchName,
            zhuName: zhu_name,
            keName: ke_name,
            type: element.nm.replace(zhu_name, "").trim(),
            zhuRangValue: zhu_name,
            keRangValue: element.mks[0].op[1].nm,
            zhu: element.mks[0].op[0].od,
            ke: element.mks[0].op[1].od,
            matchTime: matchTime.toString(),
            bocai: "1",
          };
          json.push(m6);
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
      matchData.forEach((element) => {
        this.getById(element.id);
      });
    },
    handleBaseBallList(matchData) {
      matchData.forEach((element) => {
        this.getBaseBallById(element.id);
      });
    },
    getList() {
      this.requireData(4, 1);
      setTimeout(() => {
        this.requireData(4, 2);
      }, 2000);
      setTimeout(() => {
        this.requireData(4, 3);
      }, 4000);
      setTimeout(() => {
        this.requireData(4, 4);
      }, 4000 * 2);
      setTimeout(() => {
        this.requireData(4, 5);
      }, 4000 * 3);
      setTimeout(() => {
        this.requireData(4, 6);
      }, 4000 * 4);
      setTimeout(() => {
        this.requireData(4, 7);
      }, 4000 * 5);
      setTimeout(() => {
        this.requireData(4, 8);
      }, 4000 * 6);
      setTimeout(() => {
        this.requireData(4, 9);
      }, 4000 * 7);
      setTimeout(() => {
        this.requireData(4, 10);
      }, 4000 * 8);
    },
    getTodayList() {
      this.requireData(3, 1);
      setTimeout(() => {
        this.requireData(3, 2);
      }, 10000);
      setTimeout(() => {
        this.requireData(3, 3);
      }, 20000);
      setInterval(() => {
        this.requireData(3, 1);
        // setTimeout(()=>{
        //   this.requireData(3,2)
        // },10000);
        //  setTimeout(()=>{
        //   this.requireData(3,3)
        // },20000);
      }, 10000 * 60);
    },
    getTodayList2() {
      this.requireData(3, 1);
      setTimeout(() => {
        this.requireData(3, 2);
      }, 10000);
      setTimeout(() => {
        this.requireData(3, 3);
      }, 20000);
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


