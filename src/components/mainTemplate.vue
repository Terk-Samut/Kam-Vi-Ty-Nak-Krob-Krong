<template>
  <v-app id="inspire">
    <v-app-bar app color="#1E7E9C" dark class="khmer-font">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <div>កម្មវិធីអ្នកគ្រប់គ្រង</div>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="khmer-font">
      <v-sheet
        class="text-center d-flex flex-column align-center justify-center"
        height="150"
      >
        <v-avatar size="120">
          <v-img src="../assets/image/itc_logo.png" />
        </v-avatar>
      </v-sheet>

      <v-list class="list">
        <v-list-item
          v-for="item in navigation"
          :key="item.title"
          :prepend-icon="item.icons"
          :title="item.title"
          @click="$router.push(encodeURI(item.link))"
          link
        />
      </v-list>
    </v-navigation-drawer>

    <v-main style="background-color: #fafafa">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(false);

const navigation = [
  {
    title: "ក្រាប ",
    link: "ក្រាប",
    icons: "mdi-chart-line",
  },
  {
    title: "ផែនទី ",
    link: "ផែនទី",
    icons: "mdi-map-marker",
  },
  {
    title: "តារាងកម្រិតទឹកសមុទ្រ ",
    link: "តារាងកម្រិតទឹកសមុទ្រ",
    icons: "mdi-water",
  },

  {
    title: "តារាងអ្នកប្រើប្រាស់ ",
    link: "តារាងអ្នកប្រើប្រាស់",
    icons: "mdi-account",
  },
];
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "Khmer OS Muol Light";
  src: url("@/assets/fonts/Khmer OS Siemreap.ttf") format("truetype");
}

body {
  font-family: "Khmer OS Siemreap", sans-serif;
}

.khmer-font {
  font-family: "Khmer OS Siemreap", sans-serif;
}

.khmer-font-title {
  font-size: 24px;
}

.khmer-font-body {
  font-size: 16px;
}
.list {
  padding: 0px;
  margin: 0px;
  color: #80cbc4;
}
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0px 30px;
}
</style>
