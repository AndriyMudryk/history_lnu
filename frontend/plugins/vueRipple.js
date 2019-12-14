import Vue from "vue";
//import Ripple from "vue-ripple-directive";
import Ripple from "~/directives/v-ripple";

// Some ripple customization can be here
//Ripple.color = 'rgba(255, 255, 255, 0.35)';
//Ripple.zIndex = 55;
Vue.directive("ripple", Ripple);