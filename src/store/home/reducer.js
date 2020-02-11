/* eslint-disable no-case-declarations */

import { get } from 'lodash'
import * as types from './constants'

const INITIAL_STATE = {
  isLoading: false,
  home: [],
  field: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_HOME_REQUEST:
      const field = get(action, 'payload.where.id_linh_vuc', [])
      return { ...state, field, isLoading: true }
    case types.GET_HOME_SUCCESS:
      const home = get(action, 'payload.data', [])
      return { ...state, home, isLoading: false }
    case types.GET_HOME_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
