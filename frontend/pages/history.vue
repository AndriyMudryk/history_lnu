<template>
  <div class="history-view bg-dark d-flex">
    <div
      v-for="period in periods"
      :key="period.id"
      class="period-item bg-dark d-flex align-items-center justify-content-center px-3 border border-light"
      @click="onPeriodClick(period.id)">
      <h5 class="title text-center">
        {{ period.title }}
      </h5>
    </div>
  </div>
</template>

<script>
import api from "~/api";

export default {
  async asyncData() {
    const periods = await api.getPeriods();
    return {
      periods: periods
    };
  },

  methods: {
    onPeriodClick(periodId) {
      const me = this;
      me.$router.push({name: "period", query: {id: periodId}})
    }
  }
};
</script>

<style lang="scss">
.history-view {
  height: 100%;
  width: 100%;
  background-image: url("../static/lnu.jpg");
  background-size: cover;

  .period-item {
    flex: 1;
    opacity: 0.95;
    color: #FFFFFF;
    transition: opacity, flex 0.5s ease;
    cursor: pointer;

    &:hover {
      opacity: 1;
      background: transparent !important;
      flex: 1.1;

      .title:before {
        text-shadow: 0 1px 0 #000000;
      }
    }
  }
}
</style>
