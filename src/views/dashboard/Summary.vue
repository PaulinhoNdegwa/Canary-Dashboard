<template>
  <div class="summary">
    <div class="device-count">
      <h1>{{ devices.length }}</h1>
      <p>devices</p>
    </div>

    <div class="alert-count">
      <h1>{{ alerts.length }}</h1>
      <p>alerts</p>
    </div>

    <div class="device-count">
      <h3>Devices</h3>
      <div
        class="alerts-count"
        v-for="device in getAlertsPerDevice"
        :key="device.device"
      >
        <span>{{ device.device }}: </span>
        <span>
          <strong>{{ device.alerts_count }}</strong>
        </span>
      </div>
    </div>

    <div class="alert-count">
      <h3>Alerts</h3>
      <div class="alerts-count">
        <span>Acknowledged: </span>
        <span
          ><strong>{{ countAcknowledgedAlerts }}</strong></span
        >
      </div>
      <div class="alerts-count">
        <span>Unacknowledged: </span>
        <span
          ><strong>{{ countUnacknowledgedAlerts }}</strong></span
        >
      </div>
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
      "getAlertsPerDevice",
    ]),
  },
};
</script>

<style>
.summary {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background: #fff;
  margin: 0 20px;
  border-radius: 5px;
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
  width: 315px;
  border: 1px #888 solid;
  border-radius: 5px;
  margin: 20px;
}
.device-count h1,
.alert-count h1 {
  margin: 30px 10px 10px 10px;
  font-size: 44px;
}
.device-count h3 {
  margin: 10px 0 5px 0;
  /* text-decoration: underline; */
  text-transform: uppercase;
  color: #000;
}

.alert-count h3 {
  margin: 20px 0 5px 0;
  /* text-decoration: underline; */
  text-transform: uppercase;
  color: #000;
}
.device-count strong,
.alert-count strong {
  color: #000;
}
.alerts-count {
  text-align: left;
  padding: 2px 30px;
  display: flex;
  justify-content: space-between;
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