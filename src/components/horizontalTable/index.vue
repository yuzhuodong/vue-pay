<template>
    <div class="horizontal-table">
      <table>
        <template v-for="(item, itemIndex) in column">
          <tr>
            <td class="horizontal-table-column horizontal-table-td">{{item['name']}}</td>
            <template v-for="(row, rowIndex) in data">
              <td class="horizontal-table-td">
                  <i v-if="itemIndex === 0 && rowIndex === 0" @click="previousPage()" class="el-icon-arrow-left pagination-icon" />
                  <span>{{row[item['field']]}}</span>
                  <i v-if="itemIndex === 0 && rowIndex === (data.length-1)" @click="nextPage()" class="el-icon-arrow-right pagination-icon" />
              </td>
            </template>
          </tr>
        </template>
      </table>
    </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      pageNum: 1,
      pageSize: 5
    }
  },
  methods: {
    previousPage () {
    },
    nextPage () {
    }
  }
}
</script>

<style lang="scss">
  .horizontal-table {
    margin: 0 auto;
    text-align: center;
    table {
      margin: 0 auto;
      border-collapse: collapse;
      border-top: 1px solid #dcdcdc;
      border-left: 1px solid #dcdcdc;
    }
    .horizontal-table-column, .horizontal-table-td {
      width: 100px;
      border-bottom: 1px solid #dcdcdc;
      border-right: 1px solid #dcdcdc;
    }
    .horizontal-table-column {
      background-color: #F5F7FA;
    }
    .pagination-icon {
      cursor: pointer;
      font-size: 20px;
      vertical-align: middle;
    }
  }
</style>

