<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import WebinarService from "@/services/WebinarService";
import { useRouter, useRoute } from "vue-router";
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";
const router = useRouter();
const route = useRoute();
const webinarService = new WebinarService();
const created_at = ref("");
const name = ref("");
const date = ref("");
const note = ref("");
const title = ref("");
var participant_id = ref(null);
var files = [];
var invoice_data = [];

onMounted(async () => {
  participant_id = route.params.participant_id;
  console.log(participant_id);
  try {
    const response = await webinarService.participantListDetail(participant_id);
    console.log(response);
    created_at.value = response.created_at;
    name.value = response.name;
    date.value = response.date;
    title.value = response.title;
    files = response.invoice_data;
    invoice_data = Object.values(files);
    console.log(invoice_data[1]);
  } catch (error) {
    console.log("Gagal mengambil data:", error);
  }
});

const handleDeny = async (participantid) => {
  let formData = new FormData();

  formData.append("note", note.value);

  console.log(note.value);

  webinarService
    .declineParticipant(participantid, formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
};

const handleProses = async () => {
  webinarService
    .validateParticipant(participant_id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

function translateFileName(file_name) {
  let names = {
    invoice: "Bukti Pembayaran",
  };

  return names[file_name];
}
</script>

<template>
  <div class="content">
    <BaseBlock title="">
      <div class="row items-push">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <h1 style="color: #006d32">Verifikasi Pendaftaran Webinar</h1>
              <hr style="border: 2px solid #006d32" />
            </div>

            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12 space-y-5">
                  <!-- Form Horizontal - Default Style -->
                  <form class="space-y-4" @sumbit.prevent>
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="created_at"
                        >Tanggal Pendaftaran</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="created_at"
                          placeholder=""
                          :value="created_at"
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
                          placeholder=""
                          :value="name"
                          style="
                            background-color: #cdced0;
                            border: 2px solid #9197b3;
                          "
                        />
                      </div>
                    </div>

                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="title"
                        >Judul Webinar</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder=""
                          :value="title"
                          style="
                            background-color: #cdced0;
                            border: 2px solid #9197b3;
                          "
                        />
                      </div>
                    </div>

                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="date"
                        >Tanggal Webinar</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="date"
                          placeholder=""
                          :value="date"
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
                            :href="invoice_data[1]"
                            target="_blank"
                            class="d-block mb-2"
                            >{{ translateFileName(invoice_data[2]) }}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <label
                        class="col-sm-4 col-form-label"
                        for="example-hf-password"
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
                        @click="handleProses(participant_id)"
                      >
                        Proses
                      </button>
                      <div class="col-sm-8">
                        <button
                          type="button"
                          class="col-md-2 btn btn-warning"
                          @click="handleDeny(participant_id)"
                        >
                          Tolak
                        </button>
                      </div>
                    </div>

                    <div class="mt-2"></div>
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
