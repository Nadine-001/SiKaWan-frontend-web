import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import router from "./router/starter";
// import router from "./router";
import { store } from "./store/index";

import Axios from "axios";

import BaseBlock from "@/components/BaseBlock.vue";
import BaseBackground from "@/components/BaseBackground.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";

import clickRipple from "@/directives/clickRipple";

import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

import Vue3FormWizard from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";

const app = createApp(App);

app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);

app.directive("click-ripple", clickRipple);

const rootcomponent = app.use(createPinia());
app.use(store).use(Vue3FormWizard).use(router).mount("#app");

const globals = app.config.globalProperties;
export { globals };
