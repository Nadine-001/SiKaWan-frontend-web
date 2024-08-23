<script setup>
import { ref, onMounted, watch } from "vue";
import { format } from "date-fns";
import { useRoute } from "vue-router";
import AdminService from "../../services/AdminServices";
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Multiselect from "@vueform/multiselect";
import { useRouter } from "vue-router";
const router = useRouter();
const adminService = new AdminService();
const route = useRoute();
const projectId = ref(route.params.projectId);
const projectDetail = ref(route.state?.projectDetail || null);
const flatPickrEndRef = ref(null);

// const options = ref(["Talitha Shafira", "Vanessa Dewi", "Bayu Chandra"]);
const selectedAssignees = ref();

const flatPickrStateStart = ref({
  dateCustom: null,
  configCustom: { dateFormat: "Y-m-d" },
});

const flatPickrStateEnd = ref({
  dateCustom: null,
  configCustom: { dateFormat: "Y-m-d" },
});

// const handleDeadlineChange = (selectedDates, dateStr, instance) => {
//   flatPickrStateEnd.dateCustom = dateStr;
// };

onMounted(async () => {
  if (projectId.value) {
    try {
      const response = await adminService.getProjectDetail(projectId.value);
      projectDetail.value = response;

      const deadlineValue = response.deadline_admin;
      const startValue = response.start_date_admin;

      flatPickrStateEnd.dateCustom = response.deadline_admin;
      flatPickrStateStart.dateCustom = response.start_date_admin;
      console.log("FlatPickr Value:", flatPickrStateEnd.dateCustom);

      // Initialize selectedAssignees with names of assignees
      selectedAssignees.value = response.assignee.map((a) => a.name);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  }
});

// Fetch project details and initialize selectedAssignees on component mount
// onMounted(async () => {
//   if (projectId.value) {
//     try {
//       const response = await adminService.getProjectDetail(projectId.value);
//       console.log("Response from API:", response);

//       projectDetail.value = response;

//       // Konversi format tanggal dari respons API ke "y-m-d"
//       const apiDeadline = new Date(response.deadline);
//       const formattedDeadline = format(apiDeadline, "yyyy-MMM-dd");

//       // Set nilai v-model FlatPickr
//       flatPickrStateEnd.dateCustom = formattedDeadline;

//       if (flatPickrEndRef.value) {
//         flatPickrEndRef.value.setDate(apiDeadline, true);
//       }
//       console.log("Deadline Value:", flatPickrStateEnd.dateCustom);

//       // const assigneeNames =
//       //   response.assignee?.map((assignee) => assignee.name) || [];
//       // // selectedAssignees.value = assigneeNames;

//       // Update options to include assignee names
//       // options.value = [...options.value, ...assigneeNames];

//       // console.log("Selected Assignees:", selectedAssignees.value);
//       console.log("Project Detail (onMounted):", projectDetail.value);
//       console.log("Deadline:", projectDetail.value.deadline);
//     } catch (error) {
//       console.error("Error fetching project details:", error);
//     }
//   }
// });

const updateProject = async () => {
  try {
    if (!projectDetail.value || !projectDetail.value.status) {
      console.error("Invalid projectDetail:", projectDetail.value);
      return;
    }

    const selectedStatus = projectDetail.value.status;

    if (!isValidStatus(selectedStatus)) {
      console.error("Invalid status:", selectedStatus);
      return;
    }
    const assignedToString = selectedAssignees.value.join(",");

    await adminService.updateProject({
      project_id: projectId.value,
      project_name: projectDetail.value.project_name,
      start_date_admin: projectDetail.value.start_date_admin,
      deadline_admin: projectDetail.value.deadline_admin,
      value: projectDetail.value.value,
      description: projectDetail.value.description,
      assigned_to: assignedToString,
      status: selectedStatus,
    });
    console.log("assigne:", assignedToString);
    console.log("Project updated successfully");
    console.log(
      "Project Detail:",
      JSON.stringify(projectDetail.value, null, 2)
    );
    console.log(
      "Selected Assignees:",
      JSON.stringify(selectedAssignees.value, null, 2)
    );

    router.replace({
      name: "backend-component-profilepage",
      params: { projectDetail: projectDetail.value },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    console.log("Server error response:", error.response.data);
  }
};

watch(
  () => router.params?.projectId, // Perubahan di sini
  (newProjectId) => {
    if (newProjectId) {
      // Tambahkan pengecekan ini
      projectId.value = newProjectId;
      flatPickrStateEnd.dateCustom = projectDetail.value.deadline;
      selectedAssignees.value = projectDetail.value.assignee.map((a) => a.name);
    }
  }
);
function isValidStatus(status) {
  const validStatusOptions = ["Pending", "On Going", "Done"];
  return validStatusOptions.includes(status);
}
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

<template>
  <div class="content">
    <BaseBlock title="">
      <div class="row items-push">
        <div class="row">
          <div class="col-md-12">
            <h1 style="color: #c9002b">Edit Project</h1>
            <hr style="border: 2px solid #c9002b" />
          </div>

          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <template v-if="projectDetail">
                  <!-- && projectDetail.assignee -->
                  <form class="space-y-4" @submit.prevent="updateProject">
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="name"
                        >Judul Project</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          v-model="projectDetail.project_name"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <!-- <div class="row">
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
                    </div> -->
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="start"
                        >Start Date</label
                      >
                      <div class="col-sm-8">
                        <FlatPickr
                          id="start"
                          class="form-control"
                          placeholder=""
                          v-model="projectDetail.start_date_admin"
                          :config="flatPickrStateEnd.configCustom"
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
                          v-model="projectDetail.deadline_admin"
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
                          id="name"
                          v-model="projectDetail.value"
                          placeholder=""
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
                          style="border: 2px solid #9197b3"
                          v-model="projectDetail.description"
                        ></textarea>
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
                            {
                              value: 'Agustinus Bayu',
                              label: 'Agustinus Bayu',
                            },
                            {
                              value: 'Vanessa Sisilia',
                              label: 'Vanessa Sisilia',
                            },
                          ]"
                          style="border: 2px solid #9197b3"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-sm-4 col-form-label" for="description"
                        >Status</label
                      >
                      <div class="col-sm-8">
                        <select
                          v-model="projectDetail.status"
                          class="form-select"
                          id="status"
                          name="status"
                          style="border: 2px solid #9197b3"
                        >
                          <option selected>Pilih Status Project</option>
                          <option value="Pending">Pending</option>
                          <option value="On Going">On Going</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="row col-md-2">
                        <button
                          type="submit"
                          class="btn btn-success"
                          @click="updateProject"
                        >
                          Perbarui Project
                        </button>
                      </div>
                      <div class="row col-md-2">
                        <RouterLink
                          :to="{ name: 'backend-component-profilepage' }"
                        >
                          <span class="btn btn-danger"> Batal </span>
                        </RouterLink>
                        <!-- <button
                          type="submit"
                          class="btn btn-danger"
                        >
                          Batal
                        </button> -->
                      </div>
                    </div>

                    <div class="mt-2"></div>
                  </form>
                </template>
                <template v-else>
                  <p>Loading project details...</p>
                </template>
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
