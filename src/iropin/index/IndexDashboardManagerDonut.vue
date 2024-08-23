<script setup>
import { reactive, computed, onMounted, ref } from "vue";

import { Line, Bar, Radar, PolarArea, Pie, Doughnut } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import DashboardService from "@/services/DashboardService";
import { useRouter } from "vue-router";
const router = useRouter();
const dashboardService = new DashboardService();

const employee_total = ref([]);
const employeeData = reactive({
  total: 0,
  byCity: [],
});
// const employees = ref([]);

onMounted(async () => {
  try {
    const response = await dashboardService.getEmployeeStatistic();
    console.log(response);
    employeeData.total = response.employee_total;
    employeeData.byCity = response.employees;
    console.log("Data Employee:", response);
  } catch (error) {
    console.log("Gagal mengambil data:", error);
  }
});

Chart.register(...registerables);

// Chart.defaults.color = "#818d96";
// Chart.defaults.font.weight = "600";
// Chart.defaults.scale.grid.color = "rgba(0, 0, 0, .05)";
// Chart.defaults.scale.grid.zeroLineColor = "rgba(0, 0, 0, .1)";
// Chart.defaults.scale.beginAtZero = true;
// Chart.defaults.elements.line.borderWidth = 2;
// Chart.defaults.elements.point.radius = 4;
// Chart.defaults.elements.point.hoverRadius = 6;
// Chart.defaults.plugins.tooltip.radius = 3;
// Chart.defaults.plugins.legend.labels.boxWidth = 15;

// const orderSearch = ref(false);

// const dataset = {
//   members: [
//     {
//       id: 1,
//       cabang: "Kabupaten Banjarnegara",
//     },
//     {
//       id: 2,
//       cabang: "Kabupaten Banjarnegara",
//     },
//     {
//       id: 3,
//       cabang: "Kabupaten Banjarnegara",
//     },
//     {
//       id: 4,
//       cabang: "Kabupaten Banyumas",
//     },
//     {
//       id: 5,
//       cabang: "Kabupaten Banyumas",
//     },
//     {
//       id: 6,
//       cabang: "Kabupaten Batang",
//     },
//     {
//       id: 7,
//       cabang: "Kabupaten Blora",
//     },
//     {
//       id: 8,
//       cabang: "Kabupaten Blora",
//     },
//     {
//       id: 9,
//       cabang: "Kabupaten Boyolali",
//     },
//     {
//       id: 10,
//       cabang: "Kabupaten Brebes",
//     },
//     {
//       id: 11,
//       cabang: "Kabupaten CIlacap",
//     },
//     {
//       id: 12,
//       cabang: "Kabupaten Cilacap",
//     },
//     {
//       id: 13,
//       cabang: "Kabupaten Demak",
//     },
//     {
//       id: 14,
//       cabang: "Kabupaten Grobogan",
//     },
//     {
//       id: 15,
//       cabang: "Kabupaten Jepara",
//     },
//     {
//       id: 16,
//       cabang: "Kabupaten Karanganyar",
//     },
//     {
//       id: 17,
//       cabang: "Kabupaten Kebumen",
//     },
//     {
//       id: 18,
//       cabang: "Kabupaten Kendal",
//     },
//     {
//       id: 19,
//       cabang: "Kabupaten Klaten",
//     },
//     {
//       id: 20,
//       cabang: "Kabupaten Kudus",
//     },
//     {
//       id: 21,
//       cabang: "Kabupaten Magelang",
//     },
//     {
//       id: 22,
//       cabang: "Kabupaten Pati",
//     },
//     {
//       id: 23,
//       cabang: "Kabupaten Pekalongan",
//     },
//     {
//       id: 24,
//       cabang: "Kabupaten Pemalang",
//     },
//     {
//       id: 25,
//       cabang: "Kabupaten Purbalingga",
//     },
//     {
//       id: 26,
//       cabang: "Kabupaten Purworejo",
//     },
//     {
//       id: 27,
//       cabang: "Kabupaten Rembang",
//     },
//     {
//       id: 28,
//       cabang: "Kabupaten Semarang",
//     },
//     {
//       id: 29,
//       cabang: "Kabupaten Sragen",
//     },
//     {
//       id: 30,
//       cabang: "Kabupaten Sukoharjo",
//     },
//     {
//       id: 31,
//       cabang: "Kabupaten Tegal",
//     },
//     {
//       id: 32,
//       cabang: "Kabupaten Temanggung",
//     },
//     {
//       id: 33,
//       cabang: "Kabupaten Wonogiri",
//     },
//     {
//       id: 34,
//       cabang: "Kabupaten Wonosobo",
//     },
//     {
//       id: 35,
//       cabang: "Kota Magelang",
//     },

