import {
  combineReducers,
  createStore,
  applyMiddleware
} from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

const reducer = combineReducers({
  form: formReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(),
  applyMiddleware(...middlewares)
);

export default store;
