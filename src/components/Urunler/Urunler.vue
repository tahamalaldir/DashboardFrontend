<template>
  <v-col class="mx-auto" cols="8">
    <v-data-table
      :headers="headers"
      :items="products"
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
                Yeni Ürün
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
                        color="dark"
                        label="Ürün Ad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.price"
                        color="dark"
                        label="Fiyat"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.custom"
                        color="dark"
                        label="Adet"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="dark" text @click="close"> Cancel </v-btn>
                <v-btn color="dark" outlined @click="save()"> Save </v-btn>
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
        text: "Ürün Ad",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Fiyat", value: "price" },
      { text: "Adet", value: "custom" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      price: 0,
      custom: 0,
    },
    defaultItem: {
      name: "",
      price: 0,
      custom: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Yeni Ürün" : "Ürün Düzenle";
    },
    products: {
      get() {
        return this.$store.getters.getProducts;
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
    this.$store.dispatch("getProducts");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      let data = {
        id: item.id,
      };
      axios
        .post(`https://localhost:44397/api/products/delete`, data, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then(() => {
          this.$store.dispatch("alert");
          this.$store.dispatch("getProducts");
        });
    },

    deleteItemConfirm() {
      this.products.splice(this.editedIndex, 1);
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
          .post(
            `https://localhost:44397/api/products/update`,
            this.editedItem,
            {
              headers: { Authorization: `Bearer ${this.token}` },
            }
          )
          .then(() => {
            this.$store.dispatch("getProducts");
            this.$store.dispatch("alert");
          });
      } else {
        axios
          .post("https://localhost:44397/api/products/add", this.editedItem, {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then(() => {
            this.$store.dispatch("getProducts");
            this.$store.dispatch("alert");
          });
      }
      this.close();
    },
  },
};
</script>
