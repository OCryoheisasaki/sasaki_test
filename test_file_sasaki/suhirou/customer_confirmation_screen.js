import waiting_list from './waiting_list.js';
import called_list from './called_list.js';
import ticketing_function from './ticketing_function.js';
import waiting_customer_call_list from './waiting_customer_call_list.js';
import customer_entry_exit_screen from './customer_entry_exit_screen.js';

export default {
    components: {
        'waiting-list': waiting_list,
        'called-list': called_list,
        'waiting-customer-call-list': waiting_customer_call_list,
        'ticketing-function': ticketing_function,
        'customer-entry-exit-screen': customer_entry_exit_screen
    },
    template: `
      <div>
        <h1>🍣 呼び出しモニター 🍣</h1>

        <div style="display:flex; justify-content:space-around;">
          <called-list :called_numbers="called_numbers"></called-list>
          <waiting-list :waiting_customers="waiting_customers"></waiting-list>
        </div>

        <ticketing-function @add-new-customer="addToWaiting"></ticketing-function>

        <waiting-customer-call-list
            :waiting_customers="waiting_customers"
            :called_numbers="called_numbers"
            @call-customer="callCustomer"
            @return-to-waiting="returnToWaiting"
            @remove-customer="removeCustomer"
        ></waiting-customer-call-list>

        <customer-entry-exit-screen
            :waiting_customers="waiting_customers"
            :called_numbers="called_numbers"
        ></customer-entry-exit-screen>
      </div>
    `,
    data() {
        return {
            waiting_customers: [],
            called_numbers: []
        };
    },
    methods: {
        addToWaiting(customer) {
            this.waiting_customers.push(customer);
        },
        callCustomer(number) {
            this.called_numbers.push({
                number,
                called_time: Date.now()
            });
            this.waiting_customers =
                this.waiting_customers.filter(c => c.number !== number);
        },
        returnToWaiting(number) {
            this.called_numbers =
                this.called_numbers.filter(c => c.number !== number);
            this.waiting_customers.push({ number });
        },
        removeCustomer(number) {
            this.waiting_customers =
                this.waiting_customers.filter(c => c.number !== number);
        }
    }
};
