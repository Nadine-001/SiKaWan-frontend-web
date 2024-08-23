import { createRouter, createWebHashHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";

import { store } from "../store/index.js";

// Main layouts
import LayoutBackend from "@/layouts/variations/BackendStarter.vue";
import LayoutSimple from "@/layouts/variations/Simple.vue";
// const BackendTablesHelpers = () =>
//   import("@/views/backend/tables/HelpersView.vue");

// Frontend: Landing
const Landing = () => import("@/iropin/autentifikasi/login.vue");

// Backend: Dashboard
const Dashboard = () => import("@/views/starter/DashboardView.vue");

//AUTH
const AuthLogin = () => import("@/iropin/autentifikasi/login.vue");
const AuthLupaPassword = () =>
  import("@/iropin/autentifikasi/lupapassword.vue");
const AuthRegist = () => import("@/iropin/autentifikasi/registrasi.vue");
const AuthRegistBackup = () =>
  import("@/iropin/autentifikasi/registrasibackup.vue");

//INDEX
const IndexPageUser = () => import("@/iropin/index/IndexPageUser.vue");
const IndexKelolaAkun = () => import("@/iropin/index/IndexKelolaAkun.vue");
const IndexWebinarOP = () => import("@/iropin/component/ListJudulWebinar.vue");
const IndexDashboardManager = () =>
  import("@/iropin/index/IndexDashboardManager.vue");
const IndexDashboardManagerVerifikasi = () =>
  import("@/iropin/index/IndexDashboardManagerVerifikasi.vue");
// const IndexDashboardManagerVerifikasiDonut = () =>
//   import("@/iropin/index/IndexDashboardManagerVerifikasiDonut.vue");

//COMPONEN
const FormJoinWebinar = () =>
  import("@/iropin/component/UploadBuktiBayarWebinar.vue");

const ProfilePageUser = () => import("@/iropin/component/ProfilePage.vue");
const FormBuatWebinar = () => import("@/iropin/component/FormNewWebinar.vue");
const ListWebinar = () => import("@/iropin/component/ListWebinar.vue");
const TableKelolaAkun = () => import("@/iropin/component/TableKelolaAkun.vue");
const FormTambahAkun = () => import("@/iropin/component/FormTambahAkun.vue");
const ListApproval = () => import("@/iropin/component/ListApproval.vue");
const JoinWebinar = () => import("@/iropin/component/JoinWebinarUser.vue");
const ListPesertaWebinar = () =>
  import("@/iropin/component/ListPesertaWebinar.vue");
const ListPengajuanSurat = () =>
  import("@/iropin/component/ListPengajuanSurat.vue");

const BackendPengajuanPermohonanSIP = () =>
  import("@/views/starter/PengajuanPermohonanSIP.vue");
const BackendPengajuanPermohonanSIPO = () =>
  import("@/views/starter/PengajuanPermohonanSIPO.vue");
const BackendPengajuanPermohonanRekomendasiBPJS = () =>
  import("@/views/starter/PengajuanPermohonanRekomendasiBPJS.vue");
const BackendPengajuanPermohonanPencabutanSIP = () =>
  import("@/views/starter/PengajuanPermohonanPencabutanSIP.vue");
const BackendPengajuanPermohonanPindahCabang = () =>
  import("@/views/starter/PengajuanPermohonanPindahCabang.vue");
const BackendPengajuanPermohonanPengantarPerpanjanganSTR = () =>
  import("@/views/starter/PengajuanPermohonanPengantarPerpanjanganSTR.vue");

const BackendTablesDaftarAnggota = () =>
  import("@/views/backend/tables/TableDaftarAnggota.vue");
const BackendTablesDaftarVerifikasiRegistrasi = () =>
  import("@/views/backend/tables/TableDaftarVerifikasiRegistrasi.vue");
const BackendTablesDaftarVerifikasiPermohonan = () =>
  import("@/views/backend/tables/TableDaftarVerifikasiPermohonan.vue");
const BackendTablesDaftarVerifikasiWebinar = () =>
  import("@/views/backend/tables/TableDaftarVerifikasiWebinar.vue");

const BackendTablesApprovalUser = () =>
  import("@/views/backend/tables/TableDaftarApprovalUser.vue");

const BackendIndexVerifikasiOperator = () =>
  import("@/views/starter/IndexVerifikasiOperator.vue");
const BackendIndexPengajuaanPermohonanSuratUser = () =>
  import("@/views/starter/IndexPermohonanSuratUser.vue");
const BackendIndexWebinarUser = () =>
  import("@/views/starter/IndexWebinarUser.vue");

const BackendDetailTableVerifikasiRegistrasi = () =>
  import("@/views/starter/DetailTableVerifikasiRegistrasi.vue");
const BackendDetailTableVerifikasiPermohonan = () =>
  import("@/views/starter/DetailTableVerifikasiPermohonan.vue");
const BackendDetailTableVerifikasiWebinar = () =>
  import("@/views/starter/DetailTableVerifikasiWebinar.vue");

const BackendTablesStyles = () =>
  import("@/views/backend/tables/StylesView.vue");

// Set all routes
const routes = [
  {
    path: "/",
    component: LayoutSimple,
    children: [
      {
        path: "",
        name: "landing",
        component: Landing,
      },
    ],
  },
  {
    path: "/backend",
    redirect: "/backend/dashboard",
    component: LayoutBackend,
    children: [
      {
        path: "dashboard",
        name: "backend-dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true,
          //isAdmin: true
        },
      },
    ],
  },
  {
    path: "/component",
    redirect: "",
    component: LayoutBackend,
    children: [
      {
        path: "profilepage",
        name: "backend-component-profilepage",
        component: ProfilePageUser,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "buatwebinar",
        name: "backend-component-buatwebinar",
        component: FormBuatWebinar,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "listwebinar",
        name: "backend-component-listwebinar",
        component: ListWebinar,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "tablekelolaakun",
        name: "backend-component-tablekelolaakun",
        component: TableKelolaAkun,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "formtambahakun",
        name: "backend-component-tambahakun",
        component: FormTambahAkun,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "listapproval",
        name: "backend-component-listapproval",
        component: ListApproval,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "joinwebinar",
        name: "backend-component-joinwebinar",
        component: JoinWebinar,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "listpesertawebinar",
        name: "backend-component-listpesertawebinar",
        component: ListPesertaWebinar,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "listpengajuansurat",
        name: "backend-component-listpengajuansurat",
        component: ListPengajuanSurat,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "formjoinwebinar",
        name: "backend-component-formjoinwebinar",
        component: FormJoinWebinar,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/index",
    redirect: "",
    component: LayoutBackend,
    children: [
      {
        path: "operatorverifikasi",
        name: "backend-verifikasi-operator",
        component: BackendIndexVerifikasiOperator,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "pengajuansurat",
        name: "backend-indexpengajuansuratuser",
        component: BackendIndexPengajuaanPermohonanSuratUser,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "listwebinar",
        name: "backend-indexlistwebinaruser",
        component: BackendIndexWebinarUser,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "pageuser",
        name: "backend-index-pageuser",
        component: IndexPageUser,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "kelolaakun",
        name: "backend-index-kelolaakun",
        component: IndexKelolaAkun,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "webinarop",
        name: "backend-index-webinarop",
        component: IndexWebinarOP,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "dashboardmanager-member",
        name: "backend-index-dashboardmanagermember",
        component: IndexDashboardManager,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "dashboardmanager-verifikasi",
        name: "backend-index-dashboardmanagerverifikasi",
        component: IndexDashboardManagerVerifikasi,
        meta: {
          requiresAuth: true,
        },
      },
      // {
      //   path: "dashboardmanager-donut",
      //   name: "backend-index-dashboardmanagerdonut",
      //   component: IndexDashboardManagerVerifikasiDonut,
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
    ],
  },
  {
    path: "/auth",
    component: LayoutSimple,
    children: [
      {
        path: "login",
        name: "auth-login",
        component: AuthLogin,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "forgetpassword",
        name: "auth-forget",
        component: AuthLupaPassword,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "registrasi",
        name: "auth-regist",
        component: AuthRegist,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "registrasibackup",
        name: "auth-regist-backup",
        component: AuthRegistBackup,
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/tables",
    redirect: "/tables/styles",
    component: LayoutBackend,
    children: [
      {
        path: "styles",
        name: "backend-tables-styles",
        component: BackendTablesStyles,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "keanggotaan",
        name: "backend-tables-daftar-anggota",
        component: BackendTablesDaftarAnggota,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "verifikasiregistrasi",
        name: "backend-tables-verifikasi-registrasi",
        component: BackendTablesDaftarVerifikasiRegistrasi,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "verifikasipermohonan",
        name: "backend-tables-verifikasi-permohonan",
        component: BackendTablesDaftarVerifikasiPermohonan,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "verifikasiwebinar",
        name: "backend-tables-verifikasi-webinar",
        component: BackendTablesDaftarVerifikasiWebinar,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "approvaldone",
        name: "backend-tables-approval-done",
        component: BackendTablesApprovalUser,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/forms",
    redirect: "/forms/elements",
    component: LayoutBackend,
    children: [
      {
        path: "sip",
        name: "backend-form-sip",
        component: BackendPengajuanPermohonanSIP,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "sipo",
        name: "backend-form-sipo",
        component: BackendPengajuanPermohonanSIPO,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "rekomendasibpjs",
        name: "backend-form-rekomendasibpjs",
        component: BackendPengajuanPermohonanRekomendasiBPJS,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "pencabutansip",
        name: "backend-form-pencabutansip",
        component: BackendPengajuanPermohonanPencabutanSIP,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "pindahcabang",
        name: "backend-form-pindahcabang",
        component: BackendPengajuanPermohonanPindahCabang,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "perpanjanganstr",
        name: "backend-form-perpanjanganstr",
        component: BackendPengajuanPermohonanPengantarPerpanjanganSTR,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/detail",
    redirect: "/detail/verifikasi",
    component: LayoutBackend,
    children: [
      {
        path: "verifikasiregistrasi/:projectId",
        name: "backend-detail-verifikasiregistrasi",
        component: BackendDetailTableVerifikasiRegistrasi,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "verifikasipermohonan/:licence_id",
        name: "backend-detail-verifikasipermohonan",
        component: BackendDetailTableVerifikasiPermohonan,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "verifikasiwebinar/:participant_id",
        name: "backend-detail-verifikasiwebinar",
        component: BackendDetailTableVerifikasiWebinar,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

// Create Router
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let isAdmin = to.matched.some((record) => record.meta.isAdmin);

  if (requiresAuth) {
    if (store.getters.isLoggedIn) {
      if (isAdmin) {
        if (store.getters.rsole >= 90) {
          next();
          return;
        } else {
          next("/component/profilepage");
          return;
        }
      }
      next();
      return;
    }
    next("/auth/login");
  } else {
    if (store.getters.isLoggedIn) {
      next("/component/profilepage");
      // next('/suspended')
      return;
    }
    // next('/suspended')
    next();
  }
});

router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
