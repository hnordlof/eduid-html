
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken } from "actions/common";
import * as actions from "actions/Mobile";



export function* requestMobile () {
    try {
        yield put(actions.getMobiles());
        const config = yield select(state => state.config);
        const phones = yield call(fetchMobiles, config);
        yield put(putCsrfToken(phones));
        yield put(phones);
    } catch(error) {
        yield put(actions.getMobilesFail(error.toString()));
    }
}

export function fetchMobiles (config) {
    return window.fetch(config.MOBILE_URL + 'all', {
        credentials: 'include',
        headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* saveMobile () {
    try {
        const state = yield select(state => state),
              data = {
                number: state.phones.phone,
                verified: false,
                primary: false,
                csrf_token: state.config.csrf_token
              };

        const phones = yield call(sendMobile, state.config, data);
        yield put(putCsrfToken(phones));
        yield put(phones);
    } catch(error) {
        yield put(actions.postMobileFail(error.toString()));
    }
}

export function sendMobile (config, data) {
    return window.fetch(config.MOBILE_URL + 'new', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestResendMobileCode () {
    try {
        const state = yield select(state => state),
              data = {
                number: state.phones.confirming,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestResend, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(actions.resendMobileCodeFail(error.toString()));
    }
}

export function requestResend (config, data) {
    return window.fetch(config.MOBILE_URL + 'resend-code', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestVerifyMobile () {
    try {
        const state = yield select(state => state),
              data = {
                number: state.phones.confirming,
                code: state.phones.code,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestVerify, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(actions.startVerifyFail(error.toString()));
    }
}

export function requestVerify (config, data) {
    return window.fetch(config.MOBILE_URL + 'verify', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestRemoveMobile () {
    try {
        const state = yield select(state => state),
              data = {
                number: state.phones.phone,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestRemove, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(actions.startRemoveFail(error.toString()));
    }
}

export function requestRemove (config, data) {
    return window.fetch(config.MOBILE_URL + 'remove', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestMakePrimaryMobile () {
    try {
        const state = yield select(state => state),
              data = {
                number: state.phones.phone,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestMakePrimary, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(actions.makePrimaryFail(error.toString()));
    }
}

export function requestMakePrimary (config, data) {
    return window.fetch(config.MOBILE_URL + 'primary', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
