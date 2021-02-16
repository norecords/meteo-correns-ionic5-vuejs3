import { createStore } from "vuex";

//
export const store = createStore({
  state() {
    return {
      weewxdata: ''
    };
  },
  // MUTATIONS ( set the state )
  mutations: {
    weewxData (state: any, payload) {
      state.weewxdata = payload
    }
  }
});
