import initialState, { LOGIN_DETAILS } from '../constants';

export const loginReducer = (state = initialState.user, action = {}) => {
  switch (action.type) {
	  case LOGIN_DETAILS:
	  const { token, username } = action.user;
      return {
        ...state,
		    token,
		    username
      };
    default:
      return state;
  }
};
