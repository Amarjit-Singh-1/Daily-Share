import userReducer from "./userReducer";
import postReducer from "./postReducer";
import settingsReducer from "./settingsReducer";
import { combineReducers } from "redux";
const reducers = combineReducers({
  user: userReducer,
  posts: postReducer,
  settings: settingsReducer
});
export default reducers;
