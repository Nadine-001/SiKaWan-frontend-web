<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import PermohonanService from "../../services/PermohonanService";
import { useRouter, useRoute } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
const router = useRouter();
const route = useRoute();
const permohonanService = new PermohonanService();
var licence_id = ref(null);
const membership_number = ref("");
const name = ref("");
const email = ref("");
const note = ref("");
const licence_type = ref("");
var files = reactive([]);
const licence = ref({});
const licences = ref([]);

// onMounted(async () => {
//   licence_id = route.params.licence_id;

//   console.log(licence_id);
//   try {
//     const response = await permohonanService.licenceListDetail(licence_id);
//     console.log(response);

//     // licences.value = response.licence;
//     name.value = response.name;
//     membership_number.value = response.membership_number;
//     email.value = response.email;

//     licence_type.value = response.licence_type;
//     files = response.file_data;
//     console.log(response.file_data);
//   } catch (error) {
//     console.log("Gagal mengambil data:", error);
//   }
// });

// async function sendValidate(licence_id) {
//   if (licence_id !== undefined) {
//     licence.value = licences.value.find((licence) => licence.licence_id === licence_id);
//     console.log("licence", licence.value);
//     console.log("show detail method called with id:", licence_id);
//   } else {
//     console.error("id tidak ditemuka");
//   }
// }

// const handleSubmit = asyns(licenceId) => {
//   if (!files.value) {
//     console.error("files tidak ada");
//     return;
//   }
//   let formData = new FormData();
//   formData.append("files")
// }

function translateFileName(file_name) {
  let names = {
    //sip
    "doc_Pengajuan SIP-RO_0": "Kuitansi Pembayaran",
    "doc_Pengajuan SIP-RO_1": "Surat Permohonan",
    "doc_Pengajuan SIP-RO_2": "Surat Keterangan Bekerja",
    "doc_Pengajuan SIP-RO_3": "Surat Pindah (opsional)",
    "doc_Pengajuan SIP-RO_4": "Surat Domisili (opsional)",

    //sipo
    "doc_Pengajuan SIPO_0": "Kuitansi Pembayaran",
    "doc_Pengajuan SIPO_1": "Surat Permohonan",
    "doc_Pengajuan SIPO_2": "Surat Pernyataan",
    "doc_Pengajuan SIPO_3": "Surat Pindah (opsional)",
    "doc_Pengajuan SIPO_4": "Surat Domisili (opsional)",

    //bpjs
    "doc_Rekomendasi BPJS_0": "Kuitansi Pembayaran",
    "doc_Rekomendasi BPJS_1": "Surat Permohonan",

    //cabut sip
    "doc_Pencabutan SIP-RO_0": "Surat Permohonan",
    "doc_Pencabutan SIP-RO_1": "Surat Pernyataan",

    //pindah cabang
    "doc_Permohonan Pindah Cabang_0": "Kuitansi Pembayaran Administrasi",
    "doc_Permohonan Pindah Cabang_1": "Kuitansi Iuran Anggota",
    "doc_Permohonan Pindah Cabang_2": "Surat Keterangan Bekerja",
    "doc_Permohonan Pindah Cabang_3": "Surat Permohonan",
    "doc_Permohonan Pindah Cabang_4": "Surat Domisili",

    //perpanjangan str
    "doc_Perpanjangan STR_0": "Kuitansi Pembayaran",
    "doc_Perpanjangan STR_1": "Pengantar Pengcab",
    "doc_Perpanjangan STR_2": "Surat Pernyataan",
    "doc_Perpanjangan STR_3": "Kuitansi Lunas Iuran",
  };

  return names[file_name];
}

