import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import Modal from "vue-bs-modal";
import * as yup from "yup";
import VueGoodTablePlugin from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";

let app = createApp(App);

app.config.globalProperties.schema = yup.object().shape({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  username: yup.string().required("Username is required!"),
  email: yup.string().required("Email is required!").email("Email is invalid!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Must be atleast 6 characters"),
  countryId: yup.string().required("Country is required!"),
  address: yup.string().required("Address is required!"),
});

app
  .use(store)
  .use(router)
  .use(Modal)
  .use(VueGoodTablePlugin)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
