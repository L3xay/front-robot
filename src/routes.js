import Vue from 'vue';
import VueRouter from 'vue-router';
import RobotList from "@/components/RobotList";
import RobotDetails from "@/pages/RobotDetails"
Vue.use(VueRouter);

const routes = [
    { path: '/', name: "RobotList", component: RobotList },
    { path: '/robot/:id', name: 'RobotDetails', component: RobotDetails }
];

export default routes;