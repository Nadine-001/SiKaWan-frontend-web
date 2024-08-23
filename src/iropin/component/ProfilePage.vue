<script setup>
import { onMounted, ref, computed } from "vue";
import AdminService from "../../services/AdminServices";
import { useRouter } from "vue-router";

const router = useRouter(); // Move router definition to the top

const adminService = new AdminService();
const projects = ref([]);

onMounted(async () => {
  try {
    const response = await adminService.projects();
    console.log(response);
    projects.value = response;
    console.log(projects);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
});
const handleDeleteProject = async (projectId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this project?"
  );
  if (!confirmDelete) {
    return;
  }

  try {
    await adminService.deleteProject(projectId);
    projects.value = await adminService.projects();
    console.log("Success deleting project");
  } catch (error) {
    console.error("Error deleting project:", error.message);
  }
};

const goToDetail = (projectId) => {
  console.log("goToDetail called with projectId:", projectId);
  // Navigate to the detail page using Vue Router
  router.push({
    name: "backend-detail-verifikasiregistrasi",
    params: { projectId },
  });
};

const showDetail = async (projectId) => {
  if (projectId !== undefined) {
    console.log("Show Detail method called with projectId:", projectId);
    try {
      // Use the new getProjectDetail method
      const projectDetail = await adminService.getProjectDetail(projectId);
      console.log("Project Detail:", projectDetail);
      // Now you can navigate to the detail page and pass the project detail
      router.push({
        name: "backend-detail-verifikasiregistrasi",
        params: { projectId },
        state: { projectDetail }, // Pass the project detail as state
      });
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  } else {
    console.error("PROJECTID is undefined!");
  }
};
const search_name = ref("");
const search_deadline = ref("");
const search_status = ref("");
const filteredProjects = computed(() => {
  const searchTerm = search_name.value.toLowerCase();
  const deadlineTerm = search_deadline.value.toLowerCase();
  const statusTerm = search_status.value.toLowerCase();

  return projects.value.filter(
    (project) =>
      project.project_name.toLowerCase().includes(searchTerm) &&
      project.deadline.toLowerCase().includes(deadlineTerm) &&
      project.status.toLowerCase().includes(statusTerm)
  );
});
</script>

<template>
  <div class="content">
    <BaseBlock title="" style="background-color: #ffffff">
      <div class="row items-push">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4 mt-2 mb-4">
              <input
                v-model="search_name"
                type="text"
                class="form-control"
                placeholder="Search Project Name..."
                style="border: 2px solid #9197b3"
              />
            </div>
            <div class="col-md-4 mt-2 mb-4">
              <input
                v-model="search_deadline"
                type="text"
                class="form-control"
                placeholder="Search Deadline..."
                style="border: 2px solid #9197b3"
              />
            </div>
            <div class="col-md-4 mt-2 mb-4">
              <input
                v-model="search_status"
                type="text"
                class="form-control"
                placeholder="Search Status..."
                style="border: 2px solid #9197b3"
              />
            </div>
          </div>

          <div v-for="(project, index) in filteredProjects" :key="index">
            <BaseBlock style="background-color: #004b93">
              <div class="row items-push">
                <div class="col-md-12">
                  <div class="col-md-12">
                    <div class="row">
                      <h3 class="mb-1 col-sm-8" style="color: white">
                        {{ project.project_name }}
                      </h3>

                      <div class="col-sm-1 col-md-2">
                        <button
                          type="button"
                          class="btn btn-danger"
                          @click="showDetail(project.id)"
                        >
                          Edit Project
                        </button>
                      </div>
                      <div class="col-sm-1 col-md-2">
                        <button
                          @click="() => handleDeleteProject(project.id)"
                          type="submit"
                          class="btn btn-danger"
                        >
                          Hapus Project
                        </button>
                      </div>
                      <h6 class="mb-1" style="color: rgba(255, 255, 255, 0.57)">
                        {{ project.id }}
                      </h6>
                    </div>
                  </div>

                  <hr style="border: 2px white solid" />
                  <div class="col-md-4">
                    <div class="row">
                      <h6
                        class="col-sm-6"
                        style="color: rgba(255, 255, 255, 0.57)"
                      >
                        Deadline: {{ project.deadline }}
                      </h6>
                      <h6
                        class="col-sm-6"
                        style="color: rgba(255, 255, 255, 0.57)"
                      >
                        Nilai Project: Rp.{{ project.value }}
                      </h6>
                    </div>
                  </div>

                  <h6 class="mb-1" style="color: rgba(255, 255, 255, 0.57)">
                    Deskripsi
                  </h6>
                  <p style="color: white">{{ project.description }}</p>
                  <h6 class="mb-1" style="color: rgba(255, 255, 255, 0.57)">
                    Assignee
                  </h6>
                  <p
                    style="color: white"
                    v-if="project.assignee && project.assignee.length > 0"
                  >
                    {{
                      project.assignee
                        .map((assignee) => assignee.name)
                        .join(", ")
                    }}
                  </p>
                  <p style="color: white" v-else>Tidak ada assignee</p>
                  <p
                    v-if="project.status === 'Pending'"
                    style="color: orange; font-weight: bold"
                  >
                    {{ project.status }}
                  </p>
                  <p
                    v-else-if="project.status === 'On Going'"
                    style="color: #00ffff; font-weight: bold"
                  >
                    {{ project.status }}
                  </p>
                  <p
                    v-else-if="project.status === 'Done'"
                    style="color: #00ff00; font-weight: bold"
                  >
                    {{ project.status }}
                  </p>
                </div>
              </div>
            </BaseBlock>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>
