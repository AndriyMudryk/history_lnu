<template>
  <div
    v-on-clickaway="onDropdownAway"
    :class="{'show': isOpen}"
    class="dropdown"
    @click="onDropdownClick">
    <slot name="dropdownTrigger"/>
    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="dropdown-menu"
        role="menu"
        :class="{'show': isOpen}">
        <slot name="dropdownMenu"/>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [
    clickaway
  ],

  data() {
    return {
      isOpen: false
    };
  },

  methods: {
    onDropdownAway() {
      const me = this;
      me.isOpen = false;
      me.fireChangeEvent();
    },

    onDropdownClick() {
      const me = this;
      me.isOpen = !me.isOpen;
      me.fireChangeEvent();
    },

    fireChangeEvent() {
      const me = this;
      me.$emit("change", {
        isOpen: me.isOpen
      });
    }
  }
};
</script>

<style lang="scss">
.dropdown {

  /* Dropdown animation*/
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 1s, transform 1s;
  }

  .dropdown-enter,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-38px);
  }
}
</style>