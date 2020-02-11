/* eslint-disable no-case-declarations */

import { get } from 'lodash'
import * as types from './constants'

const INITIAL_STATE = {
  isLoading: false,
  signUp: null,
  signIn: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
    case types.SIGNIN_REQUEST:
    case types.UPDATE_USER_REQUEST:
      return { ...state, isLoading: true }
    case types.SIGNUP_SUCCESS:
      return { ...state,
        signUp: get(action, 'payload.data'),
        isLoading: false }
    case types.SIGNUP_FAILURE:
      return { ...state, signUp: null, isLoading: false }
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        signIn: get(action, 'payload.data'),
        isLoading: false,
      }
    case types.SIGNIN_FAILURE:

      return {
        ...state,
        isLoading: false,
        signIn: get(action, 'payload.data'),
      }
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        signIn: get(action, 'payload.data'),
        isLoading: false,
      }
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        // signIn: null,
        isLoading: false,
      }
    case types.GET_USER_INFO_SUCCESS:
      const data = get(action, 'payload.data.data')
      return {
        ...state,
        signIn: { ...state.signIn, data },
        isLoading: false,
      }
    case types.USER_LOGOUT:
      return INITIAL_STATE
    case types.UPLOAD_AVATAR_SUCCESS:
      const avatar = get(action, 'payload.data.data')
      return {
        ...state,
        signIn: { ...state.signIn, data: avatar },
      }
    default:
      return {
        ...state,
      }
  }
}
