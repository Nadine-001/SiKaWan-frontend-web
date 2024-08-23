<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
// import { createRouter, createWebHistory } from "vue-router";
// import LayoutBackend from "@/layouts/variations/BackendStarter.vue";

// import ListWebinar from "@/views/starter/IndexWebinarUser.vue";
// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: "/component",
//       component: LayoutBackend,
//       children: [
//         {
//           path: "listwebinar", // Ganti path yang sesuai kebutuhan
//           name: "backend-component-listwebinar",
//           component: ListWebinar,
//           meta: {
//             requiresAuth: true,
//           },
//         },
//       ],
//     },
//   ],
// });
</script>

<style></style>

<template>
  <div class="content">
    <h2>Halo Talitha!</h2>
    <div class="col-md-12">
      <!-- Justified -->
      <BaseBackground
        image="src/assets/photo/banner.jpeg"
        inner-class="bg-primary-dark-op"
      >
        <div class="content content-full text-center py-7 pb-5">
          <h1 class="h2 text-white mb-2">
            Webinar by Ikatan Profesi Optometris Indonesia
          </h1>
          <h2 class="h4 fw-normal text-white-75">
            Bergabunglah untuk mendapatkan banyak manfaat
          </h2>
        </div>
      </BaseBackground>
    </div>
    <BaseBlock style="margin-top: 20px; background-color: #edfcf0">
      <div class="row items-push">
        <h3 style="color: #006d32">LIST WEBINAR</h3>
        <RouterView to="listwebinar"></RouterView>
      </div>
    </BaseBlock>
  </div>
</template>
