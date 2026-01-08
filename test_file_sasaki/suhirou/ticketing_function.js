// 発券機
export default {
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
}