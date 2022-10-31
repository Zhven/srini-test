import axios from "axios";

const API_URL = "http://localhost:8080/api/countries/";

class CountryService {
  getCountries() {
    return axios.get(API_URL + "all").then((response) => {
      return response;
    });
  }
}

export default new CountryService();
