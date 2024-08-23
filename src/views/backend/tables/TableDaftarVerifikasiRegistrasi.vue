<template>
  <div class="content">
    <BaseBlock content-full>
      <div class="col-md-4">
        <button @click="logout" class="btn btn-danger">Logout</button>
      </div>

      <Dataset
        v-slot="{ ds }"
        :ds-data="tabledata"
        :ds-sortby="sortBy"
        :ds-search-in="['name', 'date', 'entry_time', 'exit_time', 'status']"
      >
        <div class="row">
          <h1>Riwayat Kehadiran</h1>
        </div>
        <div class="text-end">
          <button @click="exportToExcel" class="btn btn-success">
            Export To Excel
          </button>
        </div>
        <div class="row" :data-page-count="ds.dsPagecount">
          <!-- <div class="col-md-3 py-2">
            
            <select v-model="selectedFilter" class="form-select">
              <option value="">Pilih Nama</option>
              <option value="Peter">Talitha Padmarini Shafira</option>
              <option value="David">Agustinus Bayu</option>
              <option value="Nolan">Vanessa Sisilia</option>
            </select>
          </div> -->
          <div id="datasetLength" class="col-md-8 py-2">
            <DatasetShow />
          </div>
          <div class="col-md-4 py-2">
            <DatasetSearch ds-search-placeholder="Search..." />
          </div>
          <div class="row">
            <div class="col-md-3 py-2">
              <select v-model="nameFilter" class="form-select">
                <option value="">Select Name</option>
                <option value="Talitha Padmarini Shafira">Talitha</option>
                <option value="Vanessa Sisilia">Vanessa</option>
                <option value="Bayu">Bayu</option>

                <option value="Novita Herawati">Novita</option>
                <option value="Jihad Azizan">Jihad</option>
                <option value="Dea Cindy Brilianty">Dea</option>
              </select>
            </div>
            <div class="col-md-3 py-2">
              <select v-model="statusFilter" class="form-select">
                <option value="">Select Status</option>
                <option value="Tepat Waktu">Tepat Waktu</option>
                <option value="Terlambat">Terlambat</option>
              </select>
            </div>
            <div class="col-md-3 py-2">
              <select v-model="monthFilter" class="form-select">
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>

                <option value="December">December</option>
              </select>
            </div>
            <div class="col-3 py-2">
              <button @click="applyFilter" class="btn btn-primary w-100">
                Apply Filter
              </button>
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
                    <th scope="col">No</th>
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
                      <td>{{ row.name }}</td>
                      <td>{{ row.date }}</td>
                      <td>{{ row.entry_time }}</td>
                      <td>{{ row.exit_time }}</td>
                      <td>{{ row.status }}</td>
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

<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";
import users from "@/data/usersDataset.json";
import AuthService from "../../../services/AuthService";
import AdminService from "../../../services/AdminServices";
import { useRouter } from "vue-router";
import ExcelJS from "exceljs";
const router = useRouter();

const authService = new AuthService();
const adminService = new AdminService();
const data = ref([]);
const tabledata = ref([]);

function logout() {
  authService.logout().then(() => {
    router.push({ name: "auth-login" });
    console.log("Logout successful");
  });
}

const tables = ref([
  {
    name: "Nama",
    field: "name",
    sort: "",
  },
  {
    name: "Tanggal",
    field: "date",
    sort: "",
  },
  {
    name: "Jam Masuk",
    field: "entry_time",
    sort: "",
  },
  {
    name: "Jam Keluar",
    field: "exit_time",
    sort: "",
  },
  {
    name: "Status",
    field: "status",
    sort: "",
  },
]);

const nameFilter = ref("");
const statusFilter = ref("");
const monthFilter = ref("");

const applyFilter = () => {
  tabledata.value = data.value.filter(
    (user) =>
      (nameFilter.value === "" || user.name === nameFilter.value) &&
      (statusFilter.value === "" || user.status === statusFilter.value) &&
      (monthFilter.value === "" ||
        isMatchingMonth(user.date, monthFilter.value))
  );
  console.log(tabledata.value);
};

const isMatchingMonth = (dateString, selectedMonth) => {
  if (selectedMonth === "") return true; // No filter selected, return true

  const selectedMonthNumber =
    new Date(Date.parse(selectedMonth + " 1, 2000")).getMonth() + 1;

  // Parse the date string and compare month and year
  const date = new Date(dateString);
  return date.getMonth() + 1 === selectedMonthNumber;
};

const selectedFilter = ref("");

const sortBy = computed(() => {
  return tables.value.reduce((acc, o) => {
    if (o.sort) {
      o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
    }
    return acc;
  }, []);
});

const onSort = (event, i) => {
  let toset;
  const sortEl = tables.value[i];

  if (!event.shiftKey) {
    tables.value.forEach((o) => {
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
};

const filteredUsers = computed(() => {
  if (!selectedFilter.value) {
    return data.value;
  }

  const filterValue = selectedFilter.value.toLowerCase();
  const filteredData = data.value.filter((user) =>
    user.name.toLowerCase().includes(filterValue)
  );
  return filteredData;
});

onMounted(async () => {
  document.querySelectorAll("#datasetLength label").forEach((el) => {
    el.remove();
  });

  let selectLength = document.querySelector("#datasetLength select");
  selectLength.classList = "";
  selectLength.classList.add("form-select");
  selectLength.style.width = "80px";

  try {
    const responseData = await adminService.dashboard();
    console.log(responseData);
    data.value = responseData;
    tabledata.value = responseData;
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
});

const exportToExcel = () => {
  // Buat workbook baru
  const workbook = new ExcelJS.Workbook();

  // Tambahkan worksheet
  const worksheet = workbook.addWorksheet("Data");

  // Definisikan header kolom
  const columns = ["Name", "Date", "Entry Time", "Exit Time", "Status"];
  worksheet.addRow(columns);

  // Isi data dari tabel ke worksheet
  tabledata.value.forEach((row) => {
    const rowData = [
      row.name,
      row.date,
      row.entry_time,
      row.exit_time,
      row.status,
    ];
    worksheet.addRow(rowData);
  });

  // Simpan workbook sebagai file Excel
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.xlsx");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
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

h1 {
  font-family: "Poppins", sans-serif;
  font-size: 26px;
  font-weight: 600;
  color: #c9002b;
  margin-top: 2%;
}

.table th,
.table td {
  font-family: "Poppins", sans-serif;
}
</style>
