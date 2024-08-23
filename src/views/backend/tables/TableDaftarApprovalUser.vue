<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import AuthService from "../../../services/AuthService";
import { useRouter } from "vue-router";
import PermohonanService from "../../../services/PermohonanService";

import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";

const permohonanService = new PermohonanService();
const router = useRouter();
// const authService = new AuthService();
const licence_data = ref([]);
const licences = ref([]);
var licence_id = ref(null);
const selectedFile = ref("");

const file_path = ref("");

const tables = [
  {
    name: "Jenis Pengajuan",
    field: "licence_type",
    sort: "",
  },

  {
    name: "Aksi",
    field: "aksi",
    sort: "",
  },
];

// Sort by functionality
const sortBy = computed(() => {
  return tables.reduce((acc, o) => {
    if (o.sort) {
      o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
    }
    return acc;
  }, []);
});

// On sort th click
function onSort(event, i) {
  let toset;
  const sortEl = tables[i];

  if (!event.shiftKey) {
    tables.forEach((o) => {
      if (o.field !== sortEl.field) {
        o.sort = "";
      }
    });
  }

  if (!sortEl.sort) {
    toset = "asc";
  }

  if (sortEl.sort === "desc") {
    toset = event.shiftKey ? "" : "asc";
  }

  if (sortEl.sort === "asc") {
    toset = "desc";
  }

  sortEl.sort = toset;
}

onMounted(async () => {
  try {
    const response = await permohonanService.licenceApproved();
    console.log("Response from server:", response);
    console.log(response);

    licences.value = response;
    console.log(licences);
  } catch (error) {
    console.log("Gagal mengambil data:", error);
  }
});

async function getFileAndOpen(licence_id) {
  console.log("goToDetail called with user_id:", licence_id);
  try {
    const response = await permohonanService.showApproved(licence_id);
    selectedFile.value = response.file_path;
    console.log(response.file_path);
  } catch (error) {
    console.error("Gagal mendapatkan file:", error);
    // Anda mungkin ingin menampilkan pesan kesalahan kepada pengguna
  }
}

function openFileInNewTab() {
  if (selectedFile.value) {
    window.open(selectedFile.value, "_blank");
  } else {
    console.error("Path file kosong atau tidak terdefinisi.");
  }
}

async function downloadDoc(licence_id) {
  if (licence_id !== undefined) {
    console.log("Show Detail method called with user_id:", licence_id);
    // Panggil metode untuk mengambil path file
    await getFileAndOpen(licence_id);

    // Buka file di tab baru
    openFileInNewTab();

    console.log("Metode Tampilkan Detail dipanggil dengan id:", licence_id);
  } else {
    console.error("Data lisensi tidak ditemukan!");
  }
}

const row = ref(null);
const rowIndex = ref(null);
</script>

<style lang="scss" scoped>
.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}
.gg-select::after,
.gg-select::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}
.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}
.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}
th.sort {
  cursor: pointer;
  user-select: none;
  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }
  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}
</style>

<template>
  <BasePageHeading title="Unduh Hasil Approval"> </BasePageHeading>
  <div class="content">
    <BaseBlock title="" content-full>
      <Dataset
        v-slot="{ licences }"
        :ds-data="licences"
        :ds-sortby="sortBy"
        :ds-search-in="['id', 'licence_type', 'aksi']"
      >
        <!-- <div class="row" :data-page-count="ds.dsPagecount">
          <div id="datasetLength" class="col-md-8 py-2">
            <DatasetShow />
          </div>

          <div
            class="col-sm-6 col-xl-4 d-flex justify-content-center align-items-center"
          ></div>
          <div
            class="col-sm-6 col-xl-4 d-flex justify-content-center align-items-center"
          ></div>
        </div> -->

        <hr />
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="table">No</th>
                    <th
                      v-for="(th, index) in tables"
                      :key="th.field"
                      :class="['sort', th.sort]"
                      @click="onSort($event, index)"
                    >
                      {{ th.name }} <i class="gg-select float-end"></i>
                    </th>
                  </tr>
                </thead>
                <DatasetItem tag="tbody" class="fs-sm">
                  <template #default="{ row, rowIndex }">
                    <tr>
                      <th scope="row">{{ rowIndex + 1 }}</th>
                      <td>{{ row.licence_type }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-alt-secondary"
                          @click="downloadDoc(row.licence_id)"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  </template>
                </DatasetItem>
              </table>
            </div>
          </div>
        </div>
        <div
          class="d-flex flex-md-row flex-column justify-content-between align-items-center"
        >
          <DatasetInfo class="py-3 fs-sm" />
          <DatasetPager class="flex-wrap py-3 fs-sm" />
        </div>
      </Dataset>
    </BaseBlock>
  </div>
  <!-- END Page Content -->
</template>
