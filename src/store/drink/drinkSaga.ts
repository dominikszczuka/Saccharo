import { call, put, takeLatest } from 'redux-saga/effects';

import { IDrink } from 'src/constants';

import { firebase } from '../../firebase/config';
import * as drinkActions from './drinkActions';
import * as drinkTypes from './drinkTypes';

function* createDrinkSaga(action: drinkTypes.CreateDrinkStarted) {
  const { payload } = action;
  try {
    yield put(drinkActions.createDrinkPending());
    firebase.default
      .database()
      .ref('drinks/' + payload.barCode)
      .set(payload);
    yield put(drinkActions.createDrinkResolved('Added'));
  } catch (error) {
    yield put(drinkActions.createDrinkRejected(error));
  }
}

function* getDrinkSaga(action: drinkTypes.GetDrinkStarted) {
  const { payload } = action;
  try {
    yield put(drinkActions.getDrinkPending());
    const refDrink = firebase.default.database().ref(`drinks/${payload}`);
    const snapshot = yield refDrink.once('value');
    const drink: IDrink = snapshot.val();
    yield put(drinkActions.getDrinkResolved(drink));
  } catch (error) {
    yield put(drinkActions.getDrinkRejected(error));
  }
}

function* watchDrinkRequest() {
  yield takeLatest(drinkTypes.CREATE_DRINK_STARTED, createDrinkSaga);
  yield takeLatest(drinkTypes.GET_DRINK_STARTED, getDrinkSaga);
}

const drinkSaga = watchDrinkRequest;

export default drinkSaga;
