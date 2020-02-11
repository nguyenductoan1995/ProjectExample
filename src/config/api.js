import { API_ENDPOINTS, prettifyEndpoint } from './endpoints'

export const verifyAPI = () => prettifyEndpoint(API_ENDPOINTS.auth.verify)
export const getOTPAPI = () => prettifyEndpoint(API_ENDPOINTS.auth.getOTP)
