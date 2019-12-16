<template>
  <div class="history-view bg-dark d-flex">
    <div
      v-for="period in periods"
      :key="period.id"
      class="period d-flex align-items-center justify-content-center px-3 flex-grow-1">
      {{ period.title }}
    </div>
  </div>
</template>

<script>
import api from "~/api";

export default {
/*  data() {
    return {

    };
  },*/

  async asyncData() {
    const periods = await api.getPeriods();
    return {
      periods: periods
    };
  }
};
</script>

<style lang="scss">
.history-view {
  height: 100%;
  width: 100%;
}
</style>
