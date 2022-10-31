<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :compactMode="true"
      v-on:row-dblclick="onRowDoubleClick"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
      }"
    >
      <template #table-row="props">
        <span v-if="props.column.field == 'edit'">
          <button
            type="button"
            class="btn btn-warning"
            v-on:click="editClient(props.row)"
          >
            Edit
          </button>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
      <template #table-actions>
        <button
          type="button"
          class="btn btn-primary btn-block"
          v-on:click="addClient()"
        >
          Add client
        </button>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import EditCostumerModal from "../components/EditClientForm.vue";
import AddClientModal from "../components/AddClientForm.vue";
import { ModalSize } from "vue-bs-modal";
import { VueGoodTable } from "vue-good-table-next";

export default {
  name: "ClientsTable",
  props: {
    tableData: {
      type: Array,
    },
    rows: {
      type: Array,
    },
    columns: {
      type: Array,
    },
  },
  components: {
    VueGoodTable,
  },
  data() {
    return {
      content: [],
    };
  },
  methods: {
    editClient(clientData) {
      this.$vbsModal.open({
        content: EditCostumerModal,
        size: ModalSize.LARGE,
        staticBackdrop: this.staticBackdrop,
        contentProps: {
          client: clientData,
        },
        contentEmits: {
          onUpdate: this.onUpdate,
        },
        center: this.centered,
        backgroundScrolling: false,
      });
    },
    onRowDoubleClick(params) {
      this.editClient(params.row);
    },
    addClient() {
      this.$vbsModal.open({
        content: AddClientModal,
        size: ModalSize.LARGE,
        staticBackdrop: this.staticBackdrop,
        contentProps: {},
        contentEmits: {
          onUpdate: this.onUpdate,
        },
        center: this.centered,
        backgroundScrolling: false,
      });
    },
    onUpdate() {
      this.$parent.getClients();
    },
  },
};
</script>
