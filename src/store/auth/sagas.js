import { put, takeLatest, call, select } from 'redux-saga/effects'
import { API } from 'service'
import { startLoading, endLoading } from 'store/middlewares/actions'
import axios from 'axios'
import { get } from 'lodash'
import { ROOT_URL, API_ENDPOINTS } from 'service/endpoints'
import request from 'service/request'
import * as types from './constants'
import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  upDateUserSuccess,
  upDateUserFailure,
  changePassWordSuccess,
  changePassWordFailure,
  resetPassWordSuccess,
  resetPassWordFailure,
  getUserInfoSuccess,
  getUserInfoFailure,
  uploadAvatarSuccess,
  uploadAvatarFailure,
} from './actions'

function* syncSignUp(action) {
  const {
    payload,
    callback,
  } = action
  yield put(startLoading())
  try {
    const res = yield call(API.signUpAPI, payload)
    yield put(signUpSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    callback({ success: false, error: err.response })
    yield put(signUpFailure(err.response))
    yield put(endLoading())
  }
}

function* syncSignIn(action) {
  const {
    payload,
    callback,
  } = action
  yield put(startLoading())
  try {
    const res = yield call(API.signInAPI, payload)
    const token = get(res, 'data.token')
    axios.defaults.headers.common.Authorization = token
    yield put(signInSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    callback({ success: false, error: err.response })
    yield put(signInFailure(err.response))
    yield put(endLoading())
  }
}

function* syncUpdateUser(action) {
  const {
    payload,
    callback,
  } = action
  yield put(startLoading())
  const authStore = yield select(store => store.authStore)
  const id = get(authStore, 'signIn.data.id', null)
  try {
    const res = yield call(API.updateUserApI, { ...payload, id })
    yield put(upDateUserSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    callback({ success: false, error: err.response })
    yield put(upDateUserFailure(err.response))
    yield put(endLoading())
  }
}

function* synChangePassWord(action) {
  const { payload, callback } = action
  const authStore = yield select(store => store.authStore)
  const id = get(authStore, 'signIn.data.id', null)
  yield put(startLoading())
  try {
    const res = yield call(API.changePassWordAPI, { ...payload, id })
    yield put(changePassWordSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    callback({ success: false, error: err.response })
    yield put(changePassWordFailure(err.response))
    yield put(endLoading())
  }
}

function* synResetPassWord(action) {
  const { payload, callback } = action
  yield put(startLoading())
  try {
    const res = yield call(API.resetPassWordAPI, payload)
    const message = get(res, 'data.message', '')
    yield put(resetPassWordSuccess(res))
    callback({ success: true, message })
    yield put(endLoading())
  } catch (err) {
    callback({ success: false, error: err.response })
    yield put(resetPassWordFailure(err.response))
    yield put(endLoading())
  }
}

function* synGetUserInfo(action) {
  const { callback } = action
  const authStore = yield select(store => store.authStore)
  const id = get(authStore, 'signIn.data.id', null)
  yield put(startLoading())
  try {
    const res = yield call(API.getUserInfo, { id })
    const message = get(res, 'data.message', '')
    yield put(getUserInfoSuccess(res))
    callback({ success: true, message })
    yield put(endLoading())
  } catch (err) {
    callback({ success: false, error: err.response })
    yield put(getUserInfoFailure(err.response))
    yield put(endLoading())
  }
}

function* upLoadAvatar(action) {
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  const {
    payload,
    callback,
  } = action
  const {
    avatar,
  } = payload
  const formData = new FormData()

  formData.append('avatar', avatar)
  const url = `${ROOT_URL}${API_ENDPOINTS.user.avatar}`

  yield put(startLoading())
  try {
    const res = yield call(request, {
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    yield put(uploadAvatarSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    yield put(uploadAvatarFailure(err.response))
    yield put(endLoading())
    callback({ success: false, errorMessage: err.response })
  }
}

function* authWatcher() {
  yield takeLatest(types.SIGNUP_REQUEST, syncSignUp)
  yield takeLatest(types.SIGNIN_REQUEST, syncSignIn)
  yield takeLatest(types.UPDATE_USER_REQUEST, syncUpdateUser)
  yield takeLatest(types.CHANGE_PASSWORD_REQUEST, synChangePassWord)
  yield takeLatest(types.RESET_PASSWORD_REQUEST, synResetPassWord)
  yield takeLatest(types.GET_USER_INFO_REQUEST, synGetUserInfo)
  yield takeLatest(types.UPLOAD_AVATAR_REQUEST, upLoadAvatar)
}

export default [authWatcher()]
