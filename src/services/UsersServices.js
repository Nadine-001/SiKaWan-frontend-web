import { globals } from "../main";

import BackendService from "./BackendService";

import { store } from "../store/index";

globals.$http.defaults.headers.common["Content-Type"] = "application/json";
globals.$http.defaults.headers.common["Accept"] = "application/json";

export default class UsersService extends BackendService {
  getUsers() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "getUsers")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addUser(newUser) {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .post(this.apiUrl + "addUser", newUser)
      .then(({ data }) => {
        console.log("Akun berhasil ditambahkan", data);
        return data;
      })
      .catch((error) => {
        console.error("Tambah akun gagal:", error);
        return Promise.reject("Tambah akunGagal. Silakan coba lagi.");
      });
  }
  userList() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "userList")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
