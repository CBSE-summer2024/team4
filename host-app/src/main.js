import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';


const app = createApp(App);

// Import remote components dynamically
const CartComponent = defineAsyncComponent(() => import('Cart/Cart'));
const FilterComponent = defineAsyncComponent(() => import('filterApp/FilterComponent'));

app.component('CartComponent', CartComponent);
app.component('FilterComponent', FilterComponent);

app.mount('#app');
