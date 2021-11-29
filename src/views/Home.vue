<template>
  <div class="home">
    <h2>Canary Dashboard</h2>
    <Summary />
    <div class="main">
      <Devices />
      <DeviceAlerts />
    </div>
  <hr>
  </div>
  <br>
</template>

<script>
// @ is an alias to /src
import Summary from "./dashboard/Summary.vue";
import Devices from "./dashboard/Devices.vue";
import DeviceAlerts from "./dashboard/DeviceAlerts.vue";

export default {
  name: "Home",
  components: {
    Summary,
    Devices,
    DeviceAlerts,
  },
  mounted() {
    this.$store.dispatch("fetchAllRecords");
  },
};
</script>

<style>
.main {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 20px 0;
}
</style>
