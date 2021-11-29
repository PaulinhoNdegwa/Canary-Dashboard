<template>
  <div class="home">
    <h3>Canary Dashboard</h3>
    <Summary />
    <Devices />
  </div>
</template>

<script>
// @ is an alias to /src
import Summary from "./dashboard/Summary.vue";
import Devices from "./dashboard/Devices.vue";

export default {
  name: "Home",
  components: {
    Summary,
    Devices
  },
  mounted() {
    this.$store.dispatch("fetchAllRecords");
  },
};
</script>
