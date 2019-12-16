<template>
  <div class="period d-flex flex-column">
    <div class="events-wrapper flex-grow-1">
      <events
        :period-id="period.id"
        :search="searchPattern"/>
    </div>
      <div class="bottom-period-info container-fluid bg-dark p-3">
        <div class="d-flex">
          <h6 class="period-title text-white pt-1">
            {{period.title}}
          </h6>
          <svg-icon
            :icon="isDescriptionOpen ? 'info' : 'info'"
            class="description-icon ml-2"
            @click="toggleDescription"/>
          <div class="search d-flex alight-items-center">
            <div 
              v-show="searchHidden"
              class="text-white mr-3 pt-1"
              @click="onSearchClick">
              {{searchPattern}}
            </div>
            <input 
              type="text"
              ref="searchInput"
              v-show="!searchHidden"
              v-model="searchPattern"
              class="search-input text-white mr-3"
              @keyup.enter="onSearch"
              @blur="onSearch"/>
            <svg-icon
              icon="account"
              class="search-icon"
              @click="onSearchClick"/>
          </div>
        </div>
        <div 
          v-if="isDescriptionOpen"
          class="text-white px-5">
          {{period.description}}
        </div>
      </div>
  </div>
</template>

<script>
import api from "~/api";
import events from "~/components/events";

export default {
  components: {
    events: events
  },

  async asyncData({route, redirect}) {
    let period;
    const periodId = route.query.id;
    if(periodId) {
      period = await api.getPeriod(periodId);
    } else {
      redirect("/history");
    }
    return {
      period: period,
      searchHidden: true,
      searchPattern: "",
      isDescriptionOpen: false
    };
  },

  methods: {
    onSearchClick() {
      const me = this;
      me.searchHidden = false;
      me.$nextTick(
        function () {
          me.$refs.searchInput.focus();
        }
      );
    },

    onSearch() {
      const me = this;
      me.searchHidden = true;
      me.$refs.searchInput.blur();
    },

    toggleDescription() {
      const me = this;
      me.isDescriptionOpen = !me.isDescriptionOpen
    }
  }
};
</script>

<style lang="scss">
.period {
  width: 100%;
  height: 100%;
  background-image: url("../static/lnu.jpg");
  background-size: cover;

  .events-wrapper {
    overflow: auto;
  }

  .bottom-period-info {

    .description-icon {
      svg {
        fill: #FFFFFF;
      }
    }

    .search {
      margin-left: auto;

      .search-input {
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        border: none;
        width: auto;
        outline: none;

        &:focus {
          border-bottom: 1px solid #FFFFFF;
        }
      }

      .search-icon {
        font-size: 20px;

        svg {
          fill: #FFFFFF;
        }
      }
    }
  }
}
</style>
