// 待機リスト
export default {
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
}