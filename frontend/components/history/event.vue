<template>
  <div 
    class="event p-4 d-flex"
    :class="[direction ? 'left' : 'right']">
    <img
      class="event-image col-5"
      :src="event.img">
    <div class="pl-4 col-7 text-white">
      <h4>
        {{ event.title }}
      </h4>
      <div 
        class="d-block text-truncate"
        :title="event.desc">
        {{ event.desc }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Event",

  props: {
    direction: {
      type: Number,
      require: true
    },

    event: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      
    };
  },
};
</script>

<style lang="scss">
.event {
  width: calc(50vw + 2px);
  cursor: pointer;
  transition: background-color 0.5s ease-out;

  &:hover {
    background-color: #a89d32;
  }

  .event-image {
    max-width: 200px;
    height: auto;
  }

  &.left {
    flex-direction: row-reverse;
    border-right: 4px solid #a89d32;
  }

  &.right {
    border-left: 4px solid #a89d32; 
  }
}
</style>
