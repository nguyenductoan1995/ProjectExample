/* eslint-disable no-case-declarations */

import { get } from 'lodash'
import * as types from './constants'

const INITIAL_STATE = {
  isLoading: false,
  field: null,
  problem: null,
  selectLocation: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_REPORT_REQUEST:
    case types.GET_PROBLEM_REQUEST:
    case types.GET_FIELD_REQUEST:
      return { ...state, isLoading: true }
    case types.ADD_REPORT_SUCCESS:
    //  const home = get(action, 'payload.data')
      return { ...state, isLoading: false }
    case types.ADD_REPORT_FAILURE:
    case types.GET_PROBLEM_FAILURE:
    case types.GET_FIELD_FAILURE:
      return { ...state, isLoading: false }
    case types.GET_FIELD_SUCCESS:
      const field = get(action, 'payload.data')
      return {
        ...state,
        field,
      }
    case types.GET_PROBLEM_SUCCESS:
      const problem = get(action, 'payload.data')
      return {
        ...state,
        problem,
      }
    case types.GET_LOCATION_SUCCESS:
      const selectLocation = get(action, 'payload.data')
      return {
        ...state,
        selectLocation,
      }
    default:
      return state
  }
}
