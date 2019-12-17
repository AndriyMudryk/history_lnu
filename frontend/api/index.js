import axiosInstance from "~/utils/axiosInstance";
import helpers from "~/utils/helpers";
import constants from "~/constants";

const API_BASE_URL = constants.API_BASE_URL;
const restBaseUrl = API_BASE_URL + "/rest/api/v1";
const authBaseUrl = API_BASE_URL + "/auth";

export default {

  // Auth module
  auth: {
    me() {
      return axiosInstance({
        method: "GET",
        url: authBaseUrl + "/me",
        errorMessage: "URI Failed to get Current User Info."
      });
    },

    login(data) {
      return axiosInstance({
        method: "POST",
        url: authBaseUrl + "/getToken",
        data: helpers.serializeJsonObject(data),
        errorMessage: "Cannot login."
      });
    }
  },

  //Period
  getPeriods() {
    return axiosInstance({
      method: "GET",
      url: restBaseUrl + "/period",
      errorMessage: "Cannot get periods."
    });
  },

  getPeriod(periodId) {
    return axiosInstance({
      method: "GET",
      url: restBaseUrl + "/period/" + periodId,
      errorMessage: "Cannot get period."
    });
  },

  //Events
  getEvents(params) {
    return axiosInstance({
      method: "GET",
      url: restBaseUrl + "/events",
      params: params,
      errorMessage: "Cannot get events."
    });
  },

  //images
  getImages(eventId) {
    return axiosInstance({
      method: "GET",
      url: restBaseUrl + "/images",
      params: {
        eventId: eventId
      },
      errorMessage: "Cannot get Images."
    })
  }
};