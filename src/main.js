import Vue from "vue"
import VueRouter from "vue-router"
import Buefy from "buefy"
import App from "./App"
import NewActionPlan from "./components/NewActionPlan"
import "@mdi/font/css/materialdesignicons.css"
import "./assets/css/styles.scss"

Vue.config.productionTip = false
Vue.use(Buefy)

Vue.use(VueRouter)

const routes = [{ path: "/", component: NewActionPlan }]

const router = new VueRouter({
    routes, // short for `routes: routes`
})

new Vue({
    el: "#app",
    router,
    render: (h) => h(App),
}).$mount("#app")
