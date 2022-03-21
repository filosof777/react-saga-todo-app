import * as types from "./actionTypes";

import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
} from "./actions";
import {
  loadUsersApi,
  createUsersApi,
  deleteUsersApi,
  updateUsersApi,
} from "./api";

// get users saga

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

// create user saga

function* onCreateUsersStartAsync({ payload }) {
  try {
    const response = yield call(createUsersApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUsersStartAsync);
}

// delete user saga

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUsersApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

// update user saga

function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUsersApi, id, formValue);
    if (response.status === 200) {
      yield delay(500);
      yield put(updateUserSuccess(response.data));
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}

function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
