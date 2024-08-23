import { globals } from "../main";

import BackendService from "./BackendService";

import { store } from "../store/index";

globals.$http.defaults.headers.common["Content-Type"] = "application/json";
globals.$http.defaults.headers.common["Accept"] = "application/json";

export default class DashboardService extends BackendService {
  getMemberStatistic() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "getMemberStatistic")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getVerificationStatistic() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "getVerificationStatistic")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getEmployeeStatistic() {
    globals.$http.defaults.headers.common["Authorization"] = store.state.token;
    return globals.$http
      .get(this.apiUrl + "getEmployeeStatistic")
      .then(({ data }) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
