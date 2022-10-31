import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/client/";

class UserService {
  getUserClients() {
    return axios.get(API_URL + "all", { headers: authHeader() });
  }

  modifyClient(client, id) {
    return axios.put(API_URL + id, client, {
      headers: authHeader(),
    });
  }

  addNewClient(client) {
    return axios.post(API_URL + "add", client, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
