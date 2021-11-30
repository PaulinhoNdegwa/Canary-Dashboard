<template>
  <div class="devices-container">
    <h3>Your devices</h3>
    <table class="devices-table">
      <tr class="device-header">
        <th>Device</th>
        <th>Description</th>
        <th>Live</th>
      </tr>
      <tr
        class="device"
        v-for="device in devices"
        :key="device.device_id"
        :class="{ selected: device.device_id === selectedDevice }"
        @click="deviceDetails(device.device_id)"
      >
        <td class="device-details">
          <span class="name">{{ device.name }}</span>
          <span class="ip-address">{{ device.ip_address }}</span>
        </td>
        <td>{{ device.description }}</td>
        <td>{{ device.device_live }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Devices",
  computed: {
    ...mapState(["devices", "selectedDevice"]),
  },
  methods: {
    deviceDetails(device_id) {
      this.setSelectedDevice(device_id)
    },
    ...mapActions(['setSelectedDevice'])
  },
};
</script>

<style>
.devices-container {
    width: 600px;
}
.devices-table {
  width: 100%;
  margin: 10px auto;
}
.device,
.device-header {
  margin: 10px 0;
  padding: 10px 20px;
  display: flex;
  text-align: left;
  justify-content: space-around;
  border: 1px solid #ddd;
}
.device-header {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 18px;
  background: rgb(218, 218, 218);
  border: none;
  border-bottom: 1px solid black;
}
.device {
  background: rgb(238, 238, 238);
  padding: 15px 20px;
  align-self: center;
  font-size: 16px;
}
.device:hover {
  transform: scaleY(1.1);
  background: rgb(255, 249, 242);
  cursor: pointer;
}
.device td,
.device-header th {
  display: block;
  width: 100%;
  text-align: center;
}
.device-details {
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
}
.device-details span {
  display: inline-block;
  margin: 4px 10px;
}
.device-details .name {
  font-weight: 600;
}
.device-details .ip-address {
  font-style: italic;
}
.selected {
    background: dimgrey;
    color: white;
}
.selected:hover {
    background: dimgrey;
}
</style>