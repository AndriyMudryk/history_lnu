<template>
  <div class="history-view bg-dark d-flex">
    <div
      v-for="period in periods"
      :key="period.id"
      class="period bg-dark d-flex align-items-center justify-content-center px-3 border border-light">
      <h4 class="title text-center">
        {{ period.title }}
      </h4>
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
  background-image: url("../static/lnu.jpg");
  background-size: cover;

  .period {
    flex: 1;
    opacity: 0.9;
    color: #FFFFFF;
    transition: opacity, flex 0.5s ease;

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
