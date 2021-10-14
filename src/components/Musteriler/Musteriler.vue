<template>
  <v-col class="mx-auto" cols="8">
    <v-data-table
      :headers="headers"
      :items="customers"
      sort-by="price"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="dark" dark class="mb-2" v-bind="attrs" v-on="on">
                Yeni Müşteri
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Ad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="Soyad"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save()"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-col>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Ad",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Soyad", value: "lastname" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      lastname: "",
    },
    defaultItem: {
      name: "",
      lastname: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Yeni Müşteri" : "Müşteri Düzenle";
    },
    customers: {
      get() {
        return this.$store.getters.getCustomers;
      },
    },
    token: {
      get() {
        return this.$store.getters.getToken;
      },
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.$store.dispatch("getCustomers");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      axios
        .delete(`http://localhost:8080/api/customers/${item.id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then(() => {
          this.$store.dispatch("getCustomers");
        });
      // this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.customers.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .put(
            `http://localhost:8080/api/customers/${this.editedItem.id}`,
            this.editedItem,
            {
              headers: { Authorization: `Bearer ${this.token}` },
            }
          )
          .then(() => {
            this.$store.dispatch("getCustomers");
          });
      } else {
        axios
          .post("http://localhost:8080/api/customers/", this.editedItem, {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then(() => {
            this.$store.dispatch("getCustomers");
          });
      }
      this.close();
    },
  },
};
</script>
