// メイン画面
Vue.component('customer_confirmation_screen', {
    template: `
          <div>
            <h1>🍣 呼び出しモニター 🍣</h1>

            <div style="display:flex; justify-content:space-around; margin-bottom:20px;">
              <called_list :called_numbers="called_numbers"></called_list>
              <waiting_list :waiting_customers="waiting_customers"></waiting_list>
            </div>

            <div style="margin-bottom:20px; text-align:center;">
              <ticketing_function @add-new-customer="addToWaitingList"></ticketing_function>
            </div>

            <div style="margin-top:20px; text-align:center;">
              <waiting_customer_call_list
                  :waiting_customers="waiting_customers"
                  :called_numbers="called_numbers"
                  @call-customer="handleCallCustomer"
                  @return-to-waiting="handleReturnToWaiting"
                  @remove-customer="handleRemoveCustomer"
              ></waiting_customer_call_list>
            </div>

            <div style="margin-top:30px; text-align:center;">
              <customer_entry_exit_screen
                  :waiting_customers="waiting_customers"
                  :called_numbers="called_numbers"
              ></customer_entry_exit_screen>
            </div>
          </div>
        `,
    data() {
        return {
            waiting_customers: [],
            called_numbers: [],
            timer_id: null
        };
    },
    mounted() {
        this.timer_id = setInterval(this.checkCalledTimeout, 1000);
    },
    methods: {
        checkCalledTimeout() {
            const now = Date.now();
            const called_list = this.called_numbers.slice();
            for (const called of called_list) {
                const elapsed_second = now - called.called_time;
                if (elapsed_second >= 60000) {
                    this.handleReturnToWaiting(called.number);
                }
            }
        },
        addToWaitingList(new_customer) {
            this.waiting_customers.push(new_customer);
        },
        handleCallCustomer(customer_number) {
            this.called_numbers.push({
                number: customer_number,
                called_time: Date.now()
            });
            for (let i = 0; i < this.waiting_customers.length; i++) {
                if (this.waiting_customers[i].number === customer_number) {
                    this.waiting_customers.splice(i, 1);
                    break;
                }
            }
        },
        handleReturnToWaiting(customer_number) {
            let index_number = -1;
            for (let i = 0; i < this.called_numbers.length; i++) {
                if (this.called_numbers[i].number === customer_number) {
                    index_number = i;
                    break;
                }
            }
            if (index_number !== -1) {
                this.called_numbers.splice(index_number, 1);
            }

            let exists = false;
            for (let i = 0; i < this.waiting_customers.length; i++) {
                if (this.waiting_customers[i].number === customer_number) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                this.waiting_customers.push({ number: customer_number });
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
});