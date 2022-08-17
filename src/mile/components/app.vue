<template>
  <div class="content_page">
    <div class="content_page_main">
      <a-modal
        :visible="visible"
        title="历史记录"
        @ok="handleOk"
        @cancel="handleCancel"
      >
      <div style="height:30px;">
      <a-button   @click="setIndex(0)"
        >Crown</a-button
      >
        <a-button type="primary"  @click="setIndex(1)"
        >B12</a-button
      >
        <a-button  @click="setIndex(2)"
        >ALL</a-button
      >
      </div>
        <div style="height: 300px; overflow: scroll">
          <table v-if="showIndex==0" border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <td>公司</td>
                <td>主赔</td>
                <td>平赔</td>
                <td>负赔</td>
                <td>时间</td>
                <td>比分</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in historyList" :key="index">
                 <td style="width: 60px">{{ item.bocai }}</td>
                <td style="width: 60px">{{ item.zhu }}</td>
                <td style="width: 60px">{{ item.avg }}</td>
                <td style="width: 60px">{{ item.ke }}</td>
                <td style="width: 100px">{{ item.strCreateTime }}</td>
                <td style="width: 60px">{{ item.matchTime }}</td>
              </tr>
            </tbody>
          </table>
           <table v-if="showIndex==1" border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <td>公司</td>
                <td>大</td>
                <td>球数</td>
                <td>小</td>
                <td>时间</td>
                <td>比分</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in historyList_jinqiu" :key="index">
                 <td style="width: 60px">{{ item.bocai }}</td>
                <td style="width: 60px">{{ item.zhu }}</td>
                <td style="width: 60px">{{ item.avg }}</td>
                <td style="width: 60px">{{ item.ke }}</td>
                <td style="width: 100px">{{ item.strCreateTime }}</td>
                <td style="width: 60px">{{ item.matchTime }}</td>
              </tr>
            </tbody>
          </table>
           <table v-if="showIndex==2" border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <td>公司</td>
                <td>主赔</td>
                <td>让球数</td>
                <td>负赔</td>
                <td>时间</td>
                <td>比分</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in historyList_rangqiu" :key="index">
                 <td style="width: 60px">{{ item.bocai }}</td>
                <td style="width: 60px">{{ item.zhu }}</td>
                <td style="width: 60px">{{ item.avg }}</td>
                <td style="width: 60px">{{ item.ke }}</td>
                <td style="width: 100px">{{ item.strCreateTime }}</td>
                <td style="width: 60px">{{ item.matchTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </a-modal>
      <a-button type="primary" size="mini" @click="searchBtn"
        >api-test</a-button
      >
      <table  border="1" cellspacing="0" cellpadding="0">
      <tr v-for="(item, index) in listInit" :key="index">
        <td style="width:150px;">{{ item.keName }}</td>
        <td style="width:80px;">
          <a-button
            :id="'custom_'+item.id"
            type="primary"
            size="mini"
            @click="getHistoryList(item.keName)"
            >查看</a-button>
        </td>
        <!-- <span class="plTitle">{{ item.title }}</span> -->
      </tr>
      </table>
      <div>
        <a-button type="primary" size="mini" @click="searchBtn"
          >api-test</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { sortConnectMsgSend } from "../../utils/chrome";
import $ from "jquery";
export default {
  data() {
    return {
      dataList: [
        {
          text: "data_1",
        },
        {
          text: "data_2",
        },
        {
          text: "data_3",
        },
      ],
      kw: "wode",
      radioValue: 1,
      listInit: [],
      checked: true,
      checkedOne: true,
      checkedTwo: true,
      zaotime: 0,
      visible: false,
      historyList: [],
      datasource: [],
      historyList_jinqiu: [],
      datasource_jinqiu: [],
      historyList_rangqiu: [],
      datasource_rangqiu: [],
      showIndex: 2,//0是cown 1是B2 2是全部
    };
  },
  mounted() {
    this._initData();
  },
  methods: {
    setIndex(index) {
      let datas= []
      if(index==0){
      datas =this.datasource.filter(p=>p.bocai==null)
      this.historyList= datas
      }
      this.showIndex = index
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    // 数据初始化
    _initData() {
      this.save15min();
      chrome.runtime.onConnect.addListener((port) => {
        if (port.name == "sulg-long-connect-content") {
          port.onMessage.addListener((msg) => {
            console.log("收到长连接消息：", msg);
            if (msg.name === "getBaiduID") {
              this.kw = msg.baidukw;
            }
          });
        }
      });
    },

    // 搜索按钮
    searchBtn() {
      this.save15min();
    },
    getHistoryList(keName) {
      this.visible = true;
      this.getLotterByKeName(keName);
    },
    // 搜索方法
    searchFunc() {
      this.$api.testApi.test().then((res) => {
        this.dataList = res.result;
        console.log(this.dataList);
      });
    },
    getLotterByKeName(keName) {
      this.historyList = [];
      this.$api.oddsApi.getOddsByKeName({ keName: keName }).then((res) => {
        console.info(res);
        this.historyList = res;
        this.datasource = res;
      });
     
       this.$api.oddsApi.getOddsByKeName_rangqiu({ keName: keName }).then((res) => {
        console.info(res);
        this.historyList_rangqiu = res;
        //this.datasource_rangqiu = res;
      });
    },
    save15min() {
      this.getAllData();
      setInterval(() => {
        this.getAllData();
      }, 5 * 60 * 1000);
    },
    getAllData() {
      //console.info("hshshshsjsjssss");
      this.listInit = [];
      let arr = [];
      let arr_jinqiu =[];
      let arr_rangqiu = [];
     // console.info(this.getHistoryList)
      $("#live")
        .find('tr[id^="tr1"]')
        .each(function () {
          var tabl = $(this);
          if ($(this).attr("id") !== undefined) {
            var teamNum = $(this).attr("id").substring(4); // 比赛的编号
            var trNum = $(this).attr("id").substring(0, 3);

            if (trNum == "tr1") {
              var zhu_name = tabl
                .find("td")
                .eq(4)
                .find("#team1_" + teamNum)
                .html(); // 主队名称
              var bifen = tabl.find("td").eq(5).html(); // 比分
              var ke_name = tabl
                .find("td")
                .eq(6)
                .find("#team2_" + teamNum)
                .html(); // 客队名称
             
              tabl
                .find("td")
                .eq(6)
                .find("#gorder_" + teamNum)
                .html(
                  "<input type='button' onclick='getInfo(\"" +
                    teamNum +
                    "\")' value='查看' ></input>"
                ); // 客队名称
              var zhu_rangqiu = tabl.find("td").eq(9).find("div[class^=odds]").eq(0).html(); // zhu让球赔率
              var zhu_jinqiu = tabl.find("td").eq(9).find("div[class^=odds]").eq(1).html(); // zhu总进球赔率
              var zhu = tabl.find("td").eq(9).find("div[class^=odds]").eq(2).html(); // zhu赔率
              var avg_rangqiu = tabl.find("td").eq(10).find("div[class^=odds]").eq(0).html(); //ping赔率
              var avg_jinqiu = tabl.find("td").eq(10).find("div[class^=odds]").eq(1).html(); //ping赔率
              var avg = tabl.find("td").eq(10).find("div[class^=odds]").eq(2).html(); //ping赔率
              var ke_rangqiu = tabl.find("td").eq(11).find("div[class^=odds]").eq(0).html();
              var ke_jinqiu = tabl.find("td").eq(11).find("div[class^=odds]").eq(1).html();
              var ke = tabl.find("td").eq(11).find("div[class^=odds]").eq(2).html();
              //ping赔率
              console.info(trNum + ";" + teamNum + ";" + zhu);
              if (
                zhu != "" &&
                $.trim(zhu) != "" &&
                avg != "" &&
                ke != "" &&
                zhu !== undefined
              ) {
                arr.push({
                  zhuName: zhu_name,
                  keName: ke_name,
                  matchTime: bifen,
                  zhu: parseFloat(zhu),
                  avg: parseFloat(avg),
                  ke: parseFloat(ke),
                  id: teamNum
                });
              }
              else {
                 arr.push({
                  zhuName: zhu_name,
                  keName: ke_name,
                  zhu: 0,
                  avg: 0,
                  ke: 0,
                  id: teamNum
                });
              }

              if (
                zhu_rangqiu != "" &&
                $.trim(zhu_rangqiu) != "" &&
                avg_rangqiu != "" &&
                ke_rangqiu != "" &&
                zhu_rangqiu !== undefined
              ) {
                arr_rangqiu.push({
                  zhuName: zhu_name,
                  keName: ke_name,
                  matchTime: bifen,
                  zhu: parseFloat(zhu_rangqiu),
                  avg: avg_rangqiu,
                  ke: parseFloat(ke_rangqiu),
                  id: teamNum
                });
              }
              if (
                zhu_jinqiu != "" &&
                $.trim(zhu_jinqiu) != "" &&
                avg_jinqiu != "" &&
                ke_jinqiu != "" &&
                zhu_jinqiu !== undefined
              ) {
                arr_jinqiu.push({
                  zhuName: zhu_name,
                  keName: ke_name,
                  matchTime: bifen,
                  zhu: parseFloat(zhu_jinqiu),
                  avg: avg_jinqiu,
                  ke: parseFloat(ke_jinqiu),
                  id: teamNum
                });
              }
            }
          }
        });
      if (arr.length > 0) {
        this.$api.oddsApi
          .insert({
            listObj: JSON.stringify(arr),
          })
          .then((res) => {});
      }
      if (arr_jinqiu.length > 0) {
        this.$api.oddsApi
          .insert_jinqiu({
            listObj: JSON.stringify(arr_jinqiu),
          })
          .then((res) => {});
      }
      //  if (arr_rangqiu.length > 0) {
      //   this.$api.oddsApi
      //     .insert_rangqiu({
      //       listObj: JSON.stringify(arr_rangqiu),
      //     })
      //     .then((res) => {});
      // }
      this.listInit = arr;
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
    color: green;
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
// .ant-btn {
//   font-size: 9px;
//   height: 25px;
// }
</style>


