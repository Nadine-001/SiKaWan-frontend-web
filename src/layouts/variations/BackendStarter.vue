<script setup>
import { useTemplateStore } from "@/stores/template";

import BaseLayout from "@/layouts/BaseLayout.vue";
import BaseNavigation from "@/components/BaseNavigation.vue";

const store = useTemplateStore();

store.setLayout({
  sidebar: true,
});

store.headerStyle({ mode: "light" });
store.mainContent({ mode: "narrow" });
</script>

<template>
  <BaseLayout>
    <template #sidebar-content>
      <div class="content-side custom-sidebar-color">
        <BaseNavigation
          :nodes="[
            {
              name: 'Dashboard',
              to: 'backend-tables-verifikasi-registrasi',
              icon: 'si si-people',
              style: 'color: black;',
              iconStyle: 'color: black;',
              textStyle: 'font-weight: bold;',
            },
            {
              name: 'Buat Project',
              to: 'backend-form-sip',
              icon: 'si si-note',
              style: 'color: black;',
              iconStyle: 'color: black;',
              textStyle: 'font-weight: bold;',
            },
            {
              name: 'List Project',
              to: 'backend-component-profilepage',
              icon: 'si si-list',
              style: 'color: black;',
              iconStyle: 'color: black;',
              textStyle: 'font-weight: bold;',
            },
            // {
            //   name: 'Logout',
            //   to: 'backend-component-listwebinar',
            //   icon: 'si si-logout',
            //   style: 'color: black;',
            //   iconStyle: 'color: black;',
            //   textStyle: 'font-weight: bold;',
            // },
          ]"
        />
      </div>
    </template>
    <template #header-content-left>
      <!-- Toggle Sidebar -->
      <button
        type="button"
        class="btn btn-sm btn-alt-secondary me-2 d-lg-none"
        @click="store.sidebar({ mode: 'toggle' })"
      >
        <i class="fa fa-fw fa-bars"></i>
      </button>
      <!-- END Toggle Sidebar -->

      <!-- Toggle Mini Sidebar -->
      <button
        type="button"
        class="btn btn-sm btn-alt-secondary me-2 d-none d-lg-inline-block"
        @click="store.sidebarMini({ mode: 'toggle' })"
      >
        <i class="fa fa-fw fa-ellipsis-v"></i>
      </button>
    </template>

    <template #header-content-right>
      <button
        type="button"
        class="btn btn-sm btn-alt-secondary ms-2"
        @click="store.sideOverlay({ mode: 'toggle' })"
      >
        <i class="fa fa-fw fa-list-ul fa-flip-horizontal"></i>
      </button>
      <!-- END Toggle Side Overlay -->
    </template>

    <template #footer-content-left>
      <strong>My App</strong>
      &copy; {{ store.app.copyright }}
    </template>
    <!-- END Footer Content Left -->
  </BaseLayout>
</template>
