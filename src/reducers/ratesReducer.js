import initialState, { FILTER_RATE} from '../constants';

export const rateReducer = (state = initialState.prevRate, action) => {
  switch (action.type) {
    case FILTER_RATE:
      return {
        ...state,
        prevRate: action.rates
      };

    default:
      return state;
  }
};
