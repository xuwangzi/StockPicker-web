<template>
<!--  <img  :src="previewUrl" />-->

  <div class="stock-wrapper">

    <!-- 个股列表 -->
    <el-table class="stock-table" :data="stockTableData" v-loading="loading" stripe>
      <el-table-column label="股票编号" width="110">
        <template slot-scope="scope">
          <router-link
              class="stock-num blue"
              tag="a"
              :to="{
              name: 'StockDetail',
              params: { stockNum: scope.row.stockNum }
            }"
              target="_blank"
          >{{ scope.row.stockNum }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column label="股票名称" width="110">
        <template slot-scope="scope">
          <router-link
              class="stock-name blue"
              tag="a"
              :to="{
              name: 'StockDetail',
              params: { stockNum: scope.row.stockNum }
            }"
              target="_blank"
          >{{ scope.row.stockName }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column label="条件 1" width="300" align="center">
        <template slot-scope="scope">
          <el-tag
              :type="tagType(true)"
              effect="dark">
            高峰：{{ scope.row.highestDate }}；
            最低点A：{{ scope.row.lowestDate }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="条件 2" width="320" align="center">
        <template slot-scope="scope">
          <el-tag
              :type="tagType(true)"
              effect="dark">
            次低点B：{{ scope.row.subLowestDateB }}；
            最低点C：{{ scope.row.subLowestDateC }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="条件 3" width="220" align="center">
        <template slot-scope="scope">
          <el-tag
              :type="tagType(true)"
              effect="dark">
            AC盘整时间不少于60个交易日
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>



<script>

import {
  getStockPicker
} from '@/request/stock.js'

export default {
  name: "StockPicker",

  data() {
    return {
      // 预览图
      previewUrl: require('@/assets/images/common/stockpicker_Preview.png'),
      // 表格树
      stockTableData: [],

      // 列表加载
      loading: false,
    }
  },
  created() {
    this.getStockPicker()
    this.tagType()
  },
  methods:{
    tagType(condition) {
      if (condition) {
        return 'success'; // 当 condition_1 为 true 时，将 el-tag 的 type 设置为 'success'
      } else {
        return 'danger'; // 当 condition_1 为 false 时，将 el-tag 的 type 设置为 'danger'
      }
    },

    getStockPicker() {
      this.loading = true
      getStockPicker().then((res) => {
        this.loading = false
        if (res.success) {
          this.stockTableData = res.data.list.map((item) => {
            return {
              ...item,
              stockId:       item.stockId,
              stockNum:      item.stockNum,
              stockName:     item.stockName,
              highestDate:   item.highestDate,
              lowestDate:    item.lowestDate,
              subLowestDateB:item.subLowestDateB,
              subLowestDateC:item.subLowestDateC,
              countSubLow:   item.countSubLow,
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // getStockPicker() {
    //   getStockPicker().then(res => {
    //     var dataArray = Object.keys(res).map(function (key) {
    //       return res[key];
    //     });
    //     this.stockTableData = dataArray
    //   })
    // },

  },
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';
@import '~@/assets/styles/mixins.styl';

.stock-wrapper {
  display: block !important;
  padding: 16px 0 24px 0;

  .stock-table {
    position: sticky;
    top: 0;
    max-height: calc(100vh - 64px);
    width: 100%;

    >>> td {
      padding: 8px 0;

      .blue {
        color: $Primary;
        cursor: pointer;

        &:hover {
          color: $ThemeColor;
        }
      }

      .red {
        color: $Danger;
        cursor: pointer;

        &:hover {
          color: $ThemeColor;
        }
      }

      .green {
        color: $Success;
        cursor: pointer;

        &:hover {
          color: $ThemeColor;
        }
      }
    }

    >>> .el-table__header-wrapper {
      th {
        background: $tabBackColor;
        padding: 8px 0;
        color: $PrimaryText;
      }
    }

    >>> .el-table__body-wrapper {
      max-height: calc(100vh - 104px);
      overflow-y: auto;
      setScrollbar(8px);
    }
  }
}


</style>
