<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import WebinarService from "../../services/WebinarService";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const webinarService = new WebinarService();
const title = ref("");

var webinar_id = ref(null);

onMounted(async () => {
  webinar_id = route.params.webinar_id;
  console.log(webinar_id);
  try {
    const response = await webinarService.webinarListDetail(webinar_id);
    console.log(response);
    title.value = response.title;
  } catch (error) {
    console.log("Gagal mengambil data:", error);
  }
});
</script>
<template>
  <!-- Vertically Centered Block Modal -->
  <div
    class="modal"
    id="modal-block-vcenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-vcenter"
    aria-hidden="true"
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
            <div class="block-content fs-sm">
              <div class="col-md-12">
                <h3 style="color: #006d32">
                  {{ webinar.webinar.title }}
                </h3>

                <div class="mb-4">
                  <label class="form-label" for="example-file-input"
                    >Inputkan Bukti Pembayaran untuk Gabung webinars</label
                  >
                  <input
                    class="form-control"
                    type="file"
                    id="example-file-input"
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
              <button
                type="button"
                class="btn btn-sm btn-primary"
                data-bs-dismiss="modal"
              >
                Perfect
              </button>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
  <!-- END Vertically Centered Block Modal -->
</template>
<h1></h1>
