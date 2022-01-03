<template>
  <div class="content_page">
    <div class="content_page_main">
      <a-button type="primary"  @click="getList">早盘</a-button>
       <a-button type="primary" style="margin-left:10px;"  @click="getTodayList">当天</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    handleMatch(data) {
      let matchName= data.lg.na //赛事名称
      let zhu_name = data.ts[0].na //主队名称
      let ke_name = data.ts[1].na //客队名称
      let arrOdds = data.mg
      let matchTime= data.bt

      //"进球-大/小","单/双","进球-大/小-上半场","进球-大/小-下半场","进球-大/小","进球-大/小-上半场","进球-大/小-下半场"
      // const arrName =["让球","让球-上半场","大/小","大/小-上半场","大/小-下半场","平局退款","平局退款-上半场","平局退款-下半场","单/双",
      // "两队均有进球","两队均有进球-上半场","两队均有进球-下半场","第1粒进球"
      // ,"半场/全场","让球胜平负","让球胜平负-上半场","让球胜平负-下半场","最多进球半场"]

      let arrName2 = ["独赢","独赢-上半场","独赢-下半场"]
      let arrName3 = ["两队均有进球","两队均有进球-上半场","两队均有进球-下半场","最多进球半场","进球-大/小","第1粒进球"]
      let json=[]
       arrOdds.forEach(element => {
            if(arrName2.indexOf(element.nm)>=0){
                var m6={
                  saishi: matchName,
                  zhuName: zhu_name,
                  keName: ke_name,
                  type: element.nm,
                  zhu: element.mks[0].op[0].od,
                  ke: element.mks[0].op[2].od,
                  avg: element.mks[0].op[1].od,
                  matchTime: matchTime.toString()
                }
                json.push(m6)
                //this.$api.oddsApi.insert_mq(m6)
            }
            if(arrName3.indexOf(element.nm)>=0){
                var m6={
                  saishi: matchName,
                  zhuName: zhu_name,
                  keName: ke_name,
                  type: element.nm,
                  zhuRangValue: element.mks[0].op[0].nm,
                  keRangValue: element.mks[0].op[1].nm,
                  zhu: element.mks[0].op[0].od,
                  ke: element.mks[0].op[1].od,
                  matchTime: matchTime.toString()
                }
                json.push(m6)
               // this.$api.oddsApi.insert_mq(m6)
            }
        });
        this.$api.oddsApi.insert_mq({listObj:JSON.stringify(json)})
    },
    getById(matchId) {
      this.$api.oddsApi
        .m6({ languageType: "CMN", matchId: matchId }).then((res) => {
          this.handleMatch(res.data)
          console.info(res)
        });
    },
    handleList(matchData) {
      matchData.forEach((element) => {
        this.getById(element.id);
      });
    },
    getList() {
      this.requireData(4,1);
       setTimeout(()=>{
         this.requireData(4,2)
       },2000)
       setTimeout(()=>{
         this.requireData(4,3)
       },4000)
       setTimeout(()=>{
         this.requireData(4,4);
       },4000 * 2)
       setTimeout(()=>{
         this.requireData(4,5);
       },4000 * 3)
       setTimeout(()=>{
         this.requireData(4,6);
       },4000 * 4 )
       setTimeout(()=>{
         this.requireData(4,7);
       },4000 * 5)
       setTimeout(()=>{
         this.requireData(4,8);
       },4000 * 6)
       setTimeout(()=>{
         this.requireData(4,9);
       },4000 * 7)
       setTimeout(()=>{
         this.requireData(4,10);
       },4000 * 8)
    },
    getTodayList() {
       this.requireData(3,1);
      //  setTimeout(()=>{
      //    this.requireData(3,2)
      //  },2000)
      //   setTimeout(()=>{
      //    this.requireData(3,3)
      //  },4000)
    },
    requireData(type,current){
      this.$api.oddsApi.m6List({
          current: current,
          isPC: true,
          languageType: "CMN",
          orderBy: 0,
          sportId: 1,
          type: type,
        })
        .then((res) => {
          // console.info(res.data.records);
          this.handleList(res.data.records)
        });
    }
  }
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
.plLeft {
  width: 40px;
  color: red;
  border-right: 1px solid black;
  border-top: 1px solid black;
  margin-top: 3px;
}
.plMidd {
  width: 40px;
  color: Blue;
  border-right: 1px solid black;
  border-top: 1px solid black;
  margin-top: 3px;
}
.plRight {
  width: 40px;
  color: black;
  border-right: 1px solid black;
  border-top: 1px solid black;
  margin-top: 3px;
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


