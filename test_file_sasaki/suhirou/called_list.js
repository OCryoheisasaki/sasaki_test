// 呼び出し中リスト
Vue.component('called_list', {
    props: ['called_numbers'],
    template: `
          <div>
            <table>
              <tr>
                <th colspan="5">呼び出し中の番号</th>
              </tr>
              <tr v-if="called_numbers.length > 0">
                <td v-for="called in called_numbers" :key="called.number">
                  {{ called.number }}<br>
                  <span style="font-size:0.8em;">{{ getElapsedSec(called.called_time) }}秒経過</span>
                </td>
              </tr>
            </table>
            <p v-if="called_numbers.length === 0">現在呼び出し中のお客様はいません</p>
          </div>
        `,
    data() {
        return {
            now: Date.now(),
            timer: null
        };
    },
    mounted() {
        var self = this;
        this.timer = setInterval(function() {
            self.now = Date.now();
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        getElapsedSec: function(called_time) {
            return Math.max(0, Math.floor((this.now - called_time) / 1000));
        }
    }
});