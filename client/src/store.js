import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";
import reduxPromise from "redux-promise";

import rootReducers from "./reducers";

const middleware = [reduxPromise, thunk];

//const initialState = {};

const store = createStore(
  rootReducers,
  //initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
