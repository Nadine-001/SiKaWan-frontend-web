<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import UsersService from "../../../services/UsersServices";
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
const usersService = new UsersService();
const users = ref([]);

const tables = [
  {
    name: "Nomor Anggota",
    field: "membership_number",
    sort: "",
  },
  {
    name: "Nama",
    field: "name",
    sort: "",
  },
  {
    name: "Anggota Cabang",
    field: "office_regency_city",
    sort: "",
  },
  {
    name: "Nama Mitra/Optik",
    field: "office_name",
    sort: "",
  },
  {
    name: "Status Keanggotaan",
    field: "status",
    sort: "",
  },
];

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
    const response = await usersService.getUsers();
    console.log(response); // Cetak seluruh respons
    console.log(response.user_data); // Cetak user_data
    users.value = response.user_data;
    console.log(users.value); // Cetak data untuk memastikan bahwa data telah diatur dengan benar
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
});

const getStatusLabelText = (status) => {
  switch (status) {
    case 1:
      return "Active";
    case 2:
      return "Declined";
    case 3:
      return "Expired";
    // Add more cases for other status values
    default:
      return "Need to be Checked";
  }
};

const row = ref(null);
const rowIndex = ref(null);
const selectedoffice_regency_city = ref(null);
const selectedStatus = ref(null);
function selectoffice_regency_city(office_regency_city) {
  selectedoffice_regency_city.value = office_regency_city;
}
function selectStatus(status) {
  selectedStatus.value = status;
}
const filteredUsers = computed(() => {
  if (!selectedoffice_regency_city.value && !selectedStatus.value) {
    return users.value;
  }

  let filteredData = users.value;

  if (selectedoffice_regency_city.value) {
    filteredData = filteredData.filter(
      (user) => user.office_regency_city === selectedoffice_regency_city.value
    );
  }

  if (selectedStatus.value) {
    filteredData = filteredData.filter(
      (user) => user.status === selectedStatus.value
    );
  }

  return filteredData;
});
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
  <BasePageHeading
    title="Daftar Anggota"
    subtitle="Daftar Anggota Ikatan Profesi Optometris Indonesia Wilayah Jawa Tengah"
  >
  </BasePageHeading>

  <div class="content">
    <BaseBlock title="" content-full>
      <Dataset
        v-slot="{ ds }"
        :ds-data="filteredUsers"
        :ds-sortby="sortBy"
        :ds-search-in="[
          'id',
          'membership_number',
          'name',
          'office_regency_city',
          'office_name',
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
                Anggota Cabang
              </button>
              <div
                class="dropdown-menu fs-sm"
                aria-labelledby="dropdown-default-alt-secondary"
              >
                <a class="dropdown-item" @click="selectStatus(null)">Semua</a>
                <a
                  class="dropdown-item"
                  @click="selectoffice_regency_city('Kota Semarang')"
                  >Kota Semarang</a
                >
                <a
                  class="dropdown-item"
                  @click="selectoffice_regency_city('Kabupaten Semarang')"
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
                Status Anggota
              </button>
              <div
                class="dropdown-menu fs-sm"
                aria-labelledby="dropdown-default-alt-secondary"
              >
                <a class="dropdown-item" @click="selectStatus(null)">Semua</a>
                <a class="dropdown-item" @click="selectStatus('aktif')"
                  >Aktif</a
                >
                <a class="dropdown-item" @click="selectStatus('nonaktif')"
                  >Kadaluwarsa</a
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
                      <td>{{ row.user.membership_number }}</td>
                      <td>{{ row.name }}</td>
                      <td>{{ row.office_regency_city }}</td>
                      <td>{{ row.office_name }}</td>
                      <td>
                        <span
                          :class="[
                            'fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill',
                            {
                              'bg-success-light text-success':
                                row.status === 'Active',
                              'bg-danger-light text-danger':
                                row.status === 'Expired',
                              'bg-danger-light text-secondary':
                                row.status === 'Decline',
                            },
                          ]"
                        >
                          {{ getStatusLabelText(row.status) }}
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
</template>
