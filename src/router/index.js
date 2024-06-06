// import { createRouter, createWebHistory } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import AdminPage from '../views/AdminPage.vue'
import ClientPage from '../views/ClientPage.vue'


import SingleSponsorPage from '../views/SingleSponsorPage.vue'
import SingleStudentsPage from '../views/SingleStudentsPage.vue'


import AddStudentPage from '../views/AddStudentPage.vue'

import SiginUp from '../components/SignUp.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },

    {
        path: '/signup',
        name: 'signup',
        component: SiginUp
    },
    {
        path: '/',
        name: 'home',
        component: ClientPage
    },
    {
        path: '/admin/students',
        name: 'students',
        component: AdminPage,
        meta: { needLogin: true }
    },
    {
        path: '/admin/sponsors',
        name: 'sponsors',
        component: AdminPage,
        meta: { needLogin: true }
    },
    {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: AdminPage,
        meta: { needLogin: true }
    },
    {
        path: '/admin/sponsors/single/:id',
        name: 'singleSponsor',
        component: SingleSponsorPage,
        meta: { needLogin: true }
    },
    {
        path: '/admin/students/add',
        name: 'add',
        component: AddStudentPage,
        meta: { needLogin: true }
    },
    {
        path: '/admin/students/single/:id',
        name: 'singleStudents',
        component: SingleStudentsPage,
        meta: { needLogin: true }
    },
]

const router = createRouter({
    mode: 'history',
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
    // history: createWebHistory(import.meta.env.BASE_URL),
})


router.beforeEach((to, from) => {
    const auth = localStorage.getItem('token');
    if (auth && to.name == 'login' || auth && to.name == 'home') {
        return { name: 'dashboard' };
    }

    if (!auth && to.meta.needLogin) {
        return { name: 'login' }
    }

});


export default router