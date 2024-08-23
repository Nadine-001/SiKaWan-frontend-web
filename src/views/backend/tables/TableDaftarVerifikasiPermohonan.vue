<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import PermohonanService from "../../../services/PermohonanService";
import { useRouter } from "vue-router";
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";
const router = useRouter();
const permohonanService = new PermohonanService();
const licences = ref([]);
const tables = [
  {
    name: "Tanggal",
    field: "created_at",
    sort: "",
  },
  {
    name: "Nama",
    field: "name",
    sort: "",
  },
  {
    name: "Jenis Pengajuan",
    field: "licence_type",
    sort: "",
  },
  {
    name: "Aksi",
    field: "action",
    sort: "",
  },
  {
    name: "Status Registrasi",
    field: "status",
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
    const response = await permohonanService.licenceList();
    console.log(response);
    console.log(response.licence_data);
    licences.value = response.licence_data;
    console.log(licences);
  } catch (error) {
    console.log("Gagal mengambil data:", error);
  }
});

const getStatusLabelText = (status) => {
  switch (status) {
    case 1:
      return "Diverifikasi";
    case 2:
      return "Ditolak";

    default:
      return "Need to be Checked";
  }
};

const row = ref(null);
const rowIndex = ref(null);
const selectedcreated_at = ref(null);
const selectedStatus = ref(null);

function selectCreated_at(created_at) {
  selectedcreated_at.value = created_at;
}

function selectStatus(status) {
  selectedStatus.value = status;
}
const filteredLicences = computed(() => {
  if (!selectedcreated_at.value && !selectedStatus.value) {
    return licences.value;
  }

  let filteredData = licences.value;

  if (selectedcreated_at.value) {
    filteredData = filteredData.filter(
      (user) => user.created_at === selectedcreated_at.value
    );
  }

  if (selectedStatus.value) {
    filteredData = filteredData.filter(
      (user) => user.status === selectedStatus.value
    );
  }

  return filteredData;
});

const goToDetail = (licence_id) => {
  console.log("goToDetail called with licence_id:", licence_id);
  router.push({
    name: "backend-detail-verifikasipermohonan",
    params: { licence_id },
  });
};

function showDetail(licence_id) {
  if (licence_id !== undefined) {
    console.log("Show Detail method called with licence_id:", licence_id);
    goToDetail(licence_id);
  } else {
    console.error("licence ID is undefined!");
  }
}
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
  <!-- Hero -->
  <BasePageHeading title="Surat Permohonan"> </BasePageHeading>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <BaseBlock title="" content-full>
      <Dataset
        v-slot="{ ds }"
        :ds-data="filteredLicences"
        :ds-sortby="sortBy"
        :ds-search-in="[
          'id',
          'created_at',
          'name',
          'licence_type',
          'action',
          'status',
        ]"
      >
        <div class="row" :data-page-count="ds.dsPagecount">
          <div id="datasetLength" class="col-md-8 py-2">
            <DatasetShow />
          </div>
          <div class="col-md-4 py-2">
            <DatasetSearch ds-search-placeholder="Search..." />
          </div>
          <div
            class="col-sm-6 col-xl-4 d-flex justify-content-center align-items-center"
          >
            <div class="dropdown">
              <button
                type="button"
                class="btn btn-alt-secondary dropdown-toggle"
                id="dropdown-default-alt-secondary"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Tanggal
              </button>
              <div
                class="dropdown-menu fs-sm"
                aria-labelledby="dropdown-default-alt-secondary"
              >
                <a class="dropdown-item" @click="selectStatus(null)">Semua</a>
                <a
                  class="dropdown-item"
                  @click="selectedcreated_at('Kota Semarang')"
                  >Kota Semarang</a
                >
                <a
                  class="dropdown-item"
                  @click="selectedcreated_at('Kabupaten Semarang')"
                  >Kabupaten Semarang</a
                >
              </div>
            </div>
          </div>
          <div
            class="col-sm-6 col-xl-4 d-flex justify-content-center align-items-center"
          >
            <div class="dropdown">
              <button
                type="button"
                class="btn btn-alt-secondary dropdown-toggle"
                id="dropdown-default-alt-secondary"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Status Registrasi
              </button>
              <div
                class="dropdown-menu fs-sm"
                aria-labelledby="dropdown-default-alt-secondary"
              >
                <a class="dropdown-item" @click="selectStatus(null)">Semua</a>
                <a class="dropdown-item" @click="selectStatus('Diverifikasi')"
                  >Diverifikasi</a
                >
                <a class="dropdown-item" @click="selectStatus('Ditolak')"
                  >Ditolak</a
                >
              </div>
            </div>
          </div>
        </div>

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
                      <td>{{ row.licence.created_at }}</td>
                      <td>{{ row.licence.name }}</td>
                      <td>{{ row.licence.licence_type }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-alt-secondary"
                          @click="showDetail(row.licence.licence_id)"
                        >
                          Lihat Detail
                        </button>
                      </td>
                      <td>
                        <span
                          :class="[
                            'fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill',
                            {
                              'bg-success-light text-success':
                                row.status === 'Diverifikasi',
                              'bg-danger-light text-danger':
                                row.status === 'Ditolak',
                              // Add more conditons for other status values
                            },
                          ]"
                        >
                          {{ getStatusLabelText(row.licence.status) }}
                        </span>
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
