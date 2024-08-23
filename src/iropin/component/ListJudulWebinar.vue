<script setup>
import { reactive, computed, onMounted, ref } from "vue";

import WebinarService from "@/services/WebinarService";
import { useRouter, useRoute } from "vue-router";
import { Modal } from "bootstrap";
const webinarService = new WebinarService();
const webinars = ref([]);
let modalElement = ref(null);
let modal = null;
const participants = ref([]);

onMounted(async () => {
  try {
    const response = await webinarService.getTotalParticipant();
    webinars.value = response.webinars;
    modal = new Modal(modalElement.value);
  } catch (error) {
    console.log("Gagal mengambil data", error);
  }
});

async function showParticipant(id) {
  if (id !== undefined) {
    try {
      const response = await webinarService.webinarParticipants(id);
      participants.value = response.participant_data;
      console.log("showParticipant called with id:", id);
      console.log("participants:", participants.value);
      modal.show();
    } catch (error) {
      console.error("Gagal mengambil data peserta", error);
    }
  } else {
    console.error("ID is undefined!");
  }
}
</script>

<template>
  <div class="container" id="app">
    <div class="row">
      <div
        v-for="webinar in webinars"
        class="col-md-3 col-6 my-1"
        :key="webinar.id"
      >
        <div class="card h-100">
          <div class="card-body">
            <h4 class="fw-bold">{{ webinar.title }}</h4>
            <hr style="border: 1px solid #00000" />
            <dt class="fs-3 fw-bold">
              {{ webinar.verified_participants }}/{{
                webinar.total_participant
              }}
            </dt>

            <div class="col-md-12">
              <button
                type="button"
                class="btn rounded-pill btn-success w-100 btn btn-alt-primary push"
                style="margin-bottom: 10px"
                @click="showParticipant(webinar.id)"
              >
                Lihat Peserta
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
              <div class="col-md-12">
                <table class="table table-hover table-vcenter">
                  <thead>
                    <tr>
                      <th class="text-center" style="width: 50px">No</th>
                      <th>Nama</th>
                      <th>Nomor Anggota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="({ participant }, index) in participants"
                      :key="index"
                    >
                      <th class="text-center" scope="row">{{ index + 1 }}</th>
                      <td class="fw-semibold fs-sm">
                        {{ participant.name }}
                      </td>
                      <td class="d-none d-sm-table-cell">
                        {{ participant.membership_number }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </BaseBlock>
        </div>
      </div>
    </div>
  </div>
</template>
