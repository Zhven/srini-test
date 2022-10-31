<template>
  <div class="container">
    <h1>Clients</h1>
    <ClientsTable :columns="columns" :rows="content"></ClientsTable>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import ClientsTable from "../components/ClientsTable.vue";

export default {
  name: "HomeComponent",
  components: {
    ClientsTable,
  },
  data() {
    return {
      columns: [
        {
          label: "First Name",
          field: "firstName",
          type: "string",
        },
        {
          label: "Last Name",
          field: "lastName",
          type: "string",
        },
        {
          label: "Email",
          field: "email",
          type: "string",
        },
        {
          label: "Username",
          field: "username",
          type: "string",
        },
        {
          label: "Country",
          field: "country",
          type: "string",
        },
        {
          label: "Address",
          field: "address",
          type: "string",
        },
        {
          label: "Edit",
          field: "edit",
          sortable: false,
        },
      ],
      content: [],
    };
  },
  mounted() {
    this.getClients();
  },
  methods: {
    getClients() {
      UserService.getUserClients().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
