// 待機リスト
Vue.component('waiting_list', {
    props: ['waiting_customers'],
    template: `
          <div>
            <h3>待機中のお客様</h3>
            <p v-if="waiting_customers.length === 0">現在待機中のお客様はいません</p>
            <table v-else>
              <tr>
                <td v-for="customer in waiting_customers" :key="customer.number">
                  {{ customer.number }}
                </td>
              </tr>
            </table>
            <h1>現在の待機組数<b>{{ waiting_customers.length }}</b>組</h1>
          </div>
        `
});

// 発券機
Vue.component('ticketing_function', {
    template: `
          <div>
            <h3>発券機</h3>
            <h1>次の番号は<b>{{ getNextNumber() }}</b></h1>
            <button @click="addCustomer">整理券発行</button>
          </div>
        `,
    data() {
        return {
            next_waiting_number: 0
        };
    },
    methods: {
        addCustomer() {
            this.next_waiting_number++;
            const new_customer = {number: this.next_waiting_number};
            this.$emit('add-new-customer', new_customer);
        },
        getNextNumber() {
            return this.next_waiting_number + 1;
        }
    }
});