const handleDeny = async (licenceid) => {
  let formData = new FormData();

  formData.append("note", note.value);

  console.log(note.value);

  permohonanService
    .declineLicence(licenceid, formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
};

const handleProses = async () => {
  try {
    var key = ref(null);

    if (licence_type.value === "Perpanjangan STR") {
      key.value = "doc_Perpanjangan STR_2";
    } else if (licence_type.value === "Pengajuan SIP-RO") {
      key.value = "doc_Pengajuan SIP-RO_1";
      console.log(licence_type.value);
    } else if (licence_type.value === "Pengajuan SIPO") {
      key.value = "doc_Pengajuan SIPO_1";
      console.log(licence_type.value);
    } else if (licence_type.value === "Rekomendasi BPJS") {
      key.value = "doc_Rekomendasi BPJS_1";
      console.log(licence_type.value);
    } else if (licence_type.value === "Pencabutan SIP-RO") {
      key.value = "doc_Pencabutan SIP-RO_1";
      console.log(licence_type.value);
    } else if (licence_type.value === "Permohonan Pindah Cabang") {
      key.value = "doc_Permohonan Pindah Cabang_3";
      console.log(licence_type.value);
    } else {
      console.log("tipe permohonan surat tidak ditemukan.");
    }
    let formData = new FormData();
    formData.append("key", key.value);

    console.log(key.value);

    await permohonanService.validateLicence(licence_id, formData);
    console.log("pengajuan diproses");
  } catch (error) {
    console.error("gagal memproses", error);
  }
};
</script>

<template>
  <div class="content">
    <BaseBlock title="">
      <div class="row items-push">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <h1 style="color: #006d32">
                Verifikasi Pengajuan Surat Permohonan
              </h1>
              <hr style="border: 2px solid #006d32" />
            </div>

            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12 space-y-5">
                  <!-- Form Horizontal - Default Style -->
                  <form class="space-y-4" @sumbit.prevent>
                    <div class="row">
                      <label
                        class="col-sm-4 col-form-label"
                        for="membership_number"
                        >Nomor Anggota</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="membership_number"
                          :value="membership_number"
                          placeholder=""
                          readonly
                          style="
                            background-color: #cdced0;
                            border: 2px solid #9197b3;
                          "
                        />
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="name"
                        >Nama Lengkap</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          :value="name"
                          placeholder=""
                          readonly
                          style="
                            background-color: #cdced0;
                            border: 2px solid #9197b3;
                          "
                        />
                      </div>
                    </div>

                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="email"
                        >Email</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="integer"
                          class="form-control"
                          id="email"
                          :value="email"
                          placeholder=""
                          readonly
                          style="
                            background-color: #cdced0;
                            border: 2px solid #9197b3;
                          "
                        />
                      </div>
                    </div>

                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="licence_type"
                        >Jenis Pengajuan</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="licence_type"
                          :value="licence_type"
                          placeholder=""
                          readonly
                          style="
                            background-color: #cdced0;
                            border: 2px solid #9197b3;
                          "
                        />
                      </div>
                    </div>

                    <div class="row">
                      <label
                        class="col-sm-4 col-form-label"
                        for="example-hf-password"
                        >Files User</label
                      >
                      <div class="col-sm-8">
                        <div class="form-group">
                          <a
                            v-for="file in files"
                            :href="file.file_path"
                            target="_blank"
                            class="d-block mb-2"
                            >{{ translateFileName(file.key) }}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="note"
                        >Pesan apabila tidak disetujui</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="note"
                          placeholder=""
                          v-model="note"
                          style="border: 2px solid #9197b3"
                        />
                      </div>
                    </div>
                    <!-- <div class="mb-4"> -->

                    <div class="row">
                      <!-- <div class="col-md-4"> -->
                      <button
                        type="button"
                        class="col-md-2 btn btn-success"
                        @click="handleProses"
                      >
                        Proses
                      </button>
                      <div class="col-sm-8">
                        <button
                          type="button"
                          class="col-md-2 btn btn-warning"
                          @click="handleDeny(licence_id)"
                        >
                          Tolak
                        </button>
                      </div>
                      <!-- </div> -->
                    </div>

                    <!-- <div class="row">
                      <div class="col md-8">
                        <button type="button" class="btn btn-success">
                          Proses
                        </button>
                        <div class="col sm-4">
                          <button type="button" class="btn btn-warning">
                            Tolak
                          </button>
                        </div>
                      </div>
                    </div> -->

                    <div class="mt-2"></div>
                    <!-- </div> -->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>
