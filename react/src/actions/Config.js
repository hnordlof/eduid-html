
import { checkStatus, ajaxHeaders } from "actions/common";

export const GET_JSCONFIG_CONFIG = 'GET_JSCONFIG_CONFIG';
export const GET_JSCONFIG_CONFIG_SUCCESS = 'GET_JSCONFIG_CONFIG_SUCCESS';
export const GET_JSCONFIG_CONFIG_FAIL = 'GET_JSCONFIG_CONFIG_FAIL';
export const NEW_CSRF_TOKEN = 'NEW_CSRF_TOKEN';

export function getConfig () {
  return {
    type: GET_JSCONFIG_CONFIG
  };
}


export function getConfigFail (err) {
  return {
    type: GET_JSCONFIG_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

export function newCsrfToken(token) {
    return {
        type: NEW_CSRF_TOKEN,
        payload: {
            csrf_token: token
        }
    };
}
