import { globals } from "../main";

import BackendService from "./BackendService";

import { store } from "../store/index";

globals.$http.defaults.headers.common["Content-Type"] = "application/json";
globals.$http.defaults.headers.common["Accept"] = "application/json";

export default class PermohonanService extends BackendService {
  requestLicence(licence) {
    return globals.$http
      .post(this.apiUrl + "requestLicence", licence, {
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

  licenceList() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "licenceList")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  approvalList() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "approvalList")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  licenceListDetail(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    console.log(id);
    return globals.$http
      .get(this.apiUrl + "licenceList/" + id)
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Lebih baik melemparkan kembali kesalahan
      });
  }

  validateLicence(id, key) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .post(this.apiUrl + "validateLicence/" + id, key, {
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

  declineLicence(id, note) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .post(this.apiUrl + "declineLicence/" + id, note, {
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

  showApproval(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    console.log(id);
    return globals.$http
      .get(this.apiUrl + "showApproval/" + id)
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Lebih baik melemparkan kembali kesalahan
      });
  }

  sendApproval(id, licence) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .post(this.apiUrl + "sendApproval/" + id, licence, {
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

  licenceApproved() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "licenceApproved")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showApproved(id) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    console.log(id);
    return globals.$http
      .get(this.apiUrl + "showApproved/" + id)
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw err; // Lebih baik melemparkan kembali kesalahan
      });
  }
}
