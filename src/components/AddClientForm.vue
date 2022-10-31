<template>
  <div class="modal-header">
    <h5 class="modal-title">Add client</h5>
    <button type="button" class="btn-close" aria-label="Close" @click="close">
      X
    </button>
  </div>
  <div class="modal-body">
    <Form @submit="handleAddClient" :validation-schema="schema">
      <div class="form-group">
        <label for="firstName">First name</label>
        <Field
          name="firstName"
          type="text"
          class="form-control"
          v-model="firstName"
        />
        <ErrorMessage name="firstName" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="lastName">Last name</label>
        <Field
          name="lastName"
          type="text"
          class="form-control"
          v-model="lastName"
        />
        <ErrorMessage name="lastName" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <Field name="email" type="email" class="form-control" v-model="email" />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div class="form-group">
        <div class="input-field">
          <label for="username">Username</label>
          <Field
            name="username"
            type="text"
            class="form-control"
            v-model="username"
          />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          v-model="password"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="countryId">Country</label>
        <Field
          class="custom-select"
          aria-label="select example"
          name="countryId"
          as="select"
          v-model="countryId"
        >
          <option
            v-for="option in options"
            :value="option.id"
            v-bind:key="option"
          >
            {{ option.name }}
          </option>
        </Field>
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <Field
          name="address"
          type="text"
          class="form-control"
          v-model="address"
        />
        <ErrorMessage name="address" class="error-feedback" />
      </div>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </Form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="close">
      Cancel
    </button>
    <button type="button" class="btn btn-success" @click="handleAddClient">
      Add
    </button>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

import countryService from "@/services/country.service";
import UserService from "../services/user.service";

export default {
  name: "AddClientModal",
  emits: ["onUpdate"],
  props: {
    client: Object,
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      loading: false,
      message: "",
      schema: this.schema,
      options: [],
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      countryId: null,
      address: null,
      password: null,
    };
  },
  computed: {},
  mounted() {
    countryService.getCountries().then(
      (response) => {
        this.options = response.data;
      },
      (error) => {
        this.options =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },

  methods: {
    close() {
      this.$vbsModal.close();
    },
    handleAddClient() {
      this.message = "";
      this.loading = true;

      UserService.addNewClient({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password,
        address: this.address,
        countryId: this.countryId,
      }).then(
        (data) => {
          this.message = data.message;
          this.loading = false;
          this.$emit("onUpdate");
          this.close();
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.loading = false;
        }
      );
    },
  },
};
</script>
