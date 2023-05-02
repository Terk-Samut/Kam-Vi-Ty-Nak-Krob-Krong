<template>
  <v-main style="padding: 20px 20px ; background-color:#FAFAFA;">
      
       <v-row style="padding:10px ; height: 100%;">
           <v-card 
                   
                   width="100%"
                   class="khmer-font">
                   <v-card class="d-flex align-center rounded-0" height="65" style="padding:15px" outlined>
                     <v-card-text style="font-size: 20px;">ការគ្រប់គ្រងទឹកសមុទ្រ</v-card-text>
                     <!-- export data as excel -->
                     
                     
                   <v-btn class=" ml-2 mb-2" @click="exportData" color="primary">ទាញទិន្នន័យជាExcel</v-btn>
     
           
                     <v-dialog
                       v-model="dialog"
                       max-width="500px"
                     >
                    
                     <template v-slot:activator="{ on, attrs }">
                     
                        <v-btn
              color="#00C853"
              dark
              class=" ml-2 mb-2"
              v-bind="attrs"
              v-on="on"
            ><v-icon
                                    small
                                    @click="editItem(item)"
                                    color="white"
                                  >
                                    mdi-plus
                                  </v-icon>
              បន្ថែមថ្មី
            </v-btn>
           
                       </template>
                       
                       <v-card  class="khmer-font">
                         <v-card-title  style="background-color: #2197BC;">
                           <div class="text-h6 white--text" >{{ formTitle }}</div>
                         </v-card-title>

                         <v-card-text >
                           <v-container>
                             <v-row >
                               <v-col
                                 cols="12"
                                 sm="12"
                                 md="12"
                               >
                               <v-text-field
                      v-model="editedItem.id"
                      label="លេខសម្គាល់"
                      
                    ></v-text-field>

                               </v-col>
                               <v-col
                                 cols="12"
                                 sm="12"
                                 md="12"
                               >
                               <v-text-field
                      v-model="editedItem.latitude"
                      label="រយៈទទឹង"
                      
                    ></v-text-field>

                               </v-col>
                               <v-col
                                 cols="12"
                                 sm="12"
                                 md="12"
                               >
                               <v-text-field
                      v-model="editedItem.longtitude"
                      label="រយៈបណ្ដោយ"
                     
                      
                     
                    ></v-text-field>
                               </v-col>
                               <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.date"
                      label="ថ្ងៃខែឆ្នាំ"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                                 cols="12"
                                 sm="6"
                                 md="6"
                               >
                               <v-text-field
                      v-model="editedItem.time"
                      label="ពេលវេលា"
                      type="time"
                    ></v-text-field>
                    </v-col>
                    <v-col
                                 cols="12"
                                 sm="12"
                                 md="12"
                               >
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
                           <v-btn
                             color="blue darken-1"
                             text
                             @click="close"
                           >
                             ត្រឡប់ក្រោយ
                           </v-btn>
                           <v-btn
                             color="blue darken-1"
                             text
                             @click="save"
                           >
                             រក្សាទុក
                           </v-btn>
                         </v-card-actions>
                       </v-card>
                     </v-dialog>
                    </v-card>
                   <!-- function -->
                   <v-card-container>
                       <v-card class="d-flex mb-6"  flat style="height:30px">
                           <v-card class="pa-2 mr-auto" flat> 
                                  
                           </v-card>
                           <v-card class="pa-2" flat> 
                               <v-container style="padding:0; margin:0; margin-top: 10px;margin-right: 10px;  width: 400px;"
                               class="d-flex justify-start mb-6"
                               flat
                               tile
                               >
                               <v-subheader style="font-size:15px">ស្វែងរក</v-subheader>
                               <v-text-field 
                               v-model="search" 
                               outlined
                               dense
                               append-icon="mdi-magnify"
                               ></v-text-field>
                               
                           </v-container> 
                           </v-card>
                       </v-card>
                      
                      <!-- table -->
                       <v-card style="margin-top:30px; padding:20px; width:100%" flat>
                           <v-card >
                               <v-data-table
                               :items-per-page="itemsPerPage"
                               :headers="headers"
                               :items="users"
                               :search="search"
                               >  
                               <!-- button action      -->
                               <template v-slot:[`item.actions`]="{ item }"> 
                                
                                 
                                </template>
                             </v-data-table>     
                           </v-card>
                       </v-card>
                   </v-card-container>
           </v-card>
       </v-row>
 </v-main>
