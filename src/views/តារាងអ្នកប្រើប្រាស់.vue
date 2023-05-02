<template>
  <v-main style="padding: 20px 20px ; background-color:#FAFAFA;">
      
       <v-row style="padding:10px ; height: 90%;">
           <v-card class="khmer-font"
                   
                   width="100%">
                   <v-card class="d-flex align-center rounded-0" height="65" style="padding:15px" outlined>
                     <v-card-text style="font-size: 20px;">ការគ្រប់គ្រងអ្នកប្រើប្រាស់</v-card-text>
                     <!-- Delete student -->
                     <v-dialog  class="khmer-font" v-model="dialogDelete" max-width="500px">
                       <v-card >
                         <v-card-title class="text-h5">តើអ្នកពិតជាចង់លុបវាដែរឬទេ?</v-card-title>
                         <v-card-actions>
                           <v-spacer></v-spacer>
                           <v-btn color="blue darken-1" text @click="closeDelete">អត់ទេ</v-btn>
                           <v-btn color="blue darken-1" text @click="deleteItemConfirm">យល់ព្រម</v-btn>
                           <v-spacer></v-spacer>
                         </v-card-actions>
                       </v-card>
                     </v-dialog>        
                   </v-card>
                   <!-- funtion -->
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
                           <v-card class="khmer-font">
                               <v-data-table
                               :items-per-page="itemsPerPage"
                               :headers="headers"
                               :items="users"
                               :search="search"
                               >  
                               <!-- button action      -->
                               <template v-slot:[`item.actions`]="{ item }"> 
                               
                                 
                                  <!-- Delete Button -->
                                  <v-btn
                                 
                                  color="error"
                                    small
                    
                                    >
                                    <v-icon
                                    small
                                    @click="deleteItem(item)"
                                    outlined
                                  >
                                    mdi-delete
                                    </v-icon>
                                  </v-btn>
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
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search:'',
      genders:['ប្រុស', 'ស្រី'],
      headers: [
        
        {
          text: 'លេខសម្គាល់',
          align: 'start',
          sortable: false,
          value: 'id',
          width: '10%',
          class:'white--text'
        },
        { text: 'ឈ្មោះ', value: 'name', width: '10%',class:'white--text' },
        { text: 'ភេទ', value: 'gender', width: '10%',class:'white--text' },
        { text: 'លេខទូរស័ព្ទ', value: 'tel', width: '10%',class:'white--text' },
        { text: 'សកម្មភាព', value: 'actions', width: '10%', sortable: false,class:'white--text' },
      ],
      users: [],
      color:"#1E7E9C",
      editedIndex: -1,
      editedItem: {
        name: '',
        id: '',
        gender: '',
        tel: '',
        
      },
      defaultItem: {
        name: '',
        id: '',
        gender: '',
        tel: '',
        
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? "បង្កើតព័ត៌មានថ្មីរបស់អ្នកប្រើប្រាស់" : "កែប្រែព័ត៌មានរបស់អ្នកប្រើប្រាស់"
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.users = [
          {
            name: 'វុទ្ធី សម្បត្តិ',
            id: 'OBS-KSM 001',
            gender: 'ប្រុស',
           
            tel:'098234678',
            
          },
          {
            name: 'ចន ដូស',
            id: 'OBS-KSM 002',
            gender: 'ប្រុស',
            
            tel:'097876456',
            
          },
          {
            name: 'ធី បុប្ឋា',
            id: 'OBS-KSM 003',
            gender: 'ស្រី',
           
            tel:'098767493',
         
          },
          {
            name: 'ធីរក្ស ស្រី',
            id: 'OBS-KSM 004',
            gender: 'ស្រី',
            
            tel:'023456788',
           
          },
          {
            name: 'សុភី យ៉ា',
            id: 'OBS-KSM 005',
            gender: 'ស្រី',
           
            tel:'098765234',
           
          },
          {
            name: 'សុខ សាន្ត',
            id: 'OBS-KSM 006',
            gender: 'ប្រុស',
            
            tel:'098735664',
           
          },
          
          
          
          
          
        ]
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
