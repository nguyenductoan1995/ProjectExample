import axios from 'axios'
import store from 'store'
import { userLogout } from 'store/auth/actions'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// for upload avatar to S3
axios.interceptors.request.use((config) => {
  if (config.url.search('s3.amazonaws.com') > 0) {
    delete config.headers.common.Authorization
  }
  return config
}, error => Promise.reject(error),
)


// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  (err) => {
    // console.tron.log(err.response.status, store)
    if (err.response.status === 405) {
      const { error } = err.response.data || null
      if (error) {
        return Promise.reject(error)
      }
    }
    if (err.response.status === 401) {
      //   store.store.dispatch(userLogout())
    }
    return Promise.reject(err)
  },
)

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token
  } else {
    delete axios.defaults.headers.Authorization
  }
}

export { setAuthToken }

function request(data) {
  return axios(data)
}

export default request
