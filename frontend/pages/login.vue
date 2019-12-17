<template>
  <section class="login bg-dark">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12">
          <h2 class="text-center text-white mb-4">
            Login
          </h2>
          <!--         <h4 class="text-center text-white mb-4">Existing Users</h4> -->
          <div class="row">
            <div class="col-md-6 mx-auto">
              <div class="card rounded-0">
                <div class="card-header">
                  <h3 class="mb-0">
                    Login
                  </h3>
                </div>
                <div class="card-body">
                  <form
                    class="form"
                    role="form"
                    autocomplete="off"
                    @submit.prevent="onSubmit">
                    <div
                      v-if="result"
                      :class="{'alert-success': result.type === 'success', 'alert-danger': result.type === 'error'}"
                      class="alert"
                      role="alert">
                      {{ result.message }}
                    </div>
                    <div class="form-group">
                      <label for="uname1">Email</label>
                      <input
                        v-model="email"
                        type="email"
                        class="form-control form-control-lg rounded-0"
                        autofocus="autofocus"
                        maxlength="254"
                        required="required">
                      <div class="invalid-feedback">
                        Oops, you missed this one.
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input
                        v-model="password"
                        type="password"
                        class="form-control form-control-lg rounded-0"
                        required="required"
                        autocomplete="new-password">
                      <div class="invalid-feedback">
                        Enter your password too!
                      </div>
                    </div>
                    <div>
                      <label class="custom-control custom-checkbox">
                        <input
                          v-model="rememberMe"
                          type="checkbox"
                          class="custom-control-input">
                        <span class="custom-control-indicator"/>
                        <span class="custom-control-description small text-dark">
                          Remember me on this computer
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success btn-lg float-right">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading-spinner v-if="isLoading"/>
  </section>
</template>

<script>
import loadingSpinner from "~/components/common/loading-spinner.vue";

export default {
  layout: "fullscreen",

  components: {
    "loading-spinner": loadingSpinner
  },

  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      result: null,
      isLoading: false
    };
  },

  methods: {
    onSubmit() {
      const me = this;
      me.result = null;
      me.isLoading = true;
      const store = me.$store;
      store.dispatch("auth/login", {
        email: me.email,
        password: me.password,
        rememberMe: me.rememberMe
      }).then(
        function () {
          me.isLoading = false;
          me.result = {
            type: "success",
            message: "Success"
          };
          me.$router.push(store.state.auth.redirectUrl);
        }
      ).catch(
        function (error) {
          me.isLoading = false;
          if (error.response && error.response.data) {
            me.result = {
              type: "error",
              message: error.response.data.message || error.response.status
            };
          }
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "~/scss/variables.scss";

.login {

  .custom-control {
    position: relative;
    display: inline-flex;
    min-height: 1.5rem;
    padding-left: 1.5rem;
    margin-right: 1rem;

    .custom-control-input {
      position: absolute;
      z-index: -1;
      opacity: 0;

      &:checked~.custom-control-indicator {
        color: $white;
        background-color: $light-blue-2;
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
      }
    }

    .custom-control-indicator {
      position: absolute;
      top: 0.25rem;
      left: 0;
      display: block;
      width: 1rem;
      height: 1rem;
      pointer-events: none;
      user-select: none;
      background-color: $light-gray-9;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
      border-radius: 0.25rem;
    }
  }
}
</style>