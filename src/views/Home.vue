<template>
  <div class="home">
    <div class="summary-container">
      <h2>Hi John Doe,</h2>
      <h3>
        You have <strong>{{ countUnacknowledgedAlerts }}</strong> unacknowledged
        alerts
      </h3>
      <Summary />
    </div>
    <div class="main">
      <Devices />
      <DeviceAlerts />
    </div>
    <hr />
  </div>
  <br />
</template>

<script>
// @ is an alias to /src
import Summary from "./dashboard/Summary.vue";
import Devices from "./dashboard/Devices.vue";
import DeviceAlerts from "./dashboard/DeviceAlerts.vue";
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["countUnacknowledgedAlerts"]),
  },
};
</script>

<style>
.summary-container {
  margin: 0 20px;
  padding: 10px 0;
  background: #fff;
  border-radius: 5px;
}
.main {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 20px 20px;
  padding: 10px 15px;
  background: #fff;
  border-radius: 5px;
}
.summary-container > h2 {
  font-size: 30px;
  text-align: left !important;
  margin-left: 45px;
  font-weight: 900;
  color: rgb(0, 13, 128);
}
.summary-container > h3 {
  font-size: 20px;
  text-align: left !important;
  margin-left: 45px;
  /* color: #000; */
}
.summary-container > h3 > strong {
  font-style: italic;
  color: crimson;
}
.devices-container > h3,
.alerts-container > h3 {
  text-transform: capitalize;
  color: #000;
  font-size: 22px;
  text-align: left;
  margin: 20px 0 10px 0;
}
</style>
