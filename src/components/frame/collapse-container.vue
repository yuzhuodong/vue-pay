<template>
  <div class="collapse-container" :style="containerStyle" ref="container">
    <el-row ref="elrow">
      <el-col :span="20">
        <div class="slot" :style="slotStyle" ref="slot">
          <slot></slot>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button class="trigger" @click="trigger()">
          <i v-if="collapsed" class="el-icon-arrow-down"/>
          <i v-if="!collapsed" class="el-icon-arrow-up"/>
          {{ collapsed ? text.openText : text.closeText }}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: [
      'openText',
      'collapseText',
      'collapseHeight',
      'slotWidth'
    ],
    data () {
      return {
        slotStyle: {
          width: '100%'
        },
        containerStyle: {
          overflow: 'hidden',
          minHeight: '40px'
        },
        collapsed: true,
        text: {
          openText: '展开',
          closeText: '收起'
        }
      }
    },
    mounted: function () {
      let self = this

      let newText = {
        openText: self.openText || self.text.openText,
        closeText: self.closeText || self.text.closeText
      }

      self.text = newText

      self.containerStyle.height = self.collapseHeight
      self.slotStyle.width = self.slotWidth
    },
    methods: {
      trigger (collapsed) {
        let self = this

        self.collapsed = collapsed === undefined ? !self.collapsed : collapsed

        if (self.collapsed) {
          self.containerStyle.height = self.collapseHeight
          self.containerStyle.overflow = 'hidden'
        } else {
          self.containerStyle.height = self.$refs.elrow.$el.clientHeight + 'px'
        }
      },
      open () {
        this.trigger(false)
      },
      collapse () {
        this.trigger(true)
      }
    }
  }
</script>

<style lang="scss">

  .collapse-container {

    .slot {
      display: inline-block;
      float: left;
    }

    .trigger {
      display: inline-block;
      float: right;
      border: 0;
      background-color: transparent;

      &:hover {
        cursor: pointer;
      }
    }

  }

</style>

