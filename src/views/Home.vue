<template>
  <Loader v-if="loading" />
  <div class="error" v-if="fetching_error">
    Ooops! Error fetching devices. Try again later or contact support
  </div>
  <div v-if="devices.length" class="home">
    <div class="summary-container">
      <h2>{{ greeting }} John Doe,</h2>
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
  <div class="error" v-if="!devices.length && !loading && !fetching_error">
    Sorry, No devices found
  </div>
  <br />
</template>

<script>
// @ is an alias to /src
import Summary from "./dashboard/Summary.vue";
import Devices from "./dashboard/Devices.vue";
import DeviceAlerts from "./dashboard/DeviceAlerts.vue";
import Loader from "../components/Loader.vue";
import { mapGetters, mapState } from "vuex";
import { greeting } from "../utils/utils";

export default {
  name: "Home",
  components: {
    Summary,
    Devices,
    DeviceAlerts,
    Loader,
  },
  mounted() {
    this.$store.dispatch("fetchAllRecords");
  },
  computed: {
    ...mapGetters(["countUnacknowledgedAlerts"]),
    greeting() {
      return greeting();
    },
    ...mapState(["devices", "loading", "fetching_error"]),
  },
};
</script>

<style>
.summary-container {
  margin: 0 20px;
  padding: 10px 0;
  border-radius: 5px;
  background: linear-gradient(135deg, #008479 0%, #02f15d 80%);
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
  color: rgb(226, 226, 226);
}
.summary-container > h3 {
  font-size: 20px;
  text-align: left !important;
  margin-left: 45px;
  color: rgb(230, 230, 230);
}
.summary-container > h3 > strong {
  font-style: italic;
  color: crimson;
  font-weight: 700;
}
.devices-container > h3,
.alerts-container > h3 {
  text-transform: capitalize;
  color: #000;
  font-size: 22px;
  text-align: left;
  margin: 20px 0 10px 0;
}
.error {
  font-size: 20px;
  color: crimson;
  margin: 20px 0;
}
</style>
