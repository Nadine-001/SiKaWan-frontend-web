import { globals } from "../main";
import BackendService from "./BackendService";
import { store } from "../store/index";

globals.$http.defaults.headers.common["Content-Type"] = "application/json";
globals.$http.defaults.headers.common["Accept"] = "application/json";

export default class AdminService extends BackendService {
  async getProjectDetail(projectId) {
    try {
      const token = store.state.token;
      if (!token) {
        console.error("Token is missing");
        return Promise.reject("Token is missing");
      }

      globals.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const response = await globals.$http.get(
        `${this.apiUrl}projects/${projectId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching project detail:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, redirect to login");
      }

      throw error;
    }
  }
  async dashboard() {
    try {
      const token = store.state.token;
      if (!token) {
        console.error("Token is missing");
        return Promise.reject("Token is missing");
      }

      globals.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      console.log("Token:", store.state.token);

      const response = await globals.$http.get(this.apiUrl + "dashboard");
      return response.data;
    } catch (error) {
      console.error("Error loading dashboard data:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, redirect to login");
      }

      throw error;
    }
  }

  async deleteProject(projectId) {
    try {
      const token = store.state.token;
      if (!token) {
        console.error("Token is missing");
        return Promise.reject("Token is missing");
      }

      globals.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const response = await globals.$http.delete(
        `${this.apiUrl}projects/${projectId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting project:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, redirect to login");
      }

      throw error;
    }
  }

  async detailProject(projectId) {
    try {
      const token = store.state.token;
      if (!token) {
        console.error("Token is missing");
        return Promise.reject("Token is missing");
      }

      globals.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const response = await globals.$http.get(
        `${this.apiUrl}projects/${projectId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting project:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, redirect to login");
      }

      throw error;
    }
  }
  async projects() {
    try {
      const token = store.state.token;
      if (!token) {
        console.error("Token is missing");
        return Promise.reject("Token is missing");
      }

      globals.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      console.log("Token:", store.state.token);

      const response = await globals.$http.get(this.apiUrl + "projects");
      return response.data;
    } catch (error) {
      console.error("Error loading dashboard data:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, redirect to login");
      }

      throw error;
    }
  }

  async createProject(formData) {
    try {
      const token = store.state.token;
      if (!token) {
        console.error("Token is missing");
        return Promise.reject("Token is missing");
      }

      globals.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const response = await globals.$http.post(
        this.apiUrl + "create_project",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, redirect to login");
      }

      throw error;
    }
  }

  async updateProject(formData) {
    try {
      const token = store.state.token;
      if (!token) {
        console.error("Token is missing");
        return Promise.reject("Token is missing");
      }

      globals.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const response = await globals.$http.put(
        this.apiUrl + "projects/" + formData.project_id,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, redirect to login");
      }

      throw error;
    }
  }
}
