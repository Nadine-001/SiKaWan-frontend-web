<template>
  <div class="bg-primary-dark">
    <div class="row g-0 bg-primary-dark-op">
      <div
        class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center"
      >
        <div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <RouterLink
              :to="{ name: 'landing' }"
              class="link-fx fw-semibold fs-2 text-white"
            >
              IROPIN
            </RouterLink>
            <p class="text-white-75 me-xl-8 mt-2">
              Lengkapi formulir untuk bergabung menjadi anggota IROPIN Jawa
              Tengah
            </p>
          </div>
        </div>
        <div
          class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm"
        ></div>
      </div>
    </div>

    <!-- main section    -->
    <div
      class="hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light"
    >
      <div class="p-3 w-100 d-lg-none text-center">
        <RouterLink
          :to="{ name: 'landing' }"
          class="link-fx fw-semibold fs-3 text-dark"
        >
          IROPIN<span class="fw-normal"> Jawa Tengah</span>
        </RouterLink>
        <h1 class="fw-bold mb-2">Formulir Pendaftaran</h1>
      </div>
      <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
        <div class="w-100">
          <div class="row g-0 justify-content-center">
            <div class="col-sm-8 col-xl-4">
              <form-wizard @on-complete="onComplete" step-size="xs">
                <tab-content title="Keanggotaan">
                  Anggota Daerah, Anggota Cabang
                </tab-content>
                <tab-content title="Data Pribadi">
                  <BaseBlock title="">
                    <form @submit.prevent>
                      <div class="row push">
                        <div class="col-lg-12">
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Nama Lengkap (tanpa gelar)</label
                            >
                            <input
                              type="text"
                              class="form-control col-md-12"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Nomor KTP</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Tempat Lahir</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-select"
                              >Jenis Kelamin</label
                            >
                            <select
                              class="form-select"
                              id="example-select"
                              name="example-select"
                            >
                              <option selected>Pilih Jenis Kelamin</option>
                              <option value="lakilaki">Laki-laki</option>
                              <option value="perempuan">Perempuan</option>
                            </select>
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-select"
                              >Agama</label
                            >
                            <select
                              class="form-select"
                              id="example-select"
                              name="example-select"
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
                            <label class="form-label" for="example-text-input"
                              >Gelar Depan</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-email-input"
                              >Gelar Belakang</label
                            >
                            <input
                              type="email"
                              class="form-control"
                              id="example-email-input"
                              name="example-email-input"
                              placeholder=""
                            />
                          </div>

                          <div class="mb-4">
                            <label class="form-label" for="example-file-input"
                              >Upload KTP</label
                            >
                            <input
                              class="form-control"
                              type="file"
                              id="example-file-input"
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-file-input"
                              >Upload Pas Foto</label
                            >
                            <input
                              class="form-control"
                              type="file"
                              id="example-file-input"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </BaseBlock>
                </tab-content>
                <tab-content title="Alamat Tinggal">
                  <BaseBlock title="Alamat Tinggal">
                    <form @submit.prevent>
                      <div class="row push">
                        <div class="col-lg-8 col-xl-5">
                          <div class="mb-4">
                            <label
                              class="form-label"
                              for="example-textarea-input"
                              >Alamat Lengkap</label
                            >
                            <textarea
                              class="form-control"
                              id="example-textarea-input"
                              name="example-textarea-input"
                              rows="4"
                              placeholder="Ketikkan alamat lengkap"
                            ></textarea>
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-select"
                              >Kota</label
                            >
                            <select
                              class="form-select"
                              id="example-select"
                              name="example-select"
                            >
                              <option selected>Pilih Kota</option>
                              <option value="1">Islam</option>
                              <option value="2">Kristen</option>
                              <option value="1">Katolik</option>
                              <option value="2">Hindu</option>
                              <option value="1">Buddha</option>
                              <option value="2">Konghucu</option>
                            </select>
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Kode Pos</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Nomor Telepon</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Nomor HP</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </BaseBlock>
                </tab-content>
                <tab-content title="Pendidikan">
                  <BaseBlock title="Pendidikan Terakhir">
                    <form @submit.prevent>
                      <div class="row push">
                        <div class="col-lg-8 col-xl-5">
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Universitas / Institusi</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Peminatan (jika ada)</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>

                          <div class="mb-4">
                            <label class="form-label" for="example-file-input"
                              >Upload Ijazah</label
                            >
                            <input
                              class="form-control"
                              type="file"
                              id="example-file-input"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </BaseBlock>
                </tab-content>
                <tab-content title="Registrasi">
                  <BaseBlock title="Registrasi">
                    <form @submit.prevent>
                      <div class="row push">
                        <div class="col-lg-8 col-xl-5">
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >No STR</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Tanggal Terbit</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Tanggal Kadaluarsa</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-file-input"
                              >Upload STR</label
                            >
                            <input
                              class="form-control"
                              type="file"
                              id="example-file-input"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </BaseBlock>
                </tab-content>
                <tab-content title="Alamat Kantor">
                  <BaseBlock title="Pendidikan Terakhir">
                    <form @submit.prevent>
                      <div class="row push">
                        <div class="col-lg-8 col-xl-5">
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Nama Kantor</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label
                              class="form-label"
                              for="example-textarea-input"
                              >Alamat Kantor Lengkap</label
                            >
                            <textarea
                              class="form-control"
                              id="example-textarea-input"
                              name="example-textarea-input"
                              rows="4"
                              placeholder="Ketikkan alamat lengkap"
                            ></textarea>
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-select"
                              >Kota</label
                            >
                            <select
                              class="form-select"
                              id="example-select"
                              name="example-select"
                            >
                              <option selected>Pilih Kota</option>
                              <option value="1">Islam</option>
                              <option value="2">Kristen</option>
                              <option value="1">Katolik</option>
                              <option value="2">Hindu</option>
                              <option value="1">Buddha</option>
                              <option value="2">Konghucu</option>
                            </select>
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Status Kepegawaian</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Jabatan</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>
                          <div class="mb-4">
                            <label class="form-label" for="example-text-input"
                              >Telepon Kantor</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="example-text-input"
                              name="example-text-input"
                              placeholder=""
                            />
                          </div>

                          <div class="mb-4">
                            <label class="form-label" for="example-file-input"
                              >Upload SIP / Surat Keterangan Bekerja</label
                            >
                            <input
                              class="form-control"
                              type="file"
                              id="example-file-input"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </BaseBlock>
                </tab-content>
              </form-wizard>
            </div>
          </div>
          <!-- END FORM -->
        </div>
      </div>
      <div
        class="px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start"
      ></div>
    </div>
    <div
      class="modal fade"
      id="one-signup-terms"
      tabindex="-1"
      role="dialog"
      aria-labelledby="one-signup-terms"
      aria-hidden="true"
    ></div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import useVuelidate from "@vuelidate/core";
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import {
  required,
  minLength,
  between,
  email,
  decimal,
  integer,
  url,
  sameAs,
} from "@vuelidate/validators";

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

// Input state variables
const state = reactive({
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
  suggestions: null,
  skill: null,
  currency: null,
  website: null,
  digits: null,
  number: null,
  range: null,
  terms: null,
});

const rules = computed(() => {
  return {
    username: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(5),
    },
    confirmPassword: {
      required,
      sameAs: sameAs(state.password),
    },
    suggestions: {
      required,
      minLength: minLength(3),
    },
    skill: {
      required,
    },
    currency: {
      required,
      decimal,
    },
    website: {
      required,
      url,
    },
    digits: {
      required,
      integer,
    },
    number: {
      required,
      decimal,
    },
    range: {
      required,
      between: between(1, 5),
    },
    terms: {
      sameAs: sameAs(true),
    },
  };
});

const store = useTemplateStore();
const router = useRouter();

const v$ = useVuelidate(rules, state);

async function onSubmit() {
  const result = await v$.value.$validate();

  if (!result) {
    // notify user form is invalid
    return;
  }

  // perform async actions
}

export default {
  components: {
    FormWizard,
    TabContent,
  },
  methods: {
    onComplete() {
      alert("Pendaftaran berhasil, silahkankan tunggu verifikasi.");
    },
  },
};
</script>
