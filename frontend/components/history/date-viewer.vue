<template>
  <div class="date-viewer">
    <div 
      v-for="(event, index) in data.events"
      :key="index"
      class="event-wrapper mt-2 d-flex"
      :class="[direction(index) ? 'left' : 'right']">
      <event
        :direction="direction(index)"
        :event="event"/>
    </div>
  </div>
</template>

<script>
import event from "~/components/history/event";

export default {
  name: "DateViewer",

  components: {
    event
  },

  props: {
    data: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      
    };
  },

  methods: {
    direction(index) {
      return index % 2 === 0 ? 1 : 0;
    }
  }
};
</script>

<style lang="scss">
.date-viewer {
  overflow-y: auto;
  overflow-x: hidden;
  height: 70vh;
  width: 100vw;

  .event-wrapper {
    width: 100vw;

    &.left {
      justify-content: flex-start;
    }

    &.right {
      justify-content: flex-end;
    }
  }
}
</style>