//     {
//       id: 36,
//       cabang: "Kota Pekalongan",
//     },
//     {
//       id: 37,
//       cabang: "Kota Salatiga",
//     },
//     {
//       id: 38,
//       cabang: "Kota Semarang",
//     },
//     {
//       id: 39,
//       cabang: "Kota Surakarta",
//     },
//     {
//       id: 40,
//       cabang: "Kota Tegal",
//     },
//   ],
// };

// const branchCounts = {};
// dataset.members.forEach((member) => {
//   const branch = member.cabang;
//   branchCounts[branch] = (branchCounts[branch] || 0) + 1;
// });

const greenPalette = [
  "rgba(101, 163, 13, .7)",
  "rgba(108, 173, 18, .7)",
  "rgba(114, 183, 23, .7)",
  "rgba(120, 193, 28, .7)",
  "rgba(126, 203, 33, .7)",
  "rgba(132, 213, 38, .7)",
  "rgba(138, 223, 43, .7)",
  "rgba(144, 233, 48, .7)",
  "rgba(150, 243, 53, .7)",
  "rgba(156, 253, 58, .7)",
  "rgba(162, 126, 13, .7)",
  "rgba(168, 136, 18, .7)",
  "rgba(174, 146, 23, .7)",
  "rgba(180, 156, 28, .7)",
  "rgba(186, 166, 33, .7)",
  "rgba(192, 176, 38, .7)",
  "rgba(198, 186, 43, .7)",
  "rgba(204, 196, 48, .7)",
  "rgba(210, 206, 53, .7)",
  "rgba(216, 216, 58, .7)",
  "rgba(222, 126, 63, .7)",
  "rgba(228, 136, 68, .7)",
  "rgba(234, 146, 73, .7)",
  "rgba(240, 156, 78, .7)",
  "rgba(246, 166, 83, .7)",
  "rgba(252, 176, 88, .7)",
  "rgba(101, 186, 93, .7)",
  "rgba(108, 196, 98, .7)",
  "rgba(114, 206, 103, .7)",
  "rgba(120, 216, 108, .7)",
  "rgba(126, 226, 113, .7)",
  "rgba(132, 236, 118, .7)",
  "rgba(138, 246, 123, .7)",
  "rgba(144, 256, 128, .7)",
];

const donutChartData = reactive({
  labels: employeeData.byCity.map((data) => data.office_regency_city),
  datasets: [
    {
      data: employeeData.byCity.map((data) => data.total_employee),
      backgroundColor: greenPalette.slice(0, employeeData.byCity.length),
      hoverBackgroundColor: greenPalette
        .slice(0, employeeData.byCity.length)
        .map((color) => color.replace(".7", ".75")),
    },
  ],
});

const donutChartOptions = reactive({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const index = context.dataIndex;
          const label = context.chart.data.labels[index];
          const count = context.chart.data.datasets[0].data[index];
          return `${label}: ${count} Kantor Cabang`;
        },
      },
    },
  },
});
</script>

<template>
  <div class="content">
    <h2>Halo Talitha!</h2>
    <div class="row">
      <div class="col-xl-6 mt-4">
        <!-- Donut Chart -->
        <BaseBlock
          title="Sebaran Jumlah Mitra tiap Kab/Kota"
          content-full
          content-class="text-center"
        >
          <div class="py-3 px-xxl-7">
            <!-- Donut Chart -->
            <Doughnut
              :data="donutChartData"
              :options="donutChartOptions"
              style="height: 350px"
            />
            <!-- END Donut Chart -->
          </div>
        </BaseBlock>
        <!-- END Donut Chart -->
      </div>
    </div>
  </div>
</template>
