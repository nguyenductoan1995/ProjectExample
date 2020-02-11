/* eslint-disable camelcase */
import { put, takeLatest, call } from 'redux-saga/effects'
import { API } from 'service'
import { startLoading, endLoading } from 'store/middlewares/actions'
import request from 'service/request'
import { ROOT_URL, API_ENDPOINTS } from 'service/endpoints'
import axios from 'axios'
import { get } from 'lodash'
import * as types from './constants'
import { addReportSuccess, addReportFailure, getFieldSuccess, getFieldFailure, getProblemSuccess, getProblemFailure, getLocationSuccess, getLocationFailure, getPositionsSuccess, getPositionsFailure, addCommentSuccess, addCommentFailure } from './actions'

function* syncAddReport(action) {
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  const {
    payload,
    callback,
  } = action
  const {
    id_nguoi_phan_anh,
    id_linh_vuc,
    id_su_co,
    vi_tri,
    noi_dung,
    thoi_gian_phan_anh,
    geom,
    description,
    attachments,
  } = payload
  const formData = new FormData()
  formData.append('id_nguoi_phan_anh', id_nguoi_phan_anh)
  formData.append('id_linh_vuc', id_linh_vuc)
  formData.append('id_su_co', id_su_co)
  formData.append('vi_tri', vi_tri)
  formData.append('noi_dung', noi_dung)
  formData.append('thoi_gian_phan_anh', new Date(thoi_gian_phan_anh).toUTCString())
  formData.append('geom', JSON.stringify(geom))
  formData.append('description', description)
  attachments.forEach((item) => {
    formData.append('attachments', item)
  })
  const url = `${ROOT_URL}${API_ENDPOINTS.report.add}`

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
    yield put(addReportSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    yield put(addReportFailure(err.response))
    yield put(endLoading())
    callback({ success: false, errorMessage: err.response })
  }
}

function* syncGetField(action) {
  const {
    payload,
    callback,
  } = action
  yield put(startLoading())
  try {
    const res = yield call(API.getFieldAPI, payload)
    yield put(getFieldSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    yield put(getFieldFailure(err))
    yield put(endLoading())
    callback({ success: false, errorMessage: err.message })
  }
}
function* syncGetProblem(action) {
  const {
    payload,
    callback,
  } = action
  yield put(startLoading())
  try {
    const res = yield call(API.getProblemAPI, payload)
    yield put(getProblemSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    yield put(getProblemFailure(err))
    yield put(endLoading())
    callback({ success: false, errorMessage: err.message })
  }
}

function* syncGetLocation(action) {
  const {
    payload,
    callback,
  } = action
  yield put(startLoading())
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  try {
    const res = yield call(request, {
      method: 'get',
      url,
      params: { ...payload, key: 'AIzaSyAC6OPGP_rSVDONwHLUWO7xW8K9igdqNKI' },
    })
    yield put(getLocationSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    yield put(getLocationFailure(err))
    callback({ success: false, errorMessage: err.message })
    yield put(endLoading())
  }
}

function* syncPositionstion(action) {
  const {
    payload,
    callback,
  } = action
  yield put(startLoading())
  const url = 'https://maps.googleapis.com/maps/api/geocode/json'
  try {
    const res = yield call(request, {
      method: 'get',
      url,
      params: { ...payload, key: 'AIzaSyAC6OPGP_rSVDONwHLUWO7xW8K9igdqNKI' },
    })
    yield put(getPositionsSuccess(res))
    callback({ success: true, data: res })
    yield put(endLoading())
  } catch (err) {
    yield put(getPositionsFailure(err))
    callback({ success: false, errorMessage: err.message })
    yield put(endLoading())
  }
}

function* syncAddComment(action) {
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  const {
    payload,
    callback,
  } = action

  const id_phan_anh = get(payload, 'id_phan_anh', null)
  const noi_dung = get(payload, 'noi_dung', null)
  // const description = get(payload, 'description', null)
  const attachments = get(payload, 'attachments', [])

  const formData = new FormData()
  if (id_phan_anh) {
    formData.append('id_phan_anh', id_phan_anh)
  }
  formData.append('noi_dung', noi_dung)
  // formData.append('description', description)
  attachments.forEach((item) => {
    formData.append('attachments', item)
  })
  const url = `${ROOT_URL}${API_ENDPOINTS.report.comment}`

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
    yield put(addCommentSuccess(res))
    callback({ success: true })
    yield put(endLoading())
  } catch (err) {
    yield put(addCommentFailure(err.response))
    yield put(endLoading())
    callback({ success: false, errorMessage: err.response })
  }
}

function* reportWatcher() {
  yield takeLatest(types.ADD_REPORT_REQUEST, syncAddReport)
  yield takeLatest(types.GET_FIELD_REQUEST, syncGetField)
  yield takeLatest(types.GET_PROBLEM_REQUEST, syncGetProblem)
  yield takeLatest(types.GET_LOCATION_REQUEST, syncGetLocation)
  yield takeLatest(types.GET_POSITIONS_REQUEST, syncPositionstion)
  yield takeLatest(types.ADD_COMMENT_REQUEST, syncAddComment)
}

export default [reportWatcher()]
