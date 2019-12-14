import helpers from "~/utils/helpers";

export default {
  methods: {
    getState(query) {
      const routeQuery = query || this.$route.query;
      let state = {};
      for (let propertyName in routeQuery) {
        if (routeQuery.hasOwnProperty(propertyName)) {
          //let propertyValue = JSON.parse(routeQuery[propertyName]);
          // Because of avoiding extra quotes
          let propertyValue = routeQuery[propertyName];
          if (helpers.isStringNumber(propertyValue)) {
            propertyValue = Number(propertyValue);
          }
          state[propertyName] = propertyValue;
        }
      }
      return state;
    },

    setState(newState, defaultState) {
      let routeQuery = {};
      const router = this.$router;
      let route = this.$route;

      // to skip default properties in the url state
      if (defaultState) {
        //newState = helpers.cloneObject(newState);
        newState = Object.assign({}, newState);// Only ony level deep properties copy
        for (let propertyName in defaultState) {
          if (defaultState.hasOwnProperty(propertyName) && newState[propertyName] === defaultState[propertyName]) {
            delete newState[propertyName];
          }
        }
      }
      for (let propertyName in newState) {
        if (newState.hasOwnProperty(propertyName)) {
          let propertyValue = newState[propertyName];
          if (propertyValue !== "") {
            //routeQuery[propertyName] = JSON.stringify(propertyValue);
            // To avoid extra quotes
            routeQuery[propertyName] = propertyValue;
          }
        }
      }
      router.replace({
        path: route.path,
        query: routeQuery
      });
      //return routeQuery;
    }
  }
};