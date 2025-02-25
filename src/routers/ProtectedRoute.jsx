import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const [cookies] = useCookies(['hackathon_token']);
    const { user } = useSelector(state => state.user);

    if (!cookies.hackathon_token || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;