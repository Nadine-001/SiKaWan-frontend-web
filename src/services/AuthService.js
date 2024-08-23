import { globals } from "../main";

import BackendService from "./BackendService";

import { store } from "../store/index";

globals.$http.defaults.headers.common["Content-Type"] = "application/json";
globals.$http.defaults.headers.common["Accept"] = "application/json";

export default class AuthService extends BackendService {
  // registrationList() {
  //   globals.$http.defaults.headers.common["Authorization"] = store.state.token;
  //   return globals.$http
  //     .get(this.apiUrl + "registrationList")
  //     .then(({ data }) => {
  //       // console.log(data);
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // AuthService.js
  login(admins) {
    return globals.$http
      .post(this.apiUrl + "login_admin", admins)
      .then(({ data }) => {
        if (data && data.email && data.UID && data.token) {
          store.commit("setToken", data.token);
          this.fetchUserProfile().catch((err) => {
            console.log(err);
          });

          console.log("Login successful:", data);
          return {
            email: data.email,
            UID: data.UID,
            token: data.token,
          };
        } else {
          console.error("Unexpected response format from server:", data);
          return Promise.reject("Unexpected response format from server");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        return Promise.reject(error);
      });
  }

  sign_up(userData) {
    return globals.$http
      .post(this.apiUrl + "sign_up_admin", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log("Registrasi berhasil:", data);
        return data;
      })
      .catch((error) => {
        console.error("Registrasi gagal:", error);
        return Promise.reject("Registrasi gagal. Silakan coba lagi.");
      });
  }

  forgot_password(email) {
    return globals.$http
      .post(this.apiUrl + "forgot_password", { email })
      .then(({ data }) => {
        console.log("Email sent successfully:", data);
        return data;
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        return Promise.reject("Failed to send email. Please try again.");
      });
  }

  // registrationListDetail(id) {
  //   globals.$http.defaults.headers.common["Authorization"] = store.state.token;
  //   console.log(id);
  //   return globals.$http
  //     .get(this.apiUrl + "registrationList/" + id)
  //     .then(({ data }) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       throw err; // Lebih baik melemparkan kembali kesalahan
  //     });
  // }

  fetchUserProfile() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    console.log(
      "Authorization Header:",
      globals.$http.defaults.headers.common["Authorization"]
    );
    console.log("Vuex Store State:", store.state);
    // ... rest of the code
    return globals.$http.get(this.apiUrl + "profile_admin").then(({ data }) => {
      store.commit("setUserProfile", data);
      return data;
    });
  }
  logout() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "logout_admin")
      .then(({ data }) => {
        console.log(data);
        store.dispatch("clearData");
      })
      .catch(() => {
        store.dispatch("clearData");
      });
  }

  // validateRegistration(id) {
  //   globals.$http.defaults.headers.common["Authorization"] = store.state.token;
  //   return globals.$http
  //     .post(this.apiUrl + "validateRegistration/" + id, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then(({ data }) => {
  //       console.log("Berhasil mengajukan Permohonan", data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       console.error("Pengajuan Gagal:", error);
  //       return Promise.reject("Pengajuan Gagal. Silakan coba lagi.");
  //     });
  // }

  //   declineRegistration(id, note) {
  //     globals.$http.defaults.headers.common["Authorization"] = store.state.token;
  //     return globals.$http
  //       .post(this.apiUrl + "declineRegistration/" + id, note, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then(({ data }) => {
  //         console.log("Berhasil mengajukan Permohonan", data);
  //         return data;
  //       })
  //       .catch((error) => {
  //         console.error("Pengajuan Gagal:", error);
  //         return Promise.reject("Pengajuan Gagal. Silakan coba lagi.");
  //       });
  //   }
}
