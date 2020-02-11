export const ROOT_URL = 'http://api.congich-phumy.com/api/'

export const API_ENDPOINTS = {
  sign: {
    signup: 'signup',
    signin: 'signin',
  },
  user: {
    update: 'user',
    changePassWord: 'user/changepass',
    resetPassWord: 'user/resetpass',
    avatar: 'user/upload_avatar',
  },
  home: {
    home: 'phan_anh',
  },
  report: {
    add: 'phan_anh/add',
    field: 'dm_linhvuc',
    problem: 'dm_suco',
    comment: 'pa_comment/add',
  },

}

export const constructUrlEndPoint = api => `${ROOT_URL}${api}`

export const formatStringUrl = (...args) => {
  let i = 1
  const str = args[0]

  return str.replace(/\{\}/g, () => args[i++]); // eslint-disable-line
}

export const prettifyEndpoint = (api, ...args) => formatStringUrl(constructUrlEndPoint(api), args)
