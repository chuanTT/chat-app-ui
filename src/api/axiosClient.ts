import config from "@/config"
import axios from "axios"

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json"
  }
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (configInterceptors) {
    const token = localStorage.getItem(config.localKey.token)

    if (token) {
      configInterceptors.headers.Authorization = `Bearer ${token}`
    }

    return configInterceptors
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
