<template>
  <div 
    class="year-select text-white d-flex align-items-center">
    <font-awesome-icon 
      :icon="['fas', 'chevron-left']" 
      size="lg"
      class="arrow"
      :class="{'disabled': yearIndex === 0}"
      @click="onArrowClick(-1)"/>
    <h2 class="year mx-5">
      {{ years[yearIndex].year }}
    </h2>
    <font-awesome-icon 
      :icon="['fas', 'chevron-right']" 
      size="lg"
      class="arrow"
      :class="{'disabled': yearIndex === years.length - 1}"
      @click="onArrowClick(1)"/>
  </div>
</template>

<script>
export default {
  name: "Event",

  props: {
  	years: {
  		type: Array,
  		require: true
  	}
  },

  data() {
    return {
      yearIndex: 0
    };
  },

  mounted() {
    const me = this;
    me.$emit("select", me.years[0]);
  },

  methods: {
    onArrowClick(direction) {
      const me = this;
      const nextIndex = me.yearIndex + direction;
      if (nextIndex >= 0 && nextIndex < me.years.length) {
        me.yearIndex = nextIndex;
        me.$emit("select", me.years[nextIndex]);
      } 
    }
  }
};
</script>

<style lang="scss">
.year-select {

  .year {
    cursor: pointer;
    user-select: none;
  }

  .arrow {
    cursor: pointer;

    &.disabled {
      color: #8A8A8A;
      cursor: default;
    }
  }
}
</style>
