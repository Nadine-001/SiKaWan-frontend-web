<script setup>
import { ref, reactive, computed } from "vue";
import AuthService from "../../services/AuthService";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";

import { required, minLength } from "@vuelidate/validators";

const router = useRouter();
const authService = new AuthService();
const state = reactive({
  email: null,
  name: null,
  password: null,
});

const rules = computed(() => {
  return {
    name: {
      required,
    },
    email: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(5),
    },
  };
});
const v$ = useVuelidate(rules, state);

async function onSubmit() {
  const result = await v$.value.$validate();

  if (!result) {
    return;
  }

  console.log(state);
  signUp(state);
}
async function signUp(userData) {
  try {
    await authService.sign_up(userData);
    console.log("Registration successful:", userData);
    router.push({ name: "auth-login" });
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Paytone+One:wght@400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ramabhadra:wght@400&display=swap");

.sikawan-h1 {
  font-family: "Paytone One", sans-serif;
  font-weight: bold;
  font-size: 50px;
}

.masuk-h1 {
  font-family: "Ramabhadra", sans-serif;
  font-weight: normal;
  font-size: 50px;
}
</style>

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
            <!-- <h1 class="fw-bold mb-2">Masuk</h1> -->
            <h1 style="color: #c9002b">DAFTAR</h1>
            <!-- <span </span> -->

            <p class="fw-medium text-muted">Silahkan lengkapi data diri</p>
          </div>
          <div class="row g-0 justify-content-center">
            <div class="col-sm-8 col-xl-4">
              <form @submit.prevent="onSubmit">
                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-lg form-control-alt py-3"
                    id="login-name"
                    name="login-name"
                    placeholder="Nama Lengkap"
                    v-model="state.name"
                    :class="{
                      'is-invalid': v$.name.$errors.length,
                    }"
                    @blur="v$.name.$touch"
                  />
                </div>
                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-lg form-control-alt py-3"
                    id="login-email"
                    name="login-email"
                    placeholder="Email"
                    :class="{
                      'is-invalid': v$.email.$errors.length,
                    }"
                    v-model="state.email"
                    @blur="v$.email.$touch"
                  />
                  <div
                    v-if="v$.email.$errors.length"
                    class="invalid-feedback animated fadeIn"
                  >
                    Mohon inputkan email Anda
                  </div>
                </div>
                <div class="mb-4">
                  <input
                    type="password"
                    class="form-control form-control-lg form-control-alt py-3"
                    id="login-password"
                    name="login-password"
                    placeholder="Password"
                    :class="{
                      'is-invalid': v$.password.$errors.length,
                    }"
                    v-model="state.password"
                    @blur="v$.password.$touch"
                  />
                  <div
                    v-if="v$.password.$errors.length"
                    class="invalid-feedback animated fadeIn"
                  >
                    Mohon inputkan kata sandi Anda
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center mb-4"
                >
                  <div>
                    <button type="submit" class="btn btn-lg btn-alt-danger">
                      <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                      Daftar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="one-signup-terms"
    tabindex="-1"
    role="dialog"
    aria-labelledby="one-signup-terms"
    aria-hidden="true"
  ></div>
</template>

<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";

@import "@/assets/scss/vendor/vue-color";
</style>
