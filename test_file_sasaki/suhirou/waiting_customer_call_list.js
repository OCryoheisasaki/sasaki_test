// スタッフ操作画面（待機中 + 呼び出し一覧）
Vue.component('waiting_customer_call_list', {
    props: ['waiting_customers', 'called_numbers'],
    template: `
          <div>
            <h3>スタッフ画面</h3>
            <table v-if="waiting_customers.length > 0">
              <tr>
                <th>選択</th>
                <th>番号</th>
                <th>操作</th>
              </tr>
              <tr v-for="customer in waiting_customers" :key="customer.number">
                <td>
                  <input type="checkbox"
                         :value="customer.number"
                         v-model="selected_numbers">
                </td>
                <td>{{ customer.number }}</td>
                <td>
                  <button @click="$emit('call-customer', customer.number)">呼び出し</button>
                  <button @click="$emit('remove-customer', customer.number)">削除</button>
                </td>
              </tr>
            </table>
            <p v-else>現在待機中のお客様はいません</p>
            <button @click="callSelected" :disabled="selected_numbers.length === 0">まとめて呼び出し</button>
            <called_list :called_numbers="called_numbers" @return-to-waiting="returnToWaiting"></called_list>
          </div>
        `,
    data() {
        return {
            selected_numbers: []
        };
    },
    methods: {
        callSelected() {
            this.selected_numbers.forEach(number => {
                this.$emit('call-customer', number);
            });
            this.selected_numbers = [];
        },
        returnToWaiting(number) {
            this.$emit('return-to-waiting', number);
        }
    }
});
