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
        :class="{ ghost: device.ghost === 'True' }"
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
  <hr>
  <br>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Devices",
  computed: {
    ...mapState(["devices"]),
  },
};
</script>

<style>
.devices-table {
  width: 90%;
  margin: 20px auto;
}
.device,
.device-header {
  margin: 10px 0;
  padding: 10px 20px;
  display: flex;
  text-align: left;
  justify-content: space-around;
  border: 1px solid black;
}
.device-header {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 18px;
  background: rgb(173, 173, 173);
}
.device {
  border-radius: 5px;
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
.ghost {
  /* background: rgb(240, 228, 213); */
}
</style>