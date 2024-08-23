<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import AuthService from "../../services/AuthService";
import AdminService from "../../services/AdminServices";
import { useRouter } from "vue-router";
import FlatPickr from "vue-flatpickr-component";

const authService = new AuthService();
const router = useRouter();
const adminService = new AdminService();
const selectedAssignees = ref();
const name = ref("");
const value = ref("");
const description = ref("");

// const v$ = useVuelidate();

const project = ref({
  name: "",
  start_date: null,
  deadline: null,
  value: "",
  description: null,
  assigned_to: [],
});

const flatPickrStateStart = reactive({
  dateCustom: null,
  configCustom: { dateFormat: "Y-m-d" },
});

const flatPickrStateEnd = reactive({
  dateCustom: null,
  configCustom: { dateFormat: "Y-m-d" },
});

// onMounted(async () => {
//   try {
//     const response = await authService.fetchUserProfile();
//     console.log(response);
//     // project.value = response.project;
//     // console.log(response.user);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//   }
// });

// const handleFileChange = (e, type) => {
//   console.log("masuk file change");
//   console.log(e && e.target);
//   console.log(e);
//   console.log(e.target);

//   if (e && e.target) {
//     console.log("masuk file condition");
//     console.log("Files file:", e.target.files[0]);
//     files.value[type] = e.target.files[0];
//     console.log("Files value:", files.value);
//   }
// };

const onSubmit = async () => {
  // if (!user.value || !biodata.value || !licence_type || !files.value) {
  //   console.error("Harap isi semua field yang diperlukan!");
  //   return;
  // }
  let formData = new FormData();

  formData.append("name", name.value);
  formData.append("start_date", flatPickrStateStart.dateCustom);
  formData.append("deadline", flatPickrStateEnd.dateCustom);
  formData.append("value", value.value);
  formData.append("description", description.value);
  formData.append("assigned_to", selectedAssignees.value);
  project.assigned_to = selectedAssignees.value;

  project.name = name.value;
  project.value = value.value;
  project.description = description.value;

  console.log("Form Data:", formData);

  try {
    const response = await adminService.createProject(formData);
    console.log(response);
    router.push({ name: "backend-component-profilepage" });
  } catch (err) {
    console.error(err);
  }
};
</script>
<script>
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      options: [
        "Talitha Padmarini Shafira",
        "Vanessa Sisilia",
        "Agustinus Bayu",
      ],
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
// ... (kode gaya lainnya tetap sama) ...

body {
  font-family: "Poppins", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Poppins", sans-serif;
}

.btn {
  font-family: "Poppins", sans-serif;
}

.form-control {
  font-family: "Poppins", sans-serif;
}
.col-form-label {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  // color: #c9002b;
}
input.form-control {
  font-family: "Poppins", sans-serif;
  border: 2px solid #9197b3;
}

input.form-control::placeholder {
  font-family: "Poppins", sans-serif;
  color: #c9002b;
}
form {
  margin-right: 1rem;
  margin-left: 1rem;
}

.multiselect__tag {
  background-color: red;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
}
</style>

<template>
  <div class="content">
    <BaseBlock title="">
      <div class="row items-push">
        <div class="row">
          <div class="col-md-12">
            <h1 style="color: #c9002b">Buat Project Baru</h1>
            <hr style="border: 2px solid #c9002b" />
          </div>

          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <form
                  class="space-y-4"
                  @submit.prevent="onSubmit"
                  enctype="multipart/form-data"
                >
                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="name"
                      >Judul Project</label
                    >
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder=""
                        v-model="name"
                        style="border: 2px solid #9197b3"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="start"
                      >Start Date</label
                    >
                    <div class="col-sm-8">
                      <FlatPickr
                        id="start"
                        class="form-control"
                        placeholder=""
                        v-model="flatPickrStateStart.dateCustom"
                        :config="flatPickrStateStart.configCustom"
                        style="border: 2px solid #9197b3"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="end"
                      >Deadline</label
                    >
                    <div class="col-sm-8">
                      <FlatPickr
                        id="end"
                        class="form-control"
                        placeholder=""
                        v-model="flatPickrStateEnd.dateCustom"
                        :config="flatPickrStateEnd.configCustom"
                        style="border: 2px solid #9197b3"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="value"
                      >Nilai Project</label
                    >
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="value"
                        placeholder=""
                        v-model="value"
                        style="border: 2px solid #9197b3"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="description"
                      >Deskripsi</label
                    >
                    <div class="col-sm-8">
                      <textarea
                        type="text"
                        class="form-control"
                        id="description"
                        placeholder=""
                        v-model="description"
                        style="border: 2px solid #9197b3"
                      >
                      </textarea>
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-sm-4 col-form-label" for="assigned_to"
                      >Assignee</label
                    >
                    <div class="col-sm-8">
                      <Multiselect
                        v-model="selectedAssignees"
                        mode="tags"
                        multiple
                        :close-on-select="false"
                        :searchable="true"
                        :create-option="true"
                        :options="[
                          {
                            value: 'Talitha Padmarini Shafira',
                            label: 'Talitha Padmarini Shafira',
                          },
                          { value: 'Agustinus Bayu', label: 'Agustinus Bayu' },
                          {
                            value: 'Vanessa Sisilia',
                            label: 'Vanessa Sisilia',
                          },
                        ]"
                        style="border: 2px solid #9197b3"
                      />
                    </div>
                  </div>

                  <div class="row col-md-2">
                    <button type="submit" class="btn btn-danger">
                      Buat Project
                    </button>
                  </div>

                  <div class="mt-2"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseBlock>

    <!-- Basic -->

    <!-- END Basic -->
  </div>
</template>
