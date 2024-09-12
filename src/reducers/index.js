// reducers/indexedDB.js
import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";
import adminData from "./adminData";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  adminData: adminData,
});
