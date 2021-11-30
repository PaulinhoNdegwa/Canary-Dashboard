<template>
  <div class="alerts-container">
    <h3>Device Alerts</h3>
    <h4 v-if="!selectedDevice">Click on a device to display it's alerts</h4>
    <h4 v-if="selectedDevice && getDeviceAlerts(selectedDevice).length === 0">
      No alerts on this device
    </h4>
    <div v-if="selectedDevice" class="device-alerts">
      <table class="alerts-table">
        <tr class="alert-header">
          <th @click="sort('description')">
            Alert
            <i
              v-if="currentSort === 'description' && currentSortDir === 'asc'"
              class="fa fa-angle-double-up"
            ></i>
            <i
              v-if="currentSort === 'description' && currentSortDir === 'desc'"
              class="fa fa-angle-double-down"
            ></i>
          </th>
          <th @click="sort('dst_host')">
            Destination
            <i
              v-if="currentSort === 'dst_host' && currentSortDir === 'asc'"
              class="fa fa-angle-double-up"
            ></i>
            <i
              v-if="currentSort === 'dst_host' && currentSortDir === 'desc'"
              class="fa fa-angle-double-down"
            ></i>
          </th>
          <th @click="sort('src_host')">
            Source
            <i
              v-if="currentSort === 'src_host' && currentSortDir === 'asc'"
              class="fa fa-angle-double-up"
            ></i>
            <i
              v-if="currentSort === 'src_host' && currentSortDir === 'desc'"
              class="fa fa-angle-double-down"
            ></i>
          </th>
          <th @click="sort('created')">
            Created
            <i
              v-if="currentSort === 'created' && currentSortDir === 'asc'"
              class="fa fa-angle-double-up"
            ></i>
            <i
              v-if="currentSort === 'created' && currentSortDir === 'desc'"
              class="fa fa-angle-double-down"
            ></i>
          </th>
        </tr>
        <tr
          v-for="alert in alerts"
          :key="alert.id"
          class="alert"
          :class="{ acknowledged: alert.acknowledged === 'True' }"
        >
          <td
            class="clickable"
            @click="
              toggleModal('description', alert.description, alert.node_id)
            "
          >
            {{ alert.description ? alert.description : "-" }}
          </td>
          <td
            class="clickable"
            @click="toggleModal('dst_host', alert.dst_host, alert.node_id)"
          >
            {{ alert.dst_host ? alert.dst_host : "-" }}
          </td>
          <td
            class="clickable"
            @click="toggleModal('src_host', alert.src_host, alert.node_id)"
          >
            {{ alert.src_host ? alert.src_host : "-" }}
          </td>
          <td class="created-date">
            {{ alert.created_age ? alert.created_age : "-" }}
            ago
            <span class="created-date-tooltip">{{
              alert.created_printable
            }}</span>
          </td>
        </tr>
      </table>
      <p>
        Showing
        {{
          this.getDeviceAlerts(this.selectedDevice).length > pageSize
            ? pageSize
            : this.getDeviceAlerts(this.selectedDevice).length
        }}
        /
        {{ this.getDeviceAlerts(this.selectedDevice).length }}
      </p>

      <p class="pagination">
        <button :disabled="currentPage === 1" @click="prevPage">Prev</button>
        Page {{ currentPage }}/
        {{
          Math.ceil(this.getDeviceAlerts(this.selectedDevice).length / pageSize)
        }}
        <button
          :disabled="
            Math.ceil(
              this.getDeviceAlerts(this.selectedDevice).length / pageSize
            ) === currentPage
          "
          @click="nextPage"
        >
          Next
        </button>
      </p>
    </div>
    <Modal
      v-if="showModal && filterBy && filterValue"
      @close="toggleModal"
      :filterBy="filterBy"
      :filterValue="filterValue"
      :filterNodeId="filterNodeId"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Modal from "../../components/Modal.vue";
export default {
  name: "DeviceDetails",
  components: { Modal },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      showModal: false,
      filterBy: null,
      filterValue: null,
      filterNodeId: null,
      currentSort: "created",
      currentSortDir: "desc",
    };
  },
  methods: {
    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir == "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    nextPage() {
      if (
        this.currentPage * this.pageSize <
        this.getDeviceAlerts(this.selectedDevice).length
      )
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    toggleModal(filter_by, value, node_id) {
      this.showModal = !this.showModal;
      this.filterBy = filter_by;
      this.filterValue = value;
      this.filterNodeId = node_id;
      document.body.classList.remove("modal-open");
    },
  },
  computed: {
    ...mapGetters(["getDeviceAlerts"]),
    ...mapState(["selectedDevice"]),

    alerts() {
      return this.getDeviceAlerts(this.selectedDevice)
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
        .filter((device, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
  },
  watch: {
    selectedDevice(oldVal) {
      this.showModal = false;
      this.filterBy = null;
      this.filterValue = null;
      this.filterNodeId = null;
      this.currentPage = 1;
      this.currentSort = "created";
      this.currentSortDir = "desc";
    },
  },
};
</script>

<style>
.alerts-container {
  width: 800px;
  margin: 0 20px;
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
.alert-header:hover {
  cursor: pointer;
}
.alert-header i {
  margin: 3px;
  font-weight: 600;
}
.alert {
  padding: 15px 20px;
  align-self: center;
  font-size: 15px;
  border: 1px crimson solid;
  color: #000;
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
.alert .clickable:hover {
  font-weight: 600;
  color: #3385ff;
}
.acknowledged {
  border: 1px green solid;
  color: #000;
}
.pagination {
  margin: 10px 0;
}
.pagination button {
  padding: 5px 10px;
  margin: 5px 10px;
  border-radius: 2px;
  font-size: 15px;
}
.pagination button:hover {
  background: #ddd;
  cursor: pointer;
}
.pagination p {
  display: inline-block;
}
.device-alerts p {
  margin: 10px 0;
  font-style: italic;
}
.created-date {
  /* Set cell data to relative in order to position tooltip absolutely */
  position: relative;
}
.created-date-tooltip {
  /* Hide tooltip until cell is hovered */
  visibility: hidden;
  font-size: 13px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 5px;
  /* Position the tooltip to the top */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  width: 150px;
  margin-left: -75px;
}
.created-date:hover .created-date-tooltip {
  visibility: visible;
}
</style>