<template>
  <div class="rule px-2">
    <div>
      <h3 class="py-4 text-h6">1. What is 5/90</h3>
      <p class="mb-2 text-body-2">
        5/90 is a draw game where players need to choose 5 different numbers from the pool of 90 numbers (01-90). Three bet types are set up for the game, each including various ways to play.
      </p>
      <p class="mb-2 text-body-2">
        5/90 drawings are held once a day, with 10 different numbers to be drawn from the 90 numbers. Players win a certain amount of prize depending on the type and way of bet, as well as the number selected that match with the result sets.
      </p>
      <h3 class="py-4 text-h6">2. Bet Types</h3>
      <p class="mb-2 text-body-2">Players can choose any type of bet they want.</p>
      <p class="mb-2 text-body-2">
        Each type involves choosing 5 numbers from the pool of 90 numbers (01-90), only with different place of numbers to be drawn. Specific types of playing are as follows:
      </p>
      <p class="mb-2 text-body-2">
        1. Winning Number: Predict the first 5 numbers out of the 10 winning numbers drawn.
      </p>
      <p class="mb-2 text-body-2">
        2. Machine Number: Predict the last 5 numbers out of the 10 winning numbers drawn.
      </p>
      <p class="mb-2 text-body-2">
        3. Double Chance: Predict both the first and last 5 numbers out of the 10 winning numbers drawn. Players are considered as winners for predicting only one combination correctly.
      </p>
      <h3 class="py-4 text-h6">3. How to Play</h3>
      <p class="mb-2 text-body-2">Minium amount per bet: NGN 10</p>
      <p class="mb-2 text-body-2">
        Players can choose any one of the following ways to play, but they have only one winning chance according to the way of playing selected for each round.
      </p>
      <p class="mb-2 text-body-2">
        1. First Number Drop: choose 1 number from out of 90 numbers and that number should be the first number that comes out during draw.
      </p>
      <p class="mb-2 text-body-2">
        2. NAP2 (Direct 2): choose 2 numbers out of 90 numbers and it can be any 2 numbers out of the 5 numbers to be drawn.
      </p>
      <p class="mb-2 text-body-2">
        3. NAP3 (Direct 3): choose 3 numbers out of 90 numbers and it can be any 3 numbers out of the 5 numbers to be drawn.
      </p>
      <p class="mb-2 text-body-2">
        4. NAP4 (Direct 4): choose 4 numbers out of 90 numbers and it can be any 4 numbers out of the 5 numbers to be drawn.
      </p>
      <p class="mb-2 text-body-2">
        5. NAP5 (Direct 5): choose 5 numbers out of 90 numbers and it should be the exact 5 numbers to be drawn.
      </p>
      <p class="mb-2 text-body-2">
        6. PERM2: choose 2-45 numbers to make multiple combinations based on the playing method of NAP2. If any one of the combinations matches the winning condition for NAP2, it counts as a win.
      </p>
      <p class="mb-2 text-body-2">
        7. PERM3: choose 3-19 numbers to make multiple combinations based on the playing method of NAP3. If any one of the combinations matches the winning condition for NAP3, it counts as a win.
      </p>
      <p class="mb-2 text-body-2">
        8. PERM4: choose 4-13 numbers to make multiple combinations based on the playing method of NAP4. If any one of the combinations matches the winning condition for NAP4, it counts as a win.
      </p>
      <p class="mb-2 text-body-2">
        9. PERM5: choose 5-12 numbers to make multiple combinations based on the playing method of NAP5. If any one of the combinations matches the winning condition for NAP5, it counts as a win.
      </p>
      <p class="mb-2 text-body-2">
        10. Against 2: choose 1 banker number against 2-20 numbers to make multiple combinations based on the playing method of NAP2. If any one of the combinations matches the winning condition for NAP2, it counts as a win.
      </p>
      <h3 class="py-4 text-h6">4. Multiple Bets</h3>
      <p class="mb-2 text-body-2">It is a kind of bet type where players need to pick more numbers than those of the basic bet type to bet on two or more selections.</p>
      <p class="mb-2 text-body-2">For example:</p>
      <div class="pl-4">
        <p class="mb-2 text-body-2">For PERM2, pick 15, 36 and 48 to bet on three selections including 15/36, 15/48 and 36/48.</p>
      </div>
      <h3 class="py-4 text-h6">5. Draw time</h3>
      <p class="mb-2 text-body-2">
        Drawings of the game are held once a day. The selling time is 7:00am – 7:00pm, and the draw time is 7:30pm.
      </p>
      <h3 class="py-4 text-h6">6. Winning Rules and Prizes</h3>
      <p class="mb-2 text-body-2">
        The prize amount is calculated as follows:<br/>
        Prize amount = Stake per line x odds
      </p>
      <p class="mb-2 text-body-2">1. Winning Number & Machine Number:</p>
      <div class="pl-4">
        <p class="mb-2 text-body-2">1.1 First Number Drop: Stake per line x 50</p>
        <p class="mb-2 text-body-2">1.2 NAP2: Stake per line x 290</p>
        <p class="mb-2 text-body-2">1.3 NAP3: Stake per line x 2500</p>
        <p class="mb-2 text-body-2">1.4 NAP4: Stake per line x 6900</p>
        <p class="mb-2 text-body-2">1.5 NAP5: Stake per line x 59000</p>
      </div>
      <p class="mb-2 text-body-2">2. Double Chance:</p>
      <div class="pl-4">
        <p class="mb-2 text-body-2">2.1 First Number Drop: Stake per line x 25</p>
        <p class="mb-2 text-body-2">2.2 NAP2: Stake per line x 145</p>
        <p class="mb-2 text-body-2">2.3 NAP3: Stake per line x 1250</p>
        <p class="mb-2 text-body-2">2.4 NAP4: Stake per line x 3450</p>
        <p class="mb-2 text-body-2">2.5 NAP5: Stake per line x 29500</p>
      </div>
    </div>
    <div v-if="false">
      <h3>一、玩法简介：</h3>
      <p>
        投注者从01-90的数字中选择5个不同数字组成一注进行投注。游戏设有3种竞猜类型，每种竞猜类型又包括多种投注玩法。<br/>
        游戏每天开奖1次。每次开奖时，系统从01-90的数字中开出10个不同数字。若玩家所选择的投注类型、投注玩法及投注数字，与对应开奖结果相同，即可中得相应奖金。
      </p>
      <h3>二、投注类型</h3>
      <p>
        投注者可任意选择投注类型。<br/>
        每种类型均为从01-90的数字中选择5个数字，但竞猜对象不同，具体玩法如下：<br/>
        1、WINNING NUMBER：竞猜10个开奖数字中的前5个<br/>
        2、MACHINE NUMBER：竞猜10个开奖数字中的后5个<br/>
        3、DOUBLE CHANCE：同时竞猜10个开奖数字中的前5个和后5个，只要有一组猜中即为中奖
      </p>
      <h3>三、投注玩法</h3>
      <p>
        最小投注金额10 ₦<br/>
        投注者可任意选择投注玩法，当期每注投注数字按其投注玩法只有一次中奖机会，不能兼中兼得。<br/>
        1、First Number Drop：投注1个数字。若与开出的第一个数字相同，即中奖。<br/>
        2、NAP2（直选2）：投注2个数字。若开出的5个数字中，包含这2个数字，即中奖。<br/>
        3、NAP3（直选3）：投注3个数字。若开出的5个数字中，包含这3个数字，即中奖。<br/>
        4、NAP4（直选4）：投注4个数字。若开出的5个数字中，包含这4个数字，即中奖。<br/>
        5、NAP5（直选5）：投注5个数字。若开出的5个数字与投注的5个数字相同，即中奖。<br/>
        6、PERM2（组选2）：选择2-45个数字，组成多注，并按NAP2玩法进行相应注数投注。若任意1注符合NAP2中奖条件，即中奖。<br/>
        7、PERM3（组选3）：选择3-19个数字，组成多注，并按NAP3玩法进行相应注数投注。若任意1注符合NAP3中奖条件，即中奖。<br/>
        8、PERM4（组选4）：选择4-13个数字，组成多注，并按NAP4玩法进行相应注数投注。若任意1注符合NAP4中奖条件，即中奖。<br/>
        9、PERM5（组选5）：选择5-12个数字，组成多注，并按NAP5玩法进行相应注数投注。若任意1注符合NAP5中奖条件，即中奖。<br/>
        10、Against2（胆拖2）：选择1个胆码和2-20个拖码，组成多注，并根据所组成的每注号码，按NAP2玩法进行相应注数投注。若任意1注符合NAP2中奖条件，即中奖。
      </p>
      <h3>三、开奖时间</h3>
      <p>本游戏每天开奖1期，销售时间为7：00-19：00，开奖时间为19：30</p>
      <h3>四、中奖规则及奖金</h3>
      <p>
        本游戏采用固定设奖<br/>
        中奖金额=stake×中奖倍数<br/>
        1、WINNING NUMBER、MACHINE NUMBER：<br/>
        First Number Drop：单注投注金额的50倍奖励。<br/>
        NAP2：投注金额的290倍奖励。<br/>
        NAP3：投注金额的2500倍奖励。<br/>
        NAP4：投注金额的6900倍奖励。<br/>
        NAP5：投注金额的59000倍奖励。<br/>
        2、DOUBLE CHANCE：<br/>
        First Number Drop：单注投注金额的25倍奖励。<br/>
        NAP2：投注金额的145倍奖励。<br/>
        NAP3：投注金额的1250倍奖励。<br/>
        NAP4：投注金额的3450倍奖励。<br/>
        NAP5：投注金额的29500倍奖励。
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rule',
    data() {
      return {
      }
    },
    components: {
    },
    computed: {
    },
    created() {
    },
    methods: {

    }
  }
</script>


<style lang="less">
  .rule{

  }
</style>
