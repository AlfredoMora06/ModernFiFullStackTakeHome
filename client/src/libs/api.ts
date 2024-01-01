import axios from "axios"

import config from "./config"

const axiosSettings = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // normally would want to cut off at 20 sec, but we have been having issues with PDF generation taking
  // enormous amounts of time, so we need to extend in order to prevent bad timeouts
  timeout: 60000,
}

const api = axios.create(axiosSettings)

api.interceptors.request.use(
  function (axiosConfig) {
    // update with api base url
    axiosConfig.url = `${config.api.url}${axiosConfig.url}`
    return axiosConfig
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default api
