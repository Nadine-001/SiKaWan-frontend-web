<script>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import AuthService from "../../services/AuthService";
import FlatPickr from "vue-flatpickr-component";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import "flatpickr/dist/flatpickr.css";

const router = useRouter();
const authService = new AuthService();

const flatPickrStateBirthdate = reactive({
  dateCustom: null,
  configCustom: { dateFormat: "Y-m-d" },
});

const flatPickrStatePublishdate = reactive({
  dateCustom: null,
  configCustom: { dateFormat: "Y-m-d" },
});
const flatPickrStateExpdate = reactive({
  dateCustom: null,
  configCustom: { dateFormat: "Y-m-d" },
});

const errorMessage = ref("");
const options = reactive([
  { value: null, text: "Pilih Kota/Kabupaten" },
  { value: "kabbanjarnegara", text: "Kabupaten Banjarnegara" },
  { value: "kabbanyumas", text: "Kabupaten Banyumas" },
  { value: "kabbatang", text: "Kabupaten Batang" },
  { value: "kabblora", text: "Kabupaten Blora" },
  { value: "kabboyolali", text: "Kabupaten Boyolali" },
  { value: "kabbrebes", text: "Kabupaten Brebes" },
  { value: "kabcilacap", text: "Kabupaten Cilacap" },
  { value: "kabdemak", text: "Kabupaten Demak" },
  { value: "kabgrobogan", text: "Kabupaten Grobogan" },
  { value: "kabjepara", text: "Kabupaten Jepara" },
  { value: "kabkaranganyar", text: "Kabupaten Karanganyar" },
  { value: "kabkebumen", text: "Kabupaten Kebumen" },
  { value: "kabkendal", text: "Kabupaten Kendal" },
  { value: "kabklaten", text: "Kabupaten Klaten" },
  { value: "kabkudus", text: "Kabupaten Kudus" },
  { value: "kabmagelang", text: "Kabupaten Magelang" },
  { value: "kabpati", text: "Kabupaten Pati" },
  { value: "kabpekalongan", text: "Kabupaten Pekalongan" },
  { value: "kabpemalang", text: "Kabupaten Pemalang" },
  { value: "kabpurbalingga", text: "Kabupaten Purbalingga" },
  { value: "kabpurworejo", text: "Kabupaten Purworejo" },
  { value: "kabrembang", text: "Kabupaten Rembang" },
  { value: "kabsemarang", text: "Kabupaten Semarang" },
  { value: "kabsragen", text: "Kabupaten Sragen" },
  { value: "kabsukoharjo", text: "Kabupaten Sukoharjo" },
  { value: "kabtegal", text: "Kabupaten Tegal" },
  { value: "kabtemanggung", text: "Kabupaten Temanggung" },
  { value: "kabwonogiri", text: "Kabupaten Wonogiri" },
  { value: "kabwonosobo", text: "Kabupaten Wonosobo" },
  { value: "kotamagelang", text: "Kota Magelang" },
  { value: "kotapekalongan", text: "Kota Pekalongan" },
  { value: "kotasalatiga", text: "Kota Salatiga" },
  { value: "kotasemarang", text: "Kota Semarang" },
  { value: "kotasurakarta", text: "Kota Surakarta" },
  { value: "kotategal", text: "Kota Tegal" },
]);
const state = reactive({
  selectBranch: null,
});
const rules = computed(() => {
  return {
    selectBranch: { required: errorMessage },
  };
});
const v$ = useVuelidate(rules, state);

const form = ref({
  email: "",
  password: "",
  name: "",
  prefix: "",
  sufix: "",
  nik: "",
  birthplace: "",
  birthdate: "",
  gender: "",
  religion: "",
  mobile_phone: "",
  STR_number: "",
  publish_date: "",
  exp_date: "",
  address: "",
  regency_city: "",
  telephone: "",
  zip_code: "",
  institution: "",
  study: "",
  office_regency_city: "",
  office_name: "",
  office_address: "",
  employment_status: "",
  position: "",
  office_phone: "",
  files: "",
});

