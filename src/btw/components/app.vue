<template>
  <div class="content_page">
    <div class="content_page_main">
      <a-modal
        :visible="visible"
        title="历史记录"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <div style="height: 300px; overflow: scroll">
          <table border="1" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <td>主赔</td>
                <td>平赔</td>
                <td>负赔</td>
                <td>时间</td>
                <td>比分</td>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in historyList" :key="index">
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
      <table border="1" cellspacing="0" cellpadding="0">
        <tr v-for="(item, index) in listInit" :key="index">
          <td style="width: 30px">{{ item.zhu }}</td>
          <td style="width: 30px">{{ item.avg}}</td>
          <td style="width: 30px">{{ item.ke }}</td>
          <td style="width: 100px">{{ item.keName }}</td> 
          <td style="width: 80px">
            <a-button
              :id="'custom_' + item.id"
              type="primary"
              size="mini"
              @click="getHistoryList(item.keName)"
              >查看</a-button
            >
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
    };
  },
  mounted() {
    this._initData();
  },
  methods: {
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
      // console.info(this.getHistoryList)
      $("#live")
        .find("tr")
        .each(function () {
          var tabl = $(this);
          if ($(this).attr("id") !== undefined) {
            var teamNum = $(this).attr("id").substring(4); // 比赛的编号
            // var trNum = $(this).attr("id").substring(0, 3);
            var saishi = tabl.find("td").eq(1).find("font").text();

            if (saishi !== undefined) {
              var zhu_name = tabl
                .find("td")
                .eq(4)
                .children()
                .eq(3)
                .html(); // 主队名称
              var bifen = tabl.find("td").eq(5).html(); // 比分
              var ke_name = tabl.find("td").eq(6).children(0).html(); // 客队名称

              tabl
                .find("td")
                .eq(6)
                .find("#gorder_" + teamNum)
                .html(
                  "<input type='button' onclick='getInfo(\"" +
                    teamNum +
                    "\")' value='查看' ></input>"
                ); // 客队名称
              var zhu = tabl.find("td").eq(8).find("div[class^=odds]").html(); // zhu赔率
              var avg = tabl.find("td").eq(9).find("div[class^=odds]").html(); //ping赔率
              var ke = tabl.find("td").eq(10).find("div[class^=odds]").html();
              //ping赔率
              console.info(teamNum + ";" + zhu);
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
                  saishi: saishi,
                  bocai: 'B12',
                  zhu: parseFloat(zhu),
                  avg: parseFloat(avg),
                  ke: parseFloat(ke),
                  id: teamNum,
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
.ant-btn {
  font-size: 9px;
  height: 15px;
}
</style>