</template>
<script>
import * as XLSX from 'xlsx/dist/xlsx.full.min.js'
  export default {
   
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search:'',

     
      headers: [
        
        {
          text: 'លេខសម្គាល់',
          align: 'start',
          sortable: false,
          value: 'id',
          width: '10%',
          class:'white--text'
        },
        { text: 'រយៈទទឹង', value: 'latitude', width: '10%',class:'white--text' },
        { text: 'រយៈបណ្ដោយ', value: 'longtitude', width: '10%',class:'white--text' },
        { text: 'ថ្ងៃខែឆ្នាំ', value: 'date', width: '10%',class:'white--text' },
        { text: 'ពេលវេលា', value: 'time', width: '10%',class:'white--text' },
        { text: 'តម្លៃEc', value: 'ec', width: '10%',class:'white--text' },
        
       
      ],
      users: [
        {
            
            id: 'OBS-KSM 001',
            latitude: '120',
            longtitude: '200',
            time: '11:12 ',
            date:'2022-10-02',
            ec:'200 '
            
          },
          {
          
            id: 'OBS-KSM 002',
            latitude: '100',
            longtitude: '200',
            time: '11:12 ',
            date:'2022-10-02',
            ec:'200 '
            
          },
          {
            
            id: 'OBS-KSM 003',
            latitude: '110',
            longtitude: '500',
            time: '11:12 ',
            date:'2022-10-02',
            ec:'200 '
            
          },
          {
            
            id: 'OBS-KSM 004',
            latitude: '50',
            longtitude: '100',
            time: '11:12 ',
            date:'2022-10-02',
            ec:'200 '
            
          },
          {
           
            id: 'OBS-KSM 005',
            latitude: '40',
            longtitude: '100',
            time: '11:12 ',
            date:'2022-10-02',
            ec:'200 '
            
          },
          
          
      ],
      color:"#1E7E9C",
      editedIndex: -1,
      editedItem: {
        id:'',
        name: '',
        latitude: '',
        longtitude: '',
        date: '',
        time: '',
        ec:'',
      },
      defaultItem: {
        id:'',
        name: '',
        latitude: '',
        longtitude: '',
        date: '',
        time: '',
        ec:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? "បង្កើតព័ត៌មានថ្មីរបស់កម្រិតទឹកសមុទ្រ" : "កែប្រែព័ត៌មានរបស់កម្រិតទឹកសមុទ្រ"
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

   

    methods: {
      exportData() {
      const worksheet = XLSX.utils.json_to_sheet(this.users)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      XLSX.writeFile(workbook, 'តារាងកម្រិតទឹកសមុទ្រ.xlsx')
    },
      
      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.users.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
<style scoped>
@font-face {
  font-family: 'Khmer OS Siemreap';
  src: url('@/assets/fonts/Khmer OS Siemreap.ttf') format('truetype');
}

body {
  font-family: 'Khmer OS Siemreap', sans-serif;
}

.khmer-font {
  font-family: 'Khmer OS Siemreap', sans-serif;
  font-size: 11px;
}

.khmer-font-title {
  font-size: 24px;
}

.khmer-font-body {
  font-size: 16px;
}
::v-deep .v-data-table-header {
background-color: #2197BC;

}
v-data-table >>> div > table {
border-spacing: 0 0.5rem;

}
</style>
