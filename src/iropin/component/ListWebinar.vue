<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import WebinarService from "@/services/WebinarService";
import { useRouter, useRoute } from "vue-router";
import { Modal } from "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const webinarService = new WebinarService();
const webinars = ref([]);
const webinar = ref({});
let modalElement = ref(null);
let modal = null;

var invoice = ref([]);
const router = useRouter();
const route = useRoute();
const selectedFilePath = ref("");
const selectedZoomPath = ref("");
const link = ref("");
const materi = ref("");
var files = [];

onMounted(async () => {
  try {
    const response = await webinarService.webinarList();
    webinars.value = response.webinar;

    modal = new Modal(modalElement.value);

    console.log("response from server:", response);
    console.log(response);
    console.log(response.webinar);

    console.log(webinars);
  } catch (error) {
    console.log("Gagal mengambil data", error);
  }
});

function openFileInNewTab() {
  if (selectedFilePath.value) {
    window.open(selectedFilePath.value, "_blank");
  } else {
    console.error("Path file kosong atau tidak terdefinisi.");
  }
}

function openZoomInNewTab() {
  if (selectedZoomPath.value) {
    window.open(selectedZoomPath.value, "_blank");
  } else {
    console.error("Path file kosong atau tidak terdefinisi.");
  }
}

async function downloadDoc(webinar_id) {
  try {
    const materi = await webinarService.materiWebinar(webinar_id); // Use your service method for getting materi
    // materi.value = materi;
    console.log(materi);
    selectedFilePath.value = materi;

    // Now you can open the file or perform any other necessary actions
    // await getFileAndOpen(webinar_id);
    openFileInNewTab();
    console.log("Download Materi method called with id:", webinar_id);
  } catch (error) {
    console.error("Failed to get materi:", error);
  }
}

async function showLink(webinar_id) {
  try {
    const link = await webinarService.linkWebinar(webinar_id);

    console.log(link);

    selectedZoomPath.value = link;
    openZoomInNewTab();
    console.log("Show Link method called with id:", webinar_id);
  } catch (error) {
    console.error("Failed to get link:", error);
    // You may want to display an error message to the user
  }
}

async function showFormulir(webinar_id) {
  if (webinar_id !== undefined) {
    webinar.value = webinars.value.find(
      (webinar) => webinar.webinar.webinar_id === webinar_id
    );
    console.log("webinar ", webinar.value);
    console.log("Show Detail method called with id:", webinar_id);
    modal.show();
  } else {
    console.error("ID is undefined!");
  }
}

const handleFileChange = (e, type) => {
  console.log("masuk file change");
  console.log(e && e.target);
  console.log(e);
  console.log(e.target);
  if (e && e.target) {
    console.log("masuk file condition");
    console.log("Files file:", e.target.files[0]);
    invoice.value = e.target.files[0];
    console.log("Files value:", invoice.value);
  }
};

const handleSubmit = async (webinarid) => {
  if (!invoice.value) {
    console.error("Harap isi semua field yang diperlukan!");
    return;
  }
  let formData = new FormData();
  formData.append("invoice", invoice.value);

  console.log(formData);

  webinarService
    .webinarRegistration(webinarid, formData)
    .then((res) => {
      console.log(res);
      modal.hide();
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
};
</script>

<template>
  <div class="container" id="app">
    <div class="row">
      <div
        v-for="webinar in webinars"
        class="col-md-3 col-6 my-1"
        :key="webinar.webinar.webinar_id"
      >
        <div class="card h-100">
          <img :src="webinar.webinar.poster" class="card-img-top" alt="" />
          <div class="card-body">
            <h4 class="fw-bold">{{ webinar.webinar.title }}</h4>
            <hr style="border: 2px solid #00000" />
            <h4>
              <span
                class="badge rounded-pill bg-success"
                style="margin-right: 10px"
                >Rp.{{ webinar.webinar.price }}</span
              >
              <span class="badge rounded-pill bg-info">
                {{ webinar.webinar.date }}</span
              >
            </h4>
            <p class="text-success">{{ webinar.webinar.speaker }}</p>
            <p>{{ webinar.webinar.description }}</p>
            <address>
              <strong>{{ webinar.webinar.place }}</strong>
            </address>
            <div class="col-md-12">
              <button
                type="button"
                class="btn rounded-pill btn-success w-100 btn btn-alt-primary push"
                @click="showFormulir(webinar.webinar.webinar_id)"
                style="margin-bottom: 10px"
              >
                Daftar webinar
              </button>
            </div>
            <div class="col-md-12 text-center">
              <button
                type="button"
                class="btn rounded-pill btn-warning"
                style="margin-right: 5px"
                @click="downloadDoc(webinar.webinar.webinar_id)"
              >
                Materi
              </button>
              <button
                type="button"
                class="btn rounded-pill btn-danger"
                @click="showLink(webinar.webinar.webinar_id)"
              >
                Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="modal-daftar-webinar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-daftar-webinar"
      aria-hidden="true"
      ref="modalElement"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <BaseBlock transparent class="mb-0">
            <template #options>
              <button
                type="button"
                class="btn-block-option"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-fw fa-times"></i>
              </button>
            </template>

            <template #content>
              <form
                @submit.prevent="handleSubmit(webinar.webinar.webinar_id)"
                enctype="multipart/form-data"
              >
                <div class="block-content fs-sm">
                  <div class="col-md-12">
                    <h3 style="color: #006d32">
                      {{ webinar?.webinar?.title ?? "Judul Webinar" }}
                    </h3>

                    <div class="mb-4">
                      <label class="form-label" for="invoice">
                        Inputkan Bukti Pembayaran untuk Gabung webinars
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        id="invoice"
                        @change="handleFileChange($event, 'invoice')"
                      />
                    </div>
                  </div>
                </div>
                <div class="block-content block-content-full text-end bg-body">
                  <button
                    type="button"
                    class="btn btn-sm btn-alt-secondary me-1"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-sm btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </template>
          </BaseBlock>
        </div>
      </div>
    </div>
  </div>
</template>
