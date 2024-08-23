import { globals } from "../main";

import BackendService from "./BackendService";

import { store } from "../store/index";

globals.$http.defaults.headers.common["Content-Type"] = "application/json";
globals.$http.defaults.headers.common["Accept"] = "application/json";

export default class WebinarService extends BackendService {
  addWebinar(webinar) {
    return globals.$http
      .post(this.apiUrl + "addWebinar", webinar, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log("Webinar berhasil ditambahkan", data);
        return data;
      })
      .catch((error) => {
        console.error("Tambah webinar gagal:", error);
        return Promise.reject("Tambah Webinar Gagal. Silakan coba lagi.");
      });
  }
  webinarList() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "webinarList") // Updated endpoint
      .then(({ data }) => {
        // console.log(data);
        // return Object.entries(data.webinars);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  participantList() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "participantList")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  participantListDetail(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "participantList/" + id)
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Lebih baik melemparkan kembali kesalahan
      });
  }

  webinarListDetail(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "webinarList/" + id)
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Lebih baik melemparkan kembali kesalahan
      });
  }

  materiWebinar(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "materiWebinar/" + id)
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Lebih baik melemparkan kembali kesalahan
      });
  }

  linkWebinar(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "linkWebinar/" + id)
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Lebih baik melemparkan kembali kesalahan
      });
  }

  webinarRegistration(id, invoice) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .post(this.apiUrl + "webinarRegistration/" + id, invoice, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log("Berhasil mengajukan Permohonan", data);
        return data;
      })
      .catch((error) => {
        console.error("Pengajuan Gagal:", error);
        return Promise.reject("Pengajuan Gagal. Silakan coba lagi.");
      });
  }

  getTotalParticipant() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "getTotalParticipant")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  webinarParticipants(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "webinarList/" + id + "/participantList")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Lebih baik melemparkan kembali kesalahan
      });
  }

  validateParticipant(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .post(this.apiUrl + "validateParticipant/" + id, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log("Berhasil mengajukan Permohonan", data);
        return data;
      })
      .catch((error) => {
        console.error("Pengajuan Gagal:", error);
        return Promise.reject("Pengajuan Gagal. Silakan coba lagi.");
      });
  }
  declineParticipant(id, note) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .post(this.apiUrl + "declineParticipant/" + id, note, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log("Berhasil mengajukan Permohonan", data);
        return data;
      })
      .catch((error) => {
        console.error("Pengajuan Gagal:", error);
        return Promise.reject("Pengajuan Gagal. Silakan coba lagi.");
      });
  }
}
