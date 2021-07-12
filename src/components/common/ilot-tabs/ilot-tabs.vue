<template>
  <v-toolbar
      color="white"
      flat
      dense
      width="100%"
      class="pl-0 pr-0 pb-0 text-center tabBox"
  >
    <v-tabs
        v-model="tab"
        centered
        class="pl-0 pr-0"
        fixed
    >
      <v-tab
          v-for="item in tabNav"
          :key="item.type"
          class="text-body-1 text-capitalize text-truncate"
          :class="[tab === item.type ? ['font-weight-bold'] : ['']]"
          @change="checkItem(item)"
          :style="{width: perWidth + 'vw'}"
          :href="`#${item.type}`"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-icon v-if="searchFlag" large @click="$router.push('/search')" class="searchIcon">mdi-magnify</v-icon>
  </v-toolbar>
</template>

<script type="text/javascript">

  export default {
    name: 'toolbar',
    data() {
      return {
        tab: '1',
      }
    },
    props: {
      // 是否显示右边搜索按钮
      searchFlag: {
        type: Boolean,
        default: false
      },
      // 每个按钮的长度
      perWidth: {
        type: Number,
        default: 40
      },
      // 导航的数据    type: '1', name: 'Prematch'
      tabNav: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    components: {},
    computed: {
    },
    created() {
    },
    mounted() {
      this.tab = this.$store.state.gameType
    },
    methods: {
      // tab切换事件
      checkItem(item) {
        this.$emit('checkItem', item)
      }
    }
  }
</script>

<style lang="less" scoped>
  .tabBox{
    .searchIcon{
      position: absolute;
      right: 15px;
      top: 6px;
    }
  }
  /deep/.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before{
    opacity: 0;
  }
</style>
