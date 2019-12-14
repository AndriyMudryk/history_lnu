<template>
  <section class="error-page">
    <attention-box :error="true"/>
    <h3 class="is-size-3">
      {{ shortErrorDescription }}
    </h3>
    <h1 class="is-size-2">
      {{ errorMessage }}
    </h1>

    <br>
    Automatic redirect in {{ remainingSeconds }} sec

    <div>
      <button
        class="button back-button"
        @click="onBackButtonClick()">
        <svg-icon icon="back"/>
        <span>
          Back
        </span>
      </button>
      <button
        class="button"
        @click="onLogoutClick">
        Logout
      </button>
    </div>
  </section>
</template>

<script>
import logger from "~/utils/logger";
import attentionBox from "~/components/common/attention-box.vue";

export default {
  //layout: "fullscreen",

  components: {
    "attention-box": attentionBox
  },

  props: {
    error: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      redirectTimeout: null,
      remainingSeconds: 25
    };
  },

  computed: {
    errorData() {
      const me = this;
      const error = me.error;// Usualy it is axios network request error
      return error && error.response && error.response.data || {};// Controled server error structure {name, message, code}
    },

    errorMessage() {
      const me = this;
      return me.errorData.message || me.error.message;
    },

    serverErrorCode() {
      const me = this;
      return me.errorData.code || me.error.statusCode;
    },

    shortErrorDescription() {
      const me = this;
      const serverErrorCode = me.serverErrorCode;
      if (serverErrorCode === "no_access" || serverErrorCode === 403) {
        return "No access";
      }
      if (serverErrorCode === 404) {
        return "Page not found";
      }
      return "An error occurred";
    }
  },

  mounted() {
    const me = this;
    const error = Object.assign(me.error, {
      message: me.errorMessage
    });
    logger.error("error", "Redirected to error page", error);
    me.automaticRedirect();
  },

  head() {
    return {
      title: "Error Page"
    };
  },

  methods: {
    onLogoutClick() {
      const me = this;
      me.$store.dispatch("auth/logout");
      window.location.href = "/login";// Full redirect after logout to clear store data
    },

    onBackButtonClick() {
      const me = this;
      me.$router.go(-1);
    },

    automaticRedirect() {
      const me = this;
      me.remainingSeconds -= 1;
      if (me.remainingSeconds <= 0) {
        me.$router.go(-1);
        return false;
      }
      me.redirectTimeout = setTimeout(
        function () {
          me.automaticRedirect();
        },
        1000
      );
    }
  }
};
</script>

<style lang="scss">
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .back-button {
    margin-right: 20px;

    span {
      margin-left: 7px;
    }
  }
}
</style>