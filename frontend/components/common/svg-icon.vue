<template>
  <div
    :class="icon + '-icon'"
    class="svg-icon"
    @click="onIconClick($event)">
    <svg>
      <use :xlink:href="iconXlink"/>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
      // todo add strong validation to add only available icons
    }
  },

  computed: {
    iconXlink() {
      const me = this;
      return "#shape-" + me.icon;
    }
  },

  methods: {
    onIconClick($event) {
      const me = this;
      me.$emit("click", $event);
    }
  }
};

</script>

<style lang="scss">
/* Fix SVG align to the text https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4 */
.svg-icon {
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;

  svg {
    height: 1em;
    width: 1em;
    position: absolute;
    bottom: -0.125em;
  }

  &.svg-no-baseline {

    svg {
      position: initial;
      bottom: initial;
    }
  }
}
</style>