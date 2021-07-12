<template>
  <div class="resultDetail px-2">
    <div class="d-flex justify-space-between text-body-2">
      <span>NO. {{Format01.Issue}}</span>
      <span>Date: {{this.$common.toMyLocalTime(Format01.DrawDate) | time}}</span>
    </div>
    <div class="d-flex justify-center flex-wrap pt-4">
      <ilot-ball
        v-for="(value, index) in Format01.DrawNum.split('|-')[0].split('|').slice(0, 5)"
        :key="index"
        :onFlag="true"
      >
        {{String(value).length === 1 ? '0' + value : String(value)}}
      </ilot-ball>
    </div>
    <p class="text-center text--disabled">Winning numbers</p>
    <div class="d-flex justify-center flex-wrap">
      <ilot-ball
        v-for="(value, index) in Format01.DrawNum.split('|-')[0].split('|').slice(5, 10)"
        :key="index"
        :onFlag="true"
      >
        {{String(value).length === 1 ? '0' + value : String(value)}}
      </ilot-ball>
    </div>
    <p class="text-center text--disabled">Machine numbers</p>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            BET TYPE
          </th>
          <th class="text-left">
            WINNERS
          </th>
          <th class="text-left">
            WINNINGS
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in Format02"
          :key="item.name"
        >
          <td class="text-truncate">{{ item.WinLevelName }}</td>
          <td>{{ item.WinCount }}</td>
          <td>{{item.TotalWinMoney / 100 | money('₦')}}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="d-flex justify-space-between text-body-2 py-2">
      <span>TOTAL SALES</span>
      <span>{{Format01.TotalSales / 100 | money('₦')}}</span>
    </div>
    <div class="d-flex justify-space-between text-body-2 py-2">
      <span>NEXT DRAW DATE</span>
      <span>{{this.$common.toMyLocalTime(Format01.NextDrawDate) | time}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'resultDetail',
    data() {
      return {
        Format01: {
          DrawNum: ''
        },
        Format02: [],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
        ]
      }
    },
    components: {
    },
    computed: {
    },
    created() {
    },
    mounted() {
      this.getGameOrderDetail()
    },
    methods: {
      async getGameOrderDetail() {
        const res = await this.$api.gameOrderDetail({
          data: {
            GameID: this.$route.query.gameID,
            Issue: this.$route.query.issue
          }
        })
        if (res.RetCode !== '0') return
        console.log(res)
        this.Format01 = res.Format01
        this.Format02 = res.Format02
        // res.Format01.TotalSales = res.Format01.TotalSales / 100
        // this.Format01 = res.Format01
        // this.Format01.DrawNum = this.Format01.DrawNum.split('|')
        // this.Format01.DrawNum.splice(this.Format01.DrawNum.length - 1, 1)
        // this.Format01.DrawData = []
        // for (let i = 0; i < this.Format01.DrawNum.length; i++) {
        //   let arr = {}
        //   for (let k = 0; k < this.ColorList.length; k++) {
        //     if (
        //       this.Format01.DrawNum[i] >= this.ColorList[k].MinNum &&
        //       this.Format01.DrawNum[i] <= this.ColorList[k].MaxNum
        //     ) {
        //       arr.color = this.ColorList[k].Colour
        //       arr.num = this.Format01.DrawNum[i]
        //     }
        //   }
        //   this.Format01.DrawData.push(arr)
        // }
        // this.tableData2 = res.Format02
      }
    }
  }
</script>


<style lang="less">
  .resultDetail{

  }
</style>
