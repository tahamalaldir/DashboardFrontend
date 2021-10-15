<template>
  <v-col class="mx-auto" cols="8">
    <v-data-table
      :headers="headers"
      :items="sales"
      sort-by="price"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="750px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="dark" dark class="mb-2" v-bind="attrs" v-on="on">
                Yeni Satış
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
                      <v-radio-group v-model="editedItem.customersGroup">
                        <v-radio
                          v-for="n in customers"
                          :key="n.id"
                          :label="`${n.name}`"
                          :value="n"
                        ></v-radio> </v-radio-group></v-col
                    ><v-col cols="12" sm="6" md="4">
                      <v-radio-group v-model="editedItem.productsGroup">
                        <v-radio
                          v-for="n in products"
                          :key="n.id"
                          :label="`${n.name}`"
                          :value="n"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.custom"
                        label="Adet"
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
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
        value: "product.name",
      },
      { text: "Fiyat", value: "product.price" },
      { text: "Müşteri Adı", value: "customer.name", sortable: false },
      { text: "Müşteri Soyadı", value: "customer.lastname", sortable: false },
      { text: "Satılan Adet", value: "custom" },
      { text: "Toplam Fiyat", value: "totalPrice" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      customersGroup: 1,
      productsGroup: 1,
      custom: 0,
      id: 1,
    },
    defaultItem: {
      customersGroup: 1,
      productsGroup: 1,
      custom: 0,
      id: 1,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Yeni Satış" : "Satış düzenle";
    },
    totalPrice() {
      return this.sales.product.price * this.sales.custom;
    },
    sales: {
      get() {
        return this.$store.getters.getSales;
      },
    },
    products: {
      get() {
        return this.$store.getters.getProducts;
      },
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
    this.$store.dispatch("getSales");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.sales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.sales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      axios
        .delete(`http://localhost:8080/api/sales/${item.id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then(() => {
          this.$store.dispatch("getSales");
        });
      // this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.sales.splice(this.editedIndex, 1);
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
      let data = {
        productId: this.editedItem.productsGroup.id,
        customerId: this.editedItem.customersGroup.id,
        custom: this.editedItem.custom,
      };
      if (this.editedIndex > -1) {
        data = {
          id: this.editedItem.id,
          productId: this.editedItem.productsGroup.id,
          customerId: this.editedItem.customersGroup.id,
          custom: this.editedItem.custom,
        };
        axios
          .put(`http://localhost:8080/api/sales/${this.editedItem.id}`, data, {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((res) => {
            console.log(res);
            this.$store.dispatch("getSales");
          });
      } else {
        axios
          .post("http://localhost:8080/api/sales/", data, {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then(() => {
            this.$store.dispatch("getSales");
          });
      }
      this.close();
    },
  },
};
</script>
