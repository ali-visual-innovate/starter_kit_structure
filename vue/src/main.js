import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import router from "./router";
// i18n
import i18n from "./plugins/i18n";
// Vuetify
import vuetify from "./plugins/vuetify";
//import vueitfy icons
import "@mdi/font/css/materialdesignicons.css";
// pinia resetStore
import resetStore from "./plugins/reset-store";

import "./axios";
// import "./style.css";
import App from "./App.vue";
const pinia = createPinia();

// use router in pinia store
pinia.use(({ store })=>{
    store.router = markRaw(router)
})
pinia.use(resetStore)
const app = createApp(App);
app.use(pinia);
app.use(i18n)
app.use(vuetify)
app.use(router);
app.mount("#app");