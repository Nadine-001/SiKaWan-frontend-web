<script setup>
import { createRouter, useRouter } from "vue-router";
import { ref } from "vue";
// import BackendTablesDaftarVerifikasiRegistrasi from "@/views/backend/tables/TableDaftarVerifikasiRegistrasi.vue";

// Contoh konfigurasi router yang benar
// const routes = [
//   // ... routes lainnya ...
//   {
//     path: "/tables/verifikasiregistrasi",
//     name: "backend-tables-verifikasi-registrasi",
//     component: BackendTablesDaftarVerifikasiRegistrasi,
//     meta: {
//       requiresAuth: true,
//     },
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

const activeTab = ref("Registrasi");

// const setActiveTab = (tab) => {
//   console.log(`Setting active tab to: ${tab}`);
//   let path;
//   if (tab === "Registrasi") {
//     path = "/tables/verifikasiregistrasi";
//   }

//   router.push({ path });
//   // activeTab.value = tab;
//   // router.push({ name: `tables-${tab.toLowerCase()}` });
// };
</script>

<style>
.nav-pills .nav-link {
  color: #006d32; /* Warna default untuk tautan */
}

.nav-link.active {
  background-color: #006d32;
  color: #fff;
}
</style>

<template>
  <div class="content" style="background-color: #edfcf0">
    <h2>Halo Talitha!</h2>
    <div class="col-md-12">
      <!-- Justified -->
      <BaseBlock title="" class="h-100 mb-0">
        <ul class="nav nav-pills nav-justified push">
          <li class="nav-item me-1">
            <a
              class="nav-link"
              :class="{ active: activeTab === 'Registrasi' }"
              @click="setActiveTab('Registrasi')"
              href="/tables/verifikasiregistrasi"
              >Registrasi</a
            >
          </li>
          <li class="nav-item me-1">
            <a
              class="nav-link"
              :class="{ active: activeTab === 'SuratPermohonan' }"
              @click="setActiveTab('SuratPermohonan')"
              href="javascript:void(0)"
              >Surat Permohonan</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: activeTab === 'PendaftaranWebinar' }"
              @click="setActiveTab('PendaftaranWebinar')"
              href="javascript:void(0)"
              >Pendaftaran Webinar</a
            >
          </li>
        </ul>
      </BaseBlock>
    </div>
    <BaseBlock style="margin-top: 20px">
      <div class="row items-push">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6">
              <h3 style="color: #006d32">FRAME</h3>
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>