const register = (_form) => {
  let data = {
    email: _form.email,
    password: _form.password,
    name: _form.name,
    prefix: _form.prefix,
    sufix: _form.sufix,
    NIK: _form.nik,
    birthplace: _form.birthplace,
    birthdate: flatPickrStateBirthdate.dateCustom,
    gender: _form.gender,
    religion: _form.religion,
    mobile_phone: _form.mobile_phone,
    whatsapp_number: _form.whatsapp_number,
    STR_number: _form.STR_number,
    publish_date: flatPickrStatePublishdate.dateCustom,
    exp_date: flatPickrStateExpdate.dateCustom,
    address: _form.address,
    regency_city: _form.regency_city,
    telephone: _form.telephone,
    zip_code: _form.zip_code,
    institution: _form.institution,
    study: _form.institution,
    office_regency_city: state.selectBranch,
    office_name: _form.office_name,
    office_address: _form.office_address,
    employment_status: _form.employment_status,
    position: _form.position,
    office_phone: _form.office_phone,
    province: "Jawa Tengah",
  };
  // console.log(data);
  authService
    .register(data)
    .then((res) => {
      console.log(res);
      router.push({ name: "auth-login" });
    })
    .catch((err) => {
      console.log(err);
    });
};
const onComplete = () => {
  // Validasi atau pengolahan formulir sesuai kebutuhan
  try {
    // console.log(form.value)
    register(form.value);
  } catch (error) {
    console.error("Error during registration:", error);

    errorMessage.value = "Registrasi gagal. Silakan coba lagi.";
  }
};

