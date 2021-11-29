<template>
  <div class="alerts-container">
    <h3>Device Alerts</h3>
    <h4 v-if="!selectedDevice">Click on a device to display it's alerts</h4>
    <h4 v-if="selectedDevice && getDeviceAlerts(selectedDevice).length === 0 ">No alerts on this device</h4>
    <div v-if="selectedDevice" class="scrollable">
      <table class="alerts-table">
        <tr class="alert-header">
          <th>Alert</th>
          <th>Destination</th>
          <th>Source</th>
          <th>Created</th>
        </tr>
        <tr
          v-for="alert in getDeviceAlerts(selectedDevice)"
          :key="alert.id"
          class="alert"
          :class="{ acknowledged: alert.acknowledged === 'True' }"
        >
          <td>{{ alert.description }}</td>
          <td>{{ alert.dst_host }}</td>
          <td>{{ alert.src_host }}</td>
          <td>{{ alert.created_age }} ago</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "DeviceDetails",
  data() {
    return {
      alerts: [],
    };
  },
  computed: {
    ...mapGetters(["getDeviceAlerts"]),
    ...mapState(["selectedDevice"]),
  },
};
</script>

<style>
.alerts-container {
  width: 800px;
  margin: 0 20px;
}
.scrollable {
  width: 100%;
  height: 800px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
}
.scrollable::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(82, 82, 82, 0.3);
}
.scrollable::-webkit-scrollbar {
  width: 1em;
}
.scrollable::-webkit-scrollbar-thumb {
  background-color: #b4b4b4;
  outline: 1px solid rgb(78, 78, 78);
  border-radius: 2px;
  margin: 10px 0;
}
.alerts-table {
  width: 100%;
}
.alert,
.alert-header {
  margin: 10px 0;
  padding: 10px 20px;
  display: flex;
  text-align: left;
  justify-content: space-around;
  border: 1px solid black;
}
.alert-header {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 15px;
  background: rgb(218, 218, 218);
  border: none;
  border-bottom: 1px solid black;
  
}
.alert {
  padding: 15px 20px;
  align-self: center;
  font-size: 15px;
  background: crimson;
  color: #fff;
}
.alert:hover {
  transform: scaleY(1.1);
  font-size: 16px;
  cursor: pointer;
  color: #000;
}
.alert td,
.alert-header th {
  display: block;
  width: 100%;
  text-align: center;
}
.acknowledged {
  background: rgb(132, 248, 132);
  color: #000;
}
</style>