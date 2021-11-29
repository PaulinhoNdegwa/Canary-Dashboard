<template>
  <div class="home">
    <h3>Canary Dashboard</h3>
    <Summary />
  </div>
</template>

<script>
// @ is an alias to /src
import Summary from "./dashboard/Summary.vue";
export default {
  name: "Home",
  components: {
    Summary,
  },
  mounted() {
    this.$store.dispatch("fetchAllRecords");
  },
};
</script>
