/* eslint-disable max-len */
import axios from 'axios'
import { prettifyEndpoint, API_ENDPOINTS } from './endpoints'

// axios.defaults.timeout = 10000

// axios.defaults.headers.post['Content-Type'] = 'application/json'

// // for upload avatar to S3
// axios.interceptors.request.use((config) => {
//   if (config.url.search('s3.amazonaws.com') > 0) {
//     delete config.headers.common.Authorization
//   }
//   return config
// }, error => Promise.reject(error),
// )

// // Add a response interceptor
// axios.interceptors.response.use(
//   response => response,
//   (err) => {
//     if (err.response.status === 405) {
//       const { error } = err.response.data || null
//       if (error) {
//         return Promise.reject(error)
//       }
//     }
//     // if (err.response.status === 401) {
//     //   stores.dispatch('Hello')
//     // }
//     return Promise.reject(err)
//   },
// )
// API

export const signUpAPI = params => axios.post(prettifyEndpoint(API_ENDPOINTS.sign.signup), params)
export const signInAPI = params => axios.post(prettifyEndpoint(API_ENDPOINTS.sign.signin), params)
export const updateUserApI = params => axios.put(`${prettifyEndpoint(API_ENDPOINTS.user.update)}/${params.id}`, params)
export const changePassWordAPI = params => axios.put(`${prettifyEndpoint(API_ENDPOINTS.user.changePassWord)}/${params.id}`, params)
export const resetPassWordAPI = params => axios.post(prettifyEndpoint(API_ENDPOINTS.user.resetPassWord), params)
export const getUserInfo = params => axios.get(`${prettifyEndpoint(API_ENDPOINTS.user.update)}/${params.id}`)
export const getHomeAPI = params => axios.post(prettifyEndpoint(API_ENDPOINTS.home.home), params)
export const addReportAPI = params => axios.post(prettifyEndpoint(API_ENDPOINTS.report.add), params)
export const getFieldAPI = params => axios.post(prettifyEndpoint(API_ENDPOINTS.report.field), params)
export const getProblemAPI = params => axios.post(prettifyEndpoint(API_ENDPOINTS.report.problem), params)

export const API = {
  signUpAPI,
  signInAPI,
  updateUserApI,
  changePassWordAPI,
  resetPassWordAPI,
  getUserInfo,
  getHomeAPI,
  addReportAPI,
  getFieldAPI,
  getProblemAPI,
}
