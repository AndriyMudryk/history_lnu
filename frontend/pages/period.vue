<template>
  <div class="period d-flex flex-column">
    <div class="flex-grow-1">
      
    </div>
      <div class="container-fluid bg-dark p-3">
        <div class="d-flex">
          <div class="period-title text-white">
            {{period.title}}
          </div>
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
      searchPattern: ""
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
</style>
