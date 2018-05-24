import { FILTER_RATE, LOGIN_DETAILS } from '../constants';

const filterRates = rates => ({
	type: FILTER_RATE,
	rates
});

const userDetails = user => ({
	type: LOGIN_DETAILS,
	user
});

export const getRates = rates => (dispatch) => {
	dispatch(filterRates(rates));
};

export const loginDetails = user => (dispatch) => {
	dispatch(userDetails(user));
};

