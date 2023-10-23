<template>
  <v-main style="padding: 20px 20px; background-color: #fafafa">
    <v-row style="padding: 10px; height: 100%">
      <v-card width="100%" class="khmer-font">
        <v-card
          class="d-flex align-center rounded-0"
          height="65"
          style="padding: 15px"
          outlined
        >
          <v-card-text style="font-size: 20px"
            >ការគ្រប់គ្រងទឹកសមុទ្រ</v-card-text
          >
          <!-- export data as excel -->

          <v-btn class="ml-2 mb-2" @click="exportData" color="primary"
            >ទាញទិន្នន័យជាExcel</v-btn
          >

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn
                color="#00C853"
                dark
                class="ml-2 mb-2"
                v-bind="props"
                ><v-icon small @click="editItem()" color="white">
                  mdi-plus
                </v-icon>
                បន្ថែមថ្មី
              </v-btn>
            </template>

            <v-card class="khmer-font">
              <v-card-title style="background-color: #2197bc">
                <div class="text-h6 white--text">{{ formTitle }}</div>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.id"
                        label="លេខសម្គាល់"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.latitude"
                        label="រយៈទទឹង"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.longtitude"
                        label="រយៈបណ្ដោយ"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.date"
                        label="ថ្ងៃខែឆ្នាំ"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.time"
                        label="ពេលវេលា"
                        type="time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.ec"
                        label="តម្លៃEc"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">
                  ត្រឡប់ក្រោយ
                </v-btn>
                <v-btn color="blue darken-1" @click="save">
                  រក្សាទុក
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
        
        <v-card class="d-flex" flat>
          <v-card class="pa-2 ms-auto" flat>
            <v-container
              style="
                width: 400px;
              "
              class="d-flex justify-start"
              flat
              tile
            >
              <v-text-field
                v-model="search"
                outlined
                dense
                append-icon="mdi-magnify"
                label="ស្វែងរក"
              ></v-text-field>
            </v-container>
          </v-card>
        </v-card>

        <!-- table -->
        <v-card style="margin-top: 30px; padding: 20px; width: 100%" flat>
          <v-card>
            <v-data-table
              :items-per-page="50"
              :headers="headers"
              :items="ទិន្នន័យ"
              :search="search"
            >
              <!-- button action      -->
              <template v-slot:[`item.actions`]="{ item }"> </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-card>
    </v-row>
  </v-main>
</template>
<script setup lang="ts">
import * as XLSX from "xlsx/dist/xlsx.full.min.js";
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref, computed } from "vue";

// Navigation
const dialog = ref(false);
const dialogDelete = ref(false);

const formTitle = computed(() => {
  return editedIndex.value === -1
    ? "បង្កើតព័ត៌មានថ្មីរបស់កម្រិតទឹកសមុទ្រ"
    : "កែប្រែព័ត៌មានរបស់កម្រិតទឹកសមុទ្រ";
});

//
const search = ref("");
const editedIndex = ref(-1);
const editedItem = ref({
  id: "",
  name: "",
  latitude: "",
  longtitude: "",
  date: "",
  time: "",
  ec: "",
});

const defaultItem = ref({
  id: "",
  name: "",
  latitude: "",
  longtitude: "",
  date: "",
  time: "",
  ec: "",
});
const headers: {
  title: string,
  align?: 'start' | 'end' | 'center',
  sortable?: boolean,
  value: string,
  width: string,
}[] = [
  {
    title:"លេខសម្គាល់",
    align: "start",
    sortable: false,
    value: "id",
    width: "10%",
  },
  {
    title:"រយៈទទឹង",
    value: "latitude",
    width: "10%",
  },
  {
    title:"រយៈបណ្ដោយ",
    value: "longtitude",
    width: "10%",
  },
  {
    title:"ថ្ងៃខែឆ្នាំ",
    value: "date",
    width: "10%",
  },
  { title:"ពេលវេលា", value: "time", width: "10%" },
  { title:"តម្លៃEc", value: "ec", width: "10%" },
];
const ទិន្នន័យ = ref([
  {
    id: "OBS-KSM 001",
    latitude: "120",
    longtitude: "200",
    time: "11:12 ",
    date: "2022-10-02",
    ec: "200 ",
  },
  {
    id: "OBS-KSM 002",
    latitude: "100",
    longtitude: "200",
    time: "11:12 ",
    date: "2022-10-02",
    ec: "200 ",
  },
  {
    id: "OBS-KSM 003",
    latitude: "110",
    longtitude: "500",
    time: "11:12 ",
    date: "2022-10-02",
    ec: "200 ",
  },
  {
    id: "OBS-KSM 004",
    latitude: "50",
    longtitude: "100",
    time: "11:12 ",
    date: "2022-10-02",
    ec: "200 ",
  },
  {
    id: "OBS-KSM 005",
    latitude: "40",
    longtitude: "100",
    time: "11:12 ",
    date: "2022-10-02",
    ec: "200 ",
  },
]);
const exportData = () => {
  const worksheet = XLSX.utils.json_to_sheet(ទិន្នន័យ.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "តារាងកម្រិតទឹកសមុទ្រ.xlsx");
};

const editItem = (item?) => {
  editedIndex.value = ទិន្នន័យ.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = ទិន្នន័យ.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  ទិន្នន័យ.value = ទិន្នន័យ.value.splice(editedIndex.value, 1);
  closeDelete();
};

const close = () => {
  dialog.value = false;
  editedItem.value = Object.assign({}, defaultItem.value);
  editedIndex.value = -1;
};

const closeDelete = () => {
  dialogDelete.value = false;
  editedItem.value = Object.assign({}, defaultItem.value);
  editedIndex.value = -1;
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(ទិន្នន័យ.value[editedIndex.value], editedItem.value);
  } else {
    ទិន្នន័យ.value = [...ទិន្នន័យ.value, editedItem.value];
  }
  close();
};
</script>
<style scoped>
@font-face {
  font-family: "Khmer OS Siemreap";
  src: url("@/assets/fonts/Khmer OS Siemreap.ttf") format("truetype");
}

body {
  font-family: "Khmer OS Siemreap", sans-serif;
}

.khmer-font {
  font-family: "Khmer OS Siemreap", sans-serif;
  font-size: 11px;
}

.khmer-font-title {
  font-size: 24px;
}

.khmer-font-body {
  font-size: 16px;
}

:v-deep(.v-data-table-header) {
  background-color: #2197bc;
}
.v-data-table :deep(.div .table) {
  border-spacing: 0 0.5rem;
}
</style>
