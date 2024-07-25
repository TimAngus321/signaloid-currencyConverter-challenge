import axios from 'axios'
import { defineStore } from 'pinia'

export const useSignaloidAPI = defineStore('signaloidAPI', {
  state: () => ({
    sigClient: axios.create({
      baseURL: 'https://api.signaloid.io',
      headers: {
        Authorization: import.meta.env.VITE_SIGNALOID_API_KEY,
        'Content-Type': 'application/json' // docs say it's application/json
      }
    })
  }),
  getters: {},
  actions: {}
})
