<template>
  <v-main style="padding: 20px 20px; background-color: #ffffff">
    <v-card class="khmer-font" width="100%">
      <div class="chart-wrapper aligh-item-center khmer-font">
        <apexchart width="1000" type="line" :options="options" :series="series">
        </apexchart>
      </div>
    </v-card>
  </v-main>
</template>
<script>
export default {
  name: "HelloWorld",
  data: () => ({
    options: {
      chart: {
        id: "vuechart-example",
      },
      title: {
        text: "តម្លៃ EC ប្រចាំខែ",
        align: "left",
      },
      xaxis: {
        categories: [
          "មករា",
          "កុម្ភៈ",
          "មីនា",
          "មេសា",
          "ឧសភា",
          "មិថុនា",
          "កក្កដា",
          "សីហា",
          "កញ្ញា",
          "តុលា",
          "វិច្ឆិការ",
          "ធ្នូ",
        ],
      },
    },
    series: [
      {
        name: "តម្លៃ EC",
        data: [55, 62, 89, 66, 98, 72, 101, 75, 94, 120, 117, 139],
      },
    ],
  }),
};
</script>
<style scoped>
@font-face {
  font-family: "Khmer OS Siemreap  ";
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
</style>
