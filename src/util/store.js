import {
  combineReducers,
  createStore,
  applyMiddleware
} from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { rateReducer, loginReducer } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

const reducer = combineReducers({
  form: formReducer,
  rate: rateReducer,
  user: loginReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(),
  applyMiddleware(...middlewares)
);

export default store;
