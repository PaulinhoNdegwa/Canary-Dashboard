import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    alerts: [],
    devices: [],
    fetching_error: null
  },
  mutations: {
    FETCH_ALL_ALERTS: (state, alerts) => {
      state.alerts = alerts
    },
    FETCH_ALL_DEVICES: (state, devices) => {
      state.devices = devices
    },
    SET_FETCHING_ERROR: (state, error) => {
      state.fetching_error = error
    }
  },
  actions: {
    fetchAllRecords: ({ commit }) => {
      // FETCH FROM API then commit to update state
      axios.get('https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json')
        .then(res => {
          commit('FETCH_ALL_ALERTS', res.data.alerts)
          commit('FETCH_ALL_DEVICES', res.data.device_list)
        })
        .catch(error => {
          console.log(error)
          commit('SET_FETCHING_ERROR', error.message)
        })
    }
  },
  getters: {
    countAcknowledgedAlerts: (state) => {
      return state.alerts.filter(alert => alert.acknowledged === "True").length
    },
    countUnacknowledgedAlerts: (state) => {
      return state.alerts.filter(alert => alert.acknowledged === "False").length
    },
    countGhostDevices: (state) => {
      return state.devices.filter(device => device.ghost == "True").length
    }
  },
  modules: {
  }
})
