<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <h3>Filtered Alerts</h3>
      <!-- <p>Filter by {{ filterBy }}. Value: {{ filterValue }}</p> -->
      <p>Showing {{ alerts.length }} alerts</p>
      <div v-if="alerts.length" class="scrollable">
        <table class="alerts-table">
          <tr class="alert-header">
            <th>Alert</th>
            <th>Destination</th>
            <th>Source</th>
            <th>Created</th>
          </tr>
          <tr
            v-for="alert in alerts"
            :key="alert.id"
            class="alert"
            :class="{ acknowledged: alert.acknowledged === 'True' }"
          >
            <td>{{ alert.description ? alert.description : "-" }}</td>
            <td>{{ alert.dst_host ? alert.dst_host : "-" }}</td>
            <td>{{ alert.src_host ? alert.src_host : "-" }}</td>
            <td>{{ alert.created_age ? alert.created_age : "-" }} ago</td>
          </tr>
        </table>
      </div>
      <h4 v-else>No alerts found</h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["filterBy", "filterValue", "filterNodeId"],
  data() {
    return {
      alerts: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  mounted() {
    document.body.classList.add("modal-open");
    this.alerts = this.filterAlertsBy(
      this.filterBy,
      this.filterValue,
      this.filterNodeId
    );
  },
  computed: {
    ...mapGetters(["filterAlertsBy"]),
  },
};
</script>

<style>
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 54%;
  height: 100%;
  right: 0;
}
body.modal-open {
  overflow: hidden;
}
.modal {
  width: 85%;
  padding: 20px;
  margin: 70px auto;
  background: white;
  border-radius: 10px;
}

.modal .scrollable {
  height: 550px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15px;
}
.scrollable .alert:hover {
  font-size: 15px;
  cursor: auto;
}
.scrollable .alert td:hover {
  cursor: auto;
}
.modal h3 {
  color: #00aa93;
  border: none;
  padding: 0;
}
@media screen and (max-width: 1000px) {
  .backdrop {
    width: 100%;
    font-size: 13px;
  }
  .alert {
      padding: 5px;
  }
  .alert td{
    font-size: 13px;
  }
}
</style>