<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import PermohonanService from "../../services/PermohonanService";
import { Modal } from "bootstrap";
const approvals = ref([]);
const permohonanService = new PermohonanService();
const approval_data = ref({});
const file_path = ref("");
let modalElement = ref(null);
let modal = null;
var licence = ref([]);

const selectedFilePath = ref("");

onMounted(async () => {
  try {
    const response = await permohonanService.approvalList();
    approvals.value = response.approval_data;
    modal = new Modal(modalElement.value);
    console.log(response);
    console.log(response.approval_data);
  } catch (error) {
    console.log("gagal ambil data", error);
  }
});

async function getFileAndOpen(licence_id) {
  try {
    const response = await permohonanService.showApproval(licence_id);
    selectedFilePath.value = response.file_path;
    console.log(file_path);
  } catch (error) {
    console.error("Gagal mendapatkan path file:", error);
    // Anda mungkin ingin menampilkan pesan kesalahan kepada pengguna
  }
}

function openFileInNewTab() {
  if (selectedFilePath.value) {
    window.open(selectedFilePath.value, "_blank");
  } else {
    console.error("Path file kosong atau tidak terdefinisi.");
  }
}

async function uploadDoc(licence_id) {
  if (licence_id !== undefined) {
    approval_data.value = approvals.value.find(
      (approval_data) => approval_data.approvals.licence_id === licence_id
    );

    console.log("approval ", approval_data.value);
    console.log("Show Detail method called with id:", licence_id);
    modal.show();
  } else {
    console.error("ID is undefined!");
  }
}

async function downloadDoc(licence_id) {
  if (licence_id !== undefined) {
    approval_data.value = approvals.value.find(
      (approval_data) => approval_data.approvals.licence_id === licence_id
    );

    // Panggil metode untuk mengambil path file
    await getFileAndOpen(licence_id);

    // Buka file di tab baru
    openFileInNewTab();

    console.log("Metode Tampilkan Detail dipanggil dengan id:", licence_id);
  } else {
    console.error("ID tidak terdefinisi!");
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
    licence.value = e.target.files[0];
    console.log("Files value:", licence.value);
  }
};

const handleSubmit = async (licence_id) => {
  if (!licence.value) {
    console.error("Harap isi semua field yang diperlukan!");
    return;
  }
  let formData = new FormData();
  formData.append("licence", licence.value);

  console.log(formData);

  permohonanService
    .sendApproval(licence_id, formData)
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
  <div class="content">
    <BaseBlock title="" style="background-color: #edfcf0">
      <div class="row items-push">
        <div class="row">
          <div class="col-md-12">
            <h3 style="color: #006d32">LIST APPROVAL</h3>
            <div class="row">
              <div
                class="col-lg-4"
                v-for="approval_data in approvals"
                :key="approval_data.approvals.licence_id"
              >
                <div class="row">
                  <BaseBlock tag="a" link-pop class="overflow-hidden">
                    <template #content>
                      <div
                        style="
                          background-color: #006d32;
                          height: 150px;
                          position: relative;
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          text-align: center;
                        "
                      >
                        <!-- <h4 class="fw-bold"></h4> -->
                        <h4
                          class="fw-bold"
                          style="color: white; font-weight: bold; margin: 0"
                        >
                          {{ approval_data.approvals.name }}
                        </h4>
                        <hr
                          style="
                            border: 2px solid white;
                            width: 90%;
                            margin: 5px auto;
                          "
                        />
                        <p style="color: white; margin: 0">
                          {{ approval_data.approvals.membership_number }}
                        </p>
                        <h6
                          style="
                            color: #edfcf0;
                            font-weight: bold;
                            margin: 0;
                            margin-bottom: 10px;
                          "
                        >
                          {{ approval_data.approvals.licence_type }}
                        </h6>
                        <div
                          class="col-md-12 text-center"
                          style="margin-bottom: 2px"
                        >
                          <button
                            type="button"
                            class="btn btn-alt-info me-1 mb-3"
                            style="margin-bottom: 2px"
                            @click="
                              downloadDoc(approval_data.approvals.licence_id)
                            "
                          >
                            <i class="fa fa-fw fa-download me-1"></i> Download
                          </button>
                          <button
                            type="button"
                            class="btn btn-alt-primary me-1 mb-3"
                            @click="
                              uploadDoc(approval_data.approvals.licence_id)
                            "
                          >
                            <i class="fa fa-fw fa-upload me-1"></i> Upload
                          </button>
                        </div>
                      </div>
                    </template>
                  </BaseBlock>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="modal-upload-licence"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modal-upload-licence"
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
                    @submit.prevent="
                      handleSubmit(approval_data.approvals.licence_id)
                    "
                    enctype="multipart/form-data"
                  >
                    <div class="block-content fs-sm">
                      <div class="col-md-12">
                        <h3 style="color: #006d32">
                          {{ approval_data?.approvals?.name ?? "Nama Pemohon" }}
                        </h3>

                        <div class="mb-4">
                          <label class="form-label" for="licence">
                            Upload surat yang sudah di tanda tangan persetuan
                          </label>
                          <input
                            class="form-control"
                            type="file"
                            id="licence"
                            @change="handleFileChange($event, 'licence')"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="block-content block-content-full text-end bg-body"
                    >
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
    </BaseBlock>

    <!-- END Paragraphs in Grid -->
  </div>
  <!-- END Page Content -->
</template>
