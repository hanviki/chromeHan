<template>
  <div class="content_page">
    <div class="content_page_main">

      <a-button type="primary" size="mini" @click="searchBtn"
        >获取数据</a-button
      >
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
    //this._initData();
  },
  methods: {
    
    // 数据初始化
    _initData() {
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
        this.$api.oddsApi.m6({ languageType: "CMN",matchId: 479167 }).then((res) => {
        console.info(res);
      });
    }
   
   
  
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
</style>


