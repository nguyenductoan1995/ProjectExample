/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions'
import * as types from './constants'

export const addReport = (payload, callback = () => {}) => ({
  type: types.ADD_REPORT_REQUEST,
  payload,
  callback,
})

export const addReportSuccess = createAction(types.ADD_REPORT_SUCCESS)
export const addReportFailure = createAction(types.ADD_REPORT_FAILURE)
//
export const getField = (payload, callback = () => {}) => ({
  type: types.GET_FIELD_REQUEST,
  payload,
  callback,
})

export const getFieldSuccess = createAction(types.GET_FIELD_SUCCESS)
export const getFieldFailure = createAction(types.GET_FIELD_FAILURE)
//
export const getProblem = (payload, callback = () => {}) => ({
  type: types.GET_PROBLEM_REQUEST,
  payload,
  callback,
})

export const getProblemSuccess = createAction(types.GET_PROBLEM_SUCCESS)
export const getProblemFailure = createAction(types.GET_PROBLEM_FAILURE)
//
export const getLocation = (payload, callback = () => {}) => ({
  type: types.GET_LOCATION_REQUEST,
  payload,
  callback,
})

export const getLocationSuccess = createAction(types.GET_LOCATION_SUCCESS)
export const getLocationFailure = createAction(types.GET_LOCATION_FAILURE)
//
export const getPositions = (payload, callback = () => {}) => ({
  type: types.GET_POSITIONS_REQUEST,
  payload,
  callback,
})

export const getPositionsSuccess = createAction(types.GET_POSITIONS_SUCCESS)
export const getPositionsFailure = createAction(types.GET_POSITIONS_FAILURE)
// comment
export const addComment = (payload, callback = () => {}) => ({
  type: types.ADD_COMMENT_REQUEST,
  payload,
  callback,
})

export const addCommentSuccess = createAction(types.ADD_COMMENT_SUCCESS)
export const addCommentFailure = createAction(types.ADD_COMMENT_FAILURE)
