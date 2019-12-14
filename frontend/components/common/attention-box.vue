<template>
  <div :class="error ? 'attention-box-error' : 'attention-box'">
    <svg-icon
      icon="attention"/>
  </div>
</template>

<script>
import svgIcon from "~/components/common/svg-icon.vue";

export default {
  components: {
    "svg-icon": svgIcon
  },

  props: {
    error: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">

@import "../../scss/variables";

.attention-box {
  .svg-icon {
    fill: #F4BB82;
    width: 5em;
    height: 5em;
  }
}

.attention-box-error {
  .svg-icon {
    fill: $light-red;
    width: 7em;
    height: 7em;
  }
}
</style>