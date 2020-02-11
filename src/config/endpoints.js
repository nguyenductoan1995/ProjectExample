export const ROOT_URL = 'https://'

export const API_ENDPOINTS = {
  auth: {
    getOTP: '/users/request_otp',
    verify: '/users/verify_otp',
  },
  food: {
    meals: '/meals',
    foods: '/meals/search_food',
  },
}

export const constructUrlEndPoint = api => `${ROOT_URL}${api}`

export const formatStringUrl = (...args) => {
  let i = 1
  const str = args[0]

  return str.replace(/\{\}/g, () => args[i++])
}

export const prettifyEndpoint = (api, ...args) => formatStringUrl(constructUrlEndPoint(api), args)
