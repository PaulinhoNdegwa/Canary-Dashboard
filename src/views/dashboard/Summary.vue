<template>
  <div class="summary">
    <div class="device-count">
      <h1>{{ devices.length }}</h1>
      <p>devices</p>
      <hr style="width: 100%" />
      <span
        >Ghosts: <strong>{{ countGhostDevices }}</strong></span
      >
    </div>
    <div class="alert-count">
      <h1>{{ alerts.length }}</h1>
      <p>alerts</p>
      <hr style="width: 100%" />
      <span
        >Acknowledged: <strong>{{ countAcknowledgedAlerts }}</strong></span
      >
      <span
        >Unacknowledged: <strong>{{ countUnacknowledgedAlerts }}</strong></span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Summary",
  computed: {
    ...mapState(["alerts", "devices"]),
    ...mapGetters([
      "countAcknowledgedAlerts",
      "countUnacknowledgedAlerts",
      "countGhostDevices",
    ]),
  },
};
</script>

<style>
.summary {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.device-count h1 {
  color: green;
}
.alert-count h1 {
  color: crimson;
}
.device-count,
.alert-count {
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 20px 10px;
  width: 250px;
  border: 1px #888 solid;
  border-radius: 5px;
  margin: 20px;
}
.device-count h1,
.alert-count h1 {
  margin: 10px 10px 0 10px;
  font-size: 44px;
}
.device-count p,
.alert-count p {
  margin: 0 10px 10px 10px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  color: gray;
}

.device-count span,
.alert-count span {
  color: rgb(70, 67, 67);
  display: inline-block;
  margin: 5px 0 0 0;
}
</style>