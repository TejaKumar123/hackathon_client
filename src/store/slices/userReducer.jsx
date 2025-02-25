import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

// const userSlice = createSlice({
// 	name: "user",
// 	initialState: {

// 	},
// 	reducers: {
// 		setUser: (state, action) => {
// 			state.user = action.payload;
// 		}
// 	}
// })
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {  // Add this reducer
            state.user = null;
        }
    }
});

const signup = createAsyncThunk("user/signup", async (data, thunkApi) => {
	try {
		let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, data);
		if (res?.data?.status == "ok") {
			return thunkApi.fulfillWithValue(res?.data);
		}
		else {
			return thunkApi.rejectWithValue(res?.data);
		}
	}
	catch (err) {
		return thunkApi.rejectWithValue({
			status: "error",
			message: "error occured while signup",
			error: err,
		})
	}
})

const login = createAsyncThunk("user/login", async (data, thunkApi) => {
	try {
		let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data);
		if (res?.data?.status == "ok") {
			return thunkApi.fulfillWithValue(res?.data);
		}
		else {
			return thunkApi.rejectWithValue(res?.data);
		}
	}
	catch (err) {
		return thunkApi.rejectWithValue({
			status: "error",
			message: "error while login",
			error: err,
		})
	}
})

// export { signup, login };
// export const { setUser } = userSlice.actions;
// export default userSlice.reducer;
export { signup, login };
export const { setUser, clearUser } = userSlice.actions; // Export clearUser
export default userSlice.reducer;