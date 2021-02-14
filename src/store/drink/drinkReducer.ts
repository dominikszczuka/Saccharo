import { IDrink } from 'src/constants';

import * as drinkTypes from './drinkTypes';

interface State {
  drinks: IDrink[];
  message: string;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  drinks: [],
  message: '',
  loading: false,
  error: null,
};

export default function drinkReducer(
  state: State = initialState,
  actions: drinkTypes.DrinkActionType,
) {
  switch (actions.type) {
    case drinkTypes.CREATE_DRINK_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case drinkTypes.CREATE_DRINK_RESOLVED:
      return {
        ...state,
        message: actions.payload,
        loading: false,
        error: null,
      };
    case drinkTypes.CREATE_DRINK_REJECTED:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case drinkTypes.GET_DRINKS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case drinkTypes.GET_DRINKS_RESOLVED:
      return {
        ...state,
        drinks: [...actions.payload],
        loading: false,
        error: null,
      };
    case drinkTypes.GET_DRINKS_REJECTED:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
}
