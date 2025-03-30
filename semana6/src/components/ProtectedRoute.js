import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const hasState = location.state && location.state.artistas && location.state.horario;

    if (!hasState) {
        return <Navigate to="/inquerito" replace />;
    }

    return children;
}

export default ProtectedRoute; 