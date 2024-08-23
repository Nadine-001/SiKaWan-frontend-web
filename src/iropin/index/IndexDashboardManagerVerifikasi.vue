<script setup>
import { reactive, computed, onMounted, ref } from "vue";

import { Line, Bar, Radar, PolarArea, Pie, Doughnut } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import DashboardService from "../../services/DashboardService";
import { useRouter } from "vue-router";
const router = useRouter();
const dashboardService = new DashboardService();

const registration_total = ref([]);
const checked_registration = ref([]);
const licence_total = ref([]);
const checked_licences = ref([]);
const participant_total = ref([]);
const checked_participant = ref([]);

onMounted(async () => {
  try {
    const response = await dashboardService.getVerificationStatistic();
    console.log(response);
    console.log(response.registration_total);
    console.log(response.checked_registration);
    console.log(response.licence_total);
    console.log(response.checked_licences);
    console.log(response.participant_total);
    console.log(response.checked_participant);
    registration_total.value = response.registration_total;
    checked_registration.value = response.checked_registration;
    licence_total.value = response.licence_total;
    checked_licences.value = response.checked_licences;
    participant_total.value = response.participant_total;
    checked_participant.value = response.checked_participant;

    console.log(checked_participant);
    console.log(participant_total);
    console.log(checked_licences);
    console.log(licence_total);
    console.log(checked_registration);
    console.log(registration_total);
  } catch (error) {
    console.log("Gagal mengambil data:", error);
  }
});
</script>

<template>
  <div class="content">
    <h2>Halo Talitha!</h2>
    <div class="row">
      <div class="col-xl-4">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">
                  {{ checked_registration }}/{{ registration_total }}
                </dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  Verifikasi Registrasi
                </dd>
              </dl>
            </div>
          </template>
        </BaseBlock>
      </div>
      <div class="col-xl-4">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">
                  {{ checked_licences }}/{{ licence_total }}
                </dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  Verifikasi Permohonan
                </dd>
              </dl>
            </div>
          </template>
        </BaseBlock>
      </div>
      <div class="col-xl-4">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">
                  {{ checked_participant }}/{{ participant_total }}
                </dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  Verifikasi Webinar
                </dd>
              </dl>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
