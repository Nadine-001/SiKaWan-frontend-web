<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";

import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import AuthService from "../../services/AuthService";

// Main store and Router
const store = useTemplateStore();
const router = useRouter();
const authService = new AuthService();

const state = reactive({
  email: null,
});

async function onSubmit() {
  try {
    await authService.forgot_password(state.email);
    router.push({ name: "auth-login" });
  } catch (error) {
    // Handle the error or provide feedback to the user
    console.error("Error:", error);
  }
}
</script>

<template>
  <div class="row g-0">
    <div
      class="hero-static col-lg-4 flex-column justify-content-start"
      :style="{ backgroundColor: '#D9D9D9' }"
    >
      <div
        class="p-4 p-xl-5 flex-grow-1 d-flex flex-column"
        style="text-align: center"
      >
        <img
          src="@/assets/photo/logo.png"
          alt="Logo"
          class="logo-image"
          style="
            width: 750px;
            height: 776px;
            position: absolute;
            top: 145px;
            left: -350px;
          "
        />
        <div class="align-items-center">
          <h1 class="sikawan-h1">
            <span style="color: #004b93">Si</span>
            <span style="color: #c9002b">KaWan</span>
          </h1>
        </div>
      </div>
    </div>
    <div
      class="hero-static col-lg-8 col-md-8 col-12 d-flex flex-column align-items-center bg-body-extra-light"
    >
      <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
        <div class="w-100 position-relative">
          <div class="text-center">
            <h1 style="color: #c9002b">Lupa Kata Sandi</h1>
            <p class="fw-medium text-muted">Silahkan isikan email Anda.</p>
          </div>
          <div class="row g-0 justify-content-center">
            <div class="col-sm-8 col-xl-4">
              <form @submit.prevent="onSubmit">
                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-lg form-control-alt py-3"
                    id="reminder-credential"
                    name="reminder-credential"
                    placeholder="Email"
                    v-model="state.email"
                  />
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-lg btn-alt-danger">
                    <i class="fa fa-fw fa-envelope me-1 opacity-50"></i> Kirim
                    Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
