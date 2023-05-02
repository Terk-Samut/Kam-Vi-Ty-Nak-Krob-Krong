<template>
  <v-app id="inspire" >
    <v-app-bar
        app
        color="#1E7E9C"
        dark
        class="khmer-font"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="d-flex align-center">
          <div>កម្មវិធីអ្នកគ្រប់គ្រង</div>
        </div>
        <v-spacer></v-spacer>
  
      
      </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="khmer-font">
      <v-sheet class="text-center d-flex flex-column align-center justify-center" height="150" >
              <v-avatar size="120">
                  <img
                  :src="images.sample" >
              </v-avatar>
              
            </v-sheet>
            
      <v-list v-for="navigator in navigation" :key="navigator.title" class="list" >
        
        <div v-if="navigator.group">
          <v-list-group
            v-for="item in navigator.items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="child in item.items"
              :key="child.title"
              :to="child.link"
              link>
              <v-list-item-icon>
                <v-icon v-text="child.icons"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
        <div v-else>
          <v-list-item 
            v-for="item in navigator.items"
            :key="item.title"
            :to="item.link"
            link>
            <v-list-item-icon>
              <v-icon v-text="item.icons"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

   
    <v-main style="background-color:#FAFAFA;">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
    name: "mainTemplate",
    data: () => ({
        drawer: null,
        images: {
                  sample: require('../assets/image/itc_logo.png')
              },
        navigation: [
        
        {
              group: false,
              title: "ក្រាប",
              items: [{ 
              title: "ក្រាប ", 
              link: "ក្រាប",
              icons: "mdi-chart-line"
              }],
          },
          {
              group: false,
              title: "ផែនទី",
              items: [{ 
              title: "ផែនទី ", 
              link: "ផែនទី",
              icons: "mdi-map-marker"
              }],
          },
        {
              group: false,
              title: "តារាងកម្រិតទឹកសមុទ្រ",
              items: [{ 
              title: "តារាងកម្រិតទឹកសមុទ្រ ", 
              link: "តារាងកម្រិតទឹកសមុទ្រ",
              icons: "mdi-water"
              }],
          },
        
              {
              group: false,
              title: "តារាងអ្នកប្រើប្រាស់",
              items: [{ 
              title: "តារាងអ្នកប្រើប្រាស់ ", 
              link: "តារាងអ្នកប្រើប្រាស់",
              icons: "mdi-account"
              }],
          },
  
        
        ],
    }),
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'Khmer OS Muol Light';
  src: url('@/assets/fonts/Khmer OS Siemreap.ttf') format('truetype');
}

body {
  font-family: 'Khmer OS Siemreap', sans-serif;
}

.khmer-font {
  font-family: 'Khmer OS Siemreap', sans-serif;
}

.khmer-font-title {
  font-size: 24px;
}

.khmer-font-body {
  font-size: 16px;
}
.list{
  padding: 0px;
  margin: 0px;
  color: #80CBC4;
}
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0px 30px;
  
}

</style>