const submitForm = async (tabName) => {
  switch (
    tabName
    // case "keanggotaan":
    //   console.log("Submitting registration form:", form);
    //   await register();
    //   break;
    // case "data-pribadi":
    //   console.log("Submitting registration form:", form);
    //   await register();
    //   break;
    // case "alamat-tinggal":
    //   console.log("Submitting registration form:", form);
    //   await register();
    //   break;
    // case "pendidikan":
    //   console.log("Submitting registration form:", form);
    //   await register();
    //   break;
    // case "registrasi":
    //   console.log("Submitting registration form:", form);
    //   await register();
    //   break;
    // case "alamat kantor":
    //   console.log("Submitting registration form:", form);
    //   await register();
    //   break;
  ) {
  }
};

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        prefix: "",
        sufix: "",
        nik: "",
        birthplace: "",
        birthdate: "",
        gender: "",
        religion: "",
        mobile_phone: "",
        STR_number: "",
        publish_date: "",
        exp_date: "",
        address: "",
        regency_city: "",
        telephone: "",
        zip_code: "",
        institution: "",
        study: "",
        office_regency_city: "",
        office_name: "",
        office_address: "",
        employment_status: "",
        position: "",
        office_phone: "",
        province: "",
        files: "",
      },
    };
  },
  components: {
    FormWizard,
    TabContent,
    FlatPickr,
  },
  setup() {
    return {
      state,
      v$,
      options,
      flatPickrStateBirthdate,
      flatPickrStateExpdate,
      flatPickrStatePublishdate,
      ref,
      errorMessage,
      form,
      router,
      submitForm,
      useRouter,
      onComplete,
      register,
    };
  },
};
</script>
<template>
  <div class="row g-0">
    <div
      class="hero-static col-lg-4 flex-column justify-content-start"
      :style="{ backgroundColor: '#006D32' }"
    >
      <div
        class="p-4 p-xl-5 flex-grow-1 d-flex flex-column"
        style="text-align: center"
      >
        <div class="w-100 d-flex align-items-center">
          <img
            src="@/assets/photo/logo.png"
            alt="IROPIN Logo"
            class="logo-image"
            style="max-width: 20%; height: auto; margin-right: 10px"
          />
          <h1 class="text-white-75 me-xl-8 mt-2">IROPIN</h1>
        </div>
      </div>
    </div>

    <div
      class="hero-static col-lg-8 col-md-8 col-12 d-flex flex-column align-items-center bg-body-extra-light"
    >
      <div class="p-4 w-100 flex-grow-1 d-flex align-items-top">
        <div class="w-100 position-relative">
          <div
            style="
              position: sticky;
              top: 20px;
              z-index: 1;
              background-color: white;
            "
          >
            <form-wizard @on-complete="onComplete" step-size="xs">
              <tab-content title="Keanggotaan">
                <form @submit.prevent="submitForm('keanggotaan')">
                  <div class="row push">
                    <div class="col-lg-12 col-xl-12">
                      <div class="mb-4">
                        <label class="form-label" for="province"
                          >Anggota Daerah</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="province"
                          placeholder=""
                          value="Jawa Tengah"
                          readonly
                          style="
                            background-color: #cdced0;
                            border: 2px solid #9197b3;
                          "
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="office_regency_city"
                          >Anggota Cabang<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <select
                          id="office_regency_city"
                          class="form-select"
                          :class="{
                            'is-invalid': v$.selectBranch.$errors.length,
                          }"
                          v-model="state.selectBranch"
                          @blur="v$.selectBranch.$touch"
                          name="selectBranch"
                        >
                          <option
                            v-for="(option, index) in options"
                            :value="option.value"
                            :key="'option-${index}'"
                          >
                            {{ option.text }}
                          </option>
                        </select>
                        <div
                          v-if="v$.selectBranch.$errors.length || errorMessage"
                          class="invalid-feedback animated fadeIn"
                        >
                          Pilih salah satu!
                          {{ v$.selectBranch.$errors[0] || errorMessage }}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </tab-content>
              <tab-content title="Data Pribadi">
                <form @submit.prevent="submitForm('data-pribadi')">
                  <div class="row push">
                    <div class="col-lg-12 col-xl-12">
                      <div class="mb-4">
                        <label class="form-label" for="name"
                          >Nama Lengkap (tanpa gelar)</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          v-model="form.name"
                          placeholder=""
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="NIK">Nomor KTP</label>
                        <input
                          type="text"
                          class="form-control"
                          id="NIK"
                          v-model="form.nik"
                          placeholder=""
                        />
                        {{ form.nik }}
                      </div>

                      <div class="mb-4">
                        <label class="form-label" for="birthdate"
                          >Tanggal Lahir</label
                        >
                        <FlatPickr
                          id="birthdate"
                          class="form-control"
                          placeholder=""
                          v-model="flatPickrStateBirthdate.dateCustom"
                          :config="flatPickrStateBirthdate.configCustom"
                        />
                      </div>

                      <div class="mb-4">
                        <label class="form-label" for="birthplace"
                          >Tempat Lahir</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="birthplace"
                          v-model="form.birthplace"
                          placeholder=""
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="gender"
                          >Jenis Kelamin</label
                        >
                        <select
                          class="form-select"
                          id="gender"
                          v-model="form.gender"
                        >
                          <option selected>Pilih Jenis Kelamin</option>
                          <option value="lakilaki">Laki-laki</option>
                          <option value="perempuan">Perempuan</option>
                        </select>
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="religion">Agama</label>
                        <select
                          class="form-select"
                          id="religion"
                          v-model="form.religion"
                        >
                          <option selected>Pilih Agama</option>
                          <option value="islam">Islam</option>
                          <option value="kristen">Kristen</option>
                          <option value="katolik">Katolik</option>
                          <option value="hindu">Hindu</option>
                          <option value="buddha">Buddha</option>
                          <option value="konghucu">Konghucu</option>
                        </select>
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="prefix"
                          >Gelar Depan</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="prefix"
                          v-model="form.prefix"
                          placeholder=""
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="sufix"
                          >Gelar Belakang</label
                        >
                        <input
                          type="email"
                          class="form-control"
                          id="sufix"
                          v-model="form.sufix"
                          placeholder=""
                        />
                      </div>

                      <div class="mb-4">
                        <label class="form-label" for="email">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          id="email"
                          placeholder=""
                          v-model="form.email"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="password"
                          >Password</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="password"
                          placeholder=""
                          v-model="form.password"
                        />
                      </div>

                      <div class="mb-4">
                        <label class="form-label" for="files">Upload KTP</label>
                        <input class="form-control" type="file" id="files" />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="files"
                          >Upload Pas Foto</label
                        >
                        <input class="form-control" type="file" id="files" />
                      </div>
                    </div>
                  </div>
                </form>
              </tab-content>
              <tab-content title="Alamat Tinggal">
                <form @submit.prevent="submitForm('alamat-tinggal')">
                  <div class="row push">
                    <div class="col-lg-12 col-xl-12">
                      <div class="mb-4">
                        <label class="form-label" for="address"
                          >Alamat Lengkap</label
                        >
                        <textarea
                          class="form-control"
                          id="address"
                          rows="4"
                          placeholder="Ketikkan alamat lengkap"
                          v-model="form.address"
                        ></textarea>
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="regency_city"
                          >Kota</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="regency_city"
                          placeholder=""
                          v-model="form.regency_city"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="zip_code"
                          >Kode Pos</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="zip_code"
                          placeholder=""
                          v-model="form.zip_code"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="telephone"
                          >Nomor Telepon</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="telephone"
                          placeholder=""
                          v-model="form.telephone"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="mobile_phone"
                          >Nomor HP</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="mobile_phone"
                          placeholder=""
                          v-model="form.mobile_phone"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </tab-content>
              <tab-content title="Pendidikan">
                <form @submit.prevent="submitForm('pendidikan')">
                  <div class="row push">
                    <div class="col-lg-12 col-xl-12">
                      <div class="mb-4">
                        <label class="form-label" for="institution"
                          >Universitas / Institusi</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="institution"
                          placeholder=""
                          v-model="form.institution"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="study"
                          >Peminatan (jika ada)</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="study"
                          placeholder=""
                          v-model="form.study"
                        />
                      </div>

                      <div class="mb-4">
                        <label class="form-label" for="files"
                          >Upload Ijazah</label
                        >
                        <input class="form-control" type="file" id="files" />
                      </div>
                    </div>
                  </div>
                </form>
              </tab-content>
              <tab-content title="Registrasi">
                <form @submit.prevent="submitForm('registrasi')">
                  <div class="row push">
                    <div class="col-lg-12 col-xl-12">
                      <div class="mb-4">
                        <label class="form-label" for="STR_number"
                          >No STR</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="STR_number"
                          placeholder=""
                          v-model="form.STR_number"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="publish_date"
                          >Tanggal Terbit</label
                        >
                        <FlatPickr
                          id="publish_date"
                          class="form-control"
                          placeholder=""
                          v-model="flatPickrStatePublishdate.dateCustom"
                          :config="flatPickrStatePublishdate.configCustom"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="exp_date"
                          >Tanggal Kadaluarsa</label
                        >
                        <FlatPickr
                          id="exp_date"
                          class="form-control"
                          placeholder=""
                          v-model="flatPickrStateExpdate.dateCustom"
                          :config="flatPickrStateExpdate.configCustom"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="files">Upload STR</label>
                        <input class="form-control" type="file" id="files" />
                      </div>
                    </div>
                  </div>
                </form>
              </tab-content>
              <tab-content title="Alamat Kantor">
                <form @submit.prevent="submitForm('alamat-kantor')">
                  <div class="row push">
                    <div class="col-lg-12 col-xl-12">
                      <div class="mb-4">
                        <label class="form-label" for="office_name"
                          >Nama Kantor</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="office_name"
                          placeholder=""
                          v-model="form.office_name"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="office_address"
                          >Alamat Kantor Lengkap</label
                        >
                        <textarea
                          class="form-control"
                          id="office_address"
                          rows="4"
                          placeholder="Ketikkan alamat lengkap"
                          v-model="form.office_address"
                        ></textarea>
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="office_regency_city"
                          >Kota</label
                        >
                        <select
                          id="office_regency_city"
                          class="form-select"
                          :class="{
                            'is-invalid': v$.selectBranch.$errors.length,
                          }"
                          v-model="state.selectBranch"
                          @blur="v$.selectBranch.$touch"
                          name="selectBranch"
                        >
                          <option
                            v-for="(option, index) in options"
                            :value="option.value"
                            :key="'option-${index}'"
                          >
                            {{ option.text }}
                          </option>
                        </select>
                        <div
                          v-if="v$.selectBranch.$errors.length || errorMessage"
                          class="invalid-feedback animated fadeIn"
                        >
                          Pilih salah satu!
                          {{ v$.selectBranch.$errors[0] || errorMessage }}
                        </div>
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="employment_status"
                          >Status Kepegawaian</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="employment_status"
                          placeholder=""
                          v-model="form.employment_status"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="position">Jabatan</label>
                        <input
                          type="text"
                          class="form-control"
                          id="position"
                          placeholder=""
                          v-model="form.position"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="form-label" for="office_phone"
                          >Telepon Kantor</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="office_phone"
                          placeholder=""
                          v-model="form.office_phone"
                        />
                      </div>

                      <div class="mb-4">
                        <label class="form-label" for="files"
                          >Upload SIP / Surat Keterangan Bekerja</label
                        >
                        <input class="form-control" type="file" id="files" />
                      </div>
                    </div>
                  </div>
                </form>
              </tab-content>
            </form-wizard>
            <div
              class="d-flex justify-content-center align-items-center logo-overlay"
            >
              <img
                src="@/assets/photo/logo.png"
                alt="IROPIN Logo"
                class="logo-image"
                style="max-width: 20%; height: auto; opacity: 0.5"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- END FORM -->
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
// Flatpickr + Custom overrides
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";

// Vue Color Custom overrides
@import "@/assets/scss/vendor/vue-color";

.logo-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
