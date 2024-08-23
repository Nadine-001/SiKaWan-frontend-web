<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import UsersService from "@/services/UsersServices";
import { useRouter } from "vue-router";

const router = useRouter();
const usersService = new UsersService();
const email = ref("");
const role_id = ref(50);
const password = ref("");
const onComplete = async () => {
  if (!email.value || !role_id.value || !password.value) {
    console.error("Harap isi semua field yang diperlukan!");
    return;
  }
  let formData = new FormData();
  formData.append("email", email.value);
  formData.append("role_id", role_id.value);
  formData.append("password", password.value);

  console.log("Form Data:", formData);
  usersService
    .addUser(formData)
    .then((res) => {
      console.log(res);
      router.push({ name: "backend-component-tablekelolaakun" });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="content">
    <BaseBlock title="">
      <div class="row items-push">
        <div class="row">
          <div class="col-md-12">
            <h1 style="color: #006d32">Tambah Akun</h1>
            <hr style="border: 2px solid #006d32" />
          </div>

          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 space-y-5">
                <form class="space-y-4" @submit.prevent="onComplete()">
                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="email"
                      >Username</label
                    >
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        v-model="email"
                        placeholder=""
                        style="border: 2px solid #9197b3"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="role_id"
                      >Level</label
                    >
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="role_id"
                        :value="50"
                        readonly
                        placeholder=""
                        style="border: 2px solid #9197b3"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="password"
                      >Password</label
                    >
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="password"
                        v-model="password"
                        placeholder=""
                        style="border: 2px solid #9197b3"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <button type="submit" class="col-md-2 btn btn-success">
                      Buat Akun
                    </button>
                  </div>

                  <div class="mt-2"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>
