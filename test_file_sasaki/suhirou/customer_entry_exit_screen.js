export default {
    props: ['waiting_customers', 'called_numbers'],
    template: `
          <div>
            <h2>お客様用 入退室画面</h2>
            <table border="3" style="margin: auto; border-collapse: collapse;">
              <tr>
                <th>番号</th>
                <th>状態 / 操作</th>
              </tr>
              <tr v-for="customer in getDisplayCustomers()" :key="customer.number">
                <td style="padding: 8px; text-align: center;">{{ customer.number }}</td>
                <td style="padding: 8px; text-align: center;">
                  <div v-if="customer.called">
                    <button @click="enter(customer.number)">入室</button>
                    <button @click="exit(customer.number)">退室</button>
                  </div>
                  <div v-else>待機中</div>
                </td>
              </tr>
            </table>

            <h3>入室中のお客様</h3>
            <table border="1" style="margin: auto; border-collapse: collapse;" v-if="entered_customers.length > 0">
              <tr>
                <th>番号</th>
              </tr>
              <tr v-for="number in entered_customers" :key="number">
                <td style="padding: 8px; text-align: center;">{{ number }}</td>
              </tr>
            </table>
            <p v-else>入室中の方はいません</p>
          </div>
        `,
    data() {
        return {
            entered_customers: []
        };
    },
    methods: {
        enter(customer_number) {
            if (!this.entered_customers.includes(customer_number)) {
                this.entered_customers.push(customer_number);
                this.$emit('entered', customer_number);

                let called_number = -1;
                for (let i = 0; i < this.called_numbers.length; i++) {
                    if (this.called_numbers[i] === customer_number) {
                        called_number = i;
                        break;
                    }
                }
                if (called_number !== -1) {
                    this.called_numbers.splice(called_number, 1);
                }
            }
        },
        exit(customer_number) {
            let entered_index = -1;
            for (let i = 0; i < this.entered_customers.length; i++) {
                if (this.entered_customers[i] === customer_number) {
                    entered_index = i;
                    break;
                }
            }
            if (entered_index !== -1) {
                this.entered_customers.splice(entered_index, 1);
            }

            let called_index = -1;
            for (let i = 0; i < this.called_numbers.length; i++) {
                if (this.called_numbers[i] === customer_number) {
                    called_index = i;
                    break;
                }
            }
            if (called_index !== -1) {
                this.called_numbers.splice(called_index, 1);
            }
        },
        getDisplayCustomers() {
            const display = [];

            for (let i = 0; i < this.called_numbers.length; i++) {
                display.push({ number: this.called_numbers[i].number, called: true });
            }

            for (let i = 0; i < this.waiting_customers.length; i++) {
                const customer_number = this.waiting_customers[i].number;
                let exists = false;
                for (let index = 0; index < this.called_numbers.length; index++) {
                    if (this.called_numbers[index].number === customer_number) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    display.push({ number: customer_number, called: false });
                }
            }

            return display;
        }
    }
}