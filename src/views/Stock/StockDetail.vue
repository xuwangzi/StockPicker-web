<template>
  <div class="stockDetailWrapper">
    <div class="stockBaseInfo">
      <h2 id="stockName">{{ stockName }}({{ stockNum }})</h2>
      <ul class="pure-g">
        <li id="nowopenBox" :class="upDownPrices >= 0 ? 'red' : 'green'">
          <strong id="price">{{close}}</strong
          >
          <i :class="upDownPrices >= 0 ? 'el-icon-top' : 'el-icon-bottom'" style="margin-left: 12px;"></i>

          <span id="upDown">{{(upDownPrices * 1).toFixed(2)}}({{ (upDownRange * 100).toFixed(2) }}%)</span>
        </li>

      </ul>
      <table style="width: 100%; font-size: 16px;line-height: 30px;">
        <tr>
          <td>{{ amount }}</td>
          <td>{{ amplitude }}</td>
          <td>{{ turnOverrate }}</td>
          <td>{{ preClose }}</td>
        </tr>
        <tr>
          <td>{{ comparison }}</td>
          <td>{{ high }}</td>
          <td>{{ low }}</td>
          <td>{{ open }}</td>
        </tr>
        <tr>
          <td>{{ volume }}</td>
          <td>{{ totalMarketValue }}</td>
          <td>{{ flowMarketValue }}</td>
          <td>{{ totalFlowShares }}</td>
        </tr>
      </table>
    </div>
    <div class="main-show">
      <div style="width:70%;">
        <template>
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="分时线" name="first"> </el-tab-pane>
            <el-tab-pane label="日线" name="second"> </el-tab-pane>
            <el-tab-pane label="周线" name="third"> </el-tab-pane>
            <el-tab-pane label="月线" name="fourth"> </el-tab-pane>
          </el-tabs>
          <div class="main-chart">
            <div id="k-chart" style="width: 75%"></div>
            <div id="handicap" style="width: 25%">

              <div class="tabs" id="fiveRangeId" style="border: 1px solid #d1dbe5;">
                <table class="five-range" cellspacing="15">
                  <tbody>
                    <tr>
                      <td style="text-align: left">卖5</td>
                      <td class="green" style="text-align: right">
                        {{ sellPrice5 }}
                      </td>
                      <td style="text-align: right">
                        {{ sellCount5 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">卖4</td>
                      <td class="green" style="text-align: right">
                        {{ sellPrice4 }}
                      </td>
                      <td style="text-align: right">
                        {{ sellCount4 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">卖3</td>
                      <td class="green" width="30%" style="text-align: right">
                        {{ sellPrice3 }}
                      </td>
                      <td style="text-align: right">
                        {{ sellCount3 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">卖2</td>
                      <td class="green" style="text-align: right">
                        {{ sellPrice2 }}
                      </td>
                      <td style="text-align: right">
                        {{ sellCount2 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">卖1</td>
                      <td class="green" style="text-align: right">
                        {{ sellPrice1 }}
                      </td>
                      <td style="text-align: right">
                        {{ sellCount1 }}
                      </td>
                    </tr>
                    <tr style="font-weight: 700;    color: blue;">
                      <td style="text-align: left">当前价</td>
                      <td class="green" style="text-align: right">
                        {{ boughtPrice1 }}
                      </td>
                      <td style="text-align: right">
                        委托(手)
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">买1</td>
                      <td class="red" style="text-align: right">
                        {{ boughtPrice1 }}
                      </td>
                      <td style="text-align: right">
                        {{ boughtCount1 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">买2</td>
                      <td class="red" style="text-align: right">
                        {{ boughtPrice2 }}
                      </td>
                      <td style="text-align: right">
                        {{ boughtCount2 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">买3</td>
                      <td class="red" style="text-align: right">
                        {{ boughtPrice3 }}
                      </td>
                      <td style="text-align: right">
                        {{ boughtCount3 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">买4</td>
                      <td class="red" style="text-align: right">
                        {{ boughtPrice4 }}
                      </td>
                      <td style="text-align: right">
                        {{ boughtCount4 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left">买5</td>
                      <td class="red" style="text-align: right">
                        {{ boughtPrice5 }}
                      </td>
                      <td style="text-align: right">
                        {{ boughtCount5 }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div style="width:30%; padding:30px;">
        <div id="echnicalaspectId">
          <el-divider>趋势</el-divider>
          <span>暂无</span>
          <el-divider>市场景气程度</el-divider>
          <span>{{ prosperityLevel }}</span>
          <el-divider>市场趋势</el-divider>
          <span>{{ market }}</span>
          <el-divider>买卖点</el-divider>
          <span>暂无</span>
          <el-divider>资金异动</el-divider>
          <span>{{ abnormalaction }}</span>
        </div>

      </div>
    </div>

    <div v-if="isShowZB" id="changeOptionId" style="padding-left: 40px">
      <el-button-group>
        <el-button :autofocus=true  @click="changeOptionType(1)" size="small">成交量</el-button>
        <el-button  @click="changeOptionType(2)" size="small">macd</el-button>
        <el-button  @click="changeOptionType(3)" size="small">kdj</el-button>
        <el-button  @click="changeOptionType(4)" size="small">rsi  </el-button>
      </el-button-group>
    </div>



    <div>
      <BackTest v-if="stockNum" :stockNum="stockNum"></BackTest>
    </div>
  </div>
</template>

<script>
import {
  getStocktimebar,
  getStockInfoById,
  getStockdaybar,
  getStockweekbar,
  getStockmonthbar,
  getEchnicalaspect,
  getStockBid,
} from "@/request/stock.js";
import { initMOption } from "@/assets/js/timeline.js";
import { makeOption, getOption } from "@/assets/js/dayline.js";
import BackTest from "./components/BackTest.vue";
export default {
  name: "StockDetail",
  components: {
    BackTest,
  },
  data() {
    return {
      stockInfo: {},
      amount: "",
      amplitude: "",
      close: "",
      high: "",
      low: "",
      open: "",
      preClose: "",
      c: "",
      stockName: "",
      turnOverrate: "",
      upDownPrices: "",
      upDownRange: "",
      volume: "",
      totalMarketValue: "",
      flowMarketValue: "",
      comparison: "",
      totalFlowShares: "",
      stockList: [],
      activeName: "first",
      stockDayDataSave: [],
      stockWeekDataSave: [],
      stockMonthDataSave: [],
      echarts: {},
      kChart: {},
      prosperityLevel: "",
      market: "",
      abnormalaction: "",

      sellPrice5: "",
      sellPrice4: "",
      sellPrice3: "",
      sellPrice2: "",
      sellPrice1: "",
      boughtPrice1: "",
      boughtPrice2: "",
      boughtPrice3: "",
      boughtPrice4: "",
      boughtPrice5: "",
      sellCount5: "",
      sellCount4: "",
      sellCount3: "",
      sellCount2: "",
      sellCount1: "",
      boughtCount1: "",
      boughtCount2: "",
      boughtCount3: "",
      boughtCount4: "",
      boughtCount5: "",
      isShowZB: false
    };
  },
  created() {
    this.echarts = require("echarts");

    this.getStockInfoById(this.stockNum);
    this.getEchnicalaspect(this.stockNum);
  },
  mounted() {
    var dom = document.getElementById("k-chart");
    this.kChart = this.echarts.init(dom);
    this.getStocktimebar(this.stockNum);
    this.getStockBid(this.stockNum);
  },
  computed: {
    stockNum: {
      get() {
        return String(this.$route.params.stockNum);
      }
    }
    // stockNum() {
    //   return String(this.$route.params.stockNum);
    // },
  },
  methods: {
    getEchnicalaspect(stockNum) {
      let _this = this;
      getEchnicalaspect({ stockNum: stockNum }).then((res) => {
        let rawData = res;
        if (rawData.prosperityLevel == 1) {
          _this.prosperityLevel = "极弱，建议买入";
        } else if (rawData.prosperityLevel == 2) {
          _this.prosperityLevel = "弱，建议观望";
        } else if (rawData.prosperityLevel == 3) {
          _this.prosperityLevel = "强，建议买入";
        } else if (rawData.prosperityLevel == 4) {
          _this.prosperityLevel = "极强，建议卖出";
        }

        if (rawData.bullMarket == 1) {
          _this.market =
            "多头市场，以持股为主要策略，操作为高抛或减仓，落袋为安";
        } else if (rawData.bearMarket == 1) {
          _this.market =
            "空头市场，以持币为主要策略，操作为低吸，等待下一波上涨行情";
        } else {
          _this.market = "暂无明确趋势，建议观望为主";
        }
      });
    },
    changeOptionType(indicatorType) {
      this.kChart.setOption(
        getOption(this.kChart, this.stockDayDataSave, indicatorType),
        true
      );
    },
    tabClick(tab) {
      if (tab.name == "first") {
        this.getStocktimebar(this.stockNum);
        this.isShowZB =false;
      } else if (tab.name == "second") {
        this.getStockdaybar(this.stockNum);
        this.isShowZB =true;
      } else if (tab.name == "third") {
        this.getStockweekbar(this.stockNum);
        this.isShowZB =true;
      } else {
        this.getStockmonthbar(this.stockNum);
        this.isShowZB =true;
      }
    },
    getStocktimebar(searchText) {
      let data = {
        stockNum: searchText,
      };
      getStocktimebar(data).then((res) => {
        // var echarts = require('echarts')

        this.kChart.setOption(initMOption(res.reverse(), "hs"), true);
      });
    },
    getStockdaybar(searchText) {
      let data = {
        stockNum: searchText,
      };
      let _this = this;
      getStockdaybar(data).then((res) => {
        _this.stockDayDataSave = res.reverse();
        var VOLUMN_TYPE = 1;
        this.kChart.setOption(makeOption(res, VOLUMN_TYPE), true);
      });
    },
    getStockweekbar(searchText) {
      let data = {
        stockNum: searchText,
      };
      let _this = this;

      getStockweekbar(data).then((res) => {
        _this.stockWeekDataSave = res.reverse();

        var VOLUMN_TYPE = 1;
        this.kChart.setOption(makeOption(res, VOLUMN_TYPE), true);
      });
    },
    getStockmonthbar(searchText) {
      let data = {
        stockNum: searchText,
      };
      let _this = this;

      getStockmonthbar(data).then((res) => {
        _this.stockMonthDataSave = res.reverse();

        var VOLUMN_TYPE = 1;
        this.kChart.setOption(
          makeOption(this.stockMonthDataSave, VOLUMN_TYPE),
          true
        );
      });
    },

    getStockInfoById(stockid) {
      let data = {
        stockId: stockid,
      };
      let _this = this;
      getStockInfoById(data).then((res) => {
        var rawData = res;
        _this.stockInfo = rawData;
        _this.amount = "成交额：" + rawData.amount;
        _this.amplitude = "振幅：" + (rawData.amplitude * 100).toFixed(2) + "%";
        _this.close = rawData.close;
        _this.high = "最高：" + rawData.high;
        _this.low = "最低：" + rawData.low;
        _this.open = "今开：" + rawData.open;
        _this.preClose = "昨收：" + rawData.preClose;
        _this.stockNum = rawData.stockNum;
        _this.stockName = rawData.stockName;
        _this.turnOverrate =
          "换手率：" + (rawData.turnOverrate * 100).toFixed(2) + "%";
        _this.upDownPrices = rawData.upDownPrices;
        _this.upDownRange = rawData.upDownRange;
        _this.volume = "成交量：" + this.formatNum(rawData.volume) + "手";
        _this.totalMarketValue =
          "总市值：" + this.formatNum(rawData.totalMarketValue)
        _this.flowMarketValue =
          "流通市值：" +
          this.formatNum(rawData.flowMarketValue);
        _this.totalFlowShares =
          "流通股本：" +
          this.formatNum(rawData.totalFlowShares);
      });
    },
    formatNum(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(2) + "亿"
      } else if (num > 10000) {
        return (num / 10000).toFixed(2) + "万"
      } else {
        return num
      }

    },
    getStockBid(stockNum) {
      let data = {
        stockNum: stockNum,
      };
      let _this = this;
      getStockBid(data).then((res) => {
        var rawData = res;
        _this.sellPrice5 = rawData.sellPrice5;
        _this.sellPrice4 = rawData.sellPrice4;
        _this.sellPrice3 = rawData.sellPrice3;
        _this.sellPrice2 = rawData.sellPrice2;
        _this.sellPrice1 = rawData.sellPrice1;
        _this.boughtPrice1 = rawData.boughtPrice1;
        _this.boughtPrice2 = rawData.boughtPrice2;
        _this.boughtPrice3 = rawData.boughtPrice3;
        _this.boughtPrice4 = rawData.boughtPrice4;
        _this.boughtPrice5 = rawData.boughtPrice5;
        _this.sellCount5 = rawData.sellCount5;
        _this.sellCount4 = rawData.sellCount4;
        _this.sellCount3 = rawData.sellCount3;
        _this.sellCount2 = rawData.sellCount2;
        _this.sellCount1 = rawData.sellCount1;
        _this.boughtCount1 = rawData.boughtCount1;
        _this.boughtCount2 = rawData.boughtCount2;
        _this.boughtCount3 = rawData.boughtCount3;
        _this.boughtCount4 = rawData.boughtCount4;
        _this.boughtCount5 = rawData.boughtCount5;
        var totalBought =
          rawData.boughtCount1 +
          rawData.boughtCount2 +
          rawData.boughtCount3 +
          rawData.boughtCount4 +
          rawData.boughtCount5;
        var totalSell =
          rawData.sellCount1 +
          rawData.sellCount2 +
          rawData.sellCount3 +
          rawData.sellCount4 +
          rawData.sellCount5;
          console.log(totalBought)
          if (isNaN(totalSell)) {
            totalSell = 0
          }
        _this.comparison =
          "委比：" +
          (
            ((totalBought - totalSell) / (totalBought + totalSell)) *
            100
          ).toFixed(2) +
          "%";
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';
@import '~@/assets/styles/mixins.styl';

.stockDetailWrapper {
  display: block !important;
  padding: 16px 0 24px 0;
  //padding: 20px 0;
  width: 1200px !important;
  font-size: 12px;

  #stockName {
    font-size: 22px;
  }
  ul {
    border-bottom: solid 1px #eee;
    margin-bottom: 20px;
    li {
      font-size: 20px;
    }
    #nowopenBox {
        width: 40%;
        strong {
            font-size: 48px;
            font-family: Arial;
        }
    }
    .red {
        color: #ff5c5c;
    }

    .green {
        color: #4f9f3f;
    }
  }
  .main-chart {
    display: flex;
    height: 500px;

    #k-chart {
      width: 75%;
    }

    #handicap {
      width: 25%;
    }
  }

  .main-show {
    width: 100%;
    display: flex;
  }
}
</style>
