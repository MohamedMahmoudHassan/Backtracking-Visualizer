import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';


Vue.use(MuseUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
