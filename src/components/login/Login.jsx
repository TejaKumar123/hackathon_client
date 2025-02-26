import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { login, setUser } from '../../store/slices/userReducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate();
	const { user } = useSelector(state => state.user);
	const [cookies, setCookie, removeCookie] = useCookies();

	// const normalLogin = async (data) => {
	// 	/* alert(JSON.stringify(data)); */
	// 	data.type = "normal"
	// 	dispatch(login(data)).then((action) => {
	// 		if (action?.payload?.status == "ok" && action?.payload?.data?.token && action?.payload?.data?.user) {
	// 			dispatch(setUser(action?.payload?.data?.user));
	// 			setCookie("hackathon_token", action?.payload?.data?.token, { path: "/", maxAge: 86400 });
	// 			toast.success(action?.payload?.message);
	// 		}
	// 		else {
	// 			toast.error(action?.payload?.message);
	// 		}
	// 	})
	// }

	// const googleLogin = async (response) => {
	// 	response.type = "google"
	// 	dispatch(login(response)).then((action) => {
	// 		if (action?.payload?.status == "ok" && action?.payload?.data?.token && action?.payload?.data?.user) {
	// 			dispatch(setUser(action?.payload?.data?.user));
	// 			setCookie("hackathon_token", action?.payload?.data?.token, { path: "/", maxAge: 86400 });
	// 			toast.success(action?.payload?.message);
	// 		}
	// 		else {
	// 			toast.error(action?.payload?.message);
	// 		}
	// 	})
	// }
	const normalLogin = async (data) => {
		data.type = "normal"
		dispatch(login(data)).then((action) => {
			if (action?.payload?.status == "ok" && action?.payload?.data?.token && action?.payload?.data?.user) {
				dispatch(setUser(action?.payload?.data?.user));
				setCookie("hackathon_token", action?.payload?.data?.token, { path: "/", maxAge: 86400 });
				toast.success(action?.payload?.message);
				navigate('/dashboard'); // Add this line
			}
			else {
				toast.error(action?.payload?.message);
			}
		})
	}

	const googleLogin = async (response) => {
		response.type = "google"
		dispatch(login(response)).then((action) => {
			if (action?.payload?.status == "ok" && action?.payload?.data?.token && action?.payload?.data?.user) {
				dispatch(setUser(action?.payload?.data?.user));
				setCookie("hackathon_token", action?.payload?.data?.token, { path: "/", maxAge: 86400 });
				toast.success(action?.payload?.message);
				navigate('/'); // Add this line
			}
			else {
				toast.error(action?.payload?.message);

			}
		})
	}
	const GoogleLogin = useGoogleLogin({
		onSuccess: googleLogin,
		onError: () => console.log("err"),
		flow: "auth-code"

	})

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email format').required('Email is required'),
		password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			let data = { ...values }
			/* alert(JSON.stringify(data)); */
			normalLogin(data);

		},
	});

	return (
		<>
			<div className="w-[100%] h-auto bg-transparent fixed top-[0px] px-[10px] py-[5px]">
				<p className="text-[150%] cursor-pointer" onClick={() => navigate("/", { replace: true })}>RGUKT CONNECT</p>
				{/* <p>{JSON.stringify(user)}</p> */}
			</div>
			<div className="w-[400px] h-auto mt-[100px] border-[0px] border-[black] m-auto">
				<p className="text-[170%] m-auto w-fit">Login</p>
				<form className="w-[100%] h-auto mt-[15px] border-[0px] border-[black] px-[15px] flex flex-col items-center justify-start gap-[15px]" onSubmit={formik.handleSubmit}>

					<TextField
						fullWidth
						label="Email"
						name="email"
						type="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						required
					/>
					<TextField
						fullWidth
						label="Password"
						name="password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						required
					/>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						color="secondary"
						endIcon={<SendIcon />} // New icon added
						sx={{
							padding: '10px 20px',
							borderRadius: '8px',
							fontSize: '16px',
							fontWeight: '600',
							backgroundColor: '#00796b', // Custom color
							'&:hover': {
								backgroundColor: '#004d40', // Hover effect
							},
						}}
					>
						Login
					</Button>
					<p>Already have an account, <span className='text-[blue] cursor-pointer' onClick={() => navigate("/signup")}>Signup</span></p>
					<Button
						fullWidth
						variant="outlined"
						color="primary"
						startIcon={<GoogleIcon />}
						sx={{
							padding: '10px 20px',
							borderRadius: '8px',
							fontSize: '16px',
							fontWeight: '600',
							backgroundColor: '#fff',
							borderColor: '#4285F4',
							color: '#4285F4',
							'&:hover': {
								backgroundColor: '#f1f1f1',
								borderColor: '#4285F4',
							},
						}}

						onClick={GoogleLogin}
					>
						Login with Google
					</Button>
				</form>
			</div>
		</>
	)
}

export default Login;
