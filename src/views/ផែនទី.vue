<template>
  <div class="map-container">
    <div ref="mapElement" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

onMounted(()=>{
  initMap();
});

const mapElement = ref(null);

const initMap = () => {
      // Create a new map instance
      const map = L.map(mapElement.value, {
        center: [12.5657, 104.991],
        zoom: 7,
      });

      // Add the tile layer to the map
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Add a marker to the map with a popup
      const marker = L.marker([11.5621, 104.8885]).addTo(map);
      marker.bindPopup("Phnom Penh");
      marker.openPopup();
}

</script>

<style scoped>
.map-container {
  height: 100%;
}

.map {
  height: 100%;
}
</style>
