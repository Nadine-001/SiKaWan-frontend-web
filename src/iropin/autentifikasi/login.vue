<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import AuthService from "../../services/AuthService";
const authService = new AuthService();

const store = useTemplateStore();
const router = useRouter();

const state = reactive({
  email: null,
  password: null,
});

const rules = computed(() => {
  return {
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
  signin(state.email, state.password);
}

// Your Vue component
function signin(_email, _password, _remember_me = true) {
  let data = {
    email: _email,
    password: _password,
  };
  authService
    .login(data)
    .then((res) => {
      console.log("UID:", res.UID);
      console.log("Token:", res.token);
      router.push({ name: "backend-tables-verifikasi-registrasi" });
    })
    .catch((err) => {
      console.log(err);
    });
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
  <BaseBackground>
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
              -->
              <h1 style="color: #c9002b">MASUK</h1>

              <p class="fw-medium text-muted">
                Belum punya akun?
                <RouterLink :to="{ name: 'auth-regist-backup' }"
                  >DAFTAR</RouterLink
                >
              </p>
            </div>
            <div class="row g-0 justify-content-center">
              <div class="col-sm-8 col-xl-4">
                <form @submit.prevent="onSubmit">
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
                      <RouterLink
                        :to="{ name: 'auth-forget' }"
                        class="text-muted fs-sm fw-medium d-block d-lg-inline-block mb-1"
                      >
                        Lupa Kata Sandi?
                      </RouterLink>
                    </div>
                    <div>
                      <button type="submit" class="btn btn-lg btn-alt-danger">
                        <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                        Masuk
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
  </BaseBackground>
</template>
