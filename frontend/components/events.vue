<template>
  <div
    class="events container pt-5">
    <div
      v-for="event in events"
      :key="event.id"
      :class="{'flex-row-reverse': event.id % 2 === 0}"
      class="d-flex event-wrapper bg-dark p-2 my-2 shadow shadow-sm border border-white">
      <div class="flex-grow-1">
        <h5 class="text-white m-3">
          {{event.title}}
        </h5>
        <div class="text-white mx-3 mb-3">
          {{event.description}}
        </div>
      </div>
      <div class="m-3">
        <imageViewer
          :event-id="event.id"/>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import api from "~/api";
import imageViewer from "~/components/image-viewer";

export default {
  components: {
    imageViewer
  },

  props: {
    periodId: {
      type: Number,
      required: true
      // todo add strong validation to add only available icons
    },

    search: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      events: []
    }
  },

  mounted() {
    const me = this;
    me.getEvents();
  },

  watch: {
    periodId() {
      const me = this;
      me.getEvents();
    },

    search() {
      const me = this;
      me.getEvents();
    }
  },

  methods: {
    getEvents() {
      const me = this;
      api.getEvents({
        periodId: me.periodId,
        search: me.search
      }).then(
        function (events) {
          me.events = events;
        }
      );
    }
  }
};

</script>

<style lang="scss">
.events {
  height: 100%;

  .event-wrapper {
    opacity: 0.97;
  }
}
</style>