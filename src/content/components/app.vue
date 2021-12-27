<template>
  <div class="content_page">
    <div class="content_page_main">
      <a-checkbox :checked="checked" @change="onChange"> 赔率异常 </a-checkbox>
      <div v-for="(item, index) in listInit" :key="index">
        <span class="plBocai">{{ item.bocai }}</span>
        <span class="plLeft">{{ item.zhu }}</span>
        <span class="plMidd">{{ item.avg }}</span>
        <span class="plRight">{{ item.ke }}</span>
        <span class="plTitle">{{ item.title }}</span>
      </div>
      <div>
        <a-button type="primary" size="mini" @click="searchBtn"
          >api-test</a-button
        >
      </div>
      <div ref="myChart" style="width: 300px; height: 200px"></div>
      最早开出赔率的时间： {{ zaotime }}
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
      zaotime: 0,
    };
  },
  mounted() {
    this._initData();
  },
  methods: {
    onChange() {
      this.checked = !this.checked;
    },
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
      this.getAllData();
    },

    // 搜索方法
    searchFunc() {
      this.$api.testApi.test().then((res) => {
        this.dataList = res.result;
        console.log(this.dataList);
      });
    },

    // 绘制echart图表
    drawEchart() {
      let options = {
        title: {
          text: "ECharts 入门示例",
        },
        grid: {
          bottom: 20,
          right: 0,
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      this.$nextTick(() => {
        let myChart = this.$echarts.init(this.$refs.myChart);
        myChart.setOption(options);
      });
    },
    getAllData() {
      this.listInit = [];
      let arr = [];
      let flag = this.checked;
      let stime = 0;
      $("#data_main_content tr").each(function () {
        let ntime = 0;
        if ($(this).attr("id") != "filterTips") {
          var bocai = $(this).find("td").eq(1).find("span").attr("title"); //菠菜公司
          // console.info(bocai);
          var title = $(this).find("td").eq(2).attr("title"); //开赛时间
          // var arShu= title.match(/\d+/g);

          var zhu = parseFloat($(this).find("td").eq(2).find("span").html()); //初赔主队
          var avg = parseFloat($(this).find("td").eq(3).find("span").html()); //初赔平赔
          var ke = parseFloat($(this).find("td").eq(4).find("span").html()); //初赔客队

          // console.info(bocai+","+title+",zhu:"+zhu+",avg"+avg+",ke:"+ke);
          if (flag == true) {
            if (zhu > ke) {
              ntime = parseFloat(title.match(/\d+/g).join("."));
              if (ntime > stime) {
                stime = ntime;
              }
              arr.push({
                bocai: bocai,
                zhu: zhu,
                avg: avg,
                ke: ke,
                title: title,
              });
            }
          }
          if (flag == false) {
            if (zhu < ke) {
              ntime = parseFloat(title.match(/\d+/g).join("."));
              if (ntime > stime) {
                stime = ntime;
              }
              arr.push({
                bocai: bocai,
                zhu: zhu,
                avg: avg,
                ke: ke,
                title: title,
              });
            }
          }
        }
      });
      this.zaotime = stime;
      this.listInit = arr;
      // console.info(arr)
    },
  },
};
</script>

<style lang="less" scoped>
.content_page {
  height: 400px;
  overflow-y: auto;
  width: 400px;
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
  padding: 3px;
  color: red;
}
.plMidd {
  width: 40px;
  padding: 3px;
  color: Blue;
}
.plRight {
  width: 40px;
  padding: 3px;
  color: black;
}
.plTitle {
  width: 100px;
  padding: 3px;
  color: green;
}
.plBocai {
  width: 40px;
  padding: 3px;
  color: orange;
}
</style>


