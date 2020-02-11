/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions'
import * as types from './constants'

export const signUp = (payload, callback = () => {}) => ({
  type: types.SIGNUP_REQUEST,
  payload,
  callback,
})
export const signUpSuccess = createAction(types.SIGNUP_SUCCESS)
export const signUpFailure = createAction(types.SIGNUP_FAILURE)
//
export const signIn = (payload, callback = () => {}) => ({
  type: types.SIGNIN_REQUEST,
  payload,
  callback,
})
export const signInSuccess = createAction(types.SIGNIN_SUCCESS)
export const signInFailure = createAction(types.SIGNIN_FAILURE)
// Update user
export const upDateUser = (payload, callback = () => {}) => ({
  type: types.UPDATE_USER_REQUEST,
  payload,
  callback,
})
export const upDateUserSuccess = createAction(types.UPDATE_USER_SUCCESS)
export const upDateUserFailure = createAction(types.UPDATE_USER_FAILURE)
// change password
export const changePassWord = (payload, callback = () => {}) => ({
  type: types.CHANGE_PASSWORD_REQUEST,
  payload,
  callback,
})
export const changePassWordSuccess = createAction(types.CHANGE_PASSWORD_SUCCESS)
export const changePassWordFailure = createAction(types.CHANGE_PASSWORD_FAILURE)
// reset password
export const resetPassWord = (payload, callback = () => {}) => ({
  type: types.RESET_PASSWORD_REQUEST,
  payload,
  callback,
})
export const resetPassWordSuccess = createAction(types.RESET_PASSWORD_SUCCESS)
export const resetPassWordFailure = createAction(types.RESET_PASSWORD_FAILURE)
//  get user info
export const getUserInfo = (payload, callback = () => {}) => ({
  type: types.GET_USER_INFO_REQUEST,
  payload,
  callback,
})
export const getUserInfoSuccess = createAction(types.GET_USER_INFO_SUCCESS)
export const getUserInfoFailure = createAction(types.GET_USER_INFO_FAILURE)

export const userLogout = createAction(types.USER_LOGOUT)
//  upload avatar
export const uploadAvatar = (payload, callback = () => {}) => ({
  type: types.UPLOAD_AVATAR_REQUEST,
  payload,
  callback,
})
export const uploadAvatarSuccess = createAction(types.UPLOAD_AVATAR_SUCCESS)
export const uploadAvatarFailure = createAction(types.UPLOAD_AVATAR_FAILURE)
