<template>
  <div class="content_page">
    <div class="content_page_main">
        <a-button type="primary"  @click="searchBtn"
          >获取官方中国精彩数据</a-button
        >
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      kw: "wode",
    };
  },
  mounted() {
    this._initData();
  },
  methods: {
    // 搜索按钮
    searchBtn() {
      this.save15min();
    },
    
    save15min() {
      this.getAllData();
      // setInterval(() => {
      //   this.getAllData();
      // }, 5 * 60 * 1000);
    },
    getAllData() {
      //console.info("hshshshsjsjssss");
      
       let json = [];
      // console.info(this.getHistoryList)
      $("div[id^=match_]").each(function () {
        let $match = $(this);
        var t_id = $(this).attr("data-mid"); // 比赛ID

        var zhu_name= $(this).attr("data-hname");
        var ke_name= $(this).attr("data-aname");

        var liansai = $match.find(".liansai");
        let saishi= liansai.find(".saiming").attr("title");
        let matchTime= liansai.find(".shijian").attr("title").replace(/比赛时间:/,'');
        let shenpf = $match.find(".shenpf"); //胜平负
        let shenpf_zhu= shenpf.find(".zhu").find(".peilv").html(); //zhu 
        let shenpf_avg= shenpf.find(".ping").find(".peilv").html(); //avg 
        let shenpf_ke= shenpf.find(".fu").find(".peilv").html(); //ke

        let rangqiuspf =$match.find(".rangqiuspf"); //胜平负
        let rangqiu = rangqiuspf.find(".zhu").find(".rangqiu").html(); //zhu 
        let rang_shenpf_zhu= rangqiuspf.find(".zhu").find(".peilv").html().trim(); //rangqiu 
        let rang_shenpf_avg= rangqiuspf.find(".ping").find(".peilv").html(); //avg 
        let rang_shenpf_ke= rangqiuspf.find(".fu").find(".peilv").html(); //ke

        var m6 = {
            saishi: saishi,
            zhuName: zhu_name,
            keName: ke_name,
            type: '独赢',
            zhu: parseFloat(shenpf_zhu.trim()),
            ke: parseFloat(shenpf_ke.trim()),
            avg: parseFloat(shenpf_avg.trim()),
           // matchTime: matchTime.toString(),
            bocai: "2",
          };
          var m62 = {
            saishi: saishi,
            zhuName: zhu_name,
            keName: ke_name,
            type: '让球',
            zhuRangValue: rangqiu,
            zhu: parseFloat(rang_shenpf_zhu.trim()),
            ke: parseFloat(rang_shenpf_ke.trim()),
            avg: parseFloat(rang_shenpf_avg.trim()),
           // matchTime: matchTime.toString(),
            bocai: "2",
          };
          json.push(m6);
          json.push(m62);


       
      });
      this.$api.oddsApi.insert_mq({ listObj: JSON.stringify(json) });
    },
  },
};
</script>

<style lang="less" scoped>
.content_page {
  height: 200px;
  overflow-y: auto;
  width: 200px;
  text-align: left;
  background: #fff;
  box-shadow: 0 0 5px #999;
  padding: 10px;
  //color: red;
  position: fixed;
  z-index: 100001;
  right: 0;
  bottom: 0;
  .content_page_main {
    //color: green;
  }
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
</style>


