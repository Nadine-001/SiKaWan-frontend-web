<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import WebinarService from "../../services/WebinarService";
import FlatPickr from "vue-flatpickr-component";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import "flatpickr/dist/flatpickr.css";

const router = useRouter();
const webinarService = new WebinarService();
const v$ = useVuelidate();

const title = ref("");
const speaker = ref("");
// const date = ref("");
const price = ref("");
const place = ref("");
const link = ref("");
const poster = ref("");
const materi = ref("");
const description = ref("");
const flatPickrState = reactive({
  dateCustom: null,
  configCustom: { dateFormat: "Y-m-d" },
});

const handleFileChange = (e, type) => {
  console.log("masuk file change");
  console.log(e && e.target);
  console.log(e);
  console.log(e.target);

  if (e && e.target) {
    console.log("masuk file condition");
    if (type === "poster") {
      console.log("Poster file:", e.target.files[0]);
      poster.value = e.target.files[0];
      console.log("Poster value:", poster.value);
    } else if (type === "materi") {
      console.log("Materi file:", e.target.files[0]);
      materi.value = e.target.files[0];
      console.log("Materi value:", materi.value);
    }
  }
};

const onSubmit = async () => {
  if (
    !title.value ||
    !speaker.value ||
    !flatPickrState.dateCustom ||
    !price.value ||
    !place.value ||
    !description.value
  ) {
    console.error("Harap isi semua field yang diperlukan!");
    return;
  }
  let formData = new FormData();

  formData.append("title", title.value);
  formData.append("speaker", speaker.value);
  formData.append("date", flatPickrState.dateCustom.split("T")[0]);
  formData.append("price", price.value);
  formData.append("place", place.value);
  formData.append("link", link.value);
  formData.append("poster", poster.value);
  formData.append("materi", materi.value);

  console.log("Form Data:", formData);

  formData.append("description", description.value);
  webinarService
    .addWebinar(formData)
    .then((res) => {
      console.log(res);
      router.push({ name: "backend-component-buatwebinar" });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="content">
    <BaseBlock title="">
      <div class="row items-push">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <h1 style="color: #006d32">Pembuatan Webinar</h1>
              <hr style="border: 2px solid #006d32" />
            </div>

            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12 space-y-5">
                  <form
                    class="space-y-4"
                    @submit.prevent="onSubmit()"
                    enctype="multipart/form-data"
                  >
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="title"
                        >Judul Webinar</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder=""
                          v-model="title"
                          style="border: 2px solid #9197b3"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="speaker"
                        >Pembicara</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="integer"
                          class="form-control"
                          id="speaker"
                          v-model="speaker"
                          placeholder=""
                          style="border: 2px solid #9197b3"
                        />
                      </div>
                    </div>

                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="date"
                        >Tanggal</label
                      >
                      <div class="col-sm-8">
                        <FlatPickr
                          id="date"
                          class="form-control"
                          placeholder=""
                          style="border: 2px solid #9197b3"
                          v-model="flatPickrState.dateCustom"
                          :config="flatPickrState.configCustom"
                        />
                      </div>
                    </div>

                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="price"
                        >Harga</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="price"
                          v-model="price"
                          placeholder=""
                          style="border: 2px solid #9197b3"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="place"
                        >Tempat</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="place"
                          v-model="place"
                          placeholder=""
                          style="border: 2px solid #9197b3"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="link"
                        >Link Zoom</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="link"
                          v-model="link"
                          placeholder=""
                          style="border: 2px solid #9197b3"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="poster"
                        >Unggah Poster</label
                      >
                      <div class="col-sm-8">
                        <input
                          class="form-control"
                          type="file"
                          id="poster"
                          style="border: 2px solid #9197b3"
                          @change="handleFileChange($event, 'poster')"
                          name="poster"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="materi"
                        >Unggah Materi</label
                      >
                      <div class="col-sm-8">
                        <input
                          class="form-control"
                          type="file"
                          id="materi"
                          style="border: 2px solid #9197b3"
                          @change="handleFileChange($event, 'materi')"
                          name="materi"
                        /><br />
                      </div>
                    </div>

                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="description"
                        >Deskripsi</label
                      >
                      <div class="col-sm-8">
                        <textarea
                          type="integer"
                          class="form-control"
                          id="description"
                          v-model="description"
                          placeholder=""
                          style="border: 2px solid #9197b3"
                        >
                        </textarea>
                      </div>
                    </div>

                    <div class="row">
                      <button type="submit" class="col-md-2 btn btn-success">
                        Buat Webinar
                      </button>
                    </div>
                    <div class="mt-2"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>

<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
</style>
