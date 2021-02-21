import { createStore } from "vuex";

//
export const store = createStore({
  state() {
    return {
      weewxdata: '',
      forecast: ''
    };
  },
  // MUTATIONS ( set the state )
  mutations: {
    weewxData (state: any, payload) {
      state.weewxdata = payload
    },
    forecastData (state: any, payload) {
      state.forecast = payload
    }
  }
});
