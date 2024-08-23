<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import AuthService from "../../services/AuthService";
import PermohonanService from "../../services/PermohonanService";
import { useRouter } from "vue-router";

const authService = new AuthService();
const router = useRouter();
const permohonanService = new PermohonanService();
// const v$ = useVuelidate();

const user = ref({});
const biodata = ref({});
const files = ref([]);

onMounted(async () => {
  try {
    const response = await authService.fetchUserProfile();
    console.log(response);
    user.value = response.user;
    console.log(response.user);
    biodata.value = response.biodata;
    console.log(response.biodata);
    console.log(user.value);
    console.log(biodata.value);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
});

const handleFileChange = (e, type) => {
  console.log("masuk file change");
  console.log(e && e.target);
  console.log(e);
  console.log(e.target);

  if (e && e.target) {
    console.log("masuk file condition");
    console.log("Files file:", e.target.files[0]);
    files.value[type] = e.target.files[0];
    console.log("Files value:", files.value);
  }
};

const onSubmit = async () => {
  if (!user.value || !biodata.value || !licence_type || !files.value) {
    console.error("Harap isi semua field yang diperlukan!");
    return;
  }
  let formData = new FormData();

  formData.append("membership_number", membership_number.value);
  formData.append("name", name.value);
  formData.append("email", email.value);
  if (files.value.length > 0) {
    files.value.forEach((file, i) => {
      formData.append(`files[${i}]`, file);
    });
  }
  formData.append("licence_type", licence_type.value);

  console.log("Form Data:", formData);

  permohonanService
    .requestLicence(formData)
    .then((res) => {
      console.log(res);
      router.push({ name: "backend-component-listpengajuansurat" });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <h1 style="color: #006d32">
          Formulir Pengajuan Surat Izin Penyelenggaraan Optik
        </h1>
        <hr style="border: 2px solid #006d32" />
      </div>

      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12 space-y-5">
            <form
              class="space-y-4"
              @submit.prevent="onSubmit()"
              enctype="multipart/form-data"
            >
              <div class="row">
                <label class="col-sm-4 col-form-label" for="membership_number"
                  >Nomor Anggota</label
                >
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="membership_number"
                    placeholder=""
                    :value="user.membership_number"
                    style="border: 2px solid #9197b3"
                  />
                </div>
              </div>
              <div class="row">
                <label class="col-sm-4 col-form-label" for="name"
                  >Nama Lengkap</label
                >
                <div class="col-sm-8">
                  <input
                    type="integer"
                    class="form-control"
                    id="name"
                    placeholder=""
                    :value="biodata.name"
                    style="border: 2px solid #9197b3"
                  />
                </div>
              </div>

              <div class="row">
                <label class="col-sm-4 col-form-label" for="email">Email</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder=""
                    :value="user.email"
                    style="border: 2px solid #9197b3"
                  />
                </div>
              </div>
              <div class="row">
                <label class="col-sm-4 col-form-label" for="licence_type"
                  >Jenis Permohonan</label
                >
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="licence_type"
                    placeholder=""
                    value="Pengajuan SIPO"
                    style="border: 2px solid #9197b3"
                  />
                </div>
              </div>

              <div class="row">
                <label class="col-sm-4 col-form-label" for="files"
                  >Unggah Kwitansi Biaya Administrasi (Rp.100.000,00)</label
                >
                <div class="col-sm-8">
                  <input
                    class="form-control"
                    type="file"
                    id="files"
                    style="border: 2px solid #9197b3"
                    @change="handleFileChange($event, 0)"
                    name="files"
                  />
                </div>
              </div>
              <div class="row">
                <label class="col-sm-4 col-form-label" for="files"
                  >Surat Permohonan Rekomendasi Surat Izin Penyelengaraan
                  Optik</label
                >
                <div class="col-sm-8">
                  <input
                    class="form-control"
                    type="file"
                    id="files"
                    style="border: 2px solid #9197b3"
                    @change="handleFileChange($event, 4)"
                    name="files"
                  />
                </div>
              </div>
              <div class="row">
                <label class="col-sm-4 col-form-label" for="files"
                  >Surat Pernyataan Kesanggupan Bekerja atau sebagai
                  Penanggungjawab Optik (bermaterai Rp.6000,00)</label
                >
                <div class="col-sm-8">
                  <input
                    class="form-control"
                    type="file"
                    id="files"
                    style="border: 2px solid #9197b3"
                    @change="handleFileChange($event, 1)"
                    name="files"
                  />
                </div>
              </div>
              <div class="row">
                <label class="col-sm-4 col-form-label" for="files"
                  >Surat Pindah Keanggotaan (bila Kabupaten/Kota berbeda)</label
                >
                <div class="col-sm-8">
                  <input
                    class="form-control"
                    type="file"
                    id="files"
                    style="border: 2px solid #9197b3"
                    @change="handleFileChange($event, 2)"
                    name="files"
                  />
                </div>
              </div>
              <div class="row">
                <label class="col-sm-4 col-form-label" for="files"
                  >Surat Keterangan Domisili (bila Kabupaten/Kota
                  berbeda)</label
                >
                <div class="col-sm-8">
                  <input
                    class="form-control"
                    type="file"
                    id="files"
                    style="border: 2px solid #9197b3"
                    @change="handleFileChange($event, 3)"
                    name="files"
                  />
                </div>
              </div>

              <div class="row">
                <button type="submit" class="col-md-2 btn btn-success">
                  Ajukan Permohonan
                </button>
              </div>

              <div class="mt-2"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Basic -->

    <!-- END Basic -->
  </div>
  <!-- END Page Content -->
</template>
