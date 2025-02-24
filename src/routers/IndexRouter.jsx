import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"


const IndexRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	)
}

export default IndexRouter;