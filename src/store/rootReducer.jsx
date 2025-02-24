import { combineReducers } from "redux";
import userSliceReducer from "./slices/userReducer";

const rootReducer = combineReducers({
	user: userSliceReducer
});

export default rootReducer;