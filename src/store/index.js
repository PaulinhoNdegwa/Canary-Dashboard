import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    alerts: [],
    devices: [],
    loading: false,
    fetching_error: null,
    selectedDevice: null
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
    },
    SET_SELECTED_DEVICE: (state, device_id) => {
      state.selectedDevice = device_id
    },
    SET_LOADING_STATUS: (state, loading) => {
      state.loading = loading
    }
  },
  actions: {
    fetchAllRecords: ({ commit }) => {
      commit('SET_LOADING_STATUS', true)
      // FETCH FROM API then commit to update state
      axios.get('https://thinkst-frontend-resources.s3-eu-west-1.amazonaws.com/incidents/data.json')
        .then(res => {
          commit('FETCH_ALL_ALERTS', res.data.alerts)
          commit('FETCH_ALL_DEVICES', res.data.device_list)
          commit('SET_LOADING_STATUS', false)
        })
        .catch(error => {
          console.log(error)
          commit('SET_FETCHING_ERROR', error.message)
          commit('SET_LOADING_STATUS', false)
        })
    },
    setSelectedDevice: ({ commit }, device_id) => {
      commit('SET_SELECTED_DEVICE', device_id)
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
      return state.devices.filter(device => device.ghost === "True").length
    },
    getAlertsPerDevice: (state) => {
      const deviceAlertsCount = []
      state.devices.forEach(device => {
        const count = state.alerts.filter(alert => alert.node_id === device.device_id).length
        deviceAlertsCount.push({
          device: device.name,
          alerts_count: count
        })
      })
      return deviceAlertsCount;
    },
    getDeviceAlerts: (state) => (id) => {
      return state.alerts.filter(alert => alert.node_id === id).reverse()
    },
    filterAlertsBy: (state) => (filter_by, value, node_id) => {
      if (filter_by == 'dst_host') {
        return state.alerts.filter(alert => alert.dst_host == value && alert.node_id == node_id).reverse()
      } else if (filter_by == 'description') {
        return state.alerts.filter(alert => alert.description == value && alert.node_id == node_id).reverse()
      } else if (filter_by == 'src_host') {
        return state.alerts.filter(alert => alert.src_host == value && alert.node_id == node_id).reverse()
      }
    },
    getDeviceById: (state) => (device_id) => {
      return state.devices.find(device => device.node_id === device_id)
    },
    filterUnacknowledgedAlerts: (state) => {
      return state.alerts.filter(alert => alert.acknowledged === "False")
    }
  },
  modules: {
  }
})
