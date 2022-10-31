import axios from "axios";

const API_URL = "http://localhost:8080/api/authentication/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    console.log(user);
    return axios.post(API_URL + "register", {
      address: user.address,
      countryId: user.countryId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      username: user.username,
    });
  }
}

export default new AuthService();
