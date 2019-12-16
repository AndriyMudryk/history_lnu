<template>
  <section class="app-header">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container-fluid">
        <a
          class="navbar-brand"
          href="#">
          <img
            alt="Vue logo"
            src="favicon.png"
            width="50px"
            height="50px">
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"/>
        </button>
        <dropdown
          v-if="currentUser"
          v-ripple
          class="user-dropdown">
          <template slot="dropdownTrigger">
            <a class="dropdown-trigger btn-group">
              <button
                type="button"
                class="btn">
                <span
                  class="user-name">
                  {{ currentUser.email }}
                </span>
              </button>
              <button
                type="button"
                class="btn dropdown-toggle dropdown-toggle-split">
                <span class="sr-only">
                  Toggle Dropdown
                </span>
              </button>
            </a>
          </template>
          <template slot="dropdownMenu">
            <a
              v-ripple
              class="dropdown-item">
              <svg-icon
                icon="account"
                class="logout-icon"/>
              Admin Area
            </a>
            <a
              v-ripple
              class="dropdown-item"
              @click="onLogoutClick">
              <svg-icon
                icon="exit"
                class="logout-icon"/>
              Logout
            </a>
          </template>
        </dropdown>
        <span
          v-else
          class="text-white">
          <a
            v-ripple
            @click="onLoginClick">
            Login
          </a>
        </span>
      </div>
    </nav>
  </section>
</template>

<script>
import svgIcon from "~/components/common/svg-icon.vue";
import dropdown from "~/components/common/dropdown.vue";

export default {
  components: {
    "svg-icon": svgIcon,
    "dropdown": dropdown
  },

  computed: {
    currentUser() {
      const me = this;
      return me.$store.state.auth.user;
    }
  },

  methods: {
    onLogoutClick() {
      const me = this;
      me.$store.dispatch("auth/logout");
      //me.$router.push("/login");
      // Full redirect after logout to clear store data
      window.location.href = "/login";
    },

    onLoginClick() {
      window.location.href = "/login";
    }
  }
};
</script>

<style lang="scss">
@import "~/scss/variables.scss";

.app-header {

  .user-dropdown {
    border-radius: 5px;

    .dropdown-trigger {

      .user-photo {
        display: inline;
      }

      .user-name {
        display: inline;
        margin-left: 1em;
      }
    }

    .dropdown-toggle {
      transition: transform 1s;
    }

    .dropdown-menu {
      padding-right: 16px;

      .dropdown-item {
        border-radius: 0 50px 50px 0;

        .svg-icon {
          margin-right: 5px;
        }
      }
    }

    .btn {
      color: $white;

      &:focus {
        box-shadow: none;
      }
    }

    &.show {

      .dropdown-toggle {
        transform: rotate(180deg);
      }
    }
  }
}
</style>