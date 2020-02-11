/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions'
import * as types from './constants'

export const getHome = (payload, callback = () => {}) => ({
  type: types.GET_HOME_REQUEST,
  payload,
  callback,
})

export const getHomeSuccess = createAction(types.GET_HOME_SUCCESS)
export const getHomeFailure = createAction(types.GET_HOME_FAILURE)

export const setField = createAction(types.SET_FIELD)
