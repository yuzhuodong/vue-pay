<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height:100%">
      <el-tab-pane label="付款清单">
        <iframe :src="leftUrl[0]" width="100%" height="700px"></iframe>
      </el-tab-pane>
      <el-tab-pane label="开票清单">
        <iframe :src="leftUrl[1]" width="100%" height="700px"></iframe>
      </el-tab-pane>
      <el-tab-pane label="待开票清单">
        <iframe :src="leftUrl[2]" width="100%" height="700px"></iframe>
      </el-tab-pane>
      <el-tab-pane label="过期未开清单">
        <iframe :src="leftUrl[3]" width="100%" height="700px"></iframe>
      </el-tab-pane>
      <el-tab-pane label="未索要发票清单">
        <iframe :src="leftUrl[4]" width="100%" height="700px"></iframe>
      </el-tab-pane>
      <el-tab-pane label="清单汇总">
        <iframe :src="leftUrl[5]" width="100%" height="700px"></iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { getParameterByCode } from '@/api/getData'
  export default {
    data () {
      return {
        tabPosition: 'top',
        url: '',
        rightUrl: [
          '?reportlet=p_payInfoInvoice.cpt&op=write',
          '?reportlet=p_givenInvoice.cpt&op=write',
          '?reportlet=p_unInvoice.cpt&op=write',
          '?reportlet=p_expireInvoice.cpt&op=write',
          '?reportlet=p_payInfoUnInvoice.cpt&op=write',
          '?reportlet=p_invoiceSummary.cpt&op=write'
        ],
        leftUrl: []
      }
    },
    mounted () {
      this.getParameterByCode()
    },
    methods: {
      getParameterByCode () {
        const self = this
        let param = {}
        param.code = 'fineReport_url'
        getParameterByCode(param)
          .then(data => {
            if (data.code) {
              self.url = data.data.dataInfo.value
              for (var i = 0; i < self.rightUrl.length; i++) {
                self.leftUrl.push(self.url.concat(self.rightUrl[i]))
              }
            } else {
              self.$message.warn(data.message)
            }
          })
          .catch(e => {
            self.$message.error('服务端出错')
            console.error(e)
          })
      }
    }
  }
</script>

<style scoped>

</style>
