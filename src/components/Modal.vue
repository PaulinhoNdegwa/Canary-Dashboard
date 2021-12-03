<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <h3 style="text-align: center">Filtered Alerts</h3>
      <div v-if="filterNodeId">
        <p>
          Device: <strong>{{ getDeviceById(filterNodeId).name }}</strong>
        </p>
        <p>
          Filtered by: <strong>{{ labels[filterBy] }}</strong
          >. Value: <strong>{{ filterValue }}</strong>
        </p>
      </div>
      <div v-else>
        <p style="color: #000; font-size: 18px; margin-left: 15px">
          Filtered by: <strong>All unacknowledged alerts</strong>
        </p>
      </div>
      <button @click="closeModal" class="closeModal">X</button>
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

        <p style="text-align: center">
          Showing
          {{
            (unacknowledged
              ? this.filterUnacknowledgedAlerts.length
              : this.filterAlertsBy(
                  this.filterBy,
                  this.filterValue,
                  this.filterNodeId
                ).length) > pageSize
              ? pageSize
              : alerts.length
          }}
          /
          {{
            unacknowledged
              ? this.filterUnacknowledgedAlerts.length
              : this.filterAlertsBy(
                  this.filterBy,
                  this.filterValue,
                  this.filterNodeId
                ).length
          }}
        </p>
        <p style="text-align: center" class="pagination">
          <button :disabled="currentPage === 1" @click="prevPage">Prev</button>
          Page {{ currentPage }}/
          {{
            Math.ceil(
              (unacknowledged
                ? this.filterUnacknowledgedAlerts.length
                : this.filterAlertsBy(
                    this.filterBy,
                    this.filterValue,
                    this.filterNodeId
                  ).length) / pageSize
            )
          }}
          <button
            :disabled="
              Math.ceil(
                (unacknowledged
                  ? this.filterUnacknowledgedAlerts.length
                  : this.filterAlertsBy(
                      this.filterBy,
                      this.filterValue,
                      this.filterNodeId
                    ).length) / pageSize
              ) === currentPage
            "
            @click="nextPage"
          >
            Next
          </button>
        </p>
      </div>
      <h4 v-else>No alerts found</h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["filterBy", "filterValue", "filterNodeId", "unacknowledged"],
  data() {
    return {
      labels: {
        description: "Description",
        src_host: "Source Host",
        dst_host: "Destination Host",
      },
      pageSize: 7,
      currentPage: 1,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    nextPage() {
      if (
        this.currentPage * this.pageSize < this.unacknowledged
          ? this.filterUnacknowledgedAlerts.length
          : this.filterAlertsBy(
              this.filterBy,
              this.filterValue,
              this.filterNodeId
            ).length
      )
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  mounted() {
    document.body.classList.add("modal-open");
  },
  computed: {
    ...mapGetters([
      "filterAlertsBy",
      "getDeviceById",
      "filterUnacknowledgedAlerts",
    ]),
    alerts() {
      let alerts = [];
      if (this.unacknowledged) {
        alerts = this.filterUnacknowledgedAlerts;
      } else {
        alerts = this.filterAlertsBy(
          this.filterBy,
          this.filterValue,
          this.filterNodeId
        );
      }
      return alerts.filter((device, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },
  },
};
</script>

<style scoped>
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  right: 0;
}
.modal {
  position: relative;
  width: 60%;
  padding: 40px;
  margin: 55px auto;
  background: white;
  border-radius: 10px;
  text-align: left;
}
.closeModal {
  position: absolute;
  top: 40px;
  right: 50px;
  background: crimson;
  color: #fff;
  border: none;
  font-weight: 600;
  padding: 3px 6px;
}
.closeModal:hover {
  cursor: pointer;
  background: red;
  font-weight: 900;
}
.modal .scrollable {
  height: 550px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 10px;
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
.modal p {
  font-size: 17px;
  margin: 15px 0;
}
.alert {
  padding: 8px 10px;
}
.alert td {
  font-size: 14px;
}
@media screen and (max-width: 1200px) {
  .backdrop {
    width: 100%;
    font-size: 13px;
  }
  .alert {
    padding: 5px;
  }
  .alert td {
    font-size: 13px;
  }
}
</style>